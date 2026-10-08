import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../../styles/Common/Register';

const Register = ({navigation}) => {
  const [mobileNumber, setMobileNumber] = useState('');

  const handleSendOTP = () => {
    if (mobileNumber.length !== 10) {
      Alert.alert(
        'Invalid Mobile Number',
        'Please enter a valid 10-digit mobile number.',
      );
      return;
    }

    // Navigate to OTP screen
    navigation.navigate('OTPVerification', {
      mobileNumber: mobileNumber,
    });
  };

  const handleMobileChange = text => {
    // Allow only numbers
    const cleanedText = text.replace(/[^0-9]/g, '');

    // Maximum 10 digits
    if (cleanedText.length <= 10) {
      setMobileNumber(cleanedText);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>

        <View style={styles.container}>

          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.headerButton}
              onPress={() => navigation.goBack()}>
              <Icon
                name="arrow-back"
                size={20}
                color="#222222"
              />
            </TouchableOpacity>

           
          </View>

          {/* Title */}
          <Text style={styles.title}>
            Register
          </Text>

          {/* Subtitle */}
          <Text style={styles.subtitle}>
            Enter your mobile number
          </Text>

          {/* Mobile Number Label */}
          <Text style={styles.inputLabel}>
            Mobile Number
          </Text>

          {/* Mobile Input */}
          <View style={styles.phoneInputContainer}>

            <Text style={styles.countryCode}>
              +91
            </Text>

            <TextInput
              style={styles.phoneInput}
              value={mobileNumber}
              onChangeText={handleMobileChange}
            //   placeholder="98765 43210"
              placeholderTextColor="#777777"
              keyboardType="phone-pad"
              maxLength={10}
            />

          </View>

          {/* Send OTP Button */}
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.otpButton}
            onPress={handleSendOTP}>

            <Text style={styles.otpButtonText}>
              Send OTP
            </Text>

          </TouchableOpacity>

          {/* Terms */}
          <View style={styles.termsContainer}>

            <Text style={styles.termsText}>
              By continuing, you agree to our
            </Text>

            <View style={styles.termsRow}>

              <TouchableOpacity>
                <Text style={styles.linkText}>
                  Terms & Conditions
                </Text>
              </TouchableOpacity>

              <Text style={styles.andText}>
                {' '}and{' '}
              </Text>

              <TouchableOpacity>
                <Text style={styles.linkText}>
                  Privacy Policy
                </Text>
              </TouchableOpacity>

            </View>

          </View>

        </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Register;