import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../../styles/Employer/Dashboard.js';
import { useEmployer } from '../../context/EmployerContext';

const EmployerDashboard = ({ navigation, route }) => {
  const { employerProfile } = useEmployer();
  const routeParams = route?.params || {};
  const employerData = routeParams.employerData || {};

  // Context takes priority; fall back to route params
  const companyName = employerProfile?.companyName || employerData?.companyName || routeParams.companyName || 'Company';
  const contactPerson = employerProfile?.contactPerson || employerData?.contactPerson || routeParams.contactPerson || 'User';
  const industryType = employerProfile?.industryType || employerData?.industryType || routeParams.industryType || '';
  const companyEmail = employerProfile?.companyEmail || employerData?.companyEmail || routeParams.companyEmail || '';
  const contactNumber = employerProfile?.contactNumber || employerData?.contactNumber || routeParams.contactNumber || '';
  const address = 
    employerProfile?.address || 
    employerData?.address || 
    routeParams.address || 
    employerProfile?.companyAddress || 
    employerData?.companyAddress || 
    routeParams.companyAddress || 
    '';

  const cNameWords = companyName.split(' ');
  const primaryAvatarText = cNameWords[0].substring(0, 3).toUpperCase();
  const secondaryAvatarText = cNameWords.length > 1 ? cNameWords[1].substring(0, 6) : '';

  const gridData = [
    { id: 1, title: 'Search\nCandidates', icon: 'search-outline', color: '#485ff4', bg: '#F5F7FF' },
    { id: 2, title: 'Saved\nCandidates', icon: 'document-text-outline', color: '#E88B13', bg: '#FFF7ED' },
    { id: 3, title: 'Messages', icon: 'chatbubble-ellipses-outline', color: '#8A48F4', bg: '#F8F5FF' },
    { id: 4, title: 'Job Posts', icon: 'clipboard-outline', color: '#3DD598', bg: '#F0FDF4' },
    { id: 5, title: 'Applications', icon: 'document-text-outline', color: '#FF4B4B', bg: '#FEF2F2' },
    { id: 6, title: 'Downloaded', icon: 'download-outline', color: '#2AB5E1', bg: '#F0F9FF' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Text style={styles.avatarTextPrimary}>{primaryAvatarText}</Text>
                <Text style={styles.avatarTextSecondary}>{secondaryAvatarText}</Text>
              </View>
              <View style={styles.avatarBadgeIcon}>
                <Ionicons name="briefcase" size={10} color="#FFFFFF" />
              </View>
            </View>
            <View>
              <Text style={styles.welcomeText}>Welcome, {contactPerson}</Text>
              <Text style={styles.companyName}>{companyName}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.phoneIconContainer}>
            <Ionicons name="call-outline" size={18} color="#1A1A24" />
          </TouchableOpacity>
        </View>

        {/* Plan Card removed */}
        {/* Grid Menu */}
        <View style={styles.gridContainer}>
          {gridData.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={[styles.gridItem, { backgroundColor: item.bg }]} 
              activeOpacity={0.8}
              onPress={() => {
                if (item.id === 1) navigation.navigate('SearchCandidates');
                if (item.id === 4) navigation.navigate('CreateJobPost');
              }}
            >
              <View style={[styles.iconWrapper, { backgroundColor: '#FFFFFF' }]}>
                <Ionicons name={item.icon} size={20} color={item.color} />
                {item.badge && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{item.badge}</Text>
                  </View>
                )}
              </View>
              <Text style={styles.gridItemText}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>

      

    </SafeAreaView>
  );
};

export default React.memo(EmployerDashboard);
