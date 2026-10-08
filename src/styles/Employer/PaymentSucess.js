import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFF' },
  container: { flex: 1, justifyContent: 'center', padding: 20,marginTop:40 },
  header: { position: 'absolute', top: 20, left: 20 },
  successIconContainer: { alignItems: 'center', marginBottom: 25 },
  successCircle: { width: 90, height: 90, borderRadius: 45, backgroundColor: '#3DD598', justifyContent: 'center', alignItems: 'center', elevation: 4 },
  title: { fontSize: 24, fontWeight: '800', textAlign: 'center', color: '#1A1A1A' },
  subtitle: { fontSize: 15, textAlign: 'center', color: '#666', marginVertical: 15 },
  planDetailsCard: { backgroundColor: '#F8F9FA', padding: 25, borderRadius: 16, marginVertical: 30, borderWidth: 1, borderColor: '#EFEFEF' },
  planDetailsLabel: { color: '#888', fontSize: 13, marginBottom: 6, fontWeight: '500' },
  planDetailsTitle: { fontSize: 20, fontWeight: '800', color: '#1A1A1A' },
  planDetailsValid: { color: '#666', marginTop: 10, fontSize: 13 },
  button: { backgroundColor: '#485ff4', paddingVertical: 16, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 }
});

export default styles;
