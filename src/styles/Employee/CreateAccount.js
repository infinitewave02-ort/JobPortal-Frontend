import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  keyboardView: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    marginTop: 40,
    backgroundColor: '#FFFFFF',
  },
  header: {
    height: 42,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  title: {
    textAlign: 'center',
    fontSize: 26,
    fontWeight: '800',
    color: '#1A1A1A',
    marginTop: 10,
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 15,
    color: '#555555',
    marginTop: 8,
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 6,
    marginTop: 16,
  },
  inputContainer: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.2,
    borderColor: '#E8E8E8',
    borderRadius: 8,
    backgroundColor: '#FCFCFC',
    paddingHorizontal: 12,
  },
  errorInput: {
    borderColor: '#FF4B4B',
  },
  input: {
    flex: 1,
    height: 48,
    padding: 0,
    fontSize: 15,
    color: '#222222',
  },
  iconContainer: {
    padding: 4,
  },
  createButton: {
    height: 52,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3478DB',
    borderRadius: 8,
    marginTop: 30,
  },
  createButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  loginContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  loginText: {
    fontSize: 14,
    color: '#888888',
  },
  loginLink: {
    fontSize: 14,
    color: '#3478DB',
    fontWeight: '600',
    marginLeft: 4,
  },
});

export default styles;
