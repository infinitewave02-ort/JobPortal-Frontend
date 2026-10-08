import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  tabItem: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginRight: 10,
  },
  activeTab: {
    backgroundColor: '#EEF2FF',
  },
  tabText: {
    fontSize: 14,
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
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: '#EFEFEF',
  },
  logoContainer: {
    width: 44,
    height: 44,
    backgroundColor: '#EEF2FF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  details: {
    flex: 1,
  },
  companyName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  timeText: {
    fontSize: 13,
    color: '#888',
    marginBottom: 4,
  },
  actionText: {
    fontSize: 13,
    color: '#555',
  }
});

export default styles;
