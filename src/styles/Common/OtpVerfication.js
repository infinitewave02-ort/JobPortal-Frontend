import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

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
    paddingHorizontal: 20,
    paddingTop: 40,
    backgroundColor: '#FFFFFF',
  },

  /* HEADER */
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },

  /* TITLE */
  title: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '700',
    color: '#000000',
    marginTop: 30,
  },

  /* SUBTITLE */
  subtitle: {
    textAlign: 'center',
    fontSize: 14,
    color: '#555555',
    lineHeight: 22,
    marginTop: 20,
    marginBottom: 40,
  },

  /* OTP INPUTS */
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  otpBox: {
    width: 48,
    height: 52,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    backgroundColor: '#FCFCFC',
  },

  /* RESEND TEXT */
  resendContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  resendText: {
    fontSize: 14,
    color: '#888888',
    fontWeight: '500',
  },

  /* VERIFY BUTTON */
  verifyButton: {
    height: 52,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3478DB',
    borderRadius: 8,
  },
  verifyButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

export default styles;
