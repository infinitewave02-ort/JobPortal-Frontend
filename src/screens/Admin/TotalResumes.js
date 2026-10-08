import React from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../../styles/Admin/ManageEmployees';
import { AdminContext } from '../../context/AdminContext';

const TotalResumes = ({ navigation }) => {
  const { employees } = React.useContext(AdminContext);
  const [search, setSearch] = React.useState('');

  // Only employees who actually uploaded a resume
  const resumeEmployees = employees.filter(emp => emp.resumeFile);
  const filtered = resumeEmployees.filter(emp =>
    emp.name?.toLowerCase().includes(search.toLowerCase()) ||
    emp.role?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#1A1A24" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Uploaded Resumes ({resumeEmployees.length})</Text>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={20} color="#A0A0A0" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search resumes..."
            placeholderTextColor="#A0A0A0"
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.listContainer} showsVerticalScrollIndicator={false}>
        {filtered.length === 0 ? (
          <View style={{ alignItems: 'center', marginTop: 60 }}>
            <Ionicons name="document-text-outline" size={48} color="#D1D1D1" />
            <Text style={{ color: '#888', marginTop: 12, fontSize: 16, fontWeight: '600' }}>
              {search ? 'No matching resumes' : 'No resumes uploaded yet'}
            </Text>
            <Text style={{ color: '#AAAAAA', marginTop: 6, fontSize: 13, textAlign: 'center', paddingHorizontal: 30 }}>
              Resumes uploaded by employees will appear here.
            </Text>
          </View>
        ) : (
          filtered.map((emp) => (
            <View key={emp.id} style={styles.card}>
              <View style={styles.cardLeft}>
                <View style={[styles.avatar, { backgroundColor: '#FFF4E5', alignItems: 'center', justifyContent: 'center' }]}>
                  <Ionicons name="document-text" size={20} color="#FF9500" />
                </View>
                <View>
                  <Text style={styles.name}>{emp.name}</Text>
                  <Text style={styles.role}>{emp.role}</Text>
                  <Text style={styles.email} numberOfLines={1}>
                    {emp.resumeFile?.name || 'Resume uploaded'}
                  </Text>
                </View>
              </View>
              <View style={styles.cardRight}>
                <TouchableOpacity 
                  style={[styles.statusBadge, { backgroundColor: '#EBF4FF' }]}
                  onPress={() => navigation.navigate('ResumePreview', { 
                    candidateName: emp.name, 
                    candidateRole: emp.role, 
                    candidate: emp 
                  })}
                >
                  <Text style={[styles.statusBadgeText, { color: '#485ff4' }]}>View Resume</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default React.memo(TotalResumes);
