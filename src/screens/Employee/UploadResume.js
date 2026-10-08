import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { pick, types, isErrorWithCode, errorCodes } from '@react-native-documents/picker';
import { uploadResume } from '../../services/resumeService';
import styles from '../../styles/Employee/UploadResume';
import { useEmployee } from '../../context/EmployeeContext';

const UploadResume = ({navigation, route}) => {
  const routeParams = route?.params || {};
  // isPostLogin = true means we came here from the Profile screen after login
  const isPostLogin = routeParams.isPostLogin === true;

  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const { employeeProfile, updateEmployeeProfile } = useEmployee();

  // Use full context profile as base when post-login; otherwise use registration params
  const baseData = isPostLogin ? employeeProfile : routeParams;

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
        // User canceled the picker, do nothing
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
      const uploadedFileUrl = returnedResume?.fileUrl || returnedResume?.resumeUrl;

      if (!uploadedFileUrl) {
        throw new Error('Backend did not return a file URL. Make sure the latest backend code is deployed and finished building on Render.');
      }

      const finalData = { ...baseData, resumeFile: uploadedFileUrl };
      updateEmployeeProfile(finalData);

      if (isPostLogin) {
        Alert.alert('Success', 'Your resume has been updated!', [
          { text: 'OK', onPress: () => navigation.goBack() },
        ]);
      } else {
        navigation.navigate('ProfileCreated', finalData);
      }
    } catch (error) {
      console.error('Upload Error:', error?.response?.data || error);
      
      const backendError = error?.response?.data?.error || error?.response?.data?.message || error?.response?.data?.details;
      const displayMsg = backendError || error.message || 'Could not upload resume.';
      
      Alert.alert('Upload Failed', displayMsg);
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

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header / Back button */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color="#1A1A1A" />
          </TouchableOpacity>
        </View>

        {/* Title */}
        <Text style={styles.title}>Upload Resume</Text>

        {/* Subtitle */}
        <Text style={styles.subtitle}>Upload your latest resume</Text>

        {/* Upload Box */}
        <TouchableOpacity 
          activeOpacity={0.7} 
          style={styles.uploadBox}
          onPress={handleSelectFile}>
          <View style={styles.uploadIconContainer}>
            <Icon name="cloud-upload-outline" size={42} color="#7E93D8" />
          </View>
          <Text style={styles.uploadBoxTitle}>Upload Resume</Text>
          <Text style={styles.uploadBoxSubtitle}>PDF, DOC, DOCX (Max 5MB)</Text>
        </TouchableOpacity>

        {/* Uploaded File Item */}
        {selectedFile && (
          <View style={styles.fileCard}>
            <View style={styles.fileInfo}>
              <Text style={styles.fileName}>{selectedFile.name}</Text>
              <Text style={styles.fileSize}>
                {selectedFile.size 
                  ? selectedFile.size < 1024 * 1024 
                    ? (selectedFile.size / 1024).toFixed(2) + ' KB' 
                    : (selectedFile.size / (1024 * 1024)).toFixed(2) + ' MB'
                  : 'Unknown size'}
              </Text>
            </View>
            <TouchableOpacity 
              style={styles.deleteIcon}
              onPress={handleDeleteFile}>
              <FeatherIcon name="x" size={20} color="#E74C3C" />
            </TouchableOpacity>
          </View>
        )}

        {/* Upload Button */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.uploadButton, loading && { opacity: 0.7 }]}
          onPress={handleUpload}
          disabled={loading}>
          <Text style={styles.uploadButtonText}>{loading ? 'Uploading...' : 'Upload'}</Text>
        </TouchableOpacity>

        {/* Skip For Now Button */}
        <TouchableOpacity 
          style={styles.skipButton}
          onPress={handleSkip}>
          <Text style={styles.skipButtonText}>{isPostLogin ? 'Cancel' : 'Skip for now'}</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
};

export default UploadResume;
