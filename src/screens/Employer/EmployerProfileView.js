import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useFocusEffect } from '@react-navigation/native';
import styles from '../../styles/Employer/EmployerProfileView';
import { useEmployer } from '../../context/EmployerContext';

const EmployerProfileView = ({ navigation, route }) => {
  const { employerProfile, updateEmployerProfile } = useEmployer();
  const routeParams = route?.params || {};

  // Fetch profile from backend every time screen is focused
  useFocusEffect(
    useCallback(() => {
      let isMounted = true;
      const fetchProfile = async () => {
        let mergedUser = {};
        try {
          const { getMe } = require('../../services/authService');
          const res = await getMe();
          const resUser = res?.data?.data || res?.data?.user || res?.data || {};
          if (resUser && typeof resUser === 'object') {
            mergedUser = { ...mergedUser, ...resUser };
          }
        } catch (meErr) {
          console.warn('Failed to fetch user in EmployerProfileView:', meErr.message);
        }

        try {
          const { getCompanyProfile } = require('../../services/employerService');
          const companyRes = await getCompanyProfile();
          const companyData = companyRes?.data?.data || companyRes?.data || companyRes;
          if (companyData && typeof companyData === 'object') {
            mergedUser = { ...mergedUser, ...companyData };
          }
        } catch (companyErr) {
          console.warn('Failed to fetch company details:', companyErr.message);
        }

        if (isMounted && Object.keys(mergedUser).length > 0 && typeof updateEmployerProfile === 'function') {
          updateEmployerProfile(mergedUser);
        }
      };
      fetchProfile();
      return () => { isMounted = false; };
    }, [updateEmployerProfile])
  );

  const companyName = employerProfile?.companyName || routeParams.companyName || 'Company Name';
  const industryType = employerProfile?.industryType || routeParams.industryType || 'Not specified';
  const contactPerson = employerProfile?.contactPerson || employerProfile?.name || routeParams.contactPerson || routeParams.name || 'Not specified';
  const companyEmail = employerProfile?.companyEmail || employerProfile?.email || routeParams.companyEmail || routeParams.email || 'Not specified';
  const contactNumber = employerProfile?.contactNumber || employerProfile?.phone || routeParams.contactNumber || routeParams.phone || 'Not specified';
  const address = 
    employerProfile?.address || 
    routeParams.address || 
    employerProfile?.companyAddress || 
    routeParams.companyAddress || 
    'Not specified';
  const location = 
    employerProfile?.location || 
    routeParams.location || 
    '';
  const website = employerProfile?.website || routeParams.website || 'Not specified';

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#1A1A24" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Company Profile</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        <View style={styles.logoContainer}>
          <Text style={styles.companyName}>{companyName}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Industry</Text>
          <Text style={styles.value}>{industryType}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Contact Person</Text>
          <Text style={styles.value}>{contactPerson}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{companyEmail}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Contact Number</Text>
          <Text style={styles.value}>{contactNumber}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Address</Text>
          <Text style={styles.value}>{address}</Text>
        </View>

        {location ? (
          <View style={styles.section}>
            <Text style={styles.label}>Location</Text>
            <Text style={styles.value}>{location}</Text>
          </View>
        ) : null}

        <View style={styles.section}>
          <Text style={styles.label}>Website</Text>
          <Text style={styles.value}>{website}</Text>
        </View>

        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate('EditEmployerProfile')}
        >
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, { backgroundColor: '#FF3B30', marginTop: 15 }]}
          onPress={async () => {
            const { logoutUser } = require('../../services/authService');
            await logoutUser();
            navigation.reset({
              index: 0,
              routes: [{ name: 'Root' }],
            });
          }}
        >
          <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>

      </ScrollView>

      

    </SafeAreaView>
  );
};

export default React.memo(EmployerProfileView);
