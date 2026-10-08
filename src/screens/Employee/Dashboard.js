import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Switch,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import styles from '../../styles/Employee/Dashboard';
import { useEmployee } from '../../context/EmployeeContext';

const Dashboard = ({navigation, route}) => {
  const { employeeProfile } = useEmployee();
  const routeParams = route?.params || {};

  // Context takes priority; fall back to route params (for first-time navigation)
  const fullName = employeeProfile?.fullName || routeParams.fullName;
  const jobTitle = employeeProfile?.jobTitle || routeParams.jobTitle;
  const experience = employeeProfile?.experience || routeParams.experience;
  const currentLocation = employeeProfile?.currentLocation || routeParams.currentLocation;

  const [isOpenToWork, setIsOpenToWork] = useState(true);

  // Displayed values with fallback text
  const _name = fullName || 'User Name';
  const _title = jobTitle || 'Add Job Title';
  const _exp = experience || '0 Years';
  const _loc = currentLocation || 'Location not set';

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color="#1A1A1A" />
          </TouchableOpacity>
          <Text style={styles.title}>Dashboard</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollBox} showsVerticalScrollIndicator={false}>
          {/* Profile Section */}
          <View style={styles.profileSection}>
            <View style={styles.avatarContainer}>
              <Icon name="person" size={50} color="#AEAEAE" />
            </View>
            <View style={styles.profileDetails}>
              <Text style={styles.profileName}>{_name}</Text>
              <Text style={styles.profileInfoText}>{_title}</Text>
              <Text style={styles.profileInfoText}>{_exp} Experience</Text>
              <Text style={styles.profileInfoText}>{_loc}</Text>
            </View>
          </View>

          {/* Open to Work Toggle Box */}
          <View style={styles.openToWorkBox}>
            <View style={styles.openToWorkInfo}>
              <Text style={styles.openToWorkTitle}>Open to Work</Text>
              <Text style={styles.openToWorkSubtitle}>Your profile is visible to employers</Text>
            </View>
            <Switch
              trackColor={{ false: "#D1D1D1", true: "#2EBA63" }}
              thumbColor={"#FFFFFF"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => setIsOpenToWork(!isOpenToWork)}
              value={isOpenToWork}
            />
          </View>

          {/* Menu List */}
          <View style={styles.menuList}>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('ProfileViews', route?.params)}>
              <FeatherIcon name="eye" size={20} color="#555555" style={styles.menuIcon} />
              <View style={styles.menuTextContainer}>
                <Text style={styles.menuText}>Profile Views</Text>
              </View>
              <Text style={styles.menuBadge}>0</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Messages', route?.params)}>
              <FeatherIcon name="message-square" size={20} color="#555555" style={styles.menuIcon} />
              <View style={styles.menuTextContainer}>
                <Text style={styles.menuText}>Messages</Text>
              </View>
              <Text style={styles.menuBadge}>0</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('ContactRequests', route?.params)}>
              <FeatherIcon name="phone-call" size={20} color="#555555" style={styles.menuIcon} />
              <View style={styles.menuTextContainer}>
                <Text style={styles.menuText}>Calls / Contact Requests</Text>
              </View>
              <Text style={styles.menuBadge}>0</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Profile', route.params)}>
              <FeatherIcon name="user" size={20} color="#555555" style={styles.menuIcon} />
              <View style={styles.menuTextContainer}>
                <Text style={styles.menuText}>My Profile</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('UploadResume', route.params)}>
              <FeatherIcon name="file-text" size={20} color="#555555" style={styles.menuIcon} />
              <View style={styles.menuTextContainer}>
                <Text style={styles.menuText}>Upload / Update Resume</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <FeatherIcon name="settings" size={20} color="#555555" style={styles.menuIcon} />
              <View style={styles.menuTextContainer}>
                <Text style={styles.menuText}>Settings</Text>
              </View>
            </TouchableOpacity>
          </View>

        </ScrollView>

        {/* Bottom Tab Bar — Home removed */}
        <View style={styles.bottomTabs}>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Jobs', route?.params)}>
            <FeatherIcon name="briefcase" size={24} color="#888888" />
            <Text style={styles.tabText}>Jobs</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Messages', route?.params)}>
            <FeatherIcon name="message-square" size={24} color="#888888" />
            <Text style={styles.tabText}>Messages</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Activity', route?.params)}>
            <FeatherIcon name="bell" size={24} color="#888888" />
            <Text style={styles.tabText}>Activity</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Profile', route?.params)}>
            <Icon name="person-outline" size={24} color="#888888" />
            <Text style={styles.tabText}>Profile</Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
};

export default Dashboard;
