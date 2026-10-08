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
  Modal,
  Alert,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { registerEmployee, loginUser, getMe } from '../../services/authService';
import { useEmployee } from '../../context/EmployeeContext';
import styles from '../../styles/Employee/CompleteProfile';

const CompleteProfile = ({navigation, route}) => {
  const { updateEmployeeProfile } = useEmployee();
  const previousData = route?.params || {};
  const [skills, setSkills] = useState('');
  const [expectedSalary, setExpectedSalary] = useState('');
  const [noticePeriod, setNoticePeriod] = useState('');
  const [gender, setGender] = useState('');
  const [isGenderModalVisible, setIsGenderModalVisible] = useState(false);
  const [isNoticePeriodModalVisible, setIsNoticePeriodModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const noticePeriodOptions = [
    'Immediate',
    '15 Days',
    '30 Days',
    '45 Days',
    '60 Days',
    '90 Days'
  ];

  const handleGenderSelect = (selectedGender) => {
    setGender(selectedGender);
    setIsGenderModalVisible(false);
  };
  const handleSaveAndContinue = async () => {
    if (!skills || !expectedSalary || !noticePeriod || !gender) {
      Alert.alert('Validation Error', 'Please complete all fields.');
      return;
    }
    setLoading(true);
    try {
      let formattedSkills = [];
      if (typeof skills === 'string') {
        formattedSkills = skills.split(',').map(s => s.trim()).filter(Boolean);
      } else {
        formattedSkills = skills;
      }
      
      const allData = { 
        ...previousData, 
        skills: formattedSkills, 
        expectedSalary: Number(expectedSalary) || 0, 
        noticePeriod, 
        gender 
      };
      
      // Remove any undefined fields to prevent Firestore crashes
      Object.keys(allData).forEach(key => {
        if (allData[key] === undefined) {
          allData[key] = null;
        }
      });

      // 1. Register user in backend
      await registerEmployee(allData);

      // 2. Try to log them in to Firebase
      try {
        await loginUser(allData.email, allData.password);
      } catch (authError) {
        console.warn('Firebase login warning after registration:', authError.message || authError);
      }

      // 3. Try to fetch profile and update context
      try {
        if (typeof updateEmployeeProfile === 'function') {
          const response = await getMe();
          const resUser = response?.data?.data || response?.data?.user || response?.data;
          if (resUser) {
            updateEmployeeProfile(resUser);
          } else {
            updateEmployeeProfile(allData);
          }
        }
      } catch (fetchErr) {
        if (typeof updateEmployeeProfile === 'function') {
          updateEmployeeProfile(allData);
        }
      }
      
      navigation.navigate('UploadResume', allData);
    } catch (error) {
      console.error('Registration Error:', error);
      let errMsg = 'An unexpected error occurred';
      
      if (error?.response?.data?.message) {
        errMsg = error.response.data.message;
      } else if (error?.message) {
        errMsg = error.message;
      }
      
      Alert.alert('Registration Failed', errMsg);
    } finally {
      setLoading(false);
    }
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
            <Text style={styles.title}>Complete Profile</Text>

            {/* Subtitle */}
            <Text style={styles.subtitle}>Add more details</Text>

            {/* Skills */}
            <Text style={styles.inputLabel}>Skills</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={skills}
                onChangeText={setSkills}
                autoCapitalize="words"
              />
            </View>

            {/* Expected Salary */}
            <Text style={styles.inputLabel}>Expected Salary (₹/month)</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={expectedSalary}
                onChangeText={setExpectedSalary}
                keyboardType="numeric"
              />
            </View>

            {/* Notice Period */}
            <Text style={styles.inputLabel}>Notice Period</Text>
            <TouchableOpacity 
              activeOpacity={0.8} 
              style={[styles.inputContainer, { flexDirection: 'row', alignItems: 'center' }]}
              onPress={() => setIsNoticePeriodModalVisible(true)}
            >
              <TextInput
                style={[styles.input, { flex: 1 }]}
                value={noticePeriod}
                placeholder="Select Notice Period"
                editable={false}
                pointerEvents="none"
              />
              <View style={styles.iconContainer}>
                <Icon name="chevron-down" size={20} color="#A0A0A0" />
              </View>
            </TouchableOpacity>

            {/* Gender */}
            <Text style={styles.inputLabel}>Gender</Text>
            <TouchableOpacity 
              activeOpacity={0.8} 
              style={styles.inputContainer}
              onPress={() => setIsGenderModalVisible(true)}
            >
              <TextInput
                style={styles.input}
                value={gender}
                editable={false} // It functions more like a dropdown
                pointerEvents="none"
              />
              <View style={styles.iconContainer}>
                <Icon name="chevron-down" size={20} color="#A0A0A0" />
              </View>
            </TouchableOpacity>

            {/* Save & Continue Button */}
            <TouchableOpacity
              activeOpacity={0.8}
              style={[styles.saveButton, loading && { opacity: 0.7 }]}
              onPress={handleSaveAndContinue}
              disabled={loading}>
              <Text style={styles.saveButtonText}>{loading ? 'Registering...' : 'Save & Continue'}</Text>
            </TouchableOpacity>

          </View>
        </ScrollView>
        
        {/* Gender Selection Modal */}
        <Modal
          visible={isGenderModalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setIsGenderModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Select Gender</Text>
              
              <TouchableOpacity 
                style={styles.modalOption}
                onPress={() => handleGenderSelect('Male')}>
                <Text style={styles.modalOptionText}>Male</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.modalOption}
                onPress={() => handleGenderSelect('Female')}>
                <Text style={styles.modalOptionText}>Female</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.modalOption}
                onPress={() => handleGenderSelect('Other')}>
                <Text style={styles.modalOptionText}>Other</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.modalCancelButton}
                onPress={() => setIsGenderModalVisible(false)}>
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Notice Period Modal */}
        <Modal visible={isNoticePeriodModalVisible} transparent={true} animationType="slide" onRequestClose={() => setIsNoticePeriodModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Select Notice Period</Text>
              <ScrollView showsVerticalScrollIndicator={false} style={{ maxHeight: 200, width: '100%' }}>
                {noticePeriodOptions.map((item, index) => (
                  <TouchableOpacity 
                    key={index}
                    style={styles.modalOption}
                    onPress={() => {
                      setNoticePeriod(item);
                      setIsNoticePeriodModalVisible(false);
                    }}
                  >
                    <Text style={styles.modalOptionText}>{item}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <TouchableOpacity 
                style={styles.modalCancelButton}
                onPress={() => setIsNoticePeriodModalVisible(false)}>
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CompleteProfile;
