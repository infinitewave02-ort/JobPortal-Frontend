import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F4F6F9' },
  container: { paddingBottom: 80 , marginTop:60},
  header: { padding: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#FFF' },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  avatarContainer: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#485ff4', justifyContent: 'center', alignItems: 'center' },
  avatarTextPrimary: { color: '#FFF', fontWeight: '800', fontSize: 14 },
  avatarTextSecondary: { color: '#FFF', fontSize: 8 },
  avatarBadgeIcon: { position: 'absolute', bottom: -2, right: -2, backgroundColor: '#1A1A1A', borderRadius: 10, padding: 3 },
  welcomeText: { fontSize: 13, color: '#666', marginLeft: 12 },
  companyName: { fontSize: 16, fontWeight: '800', color: '#1A1A1A', marginLeft: 12 },
  phoneIconContainer: { padding: 10 },
  planCard: { 
    margin: 15, backgroundColor: '#485ff4', 
    borderRadius: 16, padding: 20, elevation: 4, 
    shadowColor: '#485ff4', shadowOpacity: 0.3, shadowRadius: 8, shadowOffset: { width: 0, height: 4 }
  },
  planStatusText: { color: '#D0D0FF', fontSize: 12, marginBottom: 8, fontWeight: '600' },
  planMainRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  planTitle: { fontSize: 22, fontWeight: 'bold', color: '#FFF' },
  activeBadge: { backgroundColor: '#3DD598', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12 },
  activeBadgeText: { color: '#FFF', fontSize: 11, fontWeight: 'bold' },
  planValidText: { color: '#D0D0FF', fontSize: 12, marginTop: 12 },
  gridContainer: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 10 },
  gridItem: { 
    width: '31%', margin: '1.16%', backgroundColor: '#FFF', 
    borderRadius: 12, paddingVertical: 20, alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: '#EFEFEF'
  },
  iconWrapper: { width: 48, height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center', marginBottom: 12, backgroundColor: '#F5F7FF' },
  badge: { position: 'absolute', top: 0, right: 0, backgroundColor: '#FF4B4B', borderRadius: 10, width: 20, height: 20, justifyContent: 'center', alignItems: 'center' },
  badgeText: { color: '#FFF', fontSize: 10, fontWeight: 'bold' },
  gridItemText: { textAlign: 'center', color: '#1A1A1A', fontWeight: '600', fontSize: 12 },
  bottomNav: {
    position: 'absolute', bottom: 0, left: 0, right: 0, height: 65,
    backgroundColor: '#FFFFFF', flexDirection: 'row', borderTopWidth: 1, borderColor: '#EFEFEF'
  },
  navItem: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  navLabel: { fontSize: 11, marginTop: 4, fontWeight: '600' }
});

export default styles;
