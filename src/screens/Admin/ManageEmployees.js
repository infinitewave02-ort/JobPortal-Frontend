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
import styles from '../../styles/Admin/ManageEmployees';
import { AdminContext } from '../../context/AdminContext';

const ManageEmployees = ({ navigation }) => {
  const { employees, deleteEmployee, loading, fetchDashboardData } = React.useContext(AdminContext);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('ALL'); // 'ALL' | 'RESUME' | 'OPENTOWORK'
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const allCount = (employees || []).length;
  const resumeCount = (employees || []).filter(e => !!(e.resumeFile || e.resumeUrl)).length;
  const openCount = (employees || []).filter(e => e.openToWork !== false).length;

  const tabs = [
    { key: 'ALL', label: 'All Candidates', count: allCount },
    { key: 'RESUME', label: 'With Resume', count: resumeCount },
    { key: 'OPENTOWORK', label: 'Open to Work', count: openCount },
  ];

  const filteredEmployees = (employees || []).filter((emp) => {
    const hasResume = !!(emp.resumeFile || emp.resumeUrl);
    const isOpen = emp.openToWork !== false;

    // Tab filter
    if (activeTab === 'RESUME' && !hasResume) return false;
    if (activeTab === 'OPENTOWORK' && !isOpen) return false;

    // Search query
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    const name = (emp.fullName || emp.name || '').toLowerCase();
    const email = (emp.email || '').toLowerCase();
    const role = (emp.jobTitle || emp.role || '').toLowerCase();
    const phone = (emp.phone || '').toLowerCase();
    return name.includes(q) || email.includes(q) || role.includes(q) || phone.includes(q);
  });

  const handleDelete = (id, name) => {
    Alert.alert(
      'Delete Employee',
      `Are you sure you want to delete "${name || 'this candidate'}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive', 
          onPress: async () => {
            await deleteEmployee(id);
            if (selectedCandidate && selectedCandidate.id === id) {
              setSelectedCandidate(null);
            }
          }
        }
      ]
    );
  };

  const openResumeScreen = (emp) => {
    const displayName = emp.fullName || emp.name || 'Candidate';
    const displayRole = emp.jobTitle || emp.role || 'Job Seeker';
    navigation.navigate('ResumePreview', { 
      candidateName: displayName, 
      candidateRole: displayRole, 
      candidate: emp 
    });
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
          <Text style={styles.headerTitle}>Employees</Text>
          <View style={styles.headerBadge}>
            <Text style={styles.headerBadgeText}>{filteredEmployees.length}</Text>
          </View>
        </View>
        <TouchableOpacity 
          style={styles.reloadButton}
          onPress={fetchDashboardData} 
          activeOpacity={0.7}
        >
          <Ionicons name="reload-outline" size={18} color="#7F56D9" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Feather name="search" size={18} color="#94A3B8" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search name, email, phone, role..."
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

      {/* Employees List */}
      <ScrollView 
        contentContainerStyle={styles.listContainer} 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={!!loading} onRefresh={fetchDashboardData} colors={['#7F56D9']} />
        }
      >
        {filteredEmployees.length === 0 ? (
          <View style={styles.emptyStateContainer}>
            <View style={styles.emptyIconCircle}>
              <Ionicons name="people-outline" size={38} color="#94A3B8" />
            </View>
            <Text style={styles.emptyTitle}>
              {search ? 'No matching employees found' : 'No employees registered yet'}
            </Text>
            <Text style={styles.emptySubtitle}>
              Registered candidates will appear here.
            </Text>
          </View>
        ) : (
          filteredEmployees.map((emp) => {
            const displayName = emp.fullName || emp.name || 'Candidate';
            const displayRole = emp.jobTitle || emp.role || 'Job Seeker';
            const hasResume = !!(emp.resumeFile || emp.resumeUrl);

            return (
              <TouchableOpacity 
                key={emp.id} 
                style={styles.card}
                activeOpacity={0.9}
                onPress={() => setSelectedCandidate(emp)}
              >
                {/* Top Section */}
                <View style={styles.cardTop}>
                  <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                    <View style={styles.avatar}>
                      <Text style={styles.avatarText}>
                        {displayName.charAt(0).toUpperCase()}
                      </Text>
                    </View>
                    <View style={styles.titleArea}>
                      <Text style={styles.name} numberOfLines={1}>{displayName}</Text>
                      <Text style={styles.role} numberOfLines={1}>{displayRole}</Text>
                      <Text style={styles.email} numberOfLines={1}>{emp.email}</Text>
                    </View>
                  </View>
                  <View style={[styles.statusBadge, { backgroundColor: '#ECFDF5', borderColor: '#A7F3D0' }]}>
                    <View style={[styles.statusDot, { backgroundColor: '#10B981' }]} />
                    <Text style={[styles.statusBadgeText, { color: '#059669' }]}>
                      {emp.status || 'Active'}
                    </Text>
                  </View>
                </View>

                {/* Tags Section */}
                <View style={styles.tagsRow}>
                  {emp.phone ? (
                    <View style={styles.tagChip}>
                      <Ionicons name="call-outline" size={13} color="#475569" />
                      <Text style={styles.tagText}>{emp.phone}</Text>
                    </View>
                  ) : null}
                  {emp.location ? (
                    <View style={styles.tagChip}>
                      <Ionicons name="location-outline" size={13} color="#475569" />
                      <Text style={styles.tagText}>{emp.location}</Text>
                    </View>
                  ) : null}
                  {emp.openToWork !== false ? (
                    <View style={[styles.tagChip, { backgroundColor: '#F0FDF4', borderColor: '#BBF7D0' }]}>
                      <Ionicons name="checkmark-done" size={13} color="#16A34A" />
                      <Text style={[styles.tagText, { color: '#16A34A', fontWeight: '600' }]}>Open to Work</Text>
                    </View>
                  ) : null}
                </View>

                {/* Card Actions */}
                <View style={styles.cardActionsRow}>
                  <TouchableOpacity 
                    style={styles.actionBtnLeft}
                    onPress={() => setSelectedCandidate(emp)}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="eye-outline" size={16} color="#334155" />
                    <Text style={styles.actionBtnLeftText}>Details</Text>
                  </TouchableOpacity>

                  <View style={styles.actionBtnsRight}>
                    {hasResume && (
                      <TouchableOpacity 
                        style={styles.resumeBtn}
                        onPress={() => openResumeScreen(emp)}
                        activeOpacity={0.8}
                      >
                        <Ionicons name="document-text" size={15} color="#4338CA" />
                        <Text style={styles.resumeBtnText}>View Resume</Text>
                      </TouchableOpacity>
                    )}

                    <TouchableOpacity 
                      style={styles.deleteBtn}
                      onPress={() => handleDelete(emp.id, displayName)}
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

      {/* Candidate Details Modal */}
      <Modal
        visible={!!selectedCandidate}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setSelectedCandidate(null)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContent}>
            <View style={styles.modalDragHandle} />
            {selectedCandidate && (
              <ScrollView showsVerticalScrollIndicator={false}>
                {/* Modal Header */}
                <View style={styles.modalHeader}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.modalTitle}>
                      {selectedCandidate.fullName || selectedCandidate.name}
                    </Text>
                    <Text style={styles.modalRoleSubtitle}>
                      {selectedCandidate.jobTitle || selectedCandidate.role || 'Job Seeker'}
                    </Text>
                  </View>
                  <TouchableOpacity 
                    style={styles.modalCloseBtn}
                    onPress={() => setSelectedCandidate(null)}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="close" size={20} color="#64748B" />
                  </TouchableOpacity>
                </View>

                {/* Status Badge */}
                <View style={{ marginBottom: 14 }}>
                  <View style={[styles.statusBadge, { backgroundColor: '#ECFDF5', borderColor: '#A7F3D0' }]}>
                    <View style={[styles.statusDot, { backgroundColor: '#10B981' }]} />
                    <Text style={[styles.statusBadgeText, { color: '#059669' }]}>
                      Candidate Status: {selectedCandidate.status || 'Active'}
                    </Text>
                  </View>
                </View>

                {/* Meta Grid */}
                <View style={styles.modalMetaGrid}>
                  <View style={styles.metaGridRow}>
                    <Ionicons name="mail-outline" size={18} color="#7F56D9" />
                    <Text style={styles.metaGridLabel}>Email</Text>
                    <Text style={styles.metaGridValue}>{selectedCandidate.email || 'N/A'}</Text>
                  </View>
                  <View style={styles.metaGridRow}>
                    <Ionicons name="call-outline" size={18} color="#10B981" />
                    <Text style={styles.metaGridLabel}>Phone</Text>
                    <Text style={styles.metaGridValue}>{selectedCandidate.phone || 'N/A'}</Text>
                  </View>
                  <View style={styles.metaGridRow}>
                    <Ionicons name="location-outline" size={18} color="#F59E0B" />
                    <Text style={styles.metaGridLabel}>Location</Text>
                    <Text style={styles.metaGridValue}>{selectedCandidate.location || 'N/A'}</Text>
                  </View>
                  <View style={styles.metaGridRow}>
                    <Ionicons name="briefcase-outline" size={18} color="#64748B" />
                    <Text style={styles.metaGridLabel}>Job Status</Text>
                    <Text style={styles.metaGridValue}>{selectedCandidate.openToWork !== false ? 'Open to Work' : 'Employed'}</Text>
                  </View>
                  <View style={[styles.metaGridRow, styles.metaGridRowLast]}>
                    <Ionicons name="document-text-outline" size={18} color="#64748B" />
                    <Text style={styles.metaGridLabel}>Resume</Text>
                    <Text style={styles.metaGridValue}>{selectedCandidate.resumeFile ? 'Uploaded' : 'Not Uploaded'}</Text>
                  </View>
                </View>

                {/* Action Buttons */}
                {selectedCandidate.resumeFile && (
                  <TouchableOpacity 
                    style={styles.modalResumeBtn}
                    onPress={() => {
                      setSelectedCandidate(null);
                      openResumeScreen(selectedCandidate);
                    }}
                    activeOpacity={0.8}
                  >
                    <Ionicons name="document-text" size={18} color="#FFFFFF" />
                    <Text style={styles.btnText}>View Full Resume PDF</Text>
                  </TouchableOpacity>
                )}
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
};

export default React.memo(ManageEmployees);
