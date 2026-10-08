import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  tabWrapper: {
      flexDirection: 'row',
      paddingHorizontal: 20,
      marginTop: 10,
      marginBottom: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#EFEFEF',
  },
  tabButton: {
      flex: 1,
      paddingVertical: 12,
      alignItems: 'center',
  },
  activeTabButton: {
      borderBottomWidth: 2,
      borderBottomColor: '#1E3A8A',
  },
  tabText: {
      fontSize: 15,
      color: '#666',
      fontWeight: '500',
  },
  activeTabText: {
      color: '#1E3A8A',
      fontWeight: '700',
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 90, 
  },
  chatRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  chatDetails: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  companyName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  unreadText: {
    fontWeight: '800',
    color: '#000',
  },
  timeText: {
    fontSize: 12,
    color: '#888',
  },
  unreadTime: {
    color: '#1A1A1A',
    fontWeight: '600',
  },
  chatMessageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  messageSnippet: {
    flex: 1,
    fontSize: 14,
    color: '#666',
    paddingRight: 10,
  },
  unreadSnippet: {
    color: '#333',
    fontWeight: '500',
  },
  badge: {
    backgroundColor: '#1E3A8A',
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
    shadowColor: '#1E3A8A',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  badgeText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '700',
  }
});

export default styles;
