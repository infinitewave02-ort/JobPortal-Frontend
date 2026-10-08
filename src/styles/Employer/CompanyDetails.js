import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFFFFF' },
  container: { padding: 20 , marginTop:20},
  header: { paddingVertical: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  title: { fontSize: 22, fontWeight: '800', color: '#1A1A1A', textAlign: 'center' },
  subtitle: { fontSize: 14, color: '#666', marginVertical: 8, marginBottom: 25, textAlign: 'center' },
  inputGroup: { marginBottom: 16 },
  label: { fontSize: 13, color: '#333', marginBottom: 6, fontWeight: '600' },
  input: { borderWidth: 1, borderColor: '#DDD', padding: 14, borderRadius: 8, fontSize: 15, color: '#333', backgroundColor: '#FAFAFA' },
  inputWithIcon: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#DDD', paddingHorizontal: 14, borderRadius: 8, backgroundColor: '#FAFAFA', height: 50 },
  inputText: { flex: 1, fontSize: 15, color: '#333' },
  errorInput: { borderColor: '#FF4B4B' },
  button: { backgroundColor: '#485ff4', paddingVertical: 16, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  modalBackdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContainer: { backgroundColor: '#FFF', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20, maxHeight: '80%' },
  modalHeader: { fontSize: 18, fontWeight: '800', marginBottom: 15, color: '#1A1A1A', textAlign: 'center' },
  modalOption: { paddingVertical: 16, borderBottomWidth: 1, borderColor: '#F0F0F0' },
  modalOptionText: { fontSize: 16, color: '#333', textAlign: 'center' }
});

export default styles;
