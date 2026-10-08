import React from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../../styles/Admin/ManageJobs';
import { AdminContext } from '../../context/AdminContext';

const ManageJobs = ({ navigation }) => {
  const { jobs } = React.useContext(AdminContext);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#1A1A24" />
          </TouchableOpacity>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#1A1A24', marginLeft: 16 }}>Job Posts</Text>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={20} color="#A0A0A0" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search job title, company..."
            placeholderTextColor="#A0A0A0"
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.listContainer} showsVerticalScrollIndicator={false}>
        {jobs.map((job) => (
          <View key={job.id} style={styles.card}>
            <View style={styles.cardLeft}>
              <View>
                <Text style={styles.name}>{job.title}</Text>
                <Text style={styles.role}>{job.company}</Text>
                <Text style={styles.email}>{job.posted}</Text>
              </View>
            </View>
            <View style={styles.cardRight}>
              <View style={[styles.statusBadge, { backgroundColor: '#F0FDF4' }]}>
                <Text style={[styles.activeText, { color: job.status === 'Active' ? '#3DD598' : '#FF9500' }]}>{job.status}</Text>
              </View>
            </View>
          </View>
        ))}

        <TouchableOpacity style={styles.footerButton}>
          <Text style={styles.footerButtonText}>View All Jobs</Text>
        </TouchableOpacity>
      </ScrollView>

    </SafeAreaView>
  );
};

export default React.memo(ManageJobs);
