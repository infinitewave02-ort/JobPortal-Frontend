import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  safeArea: { 
    flex: 1, 
    backgroundColor: '#FFFFFF',
    marginTop:40,
 },
  container: { 
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24, 
    justifyContent: 'center',
   },
  
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A24',
    marginBottom: 30,
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#485ff4',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  shieldIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 2,
  },
  
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 12,
    color: '#707070',
    marginBottom: 8,
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EFEFEF',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 2,
    backgroundColor: '#FFFFFF',
  },
  errorInput: {
    borderColor: '#FF4B4B',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#1A1A24',
  },
  
  forgotText: {
    color: '#485ff4',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'right',
    marginBottom: 30,
  },
  
  errorText: {
    color: '#FF4B4B',
    fontSize: 12,
    marginTop: 4,
  },
  
  button: {
    backgroundColor: '#485ff4',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 30,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  footerText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#A0A0A0',
  },
  
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 10,
    padding: 8,
  }
});

export default styles;
