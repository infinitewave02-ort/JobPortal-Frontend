import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFF', marginTop: 40 },
  header: { paddingVertical: 15, paddingHorizontal: 20, borderBottomWidth: 1, borderColor: '#F0F0F0', flexDirection: 'row', alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '800', marginLeft: 15, color: '#1A1A1A' },
  tabsRow: { flexDirection: 'row', borderBottomWidth: 1, borderColor: '#EFEFEF' },
  tab: { flex: 1, paddingVertical: 16, alignItems: 'center' },
  activeTab: { flex: 1, paddingVertical: 16, alignItems: 'center', borderBottomWidth: 2, borderColor: '#485ff4' },
  tabText: { color: '#888', fontSize: 14, fontWeight: '600' },
  activeTabText: { color: '#485ff4', fontSize: 14, fontWeight: '800' },
  listContainer: { paddingBottom: 80 },
  messageRow: { flexDirection: 'row', padding: 20, borderBottomWidth: 1, borderColor: '#F9F9F9', alignItems: 'center' },
  avatar: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#E8E8E8', marginRight: 15 },
  msgInfo: { flex: 1 },
  nameTimeRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  name: { fontSize: 16, fontWeight: '800', color: '#1A1A1A' },
  time: { fontSize: 12, color: '#888', fontWeight: '500' },
  msgPreviewRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  msgPreview: { fontSize: 14, color: '#666', flex: 1 },
  unreadDot: { width: 20, height: 20, borderRadius: 10, backgroundColor: '#485ff4', alignItems: 'center', justifyContent: 'center', marginLeft: 10 },
  bottomNav: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 65, backgroundColor: '#FFF', flexDirection: 'row', borderTopWidth: 1, borderColor: '#F0F0F0' },
  navItem: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  navLabel: { fontSize: 11, marginTop: 4, color: '#A0A0A0', fontWeight: '600' }
});

export default styles;
