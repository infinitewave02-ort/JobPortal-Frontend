import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFF', marginTop: 40 },
  header: { paddingVertical: 15, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', borderBottomWidth: 1, borderColor: '#F0F0F0' },
  headerTitle: { flex: 1, fontSize: 16, fontWeight: '700', color: '#1A1A1A', textAlign: 'center', marginRight: 24 },
  scrollContent: { padding: 20, paddingBottom: 100 },
  documentContainer: { backgroundColor: '#FFF', borderRadius: 12, padding: 20, elevation: 1, borderWidth: 1, borderColor: '#EAEAEA' },
  docHeader: { borderBottomWidth: 1.5, borderColor: '#1A1A1A', paddingBottom: 10, marginBottom: 15 },
  docName: { fontSize: 20, fontWeight: '900', color: '#1A1A1A', letterSpacing: 0.5 },
  docRole: { fontSize: 12, fontWeight: '700', color: '#666', marginTop: 2, letterSpacing: 0.5 },
  sectionTitle: { fontSize: 13, fontWeight: '800', color: '#1A1A1A', marginTop: 15, marginBottom: 8 },
  sectionText: { fontSize: 11, color: '#444', lineHeight: 18 },
  listItem: { flexDirection: 'row', marginBottom: 4 },
  bullet: { fontSize: 12, color: '#444', marginRight: 6 },
  listText: { fontSize: 11, color: '#444', flex: 1, lineHeight: 18 },
  controlsBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#F8F9FA', padding: 15, borderRadius: 8, marginTop: 25 },
  pageText: { fontSize: 14, fontWeight: '800', color: '#1A1A1A' },
  rightControls: { flexDirection: 'row', gap: 15 },
  bottomFixed: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 20, backgroundColor: '#FFF', borderTopWidth: 1, borderColor: '#F0F0F0' },
  downloadBtn: { backgroundColor: '#485ff4', paddingVertical: 16, borderRadius: 8, alignItems: 'center' },
  downloadBtnText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 }
});

export default styles;
