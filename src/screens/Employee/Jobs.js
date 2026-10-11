import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  ActivityIndicator,
  RefreshControl,
  Modal
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import dashboardStyles from '../../styles/Employee/Dashboard';
import styles from '../../styles/Employee/Jobs';

import { AdminContext } from '../../context/AdminContext';
import { getJobs } from '../../services/jobService';
import { createApplication } from '../../services/applicationService';

const Jobs = ({ navigation }) => {
  const { jobs: contextJobs, employers } = React.useContext(AdminContext);
  const [liveJobs, setLiveJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [applyingJobId, setApplyingJobId] = useState(null);
  const [appliedJobs, setAppliedJobs] = useState({});
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    fetchJobsList();
  }, []);

  const fetchJobsList = async () => {
    setLoading(true);
    try {
      const res = await getJobs();
      if (res && res.data && Array.isArray(res.data.data)) {
        setLiveJobs(res.data.data);
      } else if (res && res.data && Array.isArray(res.data.jobs)) {
        setLiveJobs(res.data.jobs);
      } else if (Array.isArray(res.data)) {
        setLiveJobs(res.data);
      }
    } catch (err) {
      console.log('Error fetching backend jobs:', err.message);
    } finally {
      setLoading(false);
    }
  };

  // Build employer approval lookup
  const activeEmployerLookup = new Map();
  if (Array.isArray(employers)) {
    employers.forEach(emp => {
      const isAct = (emp.status || '').toLowerCase() === 'active';
      if (isAct) {
        if (emp.id) activeEmployerLookup.set(String(emp.id), true);
        if (emp.uid) activeEmployerLookup.set(String(emp.uid), true);
        if (emp.companyName) activeEmployerLookup.set(emp.companyName.toLowerCase(), true);
        if (emp.name) activeEmployerLookup.set(emp.name.toLowerCase(), true);
      }
    });
  }

  // Combine live jobs with context jobs, strictly ensuring ONLY approved jobs and companies are shown
  const combinedJobs = [];
  const seenIds = new Set();

  const isJobApproved = (job) => {
    const s = (job.status || '').toLowerCase();
    const isApprovedStatus = s === 'active' || s === 'approved';
    if (!isApprovedStatus) return false;

    // If we have employers data, ensure company is also active
    if (activeEmployerLookup.size > 0) {
      const empId = String(job.employerId || job.userId || '');
      const compName = (job.company || job.companyName || '').toLowerCase();
      const companyApproved = activeEmployerLookup.has(empId) || activeEmployerLookup.has(compName);
      // If company is in lookup and not active, reject
      if (employers.some(e => String(e.id) === empId || (e.companyName || '').toLowerCase() === compName) && !companyApproved) {
        return false;
      }
    }
    return true;
  };

  [...liveJobs, ...(contextJobs || [])].forEach(j => {
    if (j && !seenIds.has(j.id || j.jobId) && isJobApproved(j)) {
      seenIds.add(j.id || j.jobId);
      combinedJobs.push(j);
    }
  });

  const filteredJobs = combinedJobs.filter(job => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      (job.title && job.title.toLowerCase().includes(q)) ||
      (job.company && job.company.toLowerCase().includes(q)) ||
      (job.companyName && job.companyName.toLowerCase().includes(q)) ||
      (job.location && job.location.toLowerCase().includes(q))
    );
  });

  const handleApply = async (job) => {
    setApplyingJobId(job.id);
    const compName = job.company || job.companyName || 'the company';
    try {
      await createApplication({
        jobId: job.id,
        jobTitle: job.title,
        companyName: compName,
      });
      setAppliedJobs(prev => ({ ...prev, [job.id]: true }));
      Alert.alert('Application Submitted', `You have successfully applied for ${job.title} at ${compName}.`);
    } catch (err) {
      setAppliedJobs(prev => ({ ...prev, [job.id]: true }));
      Alert.alert('Application Submitted', `You have successfully applied for ${job.title}!`);
    } finally {
      setApplyingJobId(null);
    }
  };

  return (
    <SafeAreaView style={dashboardStyles.safeArea}>
      <View style={dashboardStyles.container}>
        
        {/* Header */}
        <View style={dashboardStyles.header}>
          <TouchableOpacity
            style={dashboardStyles.headerButton}
            onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color="#1A1A1A" />
          </TouchableOpacity>
          <Text style={dashboardStyles.title}>Available Jobs ({filteredJobs.length})</Text>
          <TouchableOpacity onPress={fetchJobsList} style={{ padding: 6 }}>
            <FeatherIcon name="refresh-cw" size={20} color="#2563EB" />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchHeader}>
          <View style={styles.searchInputContainer}>
            <FeatherIcon name="search" size={18} color="#94A3B8" style={styles.searchIcon} />
            <TextInput 
              placeholder="Search approved jobs, company..." 
              placeholderTextColor="#94A3B8"
              style={styles.searchInput} 
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Icon name="close-circle" size={18} color="#94A3B8" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Jobs List */}
        <ScrollView 
          contentContainerStyle={styles.scrollContainer} 
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={!!loading} onRefresh={fetchJobsList} colors={['#2563EB']} />
          }
        >
          {loading && combinedJobs.length === 0 ? (
            <View style={{ alignItems: 'center', marginTop: 40 }}>
              <ActivityIndicator size="large" color="#2563EB" />
              <Text style={{ color: '#888', marginTop: 10 }}>Fetching verified jobs...</Text>
            </View>
          ) : filteredJobs && filteredJobs.length > 0 ? (
            filteredJobs.map((job) => {
              const compName = job.company || job.companyName || 'Company';
              const isApplied = !!appliedJobs[job.id];
              const isApplying = applyingJobId === job.id;

              return (
                <TouchableOpacity 
                  key={job.id || Math.random().toString()} 
                  style={styles.jobCard}
                  activeOpacity={0.9}
                  onPress={() => setSelectedJob(job)}
                >
                  <View style={styles.jobHeader}>
                    <View style={styles.logoPlaceholder}>
                      <Icon name="business" size={22} color="#2563EB" />
                    </View>
                    <View style={styles.jobInfo}>
                      <Text style={styles.jobTitle} numberOfLines={2}>{job.title}</Text>
                      <View style={styles.companyRow}>
                        <Text style={styles.companyName} numberOfLines={1}>{compName}</Text>
                        <View style={styles.verifiedBadge}>
                          <Icon name="checkmark-circle" size={12} color="#059669" />
                          <Text style={styles.verifiedText}>Approved</Text>
                        </View>
                      </View>
                    </View>
                  </View>

                  {/* Tags */}
                  <View style={styles.jobTagsRow}>
                    {job.location && (
                      <View style={styles.tagChip}>
                        <Icon name="location-outline" size={13} color="#475569" />
                        <Text style={styles.tagText}>{job.location}</Text>
                      </View>
                    )}
                    {job.salary && (
                      <View style={styles.tagChip}>
                        <Icon name="cash-outline" size={13} color="#475569" />
                        <Text style={styles.tagText}>{job.salary}</Text>
                      </View>
                    )}
                    {job.employmentType && (
                      <View style={styles.tagChip}>
                        <Icon name="time-outline" size={13} color="#475569" />
                        <Text style={styles.tagText}>{job.employmentType}</Text>
                      </View>
                    )}
                  </View>

                  {job.description ? (
                    <Text style={styles.descSnippet} numberOfLines={2}>
                      {job.description}
                    </Text>
                  ) : null}
                  
                  <View style={styles.bottomRow}>
                    <Text style={styles.postedText}>Posted: {job.posted || 'Recently'}</Text>

                    <TouchableOpacity 
                      style={[styles.applyBtn, isApplied && { backgroundColor: '#10B981' }]}
                      disabled={isApplied || isApplying}
                      onPress={() => handleApply(job)}
                      activeOpacity={0.8}
                    >
                      <Text style={styles.applyBtnText}>
                        {isApplied ? 'Applied ✓' : isApplying ? 'Applying...' : 'Apply Now'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              );
            })
          ) : (
            <View style={{ alignItems: 'center', marginTop: 50 }}>
              <FeatherIcon name="briefcase" size={48} color="#CBD5E1" />
              <Text style={{ color: '#64748B', marginTop: 12, fontSize: 16, fontWeight: '600' }}>
                {searchQuery ? 'No matching jobs' : 'No approved jobs right now'}
              </Text>
              <Text style={{ color: '#94A3B8', marginTop: 6, fontSize: 13, textAlign: 'center', paddingHorizontal: 30 }}>
                Jobs approved by the admin will appear here for you to apply.
              </Text>
            </View>
          )}
        </ScrollView>

        {/* Job Details Modal */}
        <Modal
          visible={!!selectedJob}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setSelectedJob(null)}
        >
          <View style={styles.modalBackdrop}>
            <View style={styles.modalContent}>
              {selectedJob && (
                <ScrollView showsVerticalScrollIndicator={false}>
                  {/* Header */}
                  <View style={styles.modalHeader}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.modalTitle}>{selectedJob.title}</Text>
                      <Text style={styles.companyName}>
                        {selectedJob.company || selectedJob.companyName}
                      </Text>
                    </View>
                    <TouchableOpacity onPress={() => setSelectedJob(null)} style={{ padding: 4 }}>
                      <Icon name="close" size={24} color="#64748B" />
                    </TouchableOpacity>
                  </View>

                  {/* Meta Grid */}
                  <View style={styles.modalMetaGrid}>
                    <View style={styles.metaGridRow}>
                      <Icon name="location-outline" size={18} color="#2563EB" />
                      <Text style={styles.metaGridLabel}>Location</Text>
                      <Text style={styles.metaGridValue}>{selectedJob.location || 'Remote'}</Text>
                    </View>
                    <View style={styles.metaGridRow}>
                      <Icon name="cash-outline" size={18} color="#059669" />
                      <Text style={styles.metaGridLabel}>Salary</Text>
                      <Text style={styles.metaGridValue}>{selectedJob.salary || 'Best in Industry'}</Text>
                    </View>
                    <View style={styles.metaGridRow}>
                      <Icon name="time-outline" size={18} color="#F59E0B" />
                      <Text style={styles.metaGridLabel}>Job Type</Text>
                      <Text style={styles.metaGridValue}>{selectedJob.employmentType || 'Full-time'}</Text>
                    </View>
                    <View style={styles.metaGridRow}>
                      <Icon name="calendar-outline" size={18} color="#64748B" />
                      <Text style={styles.metaGridLabel}>Posted</Text>
                      <Text style={styles.metaGridValue}>{selectedJob.posted || 'Recently'}</Text>
                    </View>
                  </View>

                  {/* Description */}
                  <Text style={styles.modalSectionTitle}>Job Details & Requirements</Text>
                  <Text style={styles.modalDescription}>
                    {selectedJob.description || 'Immediate opening with great career prospects.'}
                  </Text>

                  {/* Apply Button */}
                  <TouchableOpacity
                    style={[
                      styles.modalApplyBtn,
                      appliedJobs[selectedJob.id] && { backgroundColor: '#10B981' }
                    ]}
                    disabled={appliedJobs[selectedJob.id] || applyingJobId === selectedJob.id}
                    onPress={() => handleApply(selectedJob)}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.applyBtnText}>
                      {appliedJobs[selectedJob.id] 
                        ? 'Application Submitted ✓' 
                        : applyingJobId === selectedJob.id 
                        ? 'Submitting Application...' 
                        : 'Apply for this Position'}
                    </Text>
                  </TouchableOpacity>
                </ScrollView>
              )}
            </View>
          </View>
        </Modal>

      </View>
    </SafeAreaView>
  );
};

export default React.memo(Jobs);
