import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFFFFF' },
  container: { padding: 20 ,marginTop:30},
  header: { paddingVertical: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  title: { fontSize: 22, fontWeight: '800', color: '#1A1A1A', textAlign: 'center', marginTop: 10 },
  subtitle: { fontSize: 14, color: '#666', marginVertical: 8, textAlign: 'center' },
  planCardSelected: { 
    borderWidth: 2, borderColor: '#485ff4', backgroundColor: '#F5F7FF',
    padding: 20, borderRadius: 12, marginVertical: 10, flexDirection: 'row', alignItems: 'center' 
  },
  planCardUnselected: { 
    borderWidth: 1, borderColor: '#DDD', backgroundColor: '#FFF',
    padding: 20, borderRadius: 12, marginVertical: 10, flexDirection: 'row', alignItems: 'center' 
  },
  radioOuterSelected: { width: 24, height: 24, borderRadius: 12, borderWidth: 2, borderColor: '#485ff4', justifyContent: 'center', alignItems: 'center' },
  radioOuterUnselected: { width: 24, height: 24, borderRadius: 12, borderWidth: 2, borderColor: '#DDD' },
  radioInnerSelected: { width: 12, height: 12, borderRadius: 6, backgroundColor: '#485ff4' },
  planInfo: { marginLeft: 15, flex: 1 },
  planName: { fontSize: 16, fontWeight: '800', color: '#1A1A1A', marginBottom: 5 },
  planPrice: { fontSize: 18, color: '#1A1A1A', fontWeight: '800' },
  planDuration: { fontSize: 12, color: '#666', marginTop: 4 },
  upgradeText: { textAlign: 'center', color: '#888', marginVertical: 20, fontSize: 13 },
  button: { backgroundColor: '#485ff4', paddingVertical: 16, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 }
});

export default styles;
