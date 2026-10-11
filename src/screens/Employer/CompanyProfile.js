import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, StatusBar, ScrollView, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../../styles/Employer/CompanyProfile';
import { AdminContext } from '../../context/AdminContext';
import { useEmployer } from '../../context/EmployerContext';

const CompanyProfile = ({ navigation, route }) => {
  const previousData = route?.params || {};
  const [location, setLocation] = useState(previousData.location || '');
  const [website, setWebsite] = useState(previousData.website || '');
  const [errors, setErrors] = useState({});
  const { addEmployer } = React.useContext(AdminContext);
  const { updateEmployerProfile } = useEmployer();

  const handleContinue = async () => {
    if (!location.trim()) {
      setErrors({ location: true });
      Alert.alert('Validation Error', 'Please enter your Company Location.');
      return;
    }
    setErrors({});
    
    const userLocation = location.trim();
    const userWebsite = website.trim();
    const companyAddress = previousData.address || '';

    const updatedData = { 
      ...previousData, 
      location: userLocation, 
      website: userWebsite,
      address: companyAddress
    };
    delete updatedData.companyAddress;
    
    // Save to backend
    try {
      const { updateCompanyProfile } = require('../../services/employerService');
      await updateCompanyProfile({ 
        location: userLocation, 
        website: userWebsite,
        address: companyAddress
      });
    } catch (err) {
      console.warn('Failed to update company profile location/website:', err.message);
    }
    
    if (typeof updateEmployerProfile === 'function') {
      updateEmployerProfile(updatedData);
    }

    // Admin integration: Add to global state so it shows on Admin tables
    addEmployer(updatedData);
    
    navigation.navigate('ChoosePlan', updatedData);
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

        <Text style={styles.title}>Company Profile</Text>
        <Text style={styles.subtitle}>Complete your company profile</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Company Location</Text>
          <TextInput
            style={[styles.input, errors.location && styles.errorInput]}
            value={location}
            onChangeText={(text) => { setLocation(text); setErrors(prev => ({...prev, location: null})); }}
            placeholder="e.g. New York, Denver"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Company Website (Optional)</Text>
          <TextInput
            style={styles.input}
            value={website}
            onChangeText={setWebsite}
            keyboardType="url"
          />
        </View>

        <TouchableOpacity 
          style={styles.button}
          onPress={handleContinue}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

export default CompanyProfile;
