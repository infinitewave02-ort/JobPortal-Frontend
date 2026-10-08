import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, StatusBar, ScrollView, Alert, Modal } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
import { syncUser, registerUser } from '../../services/authService';
import styles from '../../styles/Employer/CompanyDetails';
import { useEmployer } from '../../context/EmployerContext';
import { AdminContext } from '../../context/AdminContext';

const CompanyDetails = ({ navigation }) => {
  const { updateEmployerProfile, clearEmployerProfile } = useEmployer();
  const { addEmployer } = React.useContext(AdminContext);

  // Clear any previous employer session when a new registration starts
  React.useEffect(() => { 
    clearEmployerProfile(); 
  }, [clearEmployerProfile]);

  const [companyName, setCompanyName] = useState('');
  const [industryType, setIndustryType] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isIndustryModalVisible, setIndustryModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const handleSaveAndContinue = async () => {
    let newErrors = {};
    if (!companyName.trim()) newErrors.companyName = true;
    if (!industryType.trim()) newErrors.industryType = true;
    if (!contactPerson.trim()) newErrors.contactPerson = true;
    if (!companyEmail.trim()) newErrors.companyEmail = true;
    if (!contactNumber.trim()) newErrors.contactNumber = true;
    if (!address.trim()) newErrors.address = true;
    if (!password) newErrors.password = true;
    if (password !== confirmPassword) newErrors.confirmPassword = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      Alert.alert('Incomplete Fields', 'Please fill in all details and ensure passwords match.');
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      await registerUser(companyEmail, password);
      
      const profileData = { companyName, industryType, contactPerson, companyEmail, contactNumber, address };
      await syncUser({ role: 'employer', companyName, contactPerson });
      updateEmployerProfile(profileData);
      navigation.navigate('CompanyProfile', profileData);
    } catch (err) {
      Alert.alert('Registration Failed', err.message || 'Could not register employer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <ScrollView contentContainerStyle={styles.container}>
        
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#1A1A24" />
          </TouchableOpacity>
          
        </View>

        <Text style={styles.title}>Company Details</Text>
        <Text style={styles.subtitle}>Tell us about your company</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Company Name</Text>
          <TextInput
            style={[styles.input, errors.companyName && styles.errorInput]}
            value={companyName}
            onChangeText={(text) => { setCompanyName(text); setErrors(prev => ({...prev, companyName: null})); }}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Industry Type</Text>
          <TouchableOpacity 
            style={[styles.inputWithIcon, errors.industryType && styles.errorInput]} 
            onPress={() => setIndustryModalVisible(true)}>
            <TextInput
              style={styles.inputText}
              value={industryType}
              editable={false}
            />
            <Ionicons name="chevron-down" size={20} color="#1A1A24" />
          </TouchableOpacity>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Contact Person</Text>
          <TextInput
            style={[styles.input, errors.contactPerson && styles.errorInput]}
            value={contactPerson}
            onChangeText={(text) => { setContactPerson(text); setErrors(prev => ({...prev, contactPerson: null})); }}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Company Email</Text>
          <TextInput
            style={[styles.input, errors.companyEmail && styles.errorInput]}
            value={companyEmail}
            onChangeText={(text) => { setCompanyEmail(text); setErrors(prev => ({...prev, companyEmail: null})); }}
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Contact Number</Text>
          <TextInput
            style={[styles.input, errors.contactNumber && styles.errorInput]}
            value={contactNumber}
            onChangeText={(text) => { setContactNumber(text); setErrors(prev => ({...prev, contactNumber: null})); }}
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Company Address</Text>
          <TextInput
            style={[styles.input, errors.address && styles.errorInput]}
            value={address}
            onChangeText={(text) => { setAddress(text); setErrors(prev => ({...prev, address: null})); }}
            multiline
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={[styles.input, errors.password && styles.errorInput]}
            value={password}
            onChangeText={(text) => { setPassword(text); setErrors(prev => ({...prev, password: null})); }}
            secureTextEntry
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Confirm Password</Text>
          <TextInput
            style={[styles.input, errors.confirmPassword && styles.errorInput]}
            value={confirmPassword}
            onChangeText={(text) => { setConfirmPassword(text); setErrors(prev => ({...prev, confirmPassword: null})); }}
            secureTextEntry
          />
        </View>

        <TouchableOpacity 
          style={[styles.button, loading && { opacity: 0.7 }]}
          onPress={handleSaveAndContinue}
          disabled={loading}
        >
          <Text style={styles.buttonText}>{loading ? 'Saving...' : 'Save & Continue'}</Text>
        </TouchableOpacity>

      </ScrollView>

      {/* Select Industry Modal */}
      <Modal visible={isIndustryModalVisible} transparent={true} animationType="fade">
        <TouchableOpacity 
          style={styles.modalBackdrop} 
          activeOpacity={1} 
          onPress={() => setIndustryModalVisible(false)}
        >
          <TouchableOpacity activeOpacity={1} style={styles.modalContainer}>
            <Text style={styles.modalHeader}>Select Industry</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
              {industries.map((item, index) => (
                <TouchableOpacity 
                  key={index}
                  style={styles.modalOption}
                  onPress={() => {
                    setIndustryType(item);
                    setErrors(prev => ({...prev, industryType: null}));
                    setIndustryModalVisible(false);
                  }}
                >
                  <Text style={styles.modalOptionText}>{item}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

    </SafeAreaView>
  );
};

export default CompanyDetails;
