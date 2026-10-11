import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
  StatusBar,
  ActivityIndicator
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { pick, types, isErrorWithCode, errorCodes } from '@react-native-documents/picker';
import { uploadResume } from '../../services/resumeService';
import styles from '../../styles/Employee/UploadResume';
import { useEmployee } from '../../context/EmployeeContext';
import useViewResume from '../../hooks/useViewResume';

const UploadResume = ({ navigation, route }) => {
  const routeParams = route?.params || {};
  const isPostLogin = routeParams.isPostLogin === true;

  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [remoteResume, setRemoteResume] = useState(null);
  const [fetchingResume, setFetchingResume] = useState(false);
  const { employeeProfile, updateEmployeeProfile } = useEmployee();
  const { isLoading: isOpeningResume, openResume } = useViewResume();

  const baseData = isPostLogin ? employeeProfile : routeParams;
  const currentResume = baseData?.resumeFile || remoteResume || null;

  React.useEffect(() => {
    const fetchExistingResume = async () => {
      try {
        setFetchingResume(true);
        const { getResumes } = await import('../../services/resumeService');
        const res = await getResumes();
        const data = res?.data?.data || res?.data;
        if (Array.isArray(data) && data.length > 0) {
          const latest = data[data.length - 1];
          const uri = latest.downloadUrl || latest.fileUrl || latest.resumeUrl;
          if (uri) {
            const resObj = {
              name: latest.fileName || `${baseData?.fullName || baseData?.name || 'Candidate'}_Resume.pdf`,
              uri: uri,
              size: latest.fileSize,
              id: latest.id || latest.resumeId
            };
            setRemoteResume(resObj);
            updateEmployeeProfile({ resumeFile: uri });
          }
        }
      } catch (err) {
        // Silently catch if unauthenticated or no resumes yet
      } finally {
        setFetchingResume(false);
      }
    };

    if (!baseData?.resumeFile) {
      fetchExistingResume();
    }
  }, [baseData?.resumeFile]);

  const handleSelectFile = async () => {
    try {
      const res = await pick({
        type: [types.pdf, types.doc, types.docx],
      });
      if (res && res.length > 0) {
        const file = res[0];
        // 5MB Limit Validation
        if (file.size && file.size > 5 * 1024 * 1024) {
          Alert.alert('File Too Large', 'Please select a resume that is 5MB or smaller.');
          return;
        }
        setSelectedFile(file);
      }
    } catch (err) {
      if (isErrorWithCode(err) && err.code === errorCodes.OPERATION_CANCELED) {
        // User canceled
      } else {
        console.error('File pick error:', err);
      }
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      Alert.alert('Upload Required', 'Please select a resume to upload or tap "Skip for now".');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('resume', {
        uri: selectedFile.uri,
        name: selectedFile.name,
        type: selectedFile.type || 'application/pdf',
      });
      
      const response = await uploadResume(formData);
      const returnedResume = response?.data?.data || response?.data;
      const uploadedFileUrl = returnedResume?.fileUrl || returnedResume?.resumeUrl || returnedResume?.downloadUrl;

      if (!uploadedFileUrl) {
        throw new Error('Backend did not return a file URL. Please check server logs.');
      }

      const finalData = { ...baseData, resumeFile: uploadedFileUrl };
      updateEmployeeProfile(finalData);
      setSelectedFile(null);

      if (isPostLogin) {
        Alert.alert('Success', 'Your resume has been updated successfully!', [
          { text: 'OK', onPress: () => navigation.goBack() },
        ]);
      } else {
        navigation.navigate('ProfileCreated', finalData);
      }
    } catch (error) {
      console.error('Upload Error:', error?.response?.data || error);
      const backendError = error?.response?.data?.error || error?.response?.data?.message || error?.response?.data?.details;
      Alert.alert('Upload Failed', backendError || error.message || 'Could not upload resume.');
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = () => {
    if (isPostLogin) {
      navigation.goBack();
      return;
    }
    const skipData = { ...baseData, resumeFile: null };
    updateEmployeeProfile(skipData);
    navigation.navigate('ProfileCreated', skipData);
  };

  const handleDeleteFile = () => {
    setSelectedFile(null);
  };

  const handleViewCurrentResume = () => {
    if (currentResume) {
      const uri = typeof currentResume === 'object' ? currentResume.uri : currentResume;
      const name = typeof currentResume === 'object' ? currentResume.name : `${baseData?.fullName || baseData?.name || 'My'}_Resume.pdf`;
      navigation.navigate('ResumePreview', {
        resumeFile: { uri, name },
        candidateName: baseData?.fullName || baseData?.name || 'My Profile',
        candidateRole: baseData?.jobTitle || baseData?.role || 'Professional Candidate',
      });
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <ScrollView 
        style={styles.container} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Header / Back button */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Icon name="arrow-back" size={20} color="#0F172A" />
          </TouchableOpacity>
        </View>

        {/* Title */}
        <Text style={styles.title}>Resume Management</Text>
        <Text style={styles.subtitle}>Upload or view your active professional resume</Text>

        {/* Current Uploaded Resume Card (if already uploaded) */}
        {currentResume && (
          <View style={styles.currentResumeCard}>
            <View style={styles.currentHeaderRow}>
              <Text style={{ fontSize: 13, fontWeight: '700', color: '#64748B' }}>
                CURRENT RESUME
              </Text>
              <View style={styles.currentBadge}>
                <Icon name="checkmark-circle" size={13} color="#059669" />
                <Text style={styles.currentBadgeText}>Active & Listed</Text>
              </View>
            </View>

            <View style={styles.currentFileInfo}>
              <View style={styles.docIconWrap}>
                <Icon name="document-text" size={24} color="#DC2626" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.currentFileName} numberOfLines={1}>
                  {typeof currentResume === 'object' && currentResume?.name 
                    ? currentResume.name 
                    : (baseData?.fullName || baseData?.name || 'My') + '_Resume.pdf'}
                </Text>
                <Text style={styles.currentFileSub}>
                  Ready for employer applications & contact
                </Text>
              </View>
            </View>

            <View style={styles.currentActionsRow}>
              <TouchableOpacity 
                style={styles.viewResumeBtn}
                onPress={handleViewCurrentResume}
                activeOpacity={0.8}
                disabled={isOpeningResume}
              >
                {isOpeningResume ? (
                  <ActivityIndicator size="small" color="#FFFFFF" />
                ) : (
                  <>
                    <Icon name="eye-outline" size={16} color="#FFFFFF" />
                    <Text style={styles.viewResumeBtnText}>View Resume</Text>
                  </>
                )}
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.replaceResumeBtn}
                onPress={handleSelectFile}
                activeOpacity={0.7}
              >
                <FeatherIcon name="refresh-cw" size={14} color="#475569" />
                <Text style={styles.replaceResumeBtnText}>Replace File</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Upload Box */}
        <TouchableOpacity 
          activeOpacity={0.7} 
          style={styles.uploadBox}
          onPress={handleSelectFile}
        >
          <View style={styles.uploadIconContainer}>
            <Icon name="cloud-upload-outline" size={32} color="#4F46E5" />
          </View>
          <Text style={styles.uploadBoxTitle}>
            {currentResume ? 'Upload a New Resume' : 'Upload Your Resume'}
          </Text>
          <Text style={styles.uploadBoxSubtitle}>PDF, DOC, DOCX (Max 5MB)</Text>
        </TouchableOpacity>

        {/* Selected / Picked File Card */}
        {selectedFile && (
          <View style={styles.fileCard}>
            <View style={styles.fileInfo}>
              <Text style={styles.fileName} numberOfLines={1}>{selectedFile.name}</Text>
              <Text style={styles.fileSize}>
                {selectedFile.size 
                  ? selectedFile.size < 1024 * 1024 
                    ? (selectedFile.size / 1024).toFixed(1) + ' KB' 
                    : (selectedFile.size / (1024 * 1024)).toFixed(2) + ' MB'
                  : 'Selected Document'}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              {selectedFile.uri && (
                <TouchableOpacity
                  style={[styles.deleteIcon, { backgroundColor: '#EEF2FF', marginRight: 4 }]}
                  onPress={() => openResume(selectedFile)}
                  activeOpacity={0.7}
                >
                  <Icon name="eye-outline" size={17} color="#4F46E5" />
                </TouchableOpacity>
              )}
              <TouchableOpacity 
                style={styles.deleteIcon}
                onPress={handleDeleteFile}
                activeOpacity={0.7}
              >
                <FeatherIcon name="x" size={18} color="#EF4444" />
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Upload Button */}
        {selectedFile && (
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.uploadButton, loading && { opacity: 0.7 }]}
            onPress={handleUpload}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <>
                <Icon name="cloud-upload" size={18} color="#FFFFFF" />
                <Text style={styles.uploadButtonText}>Confirm & Upload</Text>
              </>
            )}
          </TouchableOpacity>
        )}

        {/* Skip / Cancel Button */}
        <TouchableOpacity 
          style={styles.skipButton}
          onPress={handleSkip}
          activeOpacity={0.7}
        >
          <Text style={styles.skipButtonText}>{isPostLogin ? 'Go Back' : 'Skip for now'}</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

export default UploadResume;
