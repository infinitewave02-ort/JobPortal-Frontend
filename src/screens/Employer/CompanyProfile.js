import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, StatusBar, ScrollView, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../../styles/Employer/CompanyProfile';
import { AdminContext } from '../../context/AdminContext';

const CompanyProfile = ({ navigation, route }) => {
  const previousData = route?.params || {};
  const [location, setLocation] = useState('');
  const [website, setWebsite] = useState('');
  const [errors, setErrors] = useState({});
  const { addEmployer } = React.useContext(AdminContext);

  const handleContinue = () => {
    if (!location.trim()) {
      setErrors({ location: true });
      Alert.alert('Validation Error', 'Please enter your Company Location.');
      return;
    }
    setErrors({});
    
    // Admin integration: Add to global state so it shows on Admin tables
    addEmployer({ ...previousData, location, website });
    
    navigation.navigate('ChoosePlan', { ...previousData, location, website });
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
