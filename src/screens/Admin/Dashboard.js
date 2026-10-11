import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StatusBar, ScrollView, Modal, RefreshControl } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../../styles/Admin/Dashboard';
import { AdminContext } from '../../context/AdminContext';

const AdminDashboard = ({ navigation }) => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const { employees, employers, jobs, dashboardStats, loading, fetchDashboardData } = React.useContext(AdminContext);

  useFocusEffect(
    useCallback(() => {
      if (fetchDashboardData) {
        fetchDashboardData();
      }
    }, [])
  );

  const totalEmp = dashboardStats?.totalEmployees ?? employees.length;
  const totalEmplr = dashboardStats?.totalEmployers ?? employers.length;
  const activeJobs = dashboardStats?.activeJobs ?? (dashboardStats?.totalJobs ?? jobs.length);
  const totalPay = dashboardStats?.totalPayments ? `₹${dashboardStats.totalPayments}` : `₹${employers.length * 4000}`;
  const pendingPay = dashboardStats?.pendingPayments ? `₹${dashboardStats.pendingPayments}` : '₹0';
  const pendingCount = dashboardStats?.pendingPaymentsCount ?? 0;

  const stats = [
    { id: 1, title: 'Total Employees', value: totalEmp, subtext: 'Registered Users', bg: '#F4EBFF', route: 'ManageEmployees' },
    { id: 2, title: 'Total Employers', value: totalEmplr, subtext: 'Registered Companies', bg: '#EBF4FF', route: 'ManageEmployers' },
    { id: 3, title: 'Active Job Posts', value: activeJobs, subtext: 'Currently listed', bg: '#FFEBEB', route: 'ManageJobs' },
    { id: 4, title: 'Total Payments', value: totalPay, subtext: 'Accumulated', bg: '#EFFFF4', route: 'ReportsAnalytics', params: { filter: 'completed' } },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <View style={[styles.header, { justifyContent: 'space-between' }]}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => setSidebarVisible(true)}>
            <Ionicons name="menu-outline" size={28} color="#1A1A24" />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { marginLeft: 16 }]}>Dashboard</Text>
        </View>
        <TouchableOpacity 
          onPress={() => navigation.navigate('AdminProfile')}
          style={{ padding: 6 }}
          activeOpacity={0.7}
        >
          <Ionicons name="person-circle-outline" size={28} color="#485ff4" />
        </TouchableOpacity>
      </View>


      <ScrollView 
        contentContainerStyle={styles.gridContainer} 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={!!loading} onRefresh={fetchDashboardData} colors={['#485ff4']} />
        }
      >
        {stats.map((stat) => (
          <TouchableOpacity 
            key={stat.id} 
            style={[styles.card, { backgroundColor: stat.bg }]}
            onPress={() => stat.route && navigation.navigate(stat.route, stat.params)}
            activeOpacity={0.8}
          >
            <Text style={styles.cardTitle}>{stat.title}</Text>
            <Text style={styles.cardValue}>{stat.value}</Text>
            <Text style={styles.cardSubValue}>{stat.subtext}</Text>
          </TouchableOpacity>
        ))}

        {/* Pending Payments Feature Card */}
        {/* <TouchableOpacity
          style={styles.pendingCard}
          onPress={() => navigation.navigate('ReportsAnalytics', { filter: 'pending' })}
          activeOpacity={0.85}
        >
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
              <View style={styles.pendingDot} />
              <Text style={styles.pendingCardTitle}>Pending Payments</Text>
            </View>
            <Text style={styles.pendingCardValue}>{pendingPay}</Text>
            <Text style={styles.pendingCardSubtext}>
              {pendingCount > 0 ? `${pendingCount} employer invoice awaiting approval` : 'All invoices settled'}
            </Text>
          </View>
          <View style={styles.pendingActionPill}>
            <Text style={styles.pendingActionText}>Review Details</Text>
            <Ionicons name="arrow-forward" size={14} color="#EA580C" />
          </View>
        </TouchableOpacity> */}
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

            <TouchableOpacity style={styles.sidebarButton} onPress={() => { setSidebarVisible(false); navigation.navigate('AdminProfile'); }}>
              <Ionicons name="settings-outline" size={24} color="#707070" />
              <Text style={styles.sidebarButtonText}>Admin Settings</Text>
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
