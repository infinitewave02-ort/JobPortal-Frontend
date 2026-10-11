import { StyleSheet, Platform, StatusBar } from 'react-native';

const styles = StyleSheet.create({
  safeArea: { 
    flex: 1, 
    backgroundColor: '#FFFFFF', 
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 24) : 0 
  },
  header: { 
    paddingVertical: 14, 
    paddingHorizontal: 20, 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#FFFFFF', 
    borderBottomWidth: 1, 
    borderColor: '#F1F5F9' 
  },
  headerTitle: { 
    flex: 1, 
    fontSize: 17, 
    fontWeight: '700', 
    color: '#0F172A', 
    textAlign: 'center', 
    marginRight: 24 
  },
  scrollContent: { padding: 20, paddingBottom: 100 },
  documentContainer: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 20, elevation: 1, borderWidth: 1, borderColor: '#E2E8F0' },
  docHeader: { borderBottomWidth: 1.5, borderColor: '#0F172A', paddingBottom: 10, marginBottom: 15 },
  docName: { fontSize: 20, fontWeight: '800', color: '#0F172A', letterSpacing: 0.3 },
  docRole: { fontSize: 13, fontWeight: '700', color: '#64748B', marginTop: 2 },
  sectionTitle: { fontSize: 14, fontWeight: '800', color: '#0F172A', marginTop: 15, marginBottom: 8 },
  sectionText: { fontSize: 12, color: '#475569', lineHeight: 20 },
  listItem: { flexDirection: 'row', marginBottom: 4 },
  bullet: { fontSize: 12, color: '#475569', marginRight: 6 },
  listText: { fontSize: 12, color: '#475569', flex: 1, lineHeight: 20 },
  controlsBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#F8FAFC', padding: 15, borderRadius: 10, marginTop: 25 },
  pageText: { fontSize: 14, fontWeight: '700', color: '#0F172A' },
  rightControls: { flexDirection: 'row', gap: 15 },
  bottomFixed: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 20, backgroundColor: '#FFFFFF', borderTopWidth: 1, borderColor: '#F1F5F9' },
  downloadBtn: { backgroundColor: '#4F46E5', paddingVertical: 15, borderRadius: 12, alignItems: 'center' },
  downloadBtnText: { color: '#FFFFFF', fontWeight: '700', fontSize: 15 }
});

export default styles;
