import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  Modal,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../../styles/Employee/BasicDetails';

const BasicDetails = ({navigation, route}) => {
  const { fullName, email, password } = route.params || {};
  const [jobTitle, setJobTitle] = useState('');
  const [experience, setExperience] = useState('');
  const [qualification, setQualification] = useState('');
  const [currentLocation, setCurrentLocation] = useState('');
  const [preferredLocation, setPreferredLocation] = useState('');
  const [errors, setErrors] = useState({});
  const [isExperienceModalVisible, setIsExperienceModalVisible] = useState(false);
  const [isQualificationModalVisible, setIsQualificationModalVisible] = useState(false);

  const experienceOptions = [
    'Fresher',
    '1 Year',
    '2 Years',
    '3 Years',
    '4 Years',
    '5+ Years'
  ];

  const qualificationOptions = [
    'High School',
    'Diploma',
    'B.Tech / B.E.',
    'B.Sc',
    'B.Com',
    'B.A.',
    'M.Tech / M.E.',
    'M.Sc',
    'MBA',
    'MCA',
    'PhD',
    'Other'
  ];

  const handleSaveAndContinue = () => {
    let newErrors = {};
    if (!jobTitle.trim()) newErrors.jobTitle = true;
    if (!experience.trim()) newErrors.experience = true;
    if (!qualification.trim()) newErrors.qualification = true;
    if (!currentLocation.trim()) newErrors.currentLocation = true;
    if (!preferredLocation.trim()) newErrors.preferredLocation = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      Alert.alert('Incomplete Fields', 'Please fill out all basic details.');
      return;
    }

    setErrors({});
    navigation.navigate('CompleteProfile', {
      fullName,
      email,
      password,
      jobTitle,
      experience,
      qualification,
      currentLocation,
      preferredLocation,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        
        <ScrollView contentContainerStyle={{flexGrow: 1}} showsVerticalScrollIndicator={false}>
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
            <Text style={styles.title}>Basic Details</Text>

            {/* Subtitle */}
            <Text style={styles.subtitle}>Tell us about yourself</Text>

            {/* Current Job Title */}
            <Text style={styles.inputLabel}>Current Job Title</Text>
            <View style={[styles.inputContainer, errors.jobTitle && styles.errorInput]}>
              <TextInput
                style={styles.input}
                value={jobTitle}
                onChangeText={(text) => { setJobTitle(text); setErrors(prev => ({...prev, jobTitle: null})); }}
                autoCapitalize="words"
              />
            </View>

            {/* Experience */}
            <Text style={styles.inputLabel}>Experience</Text>
            <TouchableOpacity 
              activeOpacity={0.8} 
              style={[styles.inputContainer, errors.experience && styles.errorInput, { flexDirection: 'row', alignItems: 'center' }]}
              onPress={() => setIsExperienceModalVisible(true)}
            >
              <TextInput
                style={[styles.input, { flex: 1 }]}
                value={experience}
                placeholder="Select Experience"
                editable={false}
                pointerEvents="none"
              />
              <Icon name="chevron-down" size={20} color="#666" style={{ marginRight: 10 }} />
            </TouchableOpacity>

            {/* Qualification */}
            <Text style={styles.inputLabel}>Qualification</Text>
            <TouchableOpacity 
              activeOpacity={0.8} 
              style={[styles.inputContainer, errors.qualification && styles.errorInput, { flexDirection: 'row', alignItems: 'center' }]}
              onPress={() => setIsQualificationModalVisible(true)}
            >
              <TextInput
                style={[styles.input, { flex: 1 }]}
                value={qualification}
                placeholder="Select Qualification"
                editable={false}
                pointerEvents="none"
              />
              <Icon name="chevron-down" size={20} color="#666" style={{ marginRight: 10 }} />
            </TouchableOpacity>

            {/* Current Location */}
            <Text style={styles.inputLabel}>Current Location</Text>
            <View style={[styles.inputContainer, errors.currentLocation && styles.errorInput]}>
              <TextInput
                style={styles.input}
                value={currentLocation}
                onChangeText={(text) => { setCurrentLocation(text); setErrors(prev => ({...prev, currentLocation: null})); }}
                autoCapitalize="words"
              />
            </View>

            {/* Preferred Location */}
            <Text style={styles.inputLabel}>Preferred Location</Text>
            <View style={[styles.inputContainer, errors.preferredLocation && styles.errorInput]}>
              <TextInput
                style={styles.input}
                value={preferredLocation}
                onChangeText={(text) => { setPreferredLocation(text); setErrors(prev => ({...prev, preferredLocation: null})); }}
                autoCapitalize="words"
              />
            </View>

            {/* Save & Continue Button */}
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.saveButton}
              onPress={handleSaveAndContinue}>
              <Text style={styles.saveButtonText}>Save & Continue</Text>
            </TouchableOpacity>

          </View>
        </ScrollView>
        
        {/* Experience Modal */}
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
                      setErrors(prev => ({...prev, experience: null}));
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

        {/* Qualification Modal */}
        <Modal visible={isQualificationModalVisible} transparent={true} animationType="fade">
          <TouchableOpacity 
            style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center' }} 
            activeOpacity={1} 
            onPress={() => setIsQualificationModalVisible(false)}
          >
            <TouchableOpacity activeOpacity={1} style={{ backgroundColor: '#fff', width: '80%', borderRadius: 12, padding: 20, maxHeight: '60%' }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#1A1A24', marginBottom: 15 }}>Select Qualification</Text>
              <ScrollView showsVerticalScrollIndicator={false}>
                {qualificationOptions.map((item, index) => (
                  <TouchableOpacity 
                    key={index}
                    style={{ paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' }}
                    onPress={() => {
                      setQualification(item);
                      setErrors(prev => ({...prev, qualification: null}));
                      setIsQualificationModalVisible(false);
                    }}
                  >
                    <Text style={{ fontSize: 16, color: '#333' }}>{item}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </TouchableOpacity>
          </TouchableOpacity>
        </Modal>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default BasicDetails;
