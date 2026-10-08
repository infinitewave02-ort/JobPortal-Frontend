import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1, padding: 20 },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  logoContainer: { 
    width: 100, height: 100, borderRadius: 50, 
    justifyContent: 'center', alignItems: 'center', 
    marginBottom: 40 
  },
  logoImage: { width: 160, height: 160 },
  textContainer: { alignItems: 'center', marginBottom: 40 },
  title: { fontSize: 28, fontWeight: '800', textAlign: 'center', color: '#FFFFFF', marginBottom: 15 },
  subtitle: { fontSize: 16, textAlign: 'center', color: '#E0E7FF' },
  buttonContainer: { width: '100%', paddingBottom: 20 },
  primaryButton: { 
    backgroundColor: '#FFFFFF', 
    paddingVertical: 16, 
    borderRadius: 8, 
    alignItems: 'center', 
    marginBottom: 15 
  },
  primaryButtonText: { color: '#090D37', fontWeight: 'bold', fontSize: 16 },
  secondaryButton: { 
    borderWidth: 1, 
    borderColor: '#FFFFFF', 
    backgroundColor: 'transparent',
    paddingVertical: 16, 
    borderRadius: 8, 
    alignItems: 'center' 
  },
  secondaryButtonText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 16 }
});

export default styles;
