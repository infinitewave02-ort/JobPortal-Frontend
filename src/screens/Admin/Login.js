import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, StatusBar, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { syncUser, loginUser } from '../../services/authService';
import styles from '../../styles/Admin/Login';

const AdminLogin = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    let newErrors = {};
    if (!email.trim()) newErrors.email = 'Email/Username is required';
    if (!password) newErrors.password = 'Password is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      await loginUser(email, password);
      
      const response = await syncUser({ role: 'admin' });
      // In production, we'd ensure response indicates admin
      navigation.navigate('AdminDashboard');
    } catch (err) {
      Alert.alert('Login Failed', err.message || 'Could not log in as admin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="#1A1A24" />
      </TouchableOpacity>

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
                setErrors((prev) => ({...prev, email: null}));
              }}
              autoCapitalize="none"
            />
          </View>
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>
          <View style={[styles.inputWithIcon, errors.password && styles.errorInput]}>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              placeholderTextColor="#A0A0A0"
              secureTextEntry
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                setErrors((prev) => ({...prev, password: null}));
              }}
            />
            <Ionicons name="eye-off-outline" size={20} color="#A0A0A0" />
          </View>
          {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
        </View>

        <TouchableOpacity>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, loading && { opacity: 0.7 }]}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.buttonText}>{loading ? 'Logging in...' : 'Login'}</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>Secure Admin Access</Text>

      </View>
    </SafeAreaView>
  );
};

export default AdminLogin;
