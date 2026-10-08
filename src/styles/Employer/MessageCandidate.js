import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFF' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 15, borderBottomWidth: 1, borderColor: '#F0F0F0',marginTop:40 },
  headerLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  headerAvatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#E8E8E8', marginHorizontal: 12 },
  headerInfo: { flex: 1 },
  headerName: { fontSize: 16, fontWeight: '800', color: '#1A1A1A' },
  headerRole: { fontSize: 13, color: '#666', marginTop: 2 },
  statusRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  statusDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#3DD598', marginRight: 6 },
  statusText: { fontSize: 12, color: '#888', fontWeight: '500' },
  headerRight: { flexDirection: 'row' },
  iconButton: { padding: 10 },
  chatContainer: { padding: 15 },
  dateHeader: { textAlign: 'center', color: '#888', marginVertical: 15, fontSize: 12, fontWeight: '500' },
  messageBubble: { maxWidth: '75%', padding: 15, borderRadius: 12, marginVertical: 8, elevation: 1 },
  employerBubble: { backgroundColor: '#485ff4', alignSelf: 'flex-end', borderBottomRightRadius: 4 },
  employerText: { color: '#FFF', fontSize: 15, lineHeight: 22 },
  employerTime: { color: 'rgba(255,255,255,0.7)', fontSize: 10, alignSelf: 'flex-end', marginTop: 5 },
  candidateBubble: { backgroundColor: '#F8F9FA', alignSelf: 'flex-start', borderBottomLeftRadius: 4, borderWidth: 1, borderColor: '#EFEFEF' },
  candidateText: { color: '#1A1A1A', fontSize: 15, lineHeight: 22 },
  candidateTime: { color: '#888', fontSize: 10, alignSelf: 'flex-end', marginTop: 5 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', padding: 12, borderTopWidth: 1, borderColor: '#F0F0F0', backgroundColor: '#FFF' },
  attachButton: { padding: 10 },
  inputField: { flex: 1, backgroundColor: '#F5F5F5', borderRadius: 24, paddingHorizontal: 20, paddingVertical: 12, fontSize: 15 },
  sendButton: { width: 44, height: 44, backgroundColor: '#485ff4', borderRadius: 22, justifyContent: 'center', alignItems: 'center', marginLeft: 12 }
});

export default styles;
