import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  searchHeader: {
      flexDirection: 'row',
      paddingHorizontal: 20,
      marginTop: 10,
      marginBottom: 10,
      alignItems: 'center',
  },
  searchInputContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#EFEFEF',
      borderRadius: 12,
      paddingHorizontal: 16,
      height: 48,
      backgroundColor: '#FAFAFA',
  },
  searchIcon: {
      marginRight: 10,
  },
  searchInput: {
      flex: 1,
      fontSize: 15,
      color: '#333',
  },
  filterBtn: {
      marginLeft: 16,
      padding: 10,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 90, 
  },
  jobCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#EFEFEF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  jobHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  logoPlaceholder: {
    width: 44,
    height: 44,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  jobInfo: {
    flex: 1,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  companyName: {
    fontSize: 14,
    color: '#555',
  },
  jobMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  metaText: {
    fontSize: 14,
    color: '#444',
    marginLeft: 6,
    fontWeight: '500',
  },
  bottomRow: {
    alignItems: 'flex-end',
    borderTopWidth: 1,
    borderColor: '#F0F0F0',
    paddingTop: 12,
  },
  postedText: {
    fontSize: 12,
    color: '#999',
  }
});

export default styles;
