import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },

  /* Top Header Row */
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },

  iconButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* Title */
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#202020',
    textAlign: 'center',
    marginTop: 2,
    marginBottom: 8,
  },

  /* Illustration */
  illustration: {
    width: '65%',
    height: 160,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 16,
  },

  /* Subtitle */
  subtitle: {
    fontSize: 18,
    color: '#252323ff',
    textAlign: 'center',
    marginBottom: 24,
  },

  /* Option Card */

  option:{
    gap: 10,
  },
  
  optionCard: {
    width: '100%',
    minHeight: 100,
    borderWidth: 1,
    borderColor: '#EFEFEF',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center',
    paddingHorizontal: 14,
    paddingVertical: 20,
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },

  selectedCard: {
    borderColor: '#3478DB',
    borderWidth: 1.5,
    backgroundColor: '#FFFFFF',
  },

  /* Icon Box */
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },

  employeeIconBox: {
    backgroundColor: '#EDF4FF',
  },

  employerIconBox: {
    backgroundColor: '#FFF5E7',
  },

  /* Text Content */
  optionContent: {
    flex: 1,
  },

  optionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222222',
    marginBottom: 4,
  },

  optionDescription: {
    fontSize: 14,
    lineHeight: 18,
    color: '#777777',
  },

  /* Continue Text Link */
  continueLinkContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },

  continueLinkText: {
    color: '#1a64d4ff',
    fontSize: 18,
    fontWeight: '900',
  },
});

export default styles;