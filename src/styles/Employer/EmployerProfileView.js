import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFF' },
  header: { paddingVertical: 15, paddingHorizontal: 20, borderBottomWidth: 1, borderColor: '#F0F0F0', flexDirection: 'row', alignItems: 'center',marginTop:30 },
  headerTitle: { fontSize: 18, fontWeight: '800', color: '#1A1A1A', marginLeft: 10 },
  scrollContent: { paddingBottom: 80 },
  logoContainer: { alignItems: 'center', marginVertical: 35 },
  companyName: { fontSize: 24, fontWeight: '800', marginTop: 15, color: '#1A1A1A' },
  section: { padding: 20, borderBottomWidth: 1, borderColor: '#F0F0F0' },
  label: { fontSize: 13, color: '#888', marginBottom: 6, fontWeight: '500' },
  value: { fontSize: 16, color: '#1A1A1A', fontWeight: '600' },
  button: { backgroundColor: '#485ff4', paddingVertical: 16, borderRadius: 8, alignItems: 'center', margin: 20 },
  buttonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  bottomNav: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 65, backgroundColor: '#FFF', flexDirection: 'row', borderTopWidth: 1, borderColor: '#F0F0F0' },
  navItem: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  navLabel: { fontSize: 11, marginTop: 4, color: '#A0A0A0', fontWeight: '600' }
});

export default styles;
