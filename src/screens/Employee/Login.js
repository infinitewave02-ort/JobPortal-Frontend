import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEmployee } from '../../context/EmployeeContext';
import { syncUser, loginUser, forgotPassword, getMe } from '../../services/authService';
import { getUserProfile } from '../../services/profileService';
import s from '../../styles/Employee/Login';

// ── Dot-grid decoration ──────────────────────────────────────────
const DotGrid = ({ style }) => (
  <View style={[{ position: 'absolute' }, style]} pointerEvents="none">
    {[0, 1, 2, 3, 4].map(r => (
      <View key={r} style={{ flexDirection: 'row', marginBottom: 6 }}>
        {[0, 1, 2, 3, 4].map(c => (
          <View
            key={c}
            style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: '#C5D3F0', marginRight: 6 }}
          />
        ))}
      </View>
    ))}
  </View>
);

// ── Component ────────────────────────────────────────────────────
const EmployeeLogin = ({ navigation }) => {
  const { employeeProfile, updateEmployeeProfile, clearEmployeeProfile } = useEmployee();


  const [email, setEmail]             = useState('');
  const [password, setPassword]       = useState('');
  const [showPassword, setShowPwd]    = useState(false);
  const [errors, setErrors]           = useState({});
  const [loading, setLoading]         = useState(false);

  const handleLogin = async () => {
    const e = {};
    if (!email.trim() || !email.includes('@')) e.email = 'Enter a valid email address';
    if (!password) e.password = 'Password is required';
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setLoading(true);

    try {
      const user = await loginUser(email.trim(), password);
      
      // Print the JWT token to console for Postman testing
      const token = await AsyncStorage.getItem('userToken');
      console.log('\n\n--- YOUR JWT TOKEN FOR POSTMAN ---');
      console.log(token);
      console.log('----------------------------------\n\n');

      let userData = { email: user?.email || email.trim() };
      
      // Separate syncUser so if it fails, it doesn't stop getMe
      try {
        await syncUser({ role: 'employee' });
      } catch (err) {
        console.warn('Sync user warning:', err?.message || err);
      }

      try {
        // Try new /api/users/profile endpoint first, fall back to /api/auth/me
        let response;
        try {
          response = await getUserProfile();
        } catch (profileErr) {
          console.warn('getUserProfile fallback to getMe:', profileErr?.message);
          response = await getMe();
        }
        const resUser = response?.data?.data || response?.data?.user || response?.data;
        if (resUser && typeof resUser === 'object') {
          userData = { ...userData, ...resUser };
        }
      } catch (err) {
        console.warn('Get user profile warning:', err?.message || err);
      }

      if (typeof clearEmployeeProfile === 'function') {
        clearEmployeeProfile();
      }
      if (typeof updateEmployeeProfile === 'function') {
        updateEmployeeProfile(userData);
      }
      navigation.navigate('Jobs', { employeeData: userData });
    } catch (err) {
      console.error('Login error:', err);
      let errMsg = 'Login failed. Please check your credentials.';
      if (err?.code === 'auth/user-not-found' || err?.code === 'auth/wrong-password' || err?.code === 'auth/invalid-credential') {
        errMsg = 'Invalid email or password. Please try again.';
      } else if (err?.code === 'auth/invalid-email') {
        errMsg = 'Invalid email format.';
      } else if (err?.message) {
        errMsg = err.message;
      }
      setErrors({ email: errMsg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={s.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          {/* ── Root wrapper (needed for absolute children) ── */}
          <View style={s.root}>

            {/* ── Decorative: blobs ── */}
            <View style={s.blobTR1} pointerEvents="none" />
            <View style={s.blobTR2} pointerEvents="none" />
            <View style={s.blobBL}  pointerEvents="none" />

            {/* ── Decorative: small floating circles (left side) ── */}
            <View style={s.circleA} pointerEvents="none" />
            <View style={s.circleB} pointerEvents="none" />

            {/* ── Decorative: dot grid (bottom-right) ── */}
            <DotGrid style={{ bottom: 90, right: 28 }} />

            {/* ── Back button ── */}
            <TouchableOpacity style={s.back} onPress={() => navigation.goBack()} activeOpacity={0.7}>
              <Icon name="arrow-back" size={22} color="#1A1A2E" />
            </TouchableOpacity>

            {/* ── Content ── */}
            <View style={s.content}>

              {/* ── Hero avatar: 3 layers ── */}
              <View style={s.heroOuter}>
                <View style={s.heroMid}>
                  <LinearGradient colors={['#5B8EF5', '#3B5BE8']} style={s.heroInner}>
                    <Icon name="person" size={40} color="#FFFFFF" />
                  </LinearGradient>
                </View>
              </View>

              {/* ── Title ── */}
              <Text style={s.title}>Employee Login</Text>
              <Text style={s.subtitle}>Welcome back! Sign in to your account</Text>

              {/* ── Email ── */}
              <View style={s.fieldWrap}>
                <View style={s.labelRow}>
                  <View style={[s.badge, { backgroundColor: '#3B6CF5' }]}>
                    <Icon name="chevron-down" size={13} color="#fff" />
                  </View>
                  <Text style={s.labelText}>Email Address</Text>
                </View>
                <View style={[s.inputBox, errors.email && s.inputErr]}>
                  <Icon name="mail-outline" size={18} color="#8897C4" style={s.inputIcon} />
                  <TextInput
                    style={s.input}
                    placeholder="Enter your email"
                    placeholderTextColor="#B4BDD8"
                    value={email}
                    onChangeText={t => { setEmail(t); setErrors(p => ({ ...p, email: null })); }}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
                {errors.email ? <Text style={s.errText}>{errors.email}</Text> : null}
              </View>

              {/* ── Password ── */}
              <View style={s.fieldWrap}>
                <View style={s.labelRow}>
                  <View style={[s.badge, { backgroundColor: '#7C3AED' }]}>
                    <Icon name="lock-closed" size={12} color="#fff" />
                  </View>
                  <Text style={s.labelText}>Password</Text>
                </View>
                <View style={[s.inputBox, errors.password && s.inputErr]}>
                  <Icon name="lock-closed-outline" size={18} color="#8897C4" style={s.inputIcon} />
                  <TextInput
                    style={s.input}
                    placeholder="Enter your password"
                    placeholderTextColor="#B4BDD8"
                    value={password}
                    onChangeText={t => { setPassword(t); setErrors(p => ({ ...p, password: null })); }}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                  />
                  <TouchableOpacity onPress={() => setShowPwd(!showPassword)} activeOpacity={0.7}>
                    <Icon name={showPassword ? 'eye-outline' : 'eye-off-outline'} size={20} color="#8897C4" />
                  </TouchableOpacity>
                </View>
                {errors.password ? <Text style={s.errText}>{errors.password}</Text> : null}
              </View>

              {/* ── Forgot ── */}
              <TouchableOpacity 
                style={s.forgotWrap} 
                activeOpacity={0.7}
                onPress={async () => {
                  if (!email.trim() || !email.includes('@')) {
                    Alert.alert('Reset Password', 'Please enter your registered email address first.');
                    return;
                  }
                  try {
                    await forgotPassword(email.trim());
                    Alert.alert('Email Sent', 'Password reset instructions have been sent to your email.');
                  } catch (err) {
                    Alert.alert('Error', err.message || 'Could not send reset email.');
                  }
                }}
              >
                <Text style={s.forgotText}>Forgot Password?</Text>
              </TouchableOpacity>

              {/* ── Login button ── */}
              <TouchableOpacity style={s.btnWrap} activeOpacity={0.85} onPress={handleLogin} disabled={loading}>
                <LinearGradient
                  colors={loading ? ['#9CA3AF', '#6B7280'] : ['#3B82F6', '#6D28D9']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={s.btn}
                >
                  <Icon name="log-in-outline" size={22} color="#fff" style={{ marginRight: 10 }} />
                  <Text style={s.btnText}>{loading ? 'Logging in...' : 'Login'}</Text>
                </LinearGradient>
              </TouchableOpacity>

              {/* ── OR divider ── */}
              <View style={s.orRow}>
                <View style={s.orLine} />
                <Text style={s.orText}>OR</Text>
                <View style={s.orLine} />
              </View>

              {/* ── Register link ── */}
              <View style={s.regRow}>
                <Text style={s.regText}>Don't have an account? </Text>
                <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('CreateAccount')}>
                  <Text style={s.regLink}>Register Now →</Text>
                </TouchableOpacity>
              </View>

            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default EmployeeLogin;
