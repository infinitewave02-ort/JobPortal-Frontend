import React, { useState, useRef } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../../styles/Common/OtpVerfication';

const OtpVerification = ({ navigation, route }) => {
  // Extract mobile number from params if available, else default to showing generic
  const mobileNumber = route?.params?.mobileNumber || '98765 43210';
  
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);

  const handleChange = (text, index) => {
    // Only allow digits
    const cleanedText = text.replace(/[^0-9]/g, '');

    if (cleanedText.length > 1) {
      // Handle pasting or multiple chars
      const newOtp = [...otp];
      for (let i = 0; i < cleanedText.length; i++) {
        if (index + i < 6) {
          newOtp[index + i] = cleanedText[i];
        }
      }
      setOtp(newOtp);

      // Focus last filled input
      const nextIndex = Math.min(index + cleanedText.length, 5);
      if (inputRefs.current[nextIndex]) {
        inputRefs.current[nextIndex].focus();
      }
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = cleanedText;
    setOtp(newOtp);

    // Auto focus next input if digit entered
    if (cleanedText !== '' && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace') {
      if (otp[index] === '') {
        // focus prev if current is already empty
        if (index > 0) {
          inputRefs.current[index - 1].focus();
          const newOtp = [...otp];
          newOtp[index - 1] = '';
          setOtp(newOtp);
        }
      }
    }
  };

  const handleVerify = () => {
    const otpValue = otp.join('');
    // Proceed with Verification 
    console.log("Verifying OTP:", otpValue);
    
    // Navigate to CreateAccount
    navigation.navigate('CreateAccount');
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
                size={22}
                color="#000000"
              />
            </TouchableOpacity>
          </View>

          {/* Title */}
          <Text style={styles.title}>
            Verify OTP
          </Text>

          {/* Subtitle */}
          <Text style={styles.subtitle}>
            Enter the 6 digit code sent to{'\n'}+91 {mobileNumber}
          </Text>

          {/* OTP Input Row */}
          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                style={styles.otpBox}
                value={digit}
                onChangeText={(text) => handleChange(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                keyboardType="number-pad"
                maxLength={1}
                ref={(ref) => inputRefs.current[index] = ref}
              />
            ))}
          </View>

          {/* Resend OTP */}
          <View style={styles.resendContainer}>
            <Text style={styles.resendText}>
              Resend OTP in 00:25
            </Text>
          </View>

          {/* Verify Button */}
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.verifyButton}
            onPress={handleVerify}>
            <Text style={styles.verifyButtonText}>
              Verify
            </Text>
          </TouchableOpacity>

        </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default OtpVerification;
