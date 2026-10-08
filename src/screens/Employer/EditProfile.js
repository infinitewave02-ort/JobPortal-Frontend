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
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { launchImageLibrary } from 'react-native-image-picker';
import styles from '../../styles/Employer/EditProfile';
import { useEmployer } from '../../context/EmployerContext';

const EditEmployerProfile = ({ navigation }) => {
  const { employerProfile, updateEmployerProfile } = useEmployer();

  // Load actual user data instead of hardcoded strings
  const [companyName, setCompanyName] = useState(employerProfile?.companyName || '');
  const [industry, setIndustry] = useState(employerProfile?.industryType || '');
  const [location, setLocation] = useState(employerProfile?.address || '');
  const [website, setWebsite] = useState(employerProfile?.website || '');
  const [contactPerson, setContactPerson] = useState(employerProfile?.contactPerson || '');
  const [email, setEmail] = useState(employerProfile?.companyEmail || '');
  const [contactNumber, setContactNumber] = useState(employerProfile?.contactNumber || '');
  const [companyLogo, setCompanyLogo] = useState(employerProfile?.companyLogo || null);
  const [isIndustryModalVisible, setIsIndustryModalVisible] = useState(false);
  
  const industries = [
    'IT & Software',
    'Education',
    'Healthcare & Medical',
    'Banking / Finance',
    'Automobile / Manufacturing',
    'Real Estate',
    'Retail / eCommerce',
    'Logistics & Transport',
    'Others'
  ];

  // ── Request photo permission (Android) ──
  const requestPhotoPermission = async () => {
    if (Platform.OS !== 'android') return true;
    try {
      if (Platform.Version >= 33) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          {
            title: 'Photo Access Permission',
            message: 'This app needs access to your photos to upload a company logo.',
            buttonPositive: 'Allow',
            buttonNegative: 'Cancel',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } else {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission',
            message: 'This app needs access to your storage to upload a company logo.',
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
        'Please allow photo access in your device Settings to upload a logo.',
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
        setCompanyLogo(result.assets[0].uri);
      }
    } catch (err) {
      Alert.alert('Error', 'Something went wrong while selecting the image.');
    }
  };

  const handleSave = async () => {
    const updatedData = {
      ...employerProfile,
      companyName,
      industryType: industry,
      address: location,
      website,
      contactPerson,
      companyEmail: email,
      contactNumber,
      companyLogo
    };

    try {
      const { updateCompanyProfile } = require('../../services/employerService');
      await updateCompanyProfile({
        companyName,
        industryType: industry,
        address: location,
        website,
        contactPerson,
        contactNumber,
      });
    } catch (err) {
      console.log('Backend profile sync note:', err.message);
    }

    updateEmployerProfile(updatedData);
    Alert.alert('Success', 'Company profile updated successfully!');
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>

        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#1A1A24" />
          </TouchableOpacity>
          <Text style={styles.title}>Edit Company Profile</Text>
        </View>

        <View style={styles.imageUploadContainer}>
          <TouchableOpacity onPress={handlePickImage} activeOpacity={0.8}>
            <View style={styles.imageCircle}>
              {companyLogo ? (
                <Image
                  source={{ uri: companyLogo }}
                  style={{ width: 100, height: 100, borderRadius: 50 }}
                />
              ) : (
                <Ionicons name="business" size={50} color="#AEAEAE" />
              )}
              <View style={styles.cameraBadge}>
                <Ionicons name="camera" size={16} color="#FFFFFF" />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handlePickImage}>
            <Text style={styles.uploadText}>Upload Image</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Company Name</Text>
          <TextInput style={styles.input} value={companyName} onChangeText={setCompanyName} placeholder="Company Name" />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Industry</Text>
          <TouchableOpacity 
            activeOpacity={0.8} 
            style={[styles.input, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]} 
            onPress={() => setIsIndustryModalVisible(true)}
          >
            <Text style={{ color: industry ? '#1A1A24' : '#BDBDBD' }}>
              {industry || 'Select Industry type'}
            </Text>
            <Ionicons name="chevron-down" size={20} color="#1A1A24" />
          </TouchableOpacity>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Location</Text>
          <TextInput style={styles.input} value={location} onChangeText={setLocation} placeholder="Company Location" />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Website</Text>
          <TextInput style={styles.input} value={website} onChangeText={setWebsite} keyboardType="url" placeholder="Company website" />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Contact Person</Text>
          <TextInput style={styles.input} value={contactPerson} onChangeText={setContactPerson} placeholder="Full Name" />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Contact Number</Text>
          <TextInput style={styles.input} value={contactNumber} onChangeText={setContactNumber} keyboardType="phone-pad" placeholder="Phone Number" />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Company Email</Text>
          <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" placeholder="Email Address" />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Save Changes</Text>
        </TouchableOpacity>

      </ScrollView>

      {/* Select Industry Modal */}
      <Modal visible={isIndustryModalVisible} transparent={true} animationType="fade">
        <TouchableOpacity 
          style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center' }} 
          activeOpacity={1} 
          onPress={() => setIsIndustryModalVisible(false)}
        >
          <TouchableOpacity activeOpacity={1} style={{ backgroundColor: '#fff', width: '85%', maxHeight: '60%', borderRadius: 12, padding: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#1A1A24', marginBottom: 15 }}>Select Industry</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
              {industries.map((item, index) => (
                <TouchableOpacity 
                  key={index}
                  style={{ paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' }}
                  onPress={() => {
                    setIndustry(item);
                    setIsIndustryModalVisible(false);
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

export default EditEmployerProfile;
