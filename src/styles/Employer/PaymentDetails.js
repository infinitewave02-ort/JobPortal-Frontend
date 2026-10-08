import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFF' },
  container: { padding: 20,marginTop:30 },
  header: { paddingVertical: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  title: { fontSize: 22, fontWeight: '800', color: '#1A1A1A', textAlign: 'center', marginTop: 10 },
  subtitle: { fontSize: 14, color: '#666', marginVertical: 8, textAlign: 'center', fontWeight: '600' },
  inputGroup: { marginBottom: 20 },
  label: { fontSize: 13, color: '#333', marginBottom: 6, fontWeight: '600' },
  input: { borderWidth: 1, borderColor: '#DDD', padding: 14, borderRadius: 8, fontSize: 16, color: '#333', backgroundColor: '#FAFAFA' },
  paymentMethodCard: { 
    flexDirection: 'row', alignItems: 'center', 
    borderWidth: 1, borderColor: '#DDD', backgroundColor: '#FFF',
    padding: 16, borderRadius: 8, marginBottom: 12 
  },
  paymentMethodIcon: { width: 40, height: 40, marginRight: 15, resizeMode: 'contain' },
  paymentMethodText: { fontSize: 16, fontWeight: '600', color: '#1A1A1A' },
  button: { backgroundColor: '#485ff4', paddingVertical: 16, borderRadius: 8, alignItems: 'center', marginTop: 25 },
  buttonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  secureTextContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 25 },
  secureText: { marginLeft: 6, color: '#4CAF50', fontSize: 13, fontWeight: '600' }
});

export default styles;
