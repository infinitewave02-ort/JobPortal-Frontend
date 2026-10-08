import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFFFFF' },
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderColor: '#EFEFEF',
    marginTop:'40',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A24',
    marginLeft: 16,
  },
  
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 20,
  },
  card: {
    width: '48%',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 12,
    color: '#1A1A24',
    fontWeight: '600',
    marginBottom: 8,
  },
  cardValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1A1A24',
    marginBottom: 4,
  },
  cardSubValue: {
    fontSize: 10,
    color: '#707070',
  },
  
  // Sidebar Styles
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    flexDirection: 'row',
  },
  sidebarContainer: {
    width: '75%',
    backgroundColor: '#FFFFFF',
    height: '100%',
    paddingTop: 60,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  sidebarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  sidebarTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1A1A24',
    marginLeft: 12,
  },
  sidebarButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: '#EFEFEF',
  },
  sidebarButtonText: {
    fontSize: 16,
    color: '#1A1A24',
    marginLeft: 16,
    fontWeight: '500',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    marginTop: 'auto',
    marginBottom: 30,
  },
  logoutButtonText: {
    fontSize: 16,
    color: '#FF4B4B',
    marginLeft: 16,
    fontWeight: 'bold',
  }
});

export default styles;
