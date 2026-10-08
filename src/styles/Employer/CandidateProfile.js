import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFF', marginTop: 30 },
  header: { paddingVertical: 15, paddingHorizontal: 20, borderColor: '#F0F0F0', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  scrollContent: { padding: 20, paddingBottom: 100 },
  profileCard: { alignItems: 'center', marginBottom: 25, backgroundColor: '#FFF', padding: 20, borderRadius: 12, borderWidth: 1, borderColor: '#F0F0F0' },
  largeAvatar: { width: 90, height: 90, borderRadius: 45, backgroundColor: '#E8E8E8', marginBottom: 12 },
  name: { fontSize: 22, fontWeight: '800', color: '#1A1A1A' },
  role: { fontSize: 15, color: '#666', marginBottom: 10, fontWeight: '500' },
  iconRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  iconText: { marginLeft: 8, color: '#707070', fontSize: 13, fontWeight: '500' },
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 16, fontWeight: '800', color: '#1A1A1A', marginBottom: 10 },
  sectionText: { fontSize: 14, color: '#444', lineHeight: 22 },
  detailRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12, paddingBottom: 12, borderBottomWidth: 1, borderColor: '#F9F9F9' },
  detailLabel: { color: '#666', fontSize: 14 },
  detailValue: { color: '#1A1A1A', fontSize: 14, fontWeight: '600' },
  actionBtnRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 },
  actionBtnSolid: { flex: 1, backgroundColor: '#485ff4', paddingVertical: 14, borderRadius: 8, alignItems: 'center', marginHorizontal: 5 },
  actionBtnSolidText: { color: '#FFF', fontWeight: 'bold' },
  stickyFooter: {
    position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row',
    padding: 15, backgroundColor: '#FFF', borderTopWidth: 1, borderColor: '#F0F0F0', gap: 10
  },
  messageBtn: { flex: 1, flexDirection: 'row', backgroundColor: '#485ff4', paddingVertical: 14, borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  messageBtnText: { color: '#FFF', fontWeight: 'bold', marginLeft: 8 },
  callBtn: { flex: 1, flexDirection: 'row', backgroundColor: '#3DD598', paddingVertical: 14, borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  callBtnText: { color: '#FFF', fontWeight: 'bold', marginLeft: 8 }
});

export default styles;
