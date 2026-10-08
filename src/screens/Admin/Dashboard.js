import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StatusBar, ScrollView, Modal, TouchableWithoutFeedback } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../../styles/Admin/Dashboard';
import { AdminContext } from '../../context/AdminContext';

const AdminDashboard = ({ navigation }) => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const { employees, employers, jobs } = React.useContext(AdminContext);

  const stats = [
    { id: 1, title: 'Total Employees', value: employees.length, subtext: 'Registered Users', bg: '#F4EBFF', route: 'ManageEmployees' },
    { id: 2, title: 'Total Employers', value: employers.length, subtext: 'Registered Companies', bg: '#EBF4FF', route: 'ManageEmployers' },
    { id: 3, title: 'Open to Work', value: employees.filter(e => e.openToWork).length, subtext: 'Seeking Opportunities', bg: '#EDFDF2', route: 'OpenToWork' },
    { id: 4, title: 'Total Resumes', value: employees.filter(e => e.resumeFile).length, subtext: 'Uploaded', bg: '#FFF4E5', route: 'TotalResumes' },
    { id: 5, title: 'Active Job Posts', value: jobs.length, subtext: 'Currently listed', bg: '#FFEBEB', route: 'ManageJobs' },
    { id: 6, title: 'Total Payments', value: `₹${employers.length * 4000}`, subtext: 'Accumulated', bg: '#EFFFF4', route: 'ReportsAnalytics' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setSidebarVisible(true)}>
          <Ionicons name="menu-outline" size={28} color="#1A1A24" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Dashboard</Text>
      </View>

      <ScrollView contentContainerStyle={styles.gridContainer} showsVerticalScrollIndicator={false}>
        {stats.map((stat) => (
          <TouchableOpacity 
            key={stat.id} 
            style={[styles.card, { backgroundColor: stat.bg }]}
            onPress={() => stat.route && navigation.navigate(stat.route)}
            activeOpacity={0.8}
          >
            <Text style={styles.cardTitle}>{stat.title}</Text>
            <Text style={styles.cardValue}>{stat.value}</Text>
            <Text style={styles.cardSubValue}>{stat.subtext}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Sidebar Modal */}
      <Modal visible={isSidebarVisible} transparent={true} animationType="fade">
        <TouchableOpacity 
          style={styles.modalBackdrop} 
          activeOpacity={1} 
          onPress={() => setSidebarVisible(false)}
        >
          <TouchableOpacity 
            style={styles.sidebarContainer} 
            activeOpacity={1} 
            onPress={() => {}} // Stop propagation to backdrop
          >
            <View style={styles.sidebarHeader}>
              <Ionicons name="shield-checkmark" size={32} color="#485ff4" />
              <Text style={styles.sidebarTitle}>Admin Panel</Text>
            </View>

            <TouchableOpacity style={styles.sidebarButton} onPress={() => { setSidebarVisible(false); }}>
              <Ionicons name="grid-outline" size={24} color="#485ff4" />
              <Text style={[styles.sidebarButtonText, { color: '#485ff4' }]}>Dashboard</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.sidebarButton} onPress={() => { setSidebarVisible(false); navigation.navigate('ManageEmployees'); }}>
              <Ionicons name="people-outline" size={24} color="#707070" />
              <Text style={styles.sidebarButtonText}>Manage Employees</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.sidebarButton} onPress={() => { setSidebarVisible(false); navigation.navigate('ManageEmployers'); }}>
              <Ionicons name="business-outline" size={24} color="#707070" />
              <Text style={styles.sidebarButtonText}>Manage Employers</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.sidebarButton} onPress={() => { setSidebarVisible(false); navigation.navigate('ManageJobs'); }}>
              <Ionicons name="briefcase-outline" size={24} color="#707070" />
              <Text style={styles.sidebarButtonText}>Manage Jobs</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.sidebarButton} onPress={() => { setSidebarVisible(false); navigation.navigate('ReportsAnalytics'); }}>
              <Ionicons name="pie-chart-outline" size={24} color="#707070" />
              <Text style={styles.sidebarButtonText}>Reports & Analytics</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.logoutButton} onPress={() => { 
              setSidebarVisible(false); 
              navigation.reset({
                index: 1,
                routes: [
                  { name: 'Root' },
                  { name: 'AdminLogin' },
                ],
              }); 
            }}>
              <Ionicons name="log-out-outline" size={24} color="#FF4B4B" />
              <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

    </SafeAreaView>
  );
};

export default React.memo(AdminDashboard);
