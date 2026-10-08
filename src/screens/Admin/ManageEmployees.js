import React from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../../styles/Admin/ManageEmployees';
import { AdminContext } from '../../context/AdminContext';

const ManageEmployees = ({ navigation }) => {
  const { employees, deleteEmployee } = React.useContext(AdminContext);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#1A1A24" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Employees</Text>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={20} color="#A0A0A0" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name, email, phone..."
            placeholderTextColor="#A0A0A0"
          />
        </View>
        <TouchableOpacity style={styles.filterIcon}>
          <Ionicons name="filter-outline" size={24} color="#1A1A24" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.listContainer} showsVerticalScrollIndicator={false}>
        {employees.map((emp) => (
          <View key={emp.id} style={styles.card}>
            <View style={styles.cardLeft}>
              <View style={styles.avatar} />
              <View>
                <Text style={styles.name}>{emp.name}</Text>
                <Text style={styles.role}>{emp.role}</Text>
                <Text style={styles.email}>{emp.email}</Text>
              </View>
            </View>
            <View style={styles.cardRight}>
              <View style={[styles.statusBadge, { backgroundColor: emp.status === 'Active' ? '#F0FDF4' : '#FFF7ED' }]}>
                <Text style={[styles.statusBadgeText, { color: emp.status === 'Active' ? '#3DD598' : '#E88B13' }]}>
                  {emp.status}
                </Text>
              </View>
              {emp.resumeFile && (
                <TouchableOpacity
                  style={{ marginTop: 6, padding: 6, backgroundColor: '#EBF4FF', borderRadius: 4, alignItems: 'center' }}
                  onPress={() => navigation.navigate('ResumePreview', { candidateName: emp.name, candidateRole: emp.role, candidate: emp })}
                >
                  <Text style={{ color: '#485ff4', fontSize: 12, fontWeight: 'bold' }}>Resume</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity 
                onPress={() => deleteEmployee(emp.id)} 
                style={{ marginTop: 6, padding: 6, backgroundColor: '#FF4B4B', borderRadius: 4, alignItems: 'center' }}
              >
                <Text style={{ color: '#fff', fontSize: 12, fontWeight: 'bold' }}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        <TouchableOpacity style={styles.footerButton}>
          <Text style={styles.footerButtonText}>View All Employees</Text>
        </TouchableOpacity>
      </ScrollView>

    </SafeAreaView>
  );
};

export default React.memo(ManageEmployees);
