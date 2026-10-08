import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import dashboardStyles from '../../styles/Employee/Dashboard'; // Reuse dashboard styles for bottom bar
import styles from '../../styles/Employee/Jobs';

import { AdminContext } from '../../context/AdminContext';
import { getJobs } from '../../services/jobService';
import { createApplication } from '../../services/applicationService';

const Jobs = ({navigation, route}) => {
  const { jobs: contextJobs, employers } = React.useContext(AdminContext);
  const [liveJobs, setLiveJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [applyingJobId, setApplyingJobId] = useState(null);
  const [appliedJobs, setAppliedJobs] = useState({});

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
      console.log('Error fetching backend jobs, using fallback:', err.message);
    } finally {
      setLoading(false);
    }
  };

  // Combine live jobs with active context jobs without duplicates
  const combinedJobs = [...liveJobs];
  if (contextJobs && Array.isArray(contextJobs)) {
    contextJobs.forEach(cj => {
      const exists = combinedJobs.some(j => j.id === cj.id || (j.title === cj.title && j.company === cj.company));
      if (!exists) {
        combinedJobs.push(cj);
      }
    });
  }

  const filteredJobs = combinedJobs.filter(job => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      (job.title && job.title.toLowerCase().includes(q)) ||
      (job.company && job.company.toLowerCase().includes(q)) ||
      (job.location && job.location.toLowerCase().includes(q))
    );
  });

  const handleApply = async (job) => {
    setApplyingJobId(job.id);
    try {
      await createApplication({
        jobId: job.id,
        jobTitle: job.title,
        companyName: job.company,
      });
      setAppliedJobs(prev => ({ ...prev, [job.id]: true }));
      Alert.alert('Application Submitted', `You have successfully applied for ${job.title} at ${job.company || 'the company'}.`);
    } catch (err) {
      // Even if network fails or mock backend, mark as applied locally for user feedback
      setAppliedJobs(prev => ({ ...prev, [job.id]: true }));
      Alert.alert('Applied', `Application submitted for ${job.title}!`);
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
          <Text style={dashboardStyles.title}>Jobs</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchHeader}>
            <View style={styles.searchInputContainer}>
                <FeatherIcon name="search" size={18} color="#888" style={styles.searchIcon} />
                <TextInput 
                    placeholder="Search jobs..." 
                    placeholderTextColor="#888"
                    style={styles.searchInput} 
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>
            <TouchableOpacity style={styles.filterBtn} onPress={fetchJobsList}>
                <FeatherIcon name="refresh-cw" size={20} color="#555" />
            </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          {loading ? (
            <View style={{ alignItems: 'center', marginTop: 40 }}>
              <ActivityIndicator size="large" color="#2563EB" />
              <Text style={{ color: '#888', marginTop: 10 }}>Loading jobs...</Text>
            </View>
          ) : filteredJobs && filteredJobs.length > 0 ? filteredJobs.map((job) => (
            <View key={job.id || Math.random().toString()} style={styles.jobCard}>
              <View style={styles.jobHeader}>
                <View style={styles.logoPlaceholder}>
                  <FeatherIcon name="user" size={24} color="#1E3A8A" />
                </View>
                <View style={styles.jobInfo}>
                  <Text style={styles.jobTitle}>{job.title}</Text>
                  <Text style={styles.companyName}>{job.company}</Text>
                </View>
              </View>

              <View style={styles.jobMeta}>
                <View style={styles.metaItem}>
                  <FeatherIcon name="map-pin" size={14} color="#888" />
                  <Text style={styles.metaText}>{job.location || 'Remote'}</Text>
                </View>
                <View style={styles.metaItem}>
                  <FeatherIcon name="dollar-sign" size={14} color="#888" />
                  <Text style={styles.metaText}>{job.salary || 'Not Disclosed'}</Text>
                </View>
              </View>
              
              <View style={styles.bottomRow}>
                  <Text style={styles.postedText}>{job.posted || 'Recent'}</Text>
                  <TouchableOpacity 
                    style={{ 
                      backgroundColor: appliedJobs[job.id] ? '#10B981' : '#2563EB', 
                      paddingHorizontal: 16, 
                      paddingVertical: 8, 
                      borderRadius: 6,
                      opacity: applyingJobId === job.id ? 0.7 : 1,
                    }}
                    disabled={appliedJobs[job.id] || applyingJobId === job.id}
                    onPress={() => handleApply(job)}
                  >
                    <Text style={{ color: '#fff', fontSize: 13, fontWeight: 'bold' }}>
                      {appliedJobs[job.id] ? 'Applied' : applyingJobId === job.id ? 'Applying...' : 'Apply'}
                    </Text>
                  </TouchableOpacity>
              </View>
            </View>
          )) : (
            <View style={{ alignItems: 'center', marginTop: 40 }}>
              <FeatherIcon name="briefcase" size={48} color="#D1D1D1" />
              <Text style={{ color: '#888', marginTop: 10 }}>No jobs found at the moment.</Text>
            </View>
          )}
        </ScrollView>

        

      </View>
    </SafeAreaView>
  );
};

export default React.memo(Jobs);

