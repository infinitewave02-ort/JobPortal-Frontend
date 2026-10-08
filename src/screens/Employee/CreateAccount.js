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
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../../styles/Employee/CreateAccount';
import { useEmployee } from '../../context/EmployeeContext';

const CreateAccount = ({navigation}) => {
  const { clearEmployeeProfile } = useEmployee();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Clear any previous employee session data the moment a new registration starts
  React.useEffect(() => {
    clearEmployeeProfile();
  }, [clearEmployeeProfile]);

  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleCreateAccount = () => {
    let newErrors = {};
    if (!fullName.trim()) newErrors.fullName = true;
    if (!email.trim() || !email.includes('@')) newErrors.email = true;
    if (!password) newErrors.password = true;
    if (password !== confirmPassword || !confirmPassword) newErrors.confirmPassword = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      Alert.alert('Validation Error', 'Please complete all fields correctly. Passwords must match.');
      return;
    }

    setErrors({});
    navigation.navigate('BasicDetails', { fullName, email, password });
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
            <Text style={styles.title}>Create Account</Text>

            {/* Subtitle */}
            <Text style={styles.subtitle}>Complete your basic details</Text>

            {/* Full Name field */}
            <Text style={styles.inputLabel}>Full Name</Text>
            <View style={[styles.inputContainer, errors.fullName && styles.errorInput]}>
              <TextInput
                style={styles.input}
                value={fullName}
                onChangeText={(text) => { setFullName(text); setErrors(prev => ({...prev, fullName: null})); }}
                autoCapitalize="words"
              />
            </View>

            {/* Email field */}
            <Text style={styles.inputLabel}>Email</Text>
            <View style={[styles.inputContainer, errors.email && styles.errorInput]}>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={(text) => { setEmail(text); setErrors(prev => ({...prev, email: null})); }}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Password field */}
            <Text style={styles.inputLabel}>Password</Text>
            <View style={[styles.inputContainer, errors.password && styles.errorInput]}>
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={(text) => { setPassword(text); setErrors(prev => ({...prev, password: null})); }}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity 
                style={styles.iconContainer}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Icon 
                  name={showPassword ? "eye" : "eye-off"} 
                  size={20} 
                  color="#A0A0A0" 
                />
              </TouchableOpacity>
            </View>

            {/* Confirm Password field */}
            <Text style={styles.inputLabel}>Confirm Password</Text>
            <View style={[styles.inputContainer, errors.confirmPassword && styles.errorInput]}>
              <TextInput
                style={styles.input}
                value={confirmPassword}
                onChangeText={(text) => { setConfirmPassword(text); setErrors(prev => ({...prev, confirmPassword: null})); }}
                secureTextEntry={!showConfirmPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity 
                style={styles.iconContainer}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <Icon 
                  name={showConfirmPassword ? "eye" : "eye-off"} 
                  size={20} 
                  color="#A0A0A0" 
                />
              </TouchableOpacity>
            </View>

            {/* Create Account Button */}
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.createButton}
              onPress={handleCreateAccount}>
              <Text style={styles.createButtonText}>Create Account</Text>
            </TouchableOpacity>

            {/* Login Link */}
            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>Already have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('EmployeeLogin')}>
                <Text style={styles.loginLink}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CreateAccount;
