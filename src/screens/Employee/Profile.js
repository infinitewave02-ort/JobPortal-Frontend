import React, { useState, useCallback } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Switch,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useFocusEffect } from '@react-navigation/native';
import dashboardStyles from '../../styles/Employee/Dashboard';
import { useEmployee } from '../../context/EmployeeContext';
import useViewResume from '../../hooks/useViewResume';
import { getMe } from '../../services/authService';
import { getUserProfile } from '../../services/profileService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = ({navigation, route}) => {
  React.useEffect(() => {
    const printToken = async () => {
      const token = await AsyncStorage.getItem('userToken');
      console.log('\n\n--- YOUR JWT TOKEN FOR POSTMAN (From Profile Screen) ---');
      console.log(token);
      console.log('--------------------------------------------------------\n\n');
    };
    printToken();
  }, []);

  const { employeeProfile, updateEmployeeProfile, clearEmployeeProfile } = useEmployee();
  const routeParams = route?.params || {};
  const fallbackData = routeParams.employeeData || routeParams;

  const fullName           = employeeProfile?.fullName           || fallbackData.fullName           || 'User Name';
  const jobTitle           = employeeProfile?.jobTitle           || fallbackData.jobTitle           || 'Add Job Title';
  const email              = employeeProfile?.email              || fallbackData.email              || 'Not provided';
  const phone              = employeeProfile?.phone              || fallbackData.phone              || 'Not provided';
  const currentLocation    = employeeProfile?.currentLocation    || fallbackData.currentLocation    || 'Location not set';
  const preferredLocation  = employeeProfile?.preferredLocation  || fallbackData.preferredLocation  || 'Not provided';
  const qualification      = employeeProfile?.qualification      || fallbackData.qualification      || 'Not provided';
  const skills             = employeeProfile?.skills             || fallbackData.skills             || '';
  const experience         = employeeProfile?.experience         || fallbackData.experience         || 'Not provided';
  const expectedSalary     = employeeProfile?.expectedSalary     || fallbackData.expectedSalary     || 'Not provided';
  const noticePeriod       = employeeProfile?.noticePeriod       || fallbackData.noticePeriod       || 'Not provided';
  const gender             = employeeProfile?.gender             || fallbackData.gender             || 'Not provided';
  const resumeFile         = employeeProfile?.resumeFile         || fallbackData.resumeFile         || null;
  const profileImage       = employeeProfile?.profileImage       || fallbackData.profileImage       || null;

  const { isLoading: resumeLoading, progress: resumeProgress, openResume } = useViewResume();

  const [isOpenToWork, setIsOpenToWork] = useState(true);
  const [profileLoading, setProfileLoading] = useState(false);

  // Fetch profile from backend every time screen is focused
  useFocusEffect(
    useCallback(() => {
      const fetchProfile = async () => {
        setProfileLoading(true);
        try {
          // Try the new /api/users/profile endpoint first
          let resUser = null;
          try {
            const res = await getUserProfile();
            resUser = res?.data?.data || res?.data?.user || res?.data;
          } catch (profileErr) {
            console.warn('getUserProfile fallback to getMe:', profileErr.message);
            // Fallback to getMe if /api/users/profile fails
            const res = await getMe();
            resUser = res?.data?.data || res?.data?.user || res?.data;
          }
          console.log('Profile fetch response:', JSON.stringify(resUser));
          if (resUser && typeof resUser === 'object' && typeof updateEmployeeProfile === 'function') {
            updateEmployeeProfile(resUser);
          }
        } catch (e) {
          console.warn('Failed to fetch profile:', e.message);
        } finally {
          setProfileLoading(false);
        }
      };
      fetchProfile();
    }, [updateEmployeeProfile])
  );

  const skillsArray = Array.isArray(skills) ? skills : (skills ? String(skills).split(/[,\n]+/).map(s => s.trim()).filter(Boolean) : []);

  // Avatar initials
  const initials = fullName
    .split(' ')
    .map(w => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <SafeAreaView style={dashboardStyles.safeArea}>
      <View style={dashboardStyles.container}>

        {/* Header */}
        <View style={dashboardStyles.header}>
          <TouchableOpacity
            style={dashboardStyles.headerButton}
            onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color="#1A1A1A" />
          </TouchableOpacity>
          <Text style={dashboardStyles.title}>My Profile</Text>
        </View>

        <ScrollView contentContainerStyle={localStyles.scrollContainer} showsVerticalScrollIndicator={false}>

          {/* ── HOME CONTENT: Avatar + Summary ── */}
          <View style={localStyles.heroCard}>
            <View style={[localStyles.avatarContainer, profileImage && { backgroundColor: 'transparent' }]}>
              {profileImage ? (
                <Image
                  source={{ uri: profileImage }}
                  style={{ width: 72, height: 72, borderRadius: 36 }}
                />
              ) : (
                <Text style={localStyles.avatarInitials}>{initials}</Text>
              )}
            </View>
            <View style={localStyles.heroDetails}>
              <Text style={localStyles.heroName}>{fullName}</Text>
              <Text style={localStyles.heroRole}>{jobTitle}</Text>
              <Text style={localStyles.heroMeta}>
                <FeatherIcon name="briefcase" size={12} color="#888" /> {experience} Experience
              </Text>
              <Text style={localStyles.heroMeta}>
                <FeatherIcon name="map-pin" size={12} color="#888" /> {currentLocation}
              </Text>
            </View>
          </View>

          {/* ── HOME CONTENT: Open to Work Toggle ── */}
          <View style={dashboardStyles.openToWorkBox}>
            <View style={dashboardStyles.openToWorkInfo}>
              <Text style={dashboardStyles.openToWorkTitle}>Open to Work</Text>
              <Text style={dashboardStyles.openToWorkSubtitle}>Your profile is visible to employers</Text>
            </View>
            <Switch
              trackColor={{ false: '#D1D1D1', true: '#2EBA63' }}
              thumbColor={'#FFFFFF'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => setIsOpenToWork(!isOpenToWork)}
              value={isOpenToWork}
            />
          </View>

          {/* ── HOME CONTENT: Quick Menu ── */}
          <View style={localStyles.sectionHeader}>
            <Text style={localStyles.sectionTitle}>Quick Actions</Text>
          </View>
          <View style={localStyles.menuCard}>
            <TouchableOpacity style={localStyles.menuItem} onPress={() => navigation.navigate('ProfileViews', routeParams)}>
              <View style={localStyles.menuIconWrap}>
                <FeatherIcon name="eye" size={18} color="#1E3A8A" />
              </View>
              <Text style={localStyles.menuText}>Profile Views</Text>
              <Text style={localStyles.menuBadge}>0</Text>
              <FeatherIcon name="chevron-right" size={16} color="#CCC" />
            </TouchableOpacity>
            <View style={localStyles.menuDivider} />

            <TouchableOpacity style={localStyles.menuItem} onPress={() => navigation.navigate('Messages', routeParams)}>
              <View style={localStyles.menuIconWrap}>
                <FeatherIcon name="message-square" size={18} color="#1E3A8A" />
              </View>
              <Text style={localStyles.menuText}>Messages</Text>
              <Text style={localStyles.menuBadge}>0</Text>
              <FeatherIcon name="chevron-right" size={16} color="#CCC" />
            </TouchableOpacity>
            <View style={localStyles.menuDivider} />

            <TouchableOpacity style={localStyles.menuItem} onPress={() => navigation.navigate('ContactRequests', routeParams)}>
              <View style={localStyles.menuIconWrap}>
                <FeatherIcon name="phone-call" size={18} color="#1E3A8A" />
              </View>
              <Text style={localStyles.menuText}>Calls / Contact Requests</Text>
              <Text style={localStyles.menuBadge}>0</Text>
              <FeatherIcon name="chevron-right" size={16} color="#CCC" />
            </TouchableOpacity>
            <View style={localStyles.menuDivider} />

            <TouchableOpacity style={localStyles.menuItem} onPress={() => navigation.navigate('UploadResume', { isPostLogin: true })}>
              <View style={localStyles.menuIconWrap}>
                <FeatherIcon name="file-text" size={18} color="#1E3A8A" />
              </View>
              <Text style={localStyles.menuText}>Upload / Update Resume</Text>
              <FeatherIcon name="chevron-right" size={16} color="#CCC" />
            </TouchableOpacity>
            <View style={localStyles.menuDivider} />

            {/* View Resume row */}
            <TouchableOpacity
              style={localStyles.menuItem}
              onPress={() => openResume(resumeFile)}
              disabled={resumeLoading}
            >
              <View style={[localStyles.menuIconWrap, { backgroundColor: resumeFile ? '#DBEAFE' : '#F5F5F5' }]}>
                {resumeLoading ? (
                  <ActivityIndicator size="small" color="#1E3A8A" />
                ) : (
                  <FeatherIcon name="eye" size={18} color={resumeFile ? '#1E3A8A' : '#CCCCCC'} />
                )}
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[localStyles.menuText, !resumeFile && { color: '#AAAAAA' }]}>
                  {resumeLoading ? `Downloading… ${resumeProgress}%` : 'View Resume'}
                </Text>
                {!resumeFile && (
                  <Text style={{ fontSize: 11, color: '#BBBBBB' }}>No resume uploaded yet</Text>
                )}
              </View>
              {resumeFile && !resumeLoading && (
                <FeatherIcon name="chevron-right" size={16} color="#CCC" />
              )}
            </TouchableOpacity>
          </View>

          {/* ── PROFILE CONTENT: Contact Info ── */}
          <View style={localStyles.sectionHeader}>
            <Text style={localStyles.sectionTitle}>Contact Info</Text>
          </View>
          <View style={localStyles.card}>
            <View style={localStyles.infoRow}>
              <FeatherIcon name="mail" size={16} color="#1E3A8A" />
              <View style={localStyles.infoTextGroup}>
                <Text style={localStyles.infoLabel}>Email</Text>
                <Text style={localStyles.infoValue}>{email}</Text>
              </View>
            </View>
            <View style={localStyles.divider} />
            <View style={localStyles.infoRow}>
              <FeatherIcon name="phone" size={16} color="#1E3A8A" />
              <View style={localStyles.infoTextGroup}>
                <Text style={localStyles.infoLabel}>Phone</Text>
                <Text style={localStyles.infoValue}>{phone}</Text>
              </View>
            </View>
          </View>

          {/* ── PROFILE CONTENT: Professional Details ── */}
          <View style={localStyles.sectionHeader}>
            <Text style={localStyles.sectionTitle}>Professional Details</Text>
          </View>
          <View style={localStyles.card}>
            <View style={localStyles.infoRow}>
              <FeatherIcon name="book" size={16} color="#1E3A8A" />
              <View style={localStyles.infoTextGroup}>
                <Text style={localStyles.infoLabel}>Qualification</Text>
                <Text style={localStyles.infoValue}>{qualification}</Text>
              </View>
            </View>
            <View style={localStyles.divider} />
            <View style={localStyles.infoRow}>
              <FeatherIcon name="dollar-sign" size={16} color="#1E3A8A" />
              <View style={localStyles.infoTextGroup}>
                <Text style={localStyles.infoLabel}>Expected Salary</Text>
                <Text style={localStyles.infoValue}>{expectedSalary}</Text>
              </View>
            </View>
            <View style={localStyles.divider} />
            <View style={localStyles.infoRow}>
              <FeatherIcon name="clock" size={16} color="#1E3A8A" />
              <View style={localStyles.infoTextGroup}>
                <Text style={localStyles.infoLabel}>Notice Period</Text>
                <Text style={localStyles.infoValue}>{noticePeriod}</Text>
              </View>
            </View>
            <View style={localStyles.divider} />
            <View style={localStyles.infoRow}>
              <FeatherIcon name="navigation" size={16} color="#1E3A8A" />
              <View style={localStyles.infoTextGroup}>
                <Text style={localStyles.infoLabel}>Preferred Location</Text>
                <Text style={localStyles.infoValue}>{preferredLocation}</Text>
              </View>
            </View>
            <View style={localStyles.divider} />
            <View style={localStyles.infoRow}>
              <FeatherIcon name="user" size={16} color="#1E3A8A" />
              <View style={localStyles.infoTextGroup}>
                <Text style={localStyles.infoLabel}>Gender</Text>
                <Text style={localStyles.infoValue}>{gender}</Text>
              </View>
            </View>
          </View>

          {/* ── PROFILE CONTENT: Skills ── */}
          <View style={localStyles.sectionHeader}>
            <Text style={localStyles.sectionTitle}>Skills</Text>
          </View>
          <View style={localStyles.card}>
            {skillsArray.length > 0 ? (
              <View style={localStyles.skillsContainer}>
                {skillsArray.map((skill, index) => (
                  <View key={index} style={localStyles.skillBadge}>
                    <Text style={localStyles.skillText}>{skill}</Text>
                  </View>
                ))}
              </View>
            ) : (
              <Text style={localStyles.emptyText}>No skills added yet.</Text>
            )}
          </View>

          {/* Action Buttons */}
          <TouchableOpacity
            style={localStyles.editButton}
            onPress={() => navigation.navigate('EditEmployeeProfile')}
          >
            <FeatherIcon name="edit-2" size={16} color="#FFF" style={{ marginRight: 8 }} />
            <Text style={localStyles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[localStyles.editButton, localStyles.logoutButton]}
            onPress={async () => {
              const { logoutUser } = require('../../services/authService');
              await logoutUser();
              if (typeof clearEmployeeProfile === 'function') {
                clearEmployeeProfile();
              }
              navigation.reset({
                index: 0,
                routes: [{ name: 'Root' }],
              });
            }}
          >
            <FeatherIcon name="log-out" size={16} color="#FFF" style={{ marginRight: 8 }} />
            <Text style={localStyles.editButtonText}>Log Out</Text>
          </TouchableOpacity>

        </ScrollView>

        

      </View>
    </SafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 100,
  },

  /* Hero / Summary Card */
  heroCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E3A8A',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  avatarContainer: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarInitials: {
    fontSize: 26,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  heroDetails: {
    flex: 1,
  },
  heroName: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  heroRole: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '600',
    marginBottom: 4,
  },
  heroMeta: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.65)',
    marginBottom: 2,
  },

  /* Section Headers */
  sectionHeader: {
    marginBottom: 8,
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A1A1A',
  },

  /* Quick Menu Card */
  menuCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#EFEFEF',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },
  menuIconWrap: {
    width: 34,
    height: 34,
    borderRadius: 8,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  menuBadge: {
    fontSize: 13,
    color: '#888',
    marginRight: 8,
  },
  menuDivider: {
    height: 1,
    backgroundColor: '#F5F5F5',
    marginLeft: 46,
  },

  /* Info Cards */
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#EFEFEF',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 8,
  },
  infoTextGroup: {
    marginLeft: 14,
    flex: 1,
  },
  infoLabel: {
    fontSize: 11,
    color: '#999',
    marginBottom: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  infoValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginLeft: 30,
  },

  /* Skills */
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillBadge: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  skillText: {
    color: '#1E3A8A',
    fontSize: 13,
    fontWeight: '500',
  },
  emptyText: {
    fontSize: 14,
    color: '#AAA',
    fontStyle: 'italic',
  },

  /* Buttons */
  editButton: {
    backgroundColor: '#1E3A8A',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 4,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    marginTop: 12,
  },
  editButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default React.memo(Profile);
