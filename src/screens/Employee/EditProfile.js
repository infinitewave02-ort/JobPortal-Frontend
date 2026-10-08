import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Alert,
  Image,
  Platform,
  PermissionsAndroid,
  Modal,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { launchImageLibrary } from 'react-native-image-picker';
import styles from '../../styles/Employee/EditProfile';
import { useEmployee } from '../../context/EmployeeContext';
import { updateUserProfile, uploadProfileImage } from '../../services/profileService';

const EditEmployeeProfile = ({ navigation }) => {
  const { employeeProfile, updateEmployeeProfile } = useEmployee();

  const [name, setName]                       = useState(employeeProfile?.fullName         || '');
  const [role, setRole]                       = useState(employeeProfile?.jobTitle         || '');
  const [email, setEmail]                     = useState(employeeProfile?.email            || '');
  const [phone, setPhone]                     = useState(employeeProfile?.phone            || '');
  const [location, setLocation]               = useState(employeeProfile?.currentLocation  || '');
  const [preferredLocation, setPreferredLocation] = useState(employeeProfile?.preferredLocation || '');
  const [qualification, setQualification]     = useState(employeeProfile?.qualification    || '');
  const [skills, setSkills]                   = useState(employeeProfile?.skills           || '');
  const [experience, setExperience]           = useState(employeeProfile?.experience       || '');
  const [expectedSalary, setExpectedSalary]   = useState(employeeProfile?.expectedSalary   || '');
  const [noticePeriod, setNoticePeriod]       = useState(employeeProfile?.noticePeriod     || '');
  const [gender, setGender]                   = useState(employeeProfile?.gender           || '');
  const [profileImage, setProfileImage]       = useState(employeeProfile?.profileImage     || null);
  const [isGenderModalVisible, setIsGenderModalVisible] = useState(false);
  const [isExperienceModalVisible, setIsExperienceModalVisible] = useState(false);
  const [isNoticePeriodModalVisible, setIsNoticePeriodModalVisible] = useState(false);
  const [saving, setSaving] = useState(false);
  const [selectedImageFile, setSelectedImageFile] = useState(null);

  const experienceOptions = [
    'Fresher',
    '1 Year',
    '2 Years',
    '3 Years',
    '4 Years',
    '5+ Years'
  ];

  const noticePeriodOptions = [
    'Immediate',
    '15 Days',
    '30 Days',
    '45 Days',
    '60 Days',
    '90 Days'
  ];

  // ── Request photo permission (Android) ──
  const requestPhotoPermission = async () => {
    if (Platform.OS !== 'android') return true;
    try {
      if (Platform.Version >= 33) {
        // Android 13+
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          {
            title: 'Photo Access Permission',
            message: 'This app needs access to your photos to upload a profile picture.',
            buttonPositive: 'Allow',
            buttonNegative: 'Cancel',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } else {
        // Android 12 and below
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission',
            message: 'This app needs access to your storage to upload a profile picture.',
            buttonPositive: 'Allow',
            buttonNegative: 'Cancel',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      }
    } catch {
      return false;
    }
  };

  // ── Image Picker ──
  const handlePickImage = async () => {
    const hasPermission = await requestPhotoPermission();
    if (!hasPermission) {
      Alert.alert(
        'Permission Denied',
        'Please allow photo access in your device Settings to upload a profile picture.',
      );
      return;
    }
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        selectionLimit: 1,
        includeBase64: false,
        quality: 0.8,
      });

      if (result.didCancel) return;
      if (result.errorCode) {
        Alert.alert('Error', result.errorMessage || 'Could not open image picker.');
        return;
      }
      if (result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        setProfileImage(asset.uri);
        setSelectedImageFile(asset);
      }
    } catch (err) {
      Alert.alert('Error', 'Something went wrong while selecting the image.');
    }
  };

  const handleSave = async () => {
    // Client-side validation
    if (name.trim().length < 2) {
      Alert.alert('Validation Error', 'Full name must be at least 2 characters.');
      return;
    }
    if (email.trim() && !email.includes('@')) {
      Alert.alert('Validation Error', 'Please enter a valid email address.');
      return;
    }

    setSaving(true);

    try {
      // 1. Upload image if a new one was selected
      let uploadedImageUrl = profileImage;
      if (selectedImageFile) {
        try {
          const formData = new FormData();
          formData.append('profileImage', {
            uri: selectedImageFile.uri,
            type: selectedImageFile.type || 'image/jpeg',
            name: selectedImageFile.fileName || 'profile.jpg',
          });
          const imgRes = await uploadProfileImage(formData);
          const imgData = imgRes?.data?.data || imgRes?.data;
          if (imgData?.profileImage) {
            uploadedImageUrl = imgData.profileImage;
          }
        } catch (imgErr) {
          console.warn('Image upload failed, continuing with text update:', imgErr.message);
        }
      }

      // 2. Update profile fields via API
      const profileData = {
        fullName: name.trim(),
        jobTitle: role.trim(),
        email: email.trim(),
        phone: phone.trim(),
        currentLocation: location.trim(),
        preferredLocation: preferredLocation.trim(),
        qualification: qualification.trim(),
        skills,
        experience,
        expectedSalary,
        noticePeriod,
        gender,
      };

      const response = await updateUserProfile(profileData);
      const updatedData = response?.data?.data || response?.data?.user || response?.data;

      // 3. Update local context with the server response
      const contextData = {
        ...employeeProfile,
        ...(updatedData || profileData),
        profileImage: uploadedImageUrl,
      };
      updateEmployeeProfile(contextData);

      Alert.alert('Success', 'Profile updated successfully!');
      navigation.goBack();
    } catch (err) {
      console.error('Profile update error:', err);
      const errorMsg = err?.response?.data?.message || err?.message || 'Failed to update profile. Please try again.';
      Alert.alert('Error', errorMsg);
    } finally {
      setSaving(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Loading overlay */}
      {saving && (
        <View style={localStyles.loadingOverlay}>
          <ActivityIndicator size="large" color="#1E3A8A" />
          <Text style={localStyles.loadingText}>Saving profile...</Text>
        </View>
      )}

      {/* ScrollView wraps everything — no flex:1 on contentContainerStyle */}
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#1A1A24" />
          </TouchableOpacity>
          <Text style={styles.title}>Edit Profile</Text>
        </View>

        {/* Profile Image Upload */}
        <View style={styles.imageUploadContainer}>
          <TouchableOpacity onPress={handlePickImage} activeOpacity={0.8}>
            <View style={styles.imageCircle}>
              {profileImage ? (
                <Image
                  source={{ uri: profileImage }}
                  style={{ width: 100, height: 100, borderRadius: 50 }}
                />
              ) : (
                <Ionicons name="person" size={50} color="#AEAEAE" />
              )}
              <View style={styles.cameraBadge}>
                <Ionicons name="camera" size={16} color="#FFFFFF" />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handlePickImage}>
            <Text style={styles.uploadText}>Upload Photo</Text>
          </TouchableOpacity>
        </View>

        {/* Full Name */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter full name"
            placeholderTextColor="#BDBDBD"
          />
        </View>

        {/* Job Title */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Job Title / Role</Text>
          <TextInput
            style={styles.input}
            value={role}
            onChangeText={setRole}
            placeholder="e.g. Software Engineer"
            placeholderTextColor="#BDBDBD"
          />
        </View>

        {/* Email */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter email"
            placeholderTextColor="#BDBDBD"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Phone */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            placeholder="Enter phone number"
            placeholderTextColor="#BDBDBD"
            keyboardType="phone-pad"
          />
        </View>

        {/* Location */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Current Location</Text>
          <TextInput
            style={styles.input}
            value={location}
            onChangeText={setLocation}
            placeholder="City, State"
            placeholderTextColor="#BDBDBD"
          />
        </View>

        {/* Preferred Location */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Preferred Location</Text>
          <TextInput
            style={styles.input}
            value={preferredLocation}
            onChangeText={setPreferredLocation}
            placeholder="e.g. Remote, New York"
            placeholderTextColor="#BDBDBD"
          />
        </View>

        {/* Qualification */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Qualification</Text>
          <TextInput
            style={styles.input}
            value={qualification}
            onChangeText={setQualification}
            placeholder="e.g. B.Tech, MBA"
            placeholderTextColor="#BDBDBD"
          />
        </View>

        {/* Experience */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Experience</Text>
          <TouchableOpacity 
            activeOpacity={0.8} 
            style={[styles.input, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]} 
            onPress={() => setIsExperienceModalVisible(true)}
          >
            <Text style={{ color: experience ? '#1A1A24' : '#BDBDBD' }}>
              {experience || 'Select Experience'}
            </Text>
            <Ionicons name="chevron-down" size={20} color="#1A1A24" />
          </TouchableOpacity>
        </View>

        {/* Expected Salary */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Expected Salary</Text>
          <TextInput
            style={styles.input}
            value={expectedSalary}
            onChangeText={setExpectedSalary}
            placeholder="e.g. ₹5,00,000 per annum"
            placeholderTextColor="#BDBDBD"
          />
        </View>

        {/* Notice Period */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Notice Period</Text>
          <TouchableOpacity 
            activeOpacity={0.8} 
            style={[styles.input, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]} 
            onPress={() => setIsNoticePeriodModalVisible(true)}
          >
            <Text style={{ color: noticePeriod ? '#1A1A24' : '#BDBDBD' }}>
              {noticePeriod || 'Select Notice Period'}
            </Text>
            <Ionicons name="chevron-down" size={20} color="#1A1A24" />
          </TouchableOpacity>
        </View>

        {/* Gender */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Gender</Text>
          <TouchableOpacity 
            activeOpacity={0.8} 
            style={[styles.input, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]} 
            onPress={() => setIsGenderModalVisible(true)}
          >
            <Text style={{ color: gender ? '#1A1A24' : '#BDBDBD' }}>
              {gender || 'Male / Female / Other'}
            </Text>
            <Ionicons name="chevron-down" size={20} color="#1A1A24" />
          </TouchableOpacity>
        </View>

        {/* Skills */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Skills (comma separated)</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={skills}
            onChangeText={setSkills}
            placeholder="e.g. React Native, JavaScript, Node.js"
            placeholderTextColor="#BDBDBD"
            multiline={true}
            numberOfLines={3}
          />
        </View>

        {/* Save Button */}
        <TouchableOpacity 
          style={[styles.button, saving && { opacity: 0.6 }]} 
          onPress={handleSave}
          disabled={saving}
        >
          <Text style={styles.buttonText}>{saving ? 'Saving...' : 'Save Changes'}</Text>
        </TouchableOpacity>

      </ScrollView>

      {/* Select Gender Modal */}
      <Modal visible={isGenderModalVisible} transparent={true} animationType="fade">
        <TouchableOpacity 
          style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center' }} 
          activeOpacity={1} 
          onPress={() => setIsGenderModalVisible(false)}
        >
          <TouchableOpacity activeOpacity={1} style={{ backgroundColor: '#fff', width: '80%', borderRadius: 12, padding: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#1A1A24', marginBottom: 15 }}>Select Gender</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
              {['Male', 'Female', 'Other'].map((item, index) => (
                <TouchableOpacity 
                  key={index}
                  style={{ paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' }}
                  onPress={() => {
                    setGender(item);
                    setIsGenderModalVisible(false);
                  }}
                >
                  <Text style={{ fontSize: 16, color: '#333' }}>{item}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

      {/* Select Experience Modal */}
      <Modal visible={isExperienceModalVisible} transparent={true} animationType="fade">
        <TouchableOpacity 
          style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center' }} 
          activeOpacity={1} 
          onPress={() => setIsExperienceModalVisible(false)}
        >
          <TouchableOpacity activeOpacity={1} style={{ backgroundColor: '#fff', width: '80%', borderRadius: 12, padding: 20, maxHeight: '60%' }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#1A1A24', marginBottom: 15 }}>Select Experience</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
              {experienceOptions.map((item, index) => (
                <TouchableOpacity 
                  key={index}
                  style={{ paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' }}
                  onPress={() => {
                    setExperience(item);
                    setIsExperienceModalVisible(false);
                  }}
                >
                  <Text style={{ fontSize: 16, color: '#333' }}>{item}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

      {/* Select Notice Period Modal */}
      <Modal visible={isNoticePeriodModalVisible} transparent={true} animationType="fade">
        <TouchableOpacity 
          style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center' }} 
          activeOpacity={1} 
          onPress={() => setIsNoticePeriodModalVisible(false)}
        >
          <TouchableOpacity activeOpacity={1} style={{ backgroundColor: '#fff', width: '80%', borderRadius: 12, padding: 20, maxHeight: '60%' }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#1A1A24', marginBottom: 15 }}>Select Notice Period</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
              {noticePeriodOptions.map((item, index) => (
                <TouchableOpacity 
                  key={index}
                  style={{ paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' }}
                  onPress={() => {
                    setNoticePeriod(item);
                    setIsNoticePeriodModalVisible(false);
                  }}
                >
                  <Text style={{ fontSize: 16, color: '#333' }}>{item}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

    </SafeAreaView>
  );
};

const localStyles = {
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 15,
    color: '#1E3A8A',
    fontWeight: '600',
  },
};

export default EditEmployeeProfile;
