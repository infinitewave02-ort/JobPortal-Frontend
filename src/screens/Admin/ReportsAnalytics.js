import React, { useState, useMemo } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView, 
  StatusBar, 
  ScrollView, 
  Modal, 
  RefreshControl,
  Alert,
  ActivityIndicator
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import styles from '../../styles/Admin/ReportsAnalytics';
import { AdminContext } from '../../context/AdminContext';

const ReportsAnalytics = ({ navigation, route }) => {
  const { 
    payments, 
    dashboardStats, 
    loading, 
    fetchDashboardData, 
    updatePaymentStatus 
  } = React.useContext(AdminContext);

  const initialFilter = route?.params?.filter === 'pending' ? 'PENDING' : (route?.params?.filter === 'completed' ? 'COMPLETED' : 'ALL');
  const [activeTab, setActiveTab] = useState(initialFilter); // 'ALL' | 'PENDING' | 'COMPLETED'
  const [search, setSearch] = useState('');
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [actionLoadingId, setActionLoadingId] = useState(null);

  // Compute metrics
  const totalCollected = dashboardStats?.totalPayments ? `₹${dashboardStats.totalPayments.toLocaleString()}` : '₹0';
  const pendingAmount = dashboardStats?.pendingPayments ? `₹${dashboardStats.pendingPayments.toLocaleString()}` : '₹0';
  const pendingCount = dashboardStats?.pendingPaymentsCount ?? (payments || []).filter(p => p.status === 'pending').length;
  const completedCount = dashboardStats?.completedPaymentsCount ?? (payments || []).filter(p => p.status === 'completed' || p.status === 'successful').length;

  // Filtered payments list
  const filteredPayments = useMemo(() => {
    let list = payments || [];

    if (activeTab === 'PENDING') {
      list = list.filter(p => p.status === 'pending');
    } else if (activeTab === 'COMPLETED') {
      list = list.filter(p => p.status === 'completed' || p.status === 'successful');
    }

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(p => 
        (p.companyName && p.companyName.toLowerCase().includes(q)) ||
        (p.contactPerson && p.contactPerson.toLowerCase().includes(q)) ||
        (p.transactionId && p.transactionId.toLowerCase().includes(q)) ||
        (p.email && p.email.toLowerCase().includes(q))
      );
    }

    return list;
  }, [payments, activeTab, search]);

  const handleApprovePayment = (payment) => {
    Alert.alert(
      'Verify & Approve Payment',
      `Confirm receipt of ₹${payment.amount?.toLocaleString() || 4000} from ${payment.companyName}?\nThis will mark the payment as completed and activate the employer.`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Confirm & Approve', 
          style: 'default',
          onPress: async () => {
            try {
              setActionLoadingId(payment.id || payment.paymentId);
              await updatePaymentStatus(payment.id || payment.paymentId, 'successful');
              if (selectedPayment && (selectedPayment.id === payment.id || selectedPayment.paymentId === payment.paymentId)) {
                setSelectedPayment(prev => prev ? { ...prev, status: 'completed' } : null);
              }
              Alert.alert('Payment Approved', `Payment for ${payment.companyName} has been verified successfully!`);
            } catch (err) {
              Alert.alert('Error', err.message || 'Could not verify payment');
            } finally {
              setActionLoadingId(null);
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
            style={styles.headerButton} 
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={20} color="#0F172A" />
          </TouchableOpacity>
          <View style={styles.headerTitleWrap}>
            <Text style={styles.headerTitle}>Payments & Invoices</Text>
            <Text style={styles.headerSubtitle}>Corporate subscription billing & receipts</Text>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.headerButton}
          onPress={fetchDashboardData}
          activeOpacity={0.7}
        >
          <Ionicons name="refresh-outline" size={20} color="#0F172A" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.container}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={!!loading} onRefresh={fetchDashboardData} colors={['#4F46E5']} />
        }
      >
        {/* KPI Overview Cards */}
        <View style={styles.kpiRow}>
          <View style={[styles.kpiCard, styles.kpiCollected]}>
            <Text style={[styles.kpiLabel, styles.kpiCollectedLabel]}>TOTAL COLLECTED</Text>
            <Text style={[styles.kpiValue, styles.kpiCollectedValue]}>{totalCollected}</Text>
            <Text style={[styles.kpiSubtext, styles.kpiCollectedSub]}>{completedCount} Verified Invoices</Text>
          </View>

          <View style={[styles.kpiCard, styles.kpiPending]}>
            <Text style={[styles.kpiLabel, styles.kpiPendingLabel]}>PENDING PAYMENTS</Text>
            <Text style={[styles.kpiValue, styles.kpiPendingValue]}>{pendingAmount}</Text>
            <Text style={[styles.kpiSubtext, styles.kpiPendingSub]}>
              {pendingCount > 0 ? `${pendingCount} Awaiting Clearance` : '0 Pending Clearance'}
            </Text>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Feather name="search" size={18} color="#94A3B8" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search company, contact, transaction ID..."
              placeholderTextColor="#94A3B8"
              value={search}
              onChangeText={setSearch}
            />
            {search.length > 0 && (
              <TouchableOpacity onPress={() => setSearch('')}>
                <Ionicons name="close-circle" size={18} color="#94A3B8" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Filter Tabs */}
        <View style={styles.tabsWrapper}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsScroll}>
            <TouchableOpacity
              style={[styles.tabButton, activeTab === 'ALL' && styles.tabButtonActive]}
              onPress={() => setActiveTab('ALL')}
              activeOpacity={0.7}
            >
              <Text style={[styles.tabText, activeTab === 'ALL' && styles.tabTextActive]}>All Payments</Text>
              <View style={[styles.tabBadge, activeTab === 'ALL' && styles.tabBadgeActive]}>
                <Text style={[styles.tabBadgeText, activeTab === 'ALL' && styles.tabBadgeTextActive]}>
                  {(payments || []).length}
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tabButton, activeTab === 'PENDING' && styles.tabButtonPendingActive]}
              onPress={() => setActiveTab('PENDING')}
              activeOpacity={0.7}
            >
              <Ionicons 
                name="time-outline" 
                size={14} 
                color={activeTab === 'PENDING' ? '#FFFFFF' : '#EA580C'} 
                style={{ marginRight: 4 }} 
              />
              <Text style={[styles.tabText, activeTab === 'PENDING' && styles.tabTextActive]}>Pending Clearance</Text>
              <View style={[styles.tabBadge, activeTab === 'PENDING' && styles.tabBadgeActive]}>
                <Text style={[styles.tabBadgeText, activeTab === 'PENDING' && styles.tabBadgeTextActive]}>
                  {pendingCount}
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tabButton, activeTab === 'COMPLETED' && styles.tabButtonActive]}
              onPress={() => setActiveTab('COMPLETED')}
              activeOpacity={0.7}
            >
              <Text style={[styles.tabText, activeTab === 'COMPLETED' && styles.tabTextActive]}>Completed</Text>
              <View style={[styles.tabBadge, activeTab === 'COMPLETED' && styles.tabBadgeActive]}>
                <Text style={[styles.tabBadgeText, activeTab === 'COMPLETED' && styles.tabBadgeTextActive]}>
                  {completedCount}
                </Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Payments List */}
        <View style={styles.listContent}>
          {filteredPayments.length === 0 ? (
            <View style={styles.emptyWrap}>
              <View style={styles.emptyIconWrap}>
                <Ionicons name="receipt-outline" size={32} color="#94A3B8" />
              </View>
              <Text style={styles.emptyTitle}>No payment records found</Text>
              <Text style={styles.emptyText}>
                {search ? 'Try adjusting your search criteria.' : 'No payment transactions match the selected filter.'}
              </Text>
            </View>
          ) : (
            filteredPayments.map((p) => {
              const isPending = p.status === 'pending';
              const initial = (p.companyName || 'C').charAt(0).toUpperCase();
              const isLoadingThis = actionLoadingId === (p.id || p.paymentId);

              return (
                <View key={p.id || p.paymentId} style={styles.paymentCard}>
                  {/* Top Row */}
                  <View style={styles.cardTopRow}>
                    <View style={[styles.companyAvatar, isPending ? styles.companyAvatarPending : styles.companyAvatarCompleted]}>
                      <Text style={[styles.avatarText, isPending ? styles.avatarTextPending : styles.avatarTextCompleted]}>
                        {initial}
                      </Text>
                    </View>

                    <View style={styles.cardMainInfo}>
                      <Text style={styles.companyName} numberOfLines={1}>{p.companyName}</Text>
                      <Text style={styles.planName} numberOfLines={1}>{p.planName}</Text>
                    </View>

                    <View style={styles.amountWrap}>
                      <Text style={styles.amountText}>₹{p.amount?.toLocaleString() || '4,000'}</Text>
                      <View style={[styles.statusBadge, isPending ? styles.statusBadgePending : styles.statusBadgeCompleted]}>
                        <View style={[styles.statusDot, isPending ? styles.statusDotPending : styles.statusDotCompleted]} />
                        <Text style={[styles.statusBadgeText, isPending ? styles.statusBadgeTextPending : styles.statusBadgeTextCompleted]}>
                          {isPending ? 'Pending' : 'Completed'}
                        </Text>
                      </View>
                    </View>
                  </View>

                  {/* Metadata Grid */}
                  <View style={styles.metaGrid}>
                    <View style={styles.metaRow}>
                      <Text style={styles.metaLabel}>Contact Person</Text>
                      <Text style={styles.metaValue}>{p.contactPerson || 'Company Admin'}</Text>
                    </View>
                    <View style={styles.metaRow}>
                      <Text style={styles.metaLabel}>Payment Method</Text>
                      <Text style={styles.metaValue}>{p.paymentMethod || 'UPI / Transfer'}</Text>
                    </View>
                    <View style={styles.metaRow}>
                      <Text style={styles.metaLabel}>Transaction Ref</Text>
                      <Text style={styles.metaValue}>{p.transactionId || 'Awaiting ID'}</Text>
                    </View>
                    {p.createdAt && (
                      <View style={styles.metaRow}>
                        <Text style={styles.metaLabel}>Date</Text>
                        <Text style={styles.metaValue}>
                          {p.createdAt.includes('T') ? p.createdAt.split('T')[0] : p.createdAt}
                        </Text>
                      </View>
                    )}
                  </View>

                  {/* Actions Row */}
                  <View style={styles.actionRow}>
                    {isPending ? (
                      <TouchableOpacity
                        style={styles.approveBtn}
                        onPress={() => handleApprovePayment(p)}
                        activeOpacity={0.8}
                        disabled={isLoadingThis}
                      >
                        {isLoadingThis ? (
                          <ActivityIndicator size="small" color="#FFFFFF" />
                        ) : (
                          <>
                            <Ionicons name="checkmark-circle-outline" size={17} color="#FFFFFF" />
                            <Text style={styles.approveBtnText}>Approve & Mark Paid</Text>
                          </>
                        )}
                      </TouchableOpacity>
                    ) : null}

                    <TouchableOpacity
                      style={[styles.detailsBtn, !isPending && { flex: 1 }]}
                      onPress={() => setSelectedPayment(p)}
                      activeOpacity={0.7}
                    >
                      <Ionicons name="document-text-outline" size={16} color="#334155" />
                      <Text style={styles.detailsBtnText}>
                        {isPending ? 'Details' : 'View Receipt & Details'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })
          )}
        </View>
      </ScrollView>

      {/* Invoice & Payment Details Modal */}
      <Modal visible={!!selectedPayment} transparent animationType="fade">
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTitle}>Payment Receipt</Text>
                <Text style={{ fontSize: 12, color: '#64748B' }}>Corporate Subscription Invoice</Text>
              </View>
              <TouchableOpacity 
                style={styles.modalCloseBtn} 
                onPress={() => setSelectedPayment(null)}
              >
                <Ionicons name="close" size={18} color="#475569" />
              </TouchableOpacity>
            </View>

            {selectedPayment && (
              <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.modalSectionTitle}>EMPLOYER INFORMATION</Text>
                <View style={styles.invoiceBox}>
                  <View style={styles.invoiceRow}>
                    <Text style={styles.invoiceLabel}>Company</Text>
                    <Text style={styles.invoiceValue}>{selectedPayment.companyName}</Text>
                  </View>
                  <View style={styles.invoiceRow}>
                    <Text style={styles.invoiceLabel}>Contact Person</Text>
                    <Text style={styles.invoiceValue}>{selectedPayment.contactPerson || 'N/A'}</Text>
                  </View>
                  <View style={styles.invoiceRow}>
                    <Text style={styles.invoiceLabel}>Email</Text>
                    <Text style={styles.invoiceValue}>{selectedPayment.email || 'N/A'}</Text>
                  </View>
                  {selectedPayment.contactNumber ? (
                    <View style={styles.invoiceRow}>
                      <Text style={styles.invoiceLabel}>Phone</Text>
                      <Text style={styles.invoiceValue}>{selectedPayment.contactNumber}</Text>
                    </View>
                  ) : null}
                </View>

                <Text style={styles.modalSectionTitle}>TRANSACTION DETAILS</Text>
                <View style={styles.invoiceBox}>
                  <View style={styles.invoiceRow}>
                    <Text style={styles.invoiceLabel}>Plan</Text>
                    <Text style={styles.invoiceValue}>{selectedPayment.planName}</Text>
                  </View>
                  <View style={styles.invoiceRow}>
                    <Text style={styles.invoiceLabel}>Status</Text>
                    <Text style={[styles.invoiceValue, { color: selectedPayment.status === 'pending' ? '#EA580C' : '#059669' }]}>
                      {selectedPayment.status === 'pending' ? 'Pending Approval' : 'Paid & Verified'}
                    </Text>
                  </View>
                  <View style={styles.invoiceRow}>
                    <Text style={styles.invoiceLabel}>Payment Method</Text>
                    <Text style={styles.invoiceValue}>{selectedPayment.paymentMethod || 'UPI / Card'}</Text>
                  </View>
                  <View style={styles.invoiceRow}>
                    <Text style={styles.invoiceLabel}>Reference Ref</Text>
                    <Text style={styles.invoiceValue}>{selectedPayment.transactionId || 'Awaiting ID'}</Text>
                  </View>

                  <View style={styles.invoiceDivider} />

                  <View style={styles.invoiceRow}>
                    <Text style={styles.invoiceTotalLabel}>Total Paid / Due</Text>
                    <Text style={styles.invoiceTotalValue}>₹{selectedPayment.amount?.toLocaleString() || '4,000'}</Text>
                  </View>
                </View>

                {/* Modal Action Row */}
                <View style={styles.modalActionRow}>
                  {selectedPayment.status === 'pending' && (
                    <TouchableOpacity
                      style={styles.modalApproveBtn}
                      onPress={() => handleApprovePayment(selectedPayment)}
                      activeOpacity={0.8}
                      disabled={actionLoadingId === (selectedPayment.id || selectedPayment.paymentId)}
                    >
                      {actionLoadingId === (selectedPayment.id || selectedPayment.paymentId) ? (
                        <ActivityIndicator size="small" color="#FFFFFF" />
                      ) : (
                        <>
                          <Ionicons name="checkmark-circle-outline" size={18} color="#FFFFFF" />
                          <Text style={styles.modalApproveBtnText}>Approve Payment Now</Text>
                        </>
                      )}
                    </TouchableOpacity>
                  )}

                  <TouchableOpacity
                    style={styles.modalCloseActionBtn}
                    onPress={() => setSelectedPayment(null)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.modalCloseActionText}>Close</Text>
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

export default React.memo(ReportsAnalytics);
