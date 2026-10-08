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
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A24',
  },
  
  dropdownContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EFEFEF',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  dropdownText: {
    fontSize: 14,
    color: '#1A1A24',
  },
  
  listContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#EFEFEF',
  },
  statLabel: {
    fontSize: 14,
    color: '#707070',
    marginBottom: 8,
    fontWeight: '600',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A24',
  },
  statRight: {
    alignItems: 'flex-end',
  },
  trendText: {
    fontSize: 14,
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
