import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',

  },
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginTop: 30,
    justifyContent: 'center', // Title in center
  },
  headerButton: {
    position: 'absolute',
    left: 24,
    width: 32,
    height: 32,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1A1A1A',
  },
  scrollBox: {
    paddingHorizontal: 24,
    paddingBottom: 80, // for bottom bar
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E8E8E8',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginRight: 16,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  profileDetails: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  profileInfoText: {
    fontSize: 14,
    color: '#555555',
    marginBottom: 2,
  },
  openToWorkBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#E9F7EF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 30,
  },
  openToWorkInfo: {
    flex: 1,
    marginRight: 10,
  },
  openToWorkTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  openToWorkSubtitle: {
    fontSize: 13,
    color: '#666666',
  },
  menuList: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    marginBottom: 4,
  },
  menuIcon: {
    width: 30,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333333',
  },
  menuBadge: {
    fontSize: 14,
    color: '#888888',
  },
  bottomTabs: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 65,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#EFEFEF',
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  tabText: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 4,
    color: '#888888',
  },
  tabTextActive: {
    color: '#1E3A8A', // Deep blue for active state
  },
});

export default styles;
