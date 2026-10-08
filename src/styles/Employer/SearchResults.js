import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F8F9FA', marginTop: 40 },
  header: { paddingVertical: 15, paddingHorizontal: 20, borderBottomWidth: 1, borderColor: '#EFEFEF', backgroundColor: '#FFF', flexDirection: 'row', alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '800', color: '#1A1A1A', marginLeft: 15 },
  listContainer: { padding: 15, paddingBottom: 80 },
  card: { backgroundColor: '#FFF', borderWidth: 1, borderColor: '#EFEFEF', borderRadius: 12, padding: 15, marginBottom: 15, elevation: 1 },
  cardTopRow: { flexDirection: 'row', marginBottom: 15 },
  avatar: { width: 56, height: 56, borderRadius: 28, backgroundColor: '#E8E8E8', marginRight: 15 },
  candidateInfo: { flex: 1 },
  candidateName: { fontSize: 18, fontWeight: '800', color: '#1A1A1A' },
  candidateRole: { fontSize: 14, color: '#666', marginTop: 2 },
  openToWorkBadge: { backgroundColor: '#E8F5E9', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6, alignSelf: 'flex-start', marginTop: 8 },
  openToWorkText: { color: '#3DD598', fontSize: 11, fontWeight: '600' },
  detailsText: { fontSize: 13, color: '#666', marginBottom: 6, fontWeight: '500' },
  viewProfileButton: { marginTop: 10, paddingVertical: 12, borderWidth: 1, borderColor: '#485ff4', borderRadius: 8, alignItems: 'center' },
  viewProfileText: { color: '#485ff4', fontWeight: '700', fontSize: 14 },
  bottomNav: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 65, backgroundColor: '#FFF', flexDirection: 'row', borderTopWidth: 1, borderColor: '#EFEFEF' },
  navItem: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  navLabel: { fontSize: 11, marginTop: 4, color: '#A0A0A0', fontWeight: '600' }
});

export default styles;
