import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StatusBar, ScrollView, Image, ActivityIndicator } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../../styles/Employer/SearchResults';
import { AdminContext } from '../../context/AdminContext';
import { getCandidates } from '../../services/candidateService';

const SearchResults = ({ navigation, route }) => {
  const { employees: contextEmployees } = useContext(AdminContext);
  const [liveCandidates, setLiveCandidates] = useState([]);
  const [loading, setLoading] = useState(false);
  const query = route?.params?.query || '';

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    setLoading(true);
    try {
      const res = await getCandidates();
      if (res && res.data && Array.isArray(res.data.data)) {
        setLiveCandidates(res.data.data);
      } else if (res && res.data && Array.isArray(res.data.candidates)) {
        setLiveCandidates(res.data.candidates);
      } else if (Array.isArray(res.data)) {
        setLiveCandidates(res.data);
      }
    } catch (err) {
      console.log('Error fetching backend candidates:', err.message);
    } finally {
      setLoading(false);
    }
  };

  // Combine live and context candidates
  const combined = [...liveCandidates];
  if (contextEmployees && Array.isArray(contextEmployees)) {
    contextEmployees.forEach(ce => {
      const exists = combined.some(c => c.id === ce.id || c.email === ce.email);
      if (!exists) {
        combined.push(ce);
      }
    });
  }

  const listData = combined.filter(c => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    const nameMatch = (c.fullName || c.name || '').toLowerCase().includes(q);
    const roleMatch = (c.jobTitle || c.role || '').toLowerCase().includes(q);
    const skillsMatch = (c.skills || '').toLowerCase().includes(q);
    return nameMatch || roleMatch || skillsMatch;
  });


  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#1A1A24" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Found {listData.length} Candidates</Text>
      </View>

      <ScrollView contentContainerStyle={styles.listContainer} showsVerticalScrollIndicator={false}>
        {listData.length === 0 ? (
          <Text style={{ textAlign: 'center', marginTop: 30, color: '#A0A0A0' }}>No candidates match your search.</Text>
        ) : (
          listData.map((item) => (
          <View key={item.id} style={styles.card}>
            <View style={styles.cardTopRow}>
              <View style={styles.avatar} />
              <View style={styles.candidateInfo}>
                <Text style={styles.candidateName}>{item.fullName || item.name || 'Candidate'}</Text>
                <Text style={styles.candidateRole}>{item.jobTitle || item.role || 'Professional'}</Text>
              </View>
              <View style={styles.openToWorkBadge}>
                <Text style={styles.openToWorkText}>Open to Work</Text>
              </View>
            </View>
            
            <Text style={styles.detailsText}>{item.experience || item.exp || '0'} Exp • {item.currentLocation || item.loc || 'Location Not Provided'}</Text>
            <Text style={styles.detailsText}>{(item.expectedSalary || item.salary) ? `₹${item.expectedSalary || item.salary}/month` : 'Salary not disclosed'} • {item.qualification || item.edu || 'Not specified'}</Text>

            <TouchableOpacity 
              style={styles.viewProfileButton}
              onPress={() => navigation.navigate('CandidateProfile', { candidate: item })}
            >
              <Text style={styles.viewProfileText}>View Profile</Text>
            </TouchableOpacity>
          </View>
        )))}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('EmployerDashboard')}>
          <Ionicons name="home-outline" size={24} color="#A0A0A0" />
          <Text style={[styles.navLabel, { color: '#A0A0A0' }]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="search" size={24} color="#485ff4" />
          <Text style={[styles.navLabel, { color: '#485ff4' }]}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('EmployerMessages')}>
          <Ionicons name="chatbubble-ellipses-outline" size={24} color="#A0A0A0" />
          <Text style={[styles.navLabel, { color: '#A0A0A0' }]}>Messages</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('EmployerProfileView')}>
          <Ionicons name="person-outline" size={24} color="#A0A0A0" />
          <Text style={[styles.navLabel, { color: '#A0A0A0' }]}>Profile</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
};

export default SearchResults;
