import { StyleSheet, Platform, StatusBar } from 'react-native';

const styles = StyleSheet.create({
  safeArea: { 
    flex: 1, 
    backgroundColor: '#FFFFFF',
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 24) : 0,
  },
  container: { 
    flex: 1, 
    backgroundColor: '#F8FAFC' 
  },
  
  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderColor: '#F1F5F9',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitleWrap: {
    marginLeft: 14,
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.3,
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 1,
  },

  // KPI Overview Cards
  kpiRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    gap: 12,
  },
  kpiCard: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
  },
  kpiCollected: {
    backgroundColor: '#ECFDF5',
    borderColor: '#A7F3D0',
  },
  kpiPending: {
    backgroundColor: '#FFF7ED',
    borderColor: '#FED7AA',
  },
  kpiLabel: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  kpiCollectedLabel: {
    color: '#047857',
  },
  kpiPendingLabel: {
    color: '#9A3412',
  },
  kpiValue: {
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 2,
  },
  kpiCollectedValue: {
    color: '#065F46',
  },
  kpiPendingValue: {
    color: '#C2410C',
  },
  kpiSubtext: {
    fontSize: 11,
    fontWeight: '500',
  },
  kpiCollectedSub: {
    color: '#059669',
  },
  kpiPendingSub: {
    color: '#EA580C',
  },

  // Search
  searchContainer: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 46,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#0F172A',
    marginLeft: 10,
    paddingVertical: 0,
  },

  // Tabs
  tabsWrapper: {
    paddingHorizontal: 16,
    paddingBottom: 14,
  },
  tabsScroll: {
    flexDirection: 'row',
    gap: 8,
  },
  tabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  tabButtonActive: {
    backgroundColor: '#4F46E5',
    borderColor: '#4F46E5',
  },
  tabButtonPendingActive: {
    backgroundColor: '#EA580C',
    borderColor: '#EA580C',
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
  },
  tabTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  tabBadge: {
    marginLeft: 6,
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 10,
  },
  tabBadgeActive: {
    backgroundColor: 'rgba(255,255,255,0.25)',
  },
  tabBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#475569',
  },
  tabBadgeTextActive: {
    color: '#FFFFFF',
  },

  // Payment List
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  paymentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  cardTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  companyAvatar: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  companyAvatarCompleted: {
    backgroundColor: '#EEF2FF',
  },
  companyAvatarPending: {
    backgroundColor: '#FFF7ED',
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '800',
  },
  avatarTextCompleted: {
    color: '#4F46E5',
  },
  avatarTextPending: {
    color: '#EA580C',
  },
  cardMainInfo: {
    flex: 1,
    marginRight: 8,
  },
  companyName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 2,
  },
  planName: {
    fontSize: 12,
    fontWeight: '500',
    color: '#64748B',
  },
  amountWrap: {
    alignItems: 'flex-end',
  },
  amountText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 4,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  statusBadgeCompleted: {
    backgroundColor: '#ECFDF5',
  },
  statusBadgePending: {
    backgroundColor: '#FFF7ED',
    borderWidth: 1,
    borderColor: '#FED7AA',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 5,
  },
  statusDotCompleted: {
    backgroundColor: '#10B981',
  },
  statusDotPending: {
    backgroundColor: '#EA580C',
  },
  statusBadgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  statusBadgeTextCompleted: {
    color: '#059669',
  },
  statusBadgeTextPending: {
    color: '#C2410C',
  },

  // Meta Info
  metaGrid: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 12,
    marginBottom: 14,
    gap: 6,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  metaLabel: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  metaValue: {
    fontSize: 12,
    color: '#1E293B',
    fontWeight: '600',
  },

  // Actions
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  approveBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4F46E5',
    paddingVertical: 10,
    borderRadius: 10,
    gap: 6,
  },
  approveBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  detailsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F1F5F9',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 6,
  },
  detailsBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#334155',
  },

  // Empty State
  emptyWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 24,
  },
  emptyIconWrap: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 6,
  },
  emptyText: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 18,
  },

  // Modal
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.55)',
    justifyContent: 'center',
    padding: 20,
  },
  modalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    maxHeight: '85%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
    borderBottomWidth: 1,
    borderColor: '#F1F5F9',
    paddingBottom: 14,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  modalCloseBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalSectionTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: 10,
    marginBottom: 8,
  },
  invoiceBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 16,
  },
  invoiceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  invoiceLabel: {
    fontSize: 13,
    color: '#64748B',
  },
  invoiceValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0F172A',
  },
  invoiceDivider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 10,
  },
  invoiceTotalLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  invoiceTotalValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  modalActionRow: {
    marginTop: 14,
    gap: 10,
  },
  modalApproveBtn: {
    backgroundColor: '#4F46E5',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  modalApproveBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  modalCloseActionBtn: {
    backgroundColor: '#F1F5F9',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCloseActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#475569',
  },
});

export default styles;
