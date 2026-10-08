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
    // "file top all backe in one line" -> ensures elements stay inline
  },
  backButton: {
    padding: 5,
    marginRight: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1A1A24',
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#EFEFEF',
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1A1A24',
    marginLeft: 10,
  },
  searchButton: {
    backgroundColor: '#485ff4',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  searchButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default styles;
