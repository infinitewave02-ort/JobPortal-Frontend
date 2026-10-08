import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    marginTop: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    position: 'absolute',
    top: 40,
    left: 24,
    right: 24,
    height: 42,
    flexDirection: 'row',
  },
  headerButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#2EBA63',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '800',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 15,
    color: '#555555',
    lineHeight: 22,
    marginBottom: 40,
  },
  actionButton: {
    height: 52,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3478DB',
    borderRadius: 8,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

export default styles;
