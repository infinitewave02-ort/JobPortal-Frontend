import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, StatusBar, ScrollView, RefreshControl } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import styles from '../../styles/Admin/ManageEmployees';
import { AdminContext } from '../../context/AdminContext';

const OpenToWork = ({ navigation }) => {
  const { employees, loading, fetchDashboardData } = React.useContext(AdminContext);
  const [search, setSearch] = useState('');

  const openEmployees = (employees || []).filter(e => e.openToWork !== false);
  const filtered = openEmployees.filter(emp => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    const name = (emp.fullName || emp.name || '').toLowerCase();
    const role = (emp.jobTitle || emp.role || '').toLowerCase();
    const email = (emp.email || '').toLowerCase();
    return name.includes(q) || role.includes(q) || email.includes(q);
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={20} color="#0F172A" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Open to Work</Text>
          <View style={[styles.headerBadge, { backgroundColor: '#ECFDF5', borderColor: '#A7F3D0' }]}>
            <Text style={[styles.headerBadgeText, { color: '#059669' }]}>{filtered.length}</Text>
          </View>
        </View>
        <TouchableOpacity 
          style={styles.reloadButton}
          onPress={fetchDashboardData}
          activeOpacity={0.7}
        >
          <Ionicons name="reload-outline" size={18} color="#059669" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Feather name="search" size={18} color="#94A3B8" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search open candidates..."
            placeholderTextColor="#94A3B8"
            value={search}
            onChangeText={setSearch}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')}>
              <Ionicons name="close-circle" size={18} color="#94A3B8" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView 
        contentContainerStyle={styles.listContainer} 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={!!loading} onRefresh={fetchDashboardData} colors={['#10B981']} />
        }
      >
        {filtered.length === 0 ? (
          <View style={styles.emptyStateContainer}>
            <View style={styles.emptyIconCircle}>
              <Ionicons name="people-outline" size={38} color="#94A3B8" />
            </View>
            <Text style={styles.emptyTitle}>
              {search ? 'No candidates matching search' : 'No open-to-work candidates found'}
            </Text>
            <Text style={styles.emptySubtitle}>
              Candidates who mark their profile as available will be highlighted here.
            </Text>
          </View>
        ) : (
          filtered.map((emp) => {
            const displayName = emp.fullName || emp.name || 'Candidate';
            const displayRole = emp.jobTitle || emp.role || 'Job Seeker';
            return (
              <View key={emp.id} style={styles.card}>
                <View style={styles.cardTop}>
                  <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                    <View style={[styles.avatar, { backgroundColor: '#ECFDF5', borderColor: '#A7F3D0' }]}>
                      <Ionicons name="briefcase" size={20} color="#059669" />
                    </View>
                    <View style={styles.titleArea}>
                      <Text style={styles.name} numberOfLines={1}>{displayName}</Text>
                      <Text style={styles.role} numberOfLines={1}>{displayRole}</Text>
                      <Text style={styles.email} numberOfLines={1}>{emp.email}</Text>
                    </View>
                  </View>
                  <View style={[styles.statusBadge, { backgroundColor: '#ECFDF5', borderColor: '#A7F3D0' }]}>
                    <View style={[styles.statusDot, { backgroundColor: '#10B981' }]} />
                    <Text style={[styles.statusBadgeText, { color: '#059669' }]}>Available</Text>
                  </View>
                </View>

                {/* Card Actions */}
                <View style={styles.cardActionsRow}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons name="location-outline" size={13} color="#64748B" />
                    <Text style={[styles.tagText, { marginLeft: 4 }]}>{emp.location || 'Remote'}</Text>
                  </View>

                  {emp.resumeFile ? (
                    <TouchableOpacity
                      style={styles.resumeBtn}
                      onPress={() => navigation.navigate('ResumePreview', { candidateName: displayName, candidateRole: displayRole, candidate: emp })}
                      activeOpacity={0.8}
                    >
                      <Ionicons name="document-text" size={15} color="#4338CA" />
                      <Text style={styles.resumeBtnText}>View Resume</Text>
                    </TouchableOpacity>
                  ) : null}
                </View>
              </View>
            );
          })
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default React.memo(OpenToWork);
