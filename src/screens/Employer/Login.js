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
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { syncUser, loginUser, forgotPassword, getMe } from '../../services/authService';
import { useEmployer } from '../../context/EmployerContext';
import s from '../../styles/Employer/Login';

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

// ── Sparkle decoration (dashes around hero badge) ────────────────
const Sparkle = ({ style }) => (
  <View
    pointerEvents="none"
    style={[
      {
        position: 'absolute',
        width: 16, height: 3, borderRadius: 2,
        backgroundColor: '#7B61FF',
      },
      style,
    ]}
  />
);

// ── Component ────────────────────────────────────────────────────
const EmployerLogin = ({ navigation }) => {
  const { employerProfile, updateEmployerProfile } = useEmployer();

  const [email, setEmail]          = useState('');
  const [password, setPassword]    = useState('');
  const [showPassword, setShowPwd] = useState(false);
  const [errors, setErrors]        = useState({});
  const [loading, setLoading]      = useState(false);

  const handleLogin = async () => {
    const e = {};
    if (!email.trim() || !email.includes('@')) e.email = 'Enter a valid email address';
    if (!password) e.password = 'Password is required';
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setLoading(true);

    try {
      const user = await loginUser(email.trim(), password);
      
      let userData = { email: user?.email || email.trim() };
      try {
        await syncUser({ role: 'employer' });
        const response = await getMe();
        const resUser = response?.data?.data || response?.data?.user || response?.data;
        if (resUser && typeof resUser === 'object') {
          userData = { ...userData, ...resUser };
        }
      } catch (err) {
        console.warn('Get employer profile warning:', err.message);
      }

      if (typeof updateEmployerProfile === 'function') {
        updateEmployerProfile(userData);
      }
      navigation.navigate('EmployerDashboard', { employerData: userData });
    } catch (err) {
      console.error('Employer login error:', err);
      let errMsg = 'Login failed. Please check your credentials.';
      if (err?.code === 'auth/user-not-found' || err?.code === 'auth/wrong-password' || err?.code === 'auth/invalid-credential') {
        errMsg = 'Invalid email or password. Please try again.';
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
          {/* ── Root wrapper ── */}
          <View style={s.root}>

            {/* ── Decorative: blobs ── */}
            <View style={s.blobTR1} pointerEvents="none" />
            <View style={s.blobTR2} pointerEvents="none" />
            <View style={s.blobBL}  pointerEvents="none" />

            {/* ── Decorative: right circle ── */}
            <View style={s.circleR} pointerEvents="none" />

            {/* ── Decorative: dot grid ── */}
            <DotGrid style={{ bottom: 90, right: 28 }} />

            {/* ── Back button ── */}
            <TouchableOpacity style={s.back} onPress={() => navigation.goBack()} activeOpacity={0.7}>
              <Icon name="arrow-back" size={22} color="#1A1A2E" />
            </TouchableOpacity>

            {/* ── Content ── */}
            <View style={s.content}>

              {/* ── Hero avatar with sparkle dashes ── */}
              <View style={{ position: 'relative', alignItems: 'center', justifyContent: 'center' }}>
                {/* Sparkle dashes */}
                <Sparkle style={{ top: 26,  left: -26, transform: [{ rotate: '-45deg' }] }} />
                <Sparkle style={{ bottom: 22, left: -24, transform: [{ rotate: '45deg' }] }} />
                <Sparkle style={{ top: 26,  right: -26, transform: [{ rotate: '45deg' }] }} />
                <Sparkle style={{ bottom: 22, right: -24, transform: [{ rotate: '-45deg' }] }} />

                <View style={s.heroOuter}>
                  <View style={s.heroMid}>
                    <LinearGradient colors={['#5B8EF5', '#4B40E8']} style={s.heroInner}>
                      <Icon name="briefcase" size={38} color="#FFFFFF" />
                    </LinearGradient>
                  </View>
                </View>
              </View>

              {/* ── Title ── */}
              <Text style={s.title}>Employer Login</Text>
              <Text style={s.subtitle}>Sign in to manage your company jobs</Text>

              {/* ── Company Email ── */}
              <View style={s.fieldWrap}>
                <View style={s.labelRow}>
                  <View style={[s.badge, { backgroundColor: '#3B6CF5' }]}>
                    <Icon name="business" size={13} color="#fff" />
                  </View>
                  <Text style={s.labelText}>Company Email</Text>
                </View>
                <View style={[s.inputBox, errors.email && s.inputErr]}>
                  <Icon name="mail-outline" size={18} color="#8897C4" style={s.inputIcon} />
                  <TextInput
                    style={s.input}
                    placeholder="Enter your company email"
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
                    const { Alert } = require('react-native');
                    Alert.alert('Reset Password', 'Please enter your registered company email address first.');
                    return;
                  }
                  try {
                    await forgotPassword(email.trim());
                    const { Alert } = require('react-native');
                    Alert.alert('Email Sent', 'Password reset instructions have been sent to your email.');
                  } catch (err) {
                    const { Alert } = require('react-native');
                    Alert.alert('Error', err.message || 'Could not send reset email.');
                  }
                }}
              >
                <Text style={s.forgotText}>Forgot Password? →</Text>
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
                <Text style={s.regText}>New employer? </Text>
                <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('CompanyDetails')}>
                  <Text style={s.regLink}>Register Company →</Text>
                </TouchableOpacity>
              </View>

            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default EmployerLogin;
