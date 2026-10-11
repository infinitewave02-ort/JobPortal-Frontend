import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView, 
  StatusBar, 
  ScrollView, 
  RefreshControl, 
  Alert, 
  Modal 
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import styles from '../../styles/Admin/ManageJobs';
import { AdminContext } from '../../context/AdminContext';

const ManageJobs = ({ navigation }) => {
  const { jobs, deleteJob, approveJob, updateJobStatus, loading, fetchDashboardData } = React.useContext(AdminContext);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('ALL'); // 'ALL' | 'PENDING' | 'ACTIVE' | 'REJECTED'
  const [selectedJob, setSelectedJob] = useState(null);
  const [actionLoadingId, setActionLoadingId] = useState(null);

  const allCount = (jobs || []).length;
  const pendingCount = (jobs || []).filter(j => (j.status || '').toLowerCase() === 'pending').length;
  const activeCount = (jobs || []).filter(j => {
    const s = (j.status || '').toLowerCase();
    return s === 'active' || s === 'approved';
  }).length;
  const rejectedCount = (jobs || []).filter(j => (j.status || '').toLowerCase() === 'rejected').length;

  const tabs = [
    { key: 'ALL', label: 'All', count: allCount },
    { key: 'ACTIVE', label: 'Approved', count: activeCount },
    { key: 'PENDING', label: 'Pending', count: pendingCount },
    { key: 'REJECTED', label: 'Rejected', count: rejectedCount }
  ];

  const filteredJobs = (jobs || []).filter((job) => {
    const status = (job.status || 'Active').toLowerCase();
    
    // Tab filtering
    if (activeTab === 'PENDING' && status !== 'pending') return false;
    if (activeTab === 'ACTIVE' && status !== 'active' && status !== 'approved') return false;
    if (activeTab === 'REJECTED' && status !== 'rejected') return false;

    // Search query
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    const title = (job.title || '').toLowerCase();
    const company = (job.company || job.companyName || '').toLowerCase();
    const loc = (job.location || '').toLowerCase();
    return title.includes(q) || company.includes(q) || loc.includes(q);
  });

  const getStatusConfig = (status) => {
    const s = (status || '').toLowerCase();
    if (s === 'active' || s === 'approved') return { bg: '#ECFDF5', text: '#059669', border: '#A7F3D0', dot: '#10B981', label: 'Active' };
    if (s === 'pending') return { bg: '#FFFBEB', text: '#D97706', border: '#FDE68A', dot: '#F59E0B', label: 'Pending' };
    if (s === 'rejected') return { bg: '#FEF2F2', text: '#DC2626', border: '#FECACA', dot: '#EF4444', label: 'Rejected' };
    return { bg: '#F1F5F9', text: '#475569', border: '#E2E8F0', dot: '#64748B', label: 'Active' };
  };

  const handleApprove = async (job) => {
    setActionLoadingId(job.id);
    try {
      await approveJob(job.id);
      Alert.alert('Job Post Approved', `"${job.title}" at ${job.company || job.companyName} is now APPROVED and live for employees!`);
      if (selectedJob && selectedJob.id === job.id) {
        setSelectedJob({ ...selectedJob, status: 'Active' });
      }
    } catch (e) {
      Alert.alert('Error', e.message || 'Failed to approve job post');
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleReject = async (job) => {
    setActionLoadingId(job.id);
    try {
      await updateJobStatus(job.id, 'Rejected');
      Alert.alert('Job Post Rejected', `"${job.title}" status has been set to Rejected.`);
      if (selectedJob && selectedJob.id === job.id) {
        setSelectedJob({ ...selectedJob, status: 'Rejected' });
      }
    } catch (e) {
      Alert.alert('Error', e.message || 'Failed to reject job post');
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleDelete = (id, title) => {
    Alert.alert(
      'Delete Job Post',
      `Are you sure you want to delete "${title || 'this job post'}" permanently from the database?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive', 
          onPress: async () => {
            await deleteJob(id);
            if (selectedJob && selectedJob.id === id) {
              setSelectedJob(null);
            }
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()} 
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={20} color="#0F172A" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Job Posts</Text>
          <View style={styles.headerBadge}>
            <Text style={styles.headerBadgeText}>{filteredJobs.length}</Text>
          </View>
        </View>
        <TouchableOpacity 
          style={styles.reloadButton}
          onPress={fetchDashboardData} 
          activeOpacity={0.7}
        >
          <Ionicons name="reload-outline" size={18} color="#4F46E5" />
        </TouchableOpacity>
      </View>

      {/* Search Input */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Feather name="search" size={18} color="#94A3B8" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search job title, company, location..."
            placeholderTextColor="#94A3B8"
            value={search}
            onChangeText={setSearch}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')} activeOpacity={0.7}>
              <Ionicons name="close-circle" size={18} color="#94A3B8" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Filter Tabs */}
      <View style={styles.tabContainer}>
        {tabs.map(tab => {
          const isActive = activeTab === tab.key;
          return (
            <TouchableOpacity
              key={tab.key}
              style={[styles.tabButton, isActive && styles.tabButtonActive]}
              onPress={() => setActiveTab(tab.key)}
              activeOpacity={0.7}
            >
              <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
                {tab.label}
              </Text>
              <View style={[styles.tabCountBadge, isActive && styles.tabCountBadgeActive]}>
                <Text style={[styles.tabCountText, isActive && styles.tabCountTextActive]}>
                  {tab.count}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Jobs List */}
      <ScrollView 
        contentContainerStyle={styles.listContainer} 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={!!loading} onRefresh={fetchDashboardData} colors={['#4F46E5']} />
        }
      >
        {filteredJobs.length === 0 ? (
          <View style={styles.emptyStateContainer}>
            <View style={styles.emptyIconCircle}>
              <Ionicons name="briefcase-outline" size={38} color="#94A3B8" />
            </View>
            <Text style={styles.emptyTitle}>
              {search ? 'No matching job posts' : 'No job posts found'}
            </Text>
            <Text style={styles.emptySubtitle}>
              {activeTab !== 'ALL' ? `There are no ${activeTab.toLowerCase()} job posts currently.` : 'Jobs created by employers will show up here for approval.'}
            </Text>
          </View>
        ) : (
          filteredJobs.map((job) => {
            const st = getStatusConfig(job.status);
            const isApproved = (job.status || '').toLowerCase() === 'active' || (job.status || '').toLowerCase() === 'approved';
            const companyName = job.company || job.companyName || 'Company';

            return (
              <TouchableOpacity 
                key={job.id} 
                style={styles.jobCard}
                activeOpacity={0.9}
                onPress={() => setSelectedJob(job)}
              >
                {/* Top Section */}
                <View style={styles.cardTop}>
                  <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                    <View style={styles.companyAvatar}>
                      <Text style={styles.companyAvatarText}>
                        {companyName.charAt(0).toUpperCase()}
                      </Text>
                    </View>
                    <View style={styles.titleArea}>
                      <Text style={styles.jobTitle} numberOfLines={2}>{job.title}</Text>
                      <Text style={styles.companyName} numberOfLines={1}>{companyName}</Text>
                    </View>
                  </View>
                  <View style={[styles.statusBadge, { backgroundColor: st.bg, borderColor: st.border }]}>
                    <View style={[styles.statusDot, { backgroundColor: st.dot }]} />
                    <Text style={[styles.statusBadgeText, { color: st.text }]}>
                      {st.label}
                    </Text>
                  </View>
                </View>

                {/* Tags Section */}
                <View style={styles.tagsRow}>
                  {job.location ? (
                    <View style={styles.tagChip}>
                      <Ionicons name="location-outline" size={13} color="#475569" />
                      <Text style={styles.tagText}>{job.location}</Text>
                    </View>
                  ) : null}
                  {job.salary ? (
                    <View style={styles.tagChip}>
                      <Ionicons name="cash-outline" size={13} color="#475569" />
                      <Text style={styles.tagText}>{job.salary}</Text>
                    </View>
                  ) : null}
                  {job.employmentType ? (
                    <View style={styles.tagChip}>
                      <Ionicons name="time-outline" size={13} color="#475569" />
                      <Text style={styles.tagText}>{job.employmentType}</Text>
                    </View>
                  ) : null}
                </View>

                {/* Description Snippet */}
                {job.description ? (
                  <Text style={styles.descSnippet} numberOfLines={2}>
                    {job.description}
                  </Text>
                ) : null}

                {/* Card Actions */}
                <View style={styles.cardActionsRow}>
                  <TouchableOpacity 
                    style={styles.actionBtnLeft}
                    onPress={() => setSelectedJob(job)}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="eye-outline" size={16} color="#334155" />
                    <Text style={styles.actionBtnLeftText}>Details</Text>
                  </TouchableOpacity>

                  <View style={styles.actionBtnsRight}>
                    {!isApproved && (
                      <TouchableOpacity 
                        style={styles.approveBtn}
                        onPress={() => handleApprove(job)}
                        disabled={actionLoadingId === job.id}
                        activeOpacity={0.8}
                      >
                        <Ionicons name="checkmark-circle" size={15} color="#FFFFFF" />
                        <Text style={styles.approveBtnText}>
                          {actionLoadingId === job.id ? 'Approving...' : 'Approve'}
                        </Text>
                      </TouchableOpacity>
                    )}

                    {isApproved && (
                      <TouchableOpacity 
                        style={styles.rejectBtn}
                        onPress={() => handleReject(job)}
                        disabled={actionLoadingId === job.id}
                        activeOpacity={0.8}
                      >
                        <Ionicons name="close-circle" size={15} color="#FFFFFF" />
                        <Text style={styles.rejectBtnText}>Reject</Text>
                      </TouchableOpacity>
                    )}

                    <TouchableOpacity 
                      style={styles.deleteBtn}
                      onPress={() => handleDelete(job.id, job.title)}
                      activeOpacity={0.8}
                    >
                      <Ionicons name="trash-outline" size={16} color="#EF4444" />
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })
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
            <View style={styles.modalDragHandle} />
            {selectedJob && (
              <ScrollView showsVerticalScrollIndicator={false}>
                {/* Modal Header */}
                <View style={styles.modalHeader}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.modalTitle}>{selectedJob.title}</Text>
                    <Text style={styles.modalCompanySubtitle}>{selectedJob.company || selectedJob.companyName}</Text>
                  </View>
                  <TouchableOpacity 
                    style={styles.modalCloseBtn}
                    onPress={() => setSelectedJob(null)}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="close" size={20} color="#64748B" />
                  </TouchableOpacity>
                </View>

                {/* Status Badge */}
                <View style={{ marginBottom: 14 }}>
                  {(() => {
                    const st = getStatusConfig(selectedJob.status);
                    return (
                      <View style={[styles.statusBadge, { 
                        backgroundColor: st.bg, 
                        borderColor: st.border,
                      }]}>
                        <View style={[styles.statusDot, { backgroundColor: st.dot }]} />
                        <Text style={[styles.statusBadgeText, { color: st.text }]}>
                          Status: {st.label}
                        </Text>
                      </View>
                    );
                  })()}
                </View>

                {/* Meta Grid */}
                <View style={styles.modalMetaGrid}>
                  <View style={styles.metaGridRow}>
                    <Ionicons name="location-outline" size={18} color="#4F46E5" />
                    <Text style={styles.metaGridLabel}>Location</Text>
                    <Text style={styles.metaGridValue}>{selectedJob.location || 'Remote'}</Text>
                  </View>
                  <View style={styles.metaGridRow}>
                    <Ionicons name="cash-outline" size={18} color="#10B981" />
                    <Text style={styles.metaGridLabel}>Salary</Text>
                    <Text style={styles.metaGridValue}>{selectedJob.salary || 'Not Disclosed'}</Text>
                  </View>
                  <View style={styles.metaGridRow}>
                    <Ionicons name="briefcase-outline" size={18} color="#F59E0B" />
                    <Text style={styles.metaGridLabel}>Job Type</Text>
                    <Text style={styles.metaGridValue}>{selectedJob.employmentType || 'Full-time'}</Text>
                  </View>
                  <View style={styles.metaGridRow}>
                    <Ionicons name="calendar-outline" size={18} color="#64748B" />
                    <Text style={styles.metaGridLabel}>Posted</Text>
                    <Text style={styles.metaGridValue}>{selectedJob.posted || 'Recently'}</Text>
                  </View>
                  {selectedJob.employerEmail ? (
                    <View style={[styles.metaGridRow, styles.metaGridRowLast]}>
                      <Ionicons name="mail-outline" size={18} color="#64748B" />
                      <Text style={styles.metaGridLabel}>Contact</Text>
                      <Text style={styles.metaGridValue}>{selectedJob.employerEmail}</Text>
                    </View>
                  ) : null}
                </View>

                {/* Description */}
                <Text style={styles.modalSectionTitle}>Job Description</Text>
                <Text style={styles.modalDescription}>
                  {selectedJob.description || 'No detailed description provided for this job post.'}
                </Text>

                {/* Skills */}
                {selectedJob.skills && (Array.isArray(selectedJob.skills) ? selectedJob.skills.length > 0 : selectedJob.skills) && (
                  <>
                    <Text style={styles.modalSectionTitle}>Required Skills</Text>
                    <View style={styles.modalSkillRow}>
                      {(Array.isArray(selectedJob.skills) ? selectedJob.skills : [selectedJob.skills]).map((skill, idx) => (
                        <View key={idx} style={styles.skillBadge}>
                          <Text style={styles.skillBadgeText}>{skill}</Text>
                        </View>
                      ))}
                    </View>
                  </>
                )}

                {/* Modal Action Buttons */}
                <View style={styles.modalActions}>
                  {(selectedJob.status || '').toLowerCase() !== 'active' && (
                    <TouchableOpacity 
                      style={styles.modalApproveBtn}
                      onPress={() => handleApprove(selectedJob)}
                      activeOpacity={0.8}
                    >
                      <Ionicons name="checkmark-circle" size={18} color="#FFFFFF" />
                      <Text style={styles.btnText}>Approve Job Post</Text>
                    </TouchableOpacity>
                  )}

                  {(selectedJob.status || '').toLowerCase() === 'active' && (
                    <TouchableOpacity 
                      style={styles.modalRejectBtn}
                      onPress={() => handleReject(selectedJob)}
                      activeOpacity={0.8}
                    >
                      <Ionicons name="close-circle" size={18} color="#FFFFFF" />
                      <Text style={styles.btnText}>Reject Job Post</Text>
                    </TouchableOpacity>
                  )}

                  <TouchableOpacity 
                    style={styles.deleteBtn}
                    onPress={() => handleDelete(selectedJob.id, selectedJob.title)}
                    activeOpacity={0.8}
                  >
                    <Ionicons name="trash-outline" size={18} color="#EF4444" />
                  </TouchableOpacity>
                </View>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
};

export default React.memo(ManageJobs);
