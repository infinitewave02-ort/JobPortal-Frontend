import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    marginTop: 40,
    backgroundColor: '#FFFFFF',
  },
  header: {
    height: 42,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '800',
    color: '#1A1A1A',
    marginTop: 10,
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 15,
    color: '#555555',
    marginTop: 8,
    marginBottom: 30,
  },
  uploadBox: {
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#D0D8FF',
    backgroundColor: '#FAFAFF',
    borderRadius: 12,
    paddingVertical: 30,
    marginBottom: 20,
  },
  uploadIconContainer: {
    marginBottom: 10,
  },
  uploadBoxTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 5,
  },
  uploadBoxSubtitle: {
    fontSize: 13,
    color: '#888888',
  },
  fileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1.5,
    borderColor: '#E8E8E8',
    borderRadius: 12,
    padding: 16,
    marginBottom: 30,
  },
  fileInfo: {
    flex: 1,
  },
  fileName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  fileSize: {
    fontSize: 13,
    color: '#888888',
  },
  deleteIcon: {
    padding: 4,
  },
  uploadButton: {
    height: 52,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3478DB',
    borderRadius: 8,
  },
  uploadButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  skipButton: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  skipButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#3478DB',
  },
});

export default styles;
