import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFFFFF' },
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderColor: '#EFEFEF',
    marginTop:40 
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A24',
    marginLeft: 16,
  },
  
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F7F9',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#1A1A24',
    marginLeft: 8,
  },
  filterIcon: {
    marginLeft: 16,
  },
  
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EFEFEF',
    justifyContent: 'space-between',
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EAEAEA',
    marginRight: 12,
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1A1A24',
  },
  role: {
    fontSize: 12,
    color: '#707070',
    marginTop: 2,
  },
  email: {
    fontSize: 12,
    color: '#A0A0A0',
    marginTop: 2,
  },
  cardRight: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 4,
  },
  statusBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  activeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#3DD598',
  },
  
  footerButton: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  footerButtonText: {
    color: '#485ff4',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default styles;
