import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  /* Main Screen */
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
    marginTop: 50,
    backgroundColor: '#FFFFFF',
  },

  /* ---------------- HEADER ---------------- */

  header: {
    height: 42,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 2,
  },

  headerButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* ---------------- TITLE ---------------- */

  title: {
    textAlign: 'center',
    fontSize: 26,
    fontWeight: '800',
    color: '#1A1A1A',
    marginTop: 20,
  },

  /* ---------------- SUBTITLE ---------------- */

  subtitle: {
    textAlign: 'center',
    fontSize: 15,
    color: '#555555',
    marginTop: 14,
    marginBottom: 30,
  },

  /* ---------------- INPUT LABEL ---------------- */

  inputLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: '#444444',
    marginBottom: 8,
    marginTop: 40,
  },

  /* ---------------- PHONE INPUT ---------------- */

  phoneInputContainer: {
    height: 52,

    flexDirection: 'row',
    alignItems: 'center',

    borderWidth: 1.2,
    borderColor: '#E8E8E8',
    borderRadius: 8,

    backgroundColor: '#FCFCFC',

    paddingHorizontal: 16,
  },

  countryCode: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginRight: 10,
  },

  phoneInput: {
    flex: 1,

    height: 52,

    padding: 0,

    fontSize: 16,
    fontWeight: '500',
    color: '#222222',
  },

  /* ---------------- OTP BUTTON ---------------- */

  otpButton: {
    height: 52,

    width: '100%',

    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: '#3478DB',

    borderRadius: 8,

    marginTop:30,
  },

  otpButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  /* ---------------- TERMS ---------------- */

  termsContainer: {
    alignItems: 'center',
    marginTop: 40,
  },

  termsText: {
    fontSize: 14,
    color: '#888888',
    textAlign: 'center',
    marginBottom: 4,
  },

  termsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  linkText: {
    fontSize: 14,
    color: '#3478DB',
    fontWeight: '600',
  },

  andText: {
    fontSize: 14,
    color: '#888888',
  },
});

export default styles;