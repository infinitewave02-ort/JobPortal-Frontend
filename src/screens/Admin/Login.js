import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginUser, loginWithCustomToken, syncUser, forgotPassword } from '../../services/authService';
import { adminLogin } from '../../services/adminService';
import { useAdmin } from '../../context/AdminContext';
import styles from '../../styles/Admin/Login';

const AdminLogin = ({ navigation }) => {
  const { updateAdminProfileData } = useAdmin();
  const [email, setEmail] = useState('admin@jobportal.com');
  const [password, setPassword] = useState('Jobportal@44');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    let newErrors = {};
    if (!email.trim()) {
      newErrors.email = 'Email / Username is required';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      // 1. Authenticate with Backend Admin Login endpoint
      const res = await adminLogin({
        username: email.trim(),
        email: email.trim(),
        password: password,
      });

      const responseData = res?.data?.data || res?.data;
      if (!responseData) {
        throw new Error('Authentication failed. No response from server.');
      }

      const { uid, username: adminUser, email: adminEmail, token } = responseData;

      // 2. Establish Firebase Session using custom token or fallback to email/password
      let sessionEstablished = false;
      if (token) {
        try {
          const user = await loginWithCustomToken(token);
          if (user) sessionEstablished = true;
        } catch (tokenErr) {
          console.warn('Custom token login fallback:', tokenErr.message);
        }
      }

      if (!sessionEstablished && adminEmail && password) {
        try {
          await loginUser(adminEmail, password);
          sessionEstablished = true;
        } catch (loginErr) {
          console.warn('Firebase email/password login fallback:', loginErr.message);
        }
      }

      // 3. Store tokens and role in AsyncStorage
      await AsyncStorage.setItem('userRole', 'admin');
      if (token) {
        await AsyncStorage.setItem('adminCustomToken', token);
      }

      // 4. Update AdminContext & AsyncStorage
      const profileData = {
        uid: uid || 'admin',
        username: adminUser || 'Jobportaladmin',
        email: adminEmail || 'admin@jobportal.com',
        role: 'admin',
      };

      if (typeof updateAdminProfileData === 'function') {
        await updateAdminProfileData(profileData);
      }
      await AsyncStorage.setItem('adminProfile', JSON.stringify(profileData));

      try {
        await syncUser({ role: 'admin' });
      } catch (syncErr) {
        console.warn('Sync user admin warning:', syncErr.message);
      }

      // 5. Navigate to Admin Dashboard
      navigation.reset({
        index: 0,
        routes: [{ name: 'AdminTabs' }],
      });
    } catch (err) {
      console.error('Admin Login Error:', err);
      const serverMessage =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        'Could not log in as admin.';

      Alert.alert('Login Access Denied', serverMessage);
      setErrors({
        auth: serverMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    const targetEmail = email.trim().includes('@') ? email.trim() : 'admin@jobportal.com';
    Alert.alert(
      'Reset Password',
      `Send password reset link to ${targetEmail}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Send Reset Link',
          onPress: async () => {
            try {
              await forgotPassword(targetEmail);
              Alert.alert('Email Sent', `Password reset instructions sent to ${targetEmail}`);
            } catch (e) {
              Alert.alert('Error', e.message || 'Could not send reset email.');
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
        activeOpacity={0.7}
      >
        <Ionicons name="arrow-back" size={24} color="#1A1A24" />
      </TouchableOpacity>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.container}>
            <View style={styles.logoContainer}>
              <Text style={styles.title}>Admin Login</Text>
              <View style={styles.iconCircle}>
                <Ionicons name="person" size={50} color="#FFFFFF" />
                <View style={styles.shieldIcon}>
                  <Ionicons name="shield-checkmark" size={20} color="#485ff4" />
                </View>
              </View>
            </View>

            {errors.auth ? (
              <View style={{ backgroundColor: '#FEE2E2', padding: 12, borderRadius: 8, marginBottom: 16 }}>
                <Text style={{ color: '#DC2626', fontSize: 13, textAlign: 'center', fontWeight: '500' }}>
                  {errors.auth}
                </Text>
              </View>
            ) : null}

            {/* Email / Username Field (matches user screenshot) */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email / Username</Text>
              <View style={[styles.inputWithIcon, errors.email && styles.errorInput]}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter email or username"
                  placeholderTextColor="#A0A0A0"
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    setErrors((prev) => ({ ...prev, email: null, auth: null }));
                  }}
                  autoCapitalize="none"
                />
              </View>
              {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
            </View>

            {/* Password Field */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <View style={[styles.inputWithIcon, errors.password && styles.errorInput]}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your password"
                  placeholderTextColor="#A0A0A0"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    setErrors((prev) => ({ ...prev, password: null, auth: null }));
                  }}
                  autoCapitalize="none"
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeButton}
                  activeOpacity={0.7}
                >
                  <Ionicons
                    name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                    size={20}
                    color="#A0A0A0"
                  />
                </TouchableOpacity>
              </View>
              {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
            </View>


            <TouchableOpacity onPress={handleForgotPassword} activeOpacity={0.7}>
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, loading && { opacity: 0.7 }]}
              onPress={handleLogin}
              disabled={loading}
              activeOpacity={0.8}
            >
              {loading ? (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <ActivityIndicator size="small" color="#FFFFFF" style={{ marginRight: 8 }} />
                  <Text style={styles.buttonText}>Verifying Access...</Text>
                </View>
              ) : (
                <Text style={styles.buttonText}>Login to Admin Panel</Text>
              )}
            </TouchableOpacity>

            <Text style={styles.footerText}>Authorized Job Portal Admin Access Only</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AdminLogin;

