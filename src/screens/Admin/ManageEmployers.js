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
import styles from '../../styles/Admin/ManageEmployers';
import { AdminContext } from '../../context/AdminContext';

const ManageEmployers = ({ navigation }) => {
  const { employers, deleteEmployer, approveEmployer, loading, fetchDashboardData } = React.useContext(AdminContext);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('ALL'); // 'ALL' | 'PENDING' | 'ACTIVE'
  const [selectedEmployer, setSelectedEmployer] = useState(null);
  const [actionLoadingId, setActionLoadingId] = useState(null);

  const allCount = (employers || []).length;
  const pendingCount = (employers || []).filter(e => (e.status || '').toLowerCase() !== 'active').length;
  const activeCount = (employers || []).filter(e => (e.status || '').toLowerCase() === 'active').length;

  const tabs = [
    { key: 'ALL', label: 'All', count: allCount },
    { key: 'PENDING', label: 'Pending Approval', count: pendingCount },
    { key: 'ACTIVE', label: 'Approved', count: activeCount }
  ];

  const filteredEmployers = (employers || []).filter((emp) => {
    const isApproved = (emp.status || '').toLowerCase() === 'active';

    // Tab filter
    if (activeTab === 'PENDING' && isApproved) return false;
    if (activeTab === 'ACTIVE' && !isApproved) return false;

    // Search query
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    const name = (emp.companyName || emp.name || '').toLowerCase();
    const email = (emp.companyEmail || emp.email || '').toLowerCase();
    const role = (emp.industryType || emp.role || '').toLowerCase();
    const contact = (emp.contactPerson || '').toLowerCase();
    return name.includes(q) || email.includes(q) || role.includes(q) || contact.includes(q);
  });

  const handleApprove = async (emp) => {
    setActionLoadingId(emp.id);
    const displayName = emp.companyName || emp.name || 'Company';
    try {
      await approveEmployer(emp.id);
      Alert.alert(
        'Company Approved!',
        `"${displayName}" has been officially approved! Their company and active job postings are now live and visible to all employees.`
      );
      if (selectedEmployer && selectedEmployer.id === emp.id) {
        setSelectedEmployer({ ...selectedEmployer, status: 'Active' });
      }
    } catch (e) {
      Alert.alert('Error', e.message || 'Failed to approve employer');
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleDelete = (id, name) => {
    Alert.alert(
      'Delete Employer',
      `Are you sure you want to delete "${name || 'this employer'}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive', 
          onPress: async () => {
            await deleteEmployer(id);
            if (selectedEmployer && selectedEmployer.id === id) {
              setSelectedEmployer(null);
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
          <Text style={styles.headerTitle}>Employers</Text>
          <View style={styles.headerBadge}>
            <Text style={styles.headerBadgeText}>{filteredEmployers.length}</Text>
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
            placeholder="Search company, industry, email..."
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

      {/* Employers List */}
      <ScrollView 
        contentContainerStyle={styles.listContainer} 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={!!loading} onRefresh={fetchDashboardData} colors={['#4F46E5']} />
        }
      >
        {filteredEmployers.length === 0 ? (
          <View style={styles.emptyStateContainer}>
            <View style={styles.emptyIconCircle}>
              <Ionicons name="business-outline" size={38} color="#94A3B8" />
            </View>
            <Text style={styles.emptyTitle}>
              {search ? 'No matching employers found' : 'No employers registered yet'}
            </Text>
            <Text style={styles.emptySubtitle}>
              {activeTab !== 'ALL' ? `There are no ${activeTab.toLowerCase()} employers.` : 'Registered companies will show up here.'}
            </Text>
          </View>
        ) : (
          filteredEmployers.map((emp) => {
            const isApproved = (emp.status || '').toLowerCase() === 'active';
            const displayName = emp.companyName || emp.name || 'Company';

            return (
              <TouchableOpacity 
                key={emp.id} 
                style={styles.card}
                activeOpacity={0.9}
                onPress={() => setSelectedEmployer(emp)}
              >
                {/* Top Section */}
                <View style={styles.cardTop}>
                  <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                    <View style={styles.companyAvatar}>
                      <Text style={styles.companyAvatarText}>
                        {displayName.charAt(0).toUpperCase()}
                      </Text>
                    </View>
                    <View style={styles.titleArea}>
                      <Text style={styles.companyName} numberOfLines={1}>{displayName}</Text>
                      <Text style={styles.industryText} numberOfLines={1}>{emp.industryType || emp.role || 'Corporate'}</Text>
                      <Text style={styles.emailText} numberOfLines={1}>{emp.companyEmail || emp.email}</Text>
                    </View>
                  </View>
                  <View style={[
                    styles.statusBadge, 
                    { 
                      backgroundColor: isApproved ? '#ECFDF5' : '#FFFBEB',
                      borderColor: isApproved ? '#A7F3D0' : '#FDE68A'
                    }
                  ]}>
                    <View style={[
                      styles.statusDot, 
                      { backgroundColor: isApproved ? '#10B981' : '#F59E0B' }
                    ]} />
                    <Text style={[styles.statusBadgeText, { color: isApproved ? '#059669' : '#D97706' }]}>
                      {isApproved ? 'Active' : 'Pending'}
                    </Text>
                  </View>
                </View>

                {/* Tags Section */}
                <View style={styles.tagsRow}>
                  {emp.location || emp.address ? (
                    <View style={styles.tagChip}>
                      <Ionicons name="location-outline" size={13} color="#475569" />
                      <Text style={styles.tagText}>{emp.location || emp.address}</Text>
                    </View>
                  ) : null}
                  {emp.contactPerson ? (
                    <View style={styles.tagChip}>
                      <Ionicons name="person-outline" size={13} color="#475569" />
                      <Text style={styles.tagText}>{emp.contactPerson}</Text>
                    </View>
                  ) : null}
                  {emp.contactNumber ? (
                    <View style={styles.tagChip}>
                      <Ionicons name="call-outline" size={13} color="#475569" />
                      <Text style={styles.tagText}>{emp.contactNumber}</Text>
                    </View>
                  ) : null}
                  <View style={[styles.tagChip, { backgroundColor: isApproved ? '#ECFDF5' : '#FFF7ED' }]}>
                    <Ionicons name={isApproved ? "checkmark-circle-outline" : "time-outline"} size={13} color={isApproved ? "#059669" : "#EA580C"} />
                    <Text style={[styles.tagText, { color: isApproved ? "#059669" : "#C2410C", fontWeight: '700' }]}>
                      {isApproved ? 'Paid (₹4,000)' : 'Payment Pending (₹4,000)'}
                    </Text>
                  </View>
                </View>

                {/* Card Actions */}
                <View style={styles.cardActionsRow}>
                  <TouchableOpacity 
                    style={styles.actionBtnLeft}
                    onPress={() => setSelectedEmployer(emp)}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="eye-outline" size={16} color="#334155" />
                    <Text style={styles.actionBtnLeftText}>Details</Text>
                  </TouchableOpacity>

                  <View style={styles.actionBtnsRight}>
                    {!isApproved && (
                      <TouchableOpacity 
                        style={styles.approveBtn}
                        onPress={() => handleApprove(emp)}
                        disabled={actionLoadingId === emp.id}
                        activeOpacity={0.8}
                      >
                        <Ionicons name="checkmark-circle" size={16} color="#FFFFFF" />
                        <Text style={styles.approveBtnText}>
                          {actionLoadingId === emp.id ? 'Approving...' : 'Approve Company'}
                        </Text>
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

      {/* Employer Details Modal */}
      <Modal
        visible={!!selectedEmployer}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setSelectedEmployer(null)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContent}>
            <View style={styles.modalDragHandle} />
            {selectedEmployer && (
              <ScrollView showsVerticalScrollIndicator={false}>
                {/* Modal Header */}
                <View style={styles.modalHeader}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.modalTitle}>
                      {selectedEmployer.companyName || selectedEmployer.name}
                    </Text>
                    <Text style={styles.industryText}>
                      {selectedEmployer.industryType || selectedEmployer.role || 'Corporate'}
                    </Text>
                  </View>
                  <TouchableOpacity 
                    style={styles.modalCloseBtn}
                    onPress={() => setSelectedEmployer(null)}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="close" size={20} color="#64748B" />
                  </TouchableOpacity>
                </View>

                {/* Status Badge */}
                <View style={{ marginBottom: 14 }}>
                  {(() => {
                    const isApp = (selectedEmployer.status || '').toLowerCase() === 'active';
                    return (
                      <View style={[styles.statusBadge, { 
                        backgroundColor: isApp ? '#ECFDF5' : '#FFFBEB',
                        borderColor: isApp ? '#A7F3D0' : '#FDE68A'
                      }]}>
                        <View style={[
                          styles.statusDot, 
                          { backgroundColor: isApp ? '#10B981' : '#F59E0B' }
                        ]} />
                        <Text style={[styles.statusBadgeText, { color: isApp ? '#059669' : '#D97706' }]}>
                          Status: {isApp ? 'Active (Approved)' : 'Pending Approval'}
                        </Text>
                      </View>
                    );
                  })()}
                </View>

                {/* Meta Grid */}
                <View style={styles.modalMetaGrid}>
                  <View style={styles.metaGridRow}>
                    <Ionicons name="mail-outline" size={18} color="#4F46E5" />
                    <Text style={styles.metaGridLabel}>Company Email</Text>
                    <Text style={styles.metaGridValue}>{selectedEmployer.companyEmail || selectedEmployer.email || 'N/A'}</Text>
                  </View>
                  <View style={styles.metaGridRow}>
                    <Ionicons name="person-outline" size={18} color="#10B981" />
                    <Text style={styles.metaGridLabel}>Contact Person</Text>
                    <Text style={styles.metaGridValue}>{selectedEmployer.contactPerson || selectedEmployer.name || 'N/A'}</Text>
                  </View>
                  <View style={styles.metaGridRow}>
                    <Ionicons name="call-outline" size={18} color="#F59E0B" />
                    <Text style={styles.metaGridLabel}>Contact Number</Text>
                    <Text style={styles.metaGridValue}>{selectedEmployer.contactNumber || selectedEmployer.phone || 'N/A'}</Text>
                  </View>
                  <View style={styles.metaGridRow}>
                    <Ionicons name="location-outline" size={18} color="#64748B" />
                    <Text style={styles.metaGridLabel}>Address / City</Text>
                    <Text style={styles.metaGridValue}>{selectedEmployer.address || selectedEmployer.location || 'N/A'}</Text>
                  </View>
                  <View style={styles.metaGridRow}>
                    <Ionicons name="card-outline" size={18} color="#059669" />
                    <Text style={styles.metaGridLabel}>Payment & Plan</Text>
                    <Text style={[styles.metaGridValue, { color: selectedEmployer.status === 'active' ? '#059669' : '#EA580C', fontWeight: '700' }]}>
                      {selectedEmployer.status === 'active' ? 'Paid ₹4,000 (3-Mo Plan)' : 'Pending ₹4,000 (3-Mo Plan)'}
                    </Text>
                  </View>
                  <View style={[styles.metaGridRow, styles.metaGridRowLast]}>
                    <Ionicons name="calendar-outline" size={18} color="#64748B" />
                    <Text style={styles.metaGridLabel}>Registered</Text>
                    <Text style={styles.metaGridValue}>{selectedEmployer.createdAt ? new Date(selectedEmployer.createdAt).toLocaleDateString() : 'Active Member'}</Text>
                  </View>
                </View>

                {/* Modal Action Buttons */}
                {(selectedEmployer.status || '').toLowerCase() !== 'active' && (
                  <TouchableOpacity 
                    style={styles.modalApproveBtn}
                    onPress={() => handleApprove(selectedEmployer)}
                    activeOpacity={0.8}
                  >
                    <Ionicons name="checkmark-circle" size={18} color="#FFFFFF" />
                    <Text style={styles.btnText}>Approve Company</Text>
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

export default React.memo(ManageEmployers);
