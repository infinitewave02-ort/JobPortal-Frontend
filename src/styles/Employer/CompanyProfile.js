import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFF' },
  container: { padding: 20 ,marginTop:30},
  header: { paddingVertical: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  title: { fontSize: 22, fontWeight: '800', color: '#1A1A1A', textAlign: 'center', marginTop: 20 },
  subtitle: { fontSize: 14, color: '#666', marginBottom: 25, textAlign: 'center' },
  imageUploadContainer: { alignItems: 'center', marginVertical: 20 },
  imageCircle: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#F0F0F0', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#DDD' },
  cameraBadge: { position: 'absolute', bottom: 0, right: 10, backgroundColor: '#485ff4', padding: 8, borderRadius: 20, borderWidth: 2, borderColor: '#FFF' },
  uploadText: { marginTop: 12, color: '#485ff4', fontWeight: '600', fontSize: 14 },
  inputGroup: { marginBottom: 16 },
  label: { fontSize: 13, color: '#333', marginBottom: 6, fontWeight: '600' },
  input: { borderWidth: 1, borderColor: '#DDD', padding: 14, borderRadius: 8, fontSize: 15, color: '#333', backgroundColor: '#FAFAFA' },
  errorInput: { borderColor: '#FF4B4B' },
  button: { backgroundColor: '#485ff4', paddingVertical: 16, borderRadius: 8, alignItems: 'center', marginTop: 20 },
  buttonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 }
});

export default styles;
