import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFFFFF', marginTop: 40 },
  header: { padding: 15, flexDirection: 'row', alignItems: 'flex-start' },
  headerTextContainer: { flex: 1, alignItems: 'center', marginRight: 34, marginTop: -2 },
  headerName: { fontSize: 16, fontWeight: '800', color: '#1A1A24' },
  headerPhone: { fontSize: 14, color: '#666', marginTop: 4, fontWeight: '500' },
  mainContent: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  avatarWrap: { width: 150, height: 150, borderRadius: 75, backgroundColor: '#F0F0F0', justifyContent: 'center', alignItems: 'center', marginBottom: 40 },
  callStatus: { fontSize: 16, color: '#666', marginBottom: 4, fontWeight: '500' },
  callName: { fontSize: 24, fontWeight: '900', color: '#1A1A24', marginBottom: 60 },
  actionRow: { flexDirection: 'row', justifyContent: 'center', width: '100%', marginBottom: 60, gap: 30 },
  actionBtn: { alignItems: 'center' },
  iconCircle: { width: 66, height: 66, borderRadius: 33, backgroundColor: '#F5F5F5', justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  actionLabel: { fontSize: 14, color: '#1A1A24', fontWeight: '600' },
  hangupBtn: { width: 70, height: 70, borderRadius: 35, backgroundColor: '#E02424', justifyContent: 'center', alignItems: 'center', marginBottom: 40, elevation: 4 },
});

export default styles;
