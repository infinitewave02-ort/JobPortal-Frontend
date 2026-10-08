import React from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../../styles/Admin/ManageEmployees';
import { AdminContext } from '../../context/AdminContext';

const OpenToWork = ({ navigation }) => {
  const { employees } = React.useContext(AdminContext);
  const openEmployees = employees.filter(e => e.openToWork);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#1A1A24" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Open to Work Candidates</Text>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={20} color="#A0A0A0" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search candidates..."
            placeholderTextColor="#A0A0A0"
          />
        </View>
        <TouchableOpacity style={styles.filterIcon}>
          <Ionicons name="filter-outline" size={24} color="#1A1A24" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.listContainer} showsVerticalScrollIndicator={false}>
        {openEmployees.length === 0 ? (
          <Text style={{ textAlign: 'center', marginTop: 40, color: '#A0A0A0' }}>No candidates found.</Text>
        ) : (
          openEmployees.map((emp) => (
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
                <View style={[styles.statusBadge, { backgroundColor: '#F0FDF4' }]}>
                  <Text style={[styles.statusBadgeText, { color: '#3DD598' }]}>Open to Work</Text>
                </View>
                {emp.active && <Text style={styles.activeText}>Active</Text>}
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default React.memo(OpenToWork);
