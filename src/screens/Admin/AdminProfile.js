import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useAdmin } from '../../context/AdminContext';
import { getAdminProfile, updateAdminProfile } from '../../services/adminService';
import { logoutUser } from '../../services/authService';
import styles from '../../styles/Admin/AdminProfile';

const AdminProfile = ({ navigation }) => {
  const { adminProfile, updateAdminProfileData } = useAdmin();

  const [username, setUsername] = useState(adminProfile?.username || 'Jobportaladmin');
  const [email, setEmail] = useState(adminProfile?.email || 'admin@jobportal.com');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchLatestProfile = async () => {
      setFetching(true);
      try {
        const res = await getAdminProfile();
        const data = res?.data?.data || res?.data;
        if (data) {
          if (data.username) setUsername(data.username);
          if (data.email) setEmail(data.email);
          if (typeof updateAdminProfileData === 'function') {
            updateAdminProfileData(data);
          }
        }
      } catch (e) {
        console.warn('Could not fetch remote admin profile:', e.message);
      } finally {
        setFetching(false);
      }
    };

    fetchLatestProfile();
  }, []);

  const handleSave = async () => {
    const newErrors = {};

    if (!username.trim()) {
      newErrors.username = 'Username cannot be empty';
    }

    if (!email.trim() || !email.includes('@')) {
      newErrors.email = 'Valid email address is required';
    }

    if (newPassword) {
      if (newPassword.length < 6) {
        newErrors.newPassword = 'Password must be at least 6 characters';
      }
      if (newPassword !== confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const payload = {
        username: username.trim(),
        email: email.trim().toLowerCase(),
      };

      if (newPassword.trim()) {
        payload.password = newPassword.trim();
      }

      const res = await updateAdminProfile(payload);
      const updated = res?.data?.data || res?.data || payload;

      if (typeof updateAdminProfileData === 'function') {
        await updateAdminProfileData(updated);
      }

      setNewPassword('');
      setConfirmPassword('');

      Alert.alert(
        'Credentials Updated',
        'Your admin username, email, and password changes have been saved successfully. Please use these updated credentials for your future logins.'
      );
    } catch (err) {
      console.error('Update Admin Profile Error:', err);
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        'Failed to update admin profile.';
      Alert.alert('Update Failed', msg);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    Alert.alert('Logout', 'Are you sure you want to log out from the Admin Panel?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          try {
            await logoutUser();
          } catch (e) {
            console.warn('Logout error:', e);
          }
          navigation.reset({
            index: 1,
            routes: [{ name: 'Root' }, { name: 'AdminLogin' }],
          });
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={24} color="#0F172A" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Admin Profile & Credentials</Text>
        </View>
        {fetching && <ActivityIndicator size="small" color="#485ff4" />}
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Profile Badge Card */}
          <View style={styles.profileBadgeCard}>
            <View style={styles.avatarCircle}>
              <Ionicons name="shield-checkmark" size={38} color="#FFFFFF" />
              <View style={styles.badgeDot} />
            </View>
            <View style={styles.roleTag}>
              <Text style={styles.roleTagText}>Super Admin</Text>
            </View>
            <Text style={styles.currentUsername}>{username || 'Jobportaladmin'}</Text>
            <Text style={styles.currentEmail}>{email || 'admin@jobportal.com'}</Text>
          </View>

          {/* Form Card */}
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Edit Login Credentials</Text>
            <Text style={styles.sectionSubtitle}>
              Update your administrative username, email, and password. Only these credentials will grant future admin access.
            </Text>

            {/* Change Username */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Admin Username</Text>
              <View style={[styles.inputBox, errors.username && styles.inputError]}>
                <Ionicons name="person-outline" size={20} color="#64748B" style={styles.inputIcon} />
                <TextInput
                  style={styles.textInput}
                  value={username}
                  onChangeText={(t) => {
                    setUsername(t);
                    setErrors((prev) => ({ ...prev, username: null }));
                  }}
                  placeholder="Enter admin username"
                  placeholderTextColor="#94A3B8"
                  autoCapitalize="none"
                />
              </View>
              {errors.username && <Text style={styles.errorText}>{errors.username}</Text>}
            </View>

            {/* Change Email */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Admin Email Address</Text>
              <View style={[styles.inputBox, errors.email && styles.inputError]}>
                <Ionicons name="mail-outline" size={20} color="#64748B" style={styles.inputIcon} />
                <TextInput
                  style={styles.textInput}
                  value={email}
                  onChangeText={(t) => {
                    setEmail(t);
                    setErrors((prev) => ({ ...prev, email: null }));
                  }}
                  placeholder="Enter admin email"
                  placeholderTextColor="#94A3B8"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
              {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
            </View>

            {/* Change Password */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>New Password (Optional)</Text>
              <View style={[styles.inputBox, errors.newPassword && styles.inputError]}>
                <Ionicons name="lock-closed-outline" size={20} color="#64748B" style={styles.inputIcon} />
                <TextInput
                  style={styles.textInput}
                  value={newPassword}
                  onChangeText={(t) => {
                    setNewPassword(t);
                    setErrors((prev) => ({ ...prev, newPassword: null }));
                  }}
                  placeholder="Leave empty to keep current password"
                  placeholderTextColor="#94A3B8"
                  secureTextEntry={!showNewPassword}
                  autoCapitalize="none"
                />
                <TouchableOpacity
                  onPress={() => setShowNewPassword(!showNewPassword)}
                  style={styles.eyeButton}
                  activeOpacity={0.7}
                >
                  <Ionicons
                    name={showNewPassword ? 'eye-outline' : 'eye-off-outline'}
                    size={20}
                    color="#64748B"
                  />
                </TouchableOpacity>
              </View>
              {errors.newPassword && <Text style={styles.errorText}>{errors.newPassword}</Text>}
            </View>

            {/* Confirm New Password */}
            {newPassword ? (
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Confirm New Password</Text>
                <View style={[styles.inputBox, errors.confirmPassword && styles.inputError]}>
                  <Ionicons name="shield-outline" size={20} color="#64748B" style={styles.inputIcon} />
                  <TextInput
                    style={styles.textInput}
                    value={confirmPassword}
                    onChangeText={(t) => {
                      setConfirmPassword(t);
                      setErrors((prev) => ({ ...prev, confirmPassword: null }));
                    }}
                    placeholder="Re-enter new password"
                    placeholderTextColor="#94A3B8"
                    secureTextEntry={!showConfirmPassword}
                    autoCapitalize="none"
                  />
                  <TouchableOpacity
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={styles.eyeButton}
                    activeOpacity={0.7}
                  >
                    <Ionicons
                      name={showConfirmPassword ? 'eye-outline' : 'eye-off-outline'}
                      size={20}
                      color="#64748B"
                    />
                  </TouchableOpacity>
                </View>
                {errors.confirmPassword && (
                  <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                )}
              </View>
            ) : null}

            {/* Save Button */}
            <TouchableOpacity
              style={[styles.saveButton, loading && { opacity: 0.7 }]}
              onPress={handleSave}
              disabled={loading}
              activeOpacity={0.8}
            >
              {loading ? (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <ActivityIndicator size="small" color="#FFFFFF" style={{ marginRight: 8 }} />
                  <Text style={styles.saveButtonText}>Updating Credentials...</Text>
                </View>
              ) : (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Ionicons name="checkmark-circle-outline" size={20} color="#FFFFFF" style={{ marginRight: 8 }} />
                  <Text style={styles.saveButtonText}>Save Changes</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          {/* Logout Section */}
          <TouchableOpacity
            style={styles.logoutCard}
            onPress={handleLogout}
            activeOpacity={0.7}
          >
            <Ionicons name="log-out-outline" size={22} color="#EF4444" />
            <Text style={styles.logoutText}>Log Out from Admin</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AdminProfile;
