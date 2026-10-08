import { StyleSheet } from 'react-native';

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFFFFF',marginTop:30  },

  root: {
    minHeight: 750,
    backgroundColor: '#FFFFFF',
    position: 'relative',
    overflow: 'hidden',
  },

  // Decorative blobs
  blobTR1: {
    position: 'absolute', top: -30, right: -40,
    width: 170, height: 150, borderRadius: 90,
    backgroundColor: '#D6E4FF',
    transform: [{ rotate: '18deg' }],
  },
  blobTR2: {
    position: 'absolute', top: 30, right: -10,
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: '#E8F0FF',
  },
  blobBL: {
    position: 'absolute', bottom: 30, left: -50,
    width: 200, height: 170, borderRadius: 100,
    backgroundColor: '#D6E4FF',
    transform: [{ rotate: '-12deg' }],
  },

  // Floating circles
  circleA: {
    position: 'absolute', top: 230, left: 20,
    width: 13, height: 13, borderRadius: 7,
    backgroundColor: '#AFCAFF',
  },
  circleB: {
    position: 'absolute', top: 310, left: 38,
    width: 8, height: 8, borderRadius: 4,
    backgroundColor: '#8FABF5',
  },

  // Back
  back: {
    position: 'absolute', top: 18, left: 20, zIndex: 20,
    padding: 8,
  },

  // Content
  content: {
    paddingTop: 80,
    paddingHorizontal: 28,
    alignItems: 'center',
  },

  // Avatar — 3 layers
  heroOuter: {
    width: 112, height: 112, borderRadius: 56,
    backgroundColor: '#DEE9FF',
    alignItems: 'center', justifyContent: 'center',
  },
  heroMid: {
    width: 90, height: 90, borderRadius: 45,
    backgroundColor: '#FFFFFF',
    alignItems: 'center', justifyContent: 'center',
  },
  heroInner: {
    width: 74, height: 74, borderRadius: 37,
    alignItems: 'center', justifyContent: 'center',
  },

  // Title
  title: {
    fontSize: 28, fontWeight: '800', color: '#111827',
    marginTop: 18, textAlign: 'center',
  },
  subtitle: {
    fontSize: 14, color: '#6B7280',
    marginTop: 6, textAlign: 'center', marginBottom: 30,
  },

  // Field
  fieldWrap: { width: '100%', marginBottom: 16 },
  labelRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  badge: {
    width: 28, height: 28, borderRadius: 8,
    alignItems: 'center', justifyContent: 'center', marginRight: 8,
  },
  labelText: { fontSize: 15, fontWeight: '700', color: '#1F2937' },

  // Input
  inputBox: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#EEF1FD', borderRadius: 50,
    paddingHorizontal: 18, height: 56,
    borderWidth: 1.5, borderColor: 'transparent',
  },
  inputErr: { borderColor: '#EF4444', backgroundColor: '#FEF2F2' },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, fontSize: 15, color: '#1F2937' },
  errText: { color: '#EF4444', fontSize: 12, marginTop: 5, marginLeft: 16 },

  // Forgot
  forgotWrap: { alignSelf: 'flex-end', marginTop: 8, marginBottom: 26 },
  forgotText: { color: '#3B6CF5', fontWeight: '600', fontSize: 14 },

  // Login button
  btnWrap: {
    width: '100%', borderRadius: 30, overflow: 'hidden',
    elevation: 6,
    shadowColor: '#3B5BE8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
  },
  btn: {
    height: 56, alignItems: 'center',
    justifyContent: 'center', flexDirection: 'row',
  },
  btnText: { color: '#fff', fontSize: 17, fontWeight: '800', letterSpacing: 0.3 },

  // OR
  orRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 22, width: '100%' },
  orLine: { flex: 1, height: 1, backgroundColor: '#E5E7EB' },
  orText: { marginHorizontal: 14, fontSize: 13, color: '#9CA3AF', fontWeight: '600' },

  // Register
  regRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 50 },
  regText: { fontSize: 14, color: '#6B7280' },
  regLink: { fontSize: 14, fontWeight: '800', color: '#3B6CF5' },
});

export default s;
