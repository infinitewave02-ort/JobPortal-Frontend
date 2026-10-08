import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../../styles/Admin/ReportsAnalytics';
import { AdminContext } from '../../context/AdminContext';

const ReportsAnalytics = ({ navigation }) => {
  const { employees, employers, jobs } = React.useContext(AdminContext);

  const totalRegistrations = employees.length + employers.length;
  const employeesWithResume = employees.filter(e => e.resumeFile).length;

  const stats = [
    { id: 1, label: 'Total Registrations', value: totalRegistrations, trend: 'Live' },
    { id: 2, label: 'Total Employees', value: employees.length, trend: 'Live' },
    { id: 3, label: 'Total Employers', value: employers.length, trend: 'Live' },
    { id: 4, label: 'Total Jobs Posted', value: jobs.length, trend: 'Live' },
    { id: 5, label: 'Resumes Uploaded', value: employeesWithResume, trend: 'Live' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#1A1A24" />
          </TouchableOpacity>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#1A1A24', marginLeft: 16 }}>Analytics Overview</Text>
        </View>
      </View>

      <View style={styles.dropdownContainer}>
        <TouchableOpacity style={styles.dropdown}>
          <Text style={styles.dropdownText}>This Month</Text>
          <Ionicons name="chevron-down" size={20} color="#1A1A24" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.listContainer} showsVerticalScrollIndicator={false}>
        {stats.map((stat) => (
          <View key={stat.id} style={styles.statRow}>
            <View>
              <Text style={styles.statLabel}>{stat.label}</Text>
              <Text style={styles.statValue}>{stat.value}</Text>
            </View>
            <View style={styles.statRight}>
              <Text style={styles.trendText}>{stat.trend}</Text>
            </View>
          </View>
        ))}

        <TouchableOpacity style={styles.footerButton}>
          <Text style={styles.footerButtonText}>View Detailed Reports</Text>
        </TouchableOpacity>
      </ScrollView>

    </SafeAreaView>
  );
};

export default React.memo(ReportsAnalytics);
