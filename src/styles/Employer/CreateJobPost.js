import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: 10,
    marginTop:50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    
  },
  backButton: {
    position: 'absolute', // "back in left conner and job post in center fix it"
    left: 0,
    zIndex: 10,
    padding: 10,
  },
  title: {
    flex: 1,
    fontSize: 22,
    fontWeight: '700',
    color: '#1A1A24',
    textAlign: 'center', // centered title
  },
  inputGroup: {
    marginBottom: 20,
    marginTop:10,
  },
  label: {
    fontSize: 14,
    color: '#555555',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1A1A24',
    borderWidth: 1,
    borderColor: '#EFEFEF',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#485ff4',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default styles;
