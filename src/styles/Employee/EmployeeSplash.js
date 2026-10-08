import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({

  // ==========================================
  // MAIN CONTAINER
  // ==========================================

  container: {
    flex: 1,
  },

  // ==========================================
  // HEADER
  // ==========================================

  header: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },

  backButton: {
    padding: 8,
    borderRadius: 20,
    // backgroundColor: 'rgba(255,255,255,0.2)',
  },

  // ==========================================
  // BLUE CARD
  // ==========================================

  card: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 15,  
    paddingTop: 120,
    paddingBottom: 30,
    justifyContent: 'space-between',
    elevation: 0,
    shadowColor: 'transparent',
  },


  // ==========================================
  // SECTIONS
  // ==========================================

  topSection: {
    alignItems: 'center',
  },

  bottomSection: {
    width: '100%',
    alignItems: 'center',
  },
  
  // ==========================================
  // LOGO CONTAINER
  // ==========================================

  logoContainer: {
    width: 180, // adjusting slightly in case it needs more space for image aspect ratio
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60,
  },

  logoImage: {
    width: '100%',
    height: '100%',
  },


  // ==========================================
  // TITLE
  // ==========================================

  title: {
    color: '#FFFFFF',
    fontSize: 32,
    lineHeight: 40,
    fontWeight: '700',
    textAlign: 'center',  
    marginTop: 28,
  },


  // ==========================================
  // SUBTITLE
  // ==========================================

  subtitle: {
    color: '#DDE9FF',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 15,
  },


  // ==========================================
  // EMPLOYEE BUTTON
  // ==========================================

  employeeButton: {
    width: '100%',
    height: 48,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  employeeText: {
    color: '#333333',
    fontSize: 14,
    fontWeight: '600',
  },


  // ==========================================
  // EMPLOYER BUTTON
  // ==========================================

  employerButton: {
    width: '100%',

    height: 48,

    borderWidth: 1.5,

    borderColor: '#FFFFFF',

    borderRadius: 8,

    alignItems: 'center',

    justifyContent: 'center',

    marginTop: 15,
  },

  employerText: {
    color: '#FFFFFF',

    fontSize: 14,

    fontWeight: '600',
  },

});

export default styles;
