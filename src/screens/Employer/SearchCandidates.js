import React, { useState, useEffect, useContext, useCallback } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView, 
  StatusBar, 
  ScrollView, 
  ActivityIndicator, 
  RefreshControl,
  Image 
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../../styles/Employer/SearchCandidates';
import { getCandidates } from '../../services/candidateService';
import { AdminContext } from '../../context/AdminContext';

const SearchCandidates = ({ navigation }) => {
  const { employees: contextEmployees } = useContext(AdminContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [liveCandidates, setLiveCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchCandidates = useCallback(async (query = '') => {
    try {
      const params = query.trim() ? { q: query.trim() } : {};
      const res = await getCandidates(params);

      let fetched = [];
      if (res && res.data && res.data.data && Array.isArray(res.data.data.candidates)) {
        fetched = res.data.data.candidates;
      } else if (res && res.data && Array.isArray(res.data.data)) {
        fetched = res.data.data;
      } else if (res && res.data && Array.isArray(res.data.candidates)) {
        fetched = res.data.candidates;
      } else if (Array.isArray(res?.data)) {
        fetched = res.data;
      }
      setLiveCandidates(fetched);
    } catch (err) {
      console.log('Error fetching candidates from backend:', err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchCandidates('');
  }, [fetchCandidates]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchCandidates(searchQuery);
  };

  const handleSearch = () => {
    setLoading(true);
    fetchCandidates(searchQuery);
  };

  const handleClear = () => {
    setSearchQuery('');
    setLoading(true);
    fetchCandidates('');
  };

  // Combine live and context candidates
  const combined = [...liveCandidates];
  if (contextEmployees && Array.isArray(contextEmployees)) {
    contextEmployees.forEach(ce => {
      const exists = combined.some(c => (c.id && c.id === ce.id) || (c.uid && c.uid === ce.uid) || (c.email && c.email === ce.email));
      if (!exists) {
        combined.push(ce);
      }
    });
  }

  // Filter candidates locally for snappy feedback
  const listData = combined.filter(c => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    const nameMatch = (c.fullName || c.name || '').toLowerCase().includes(q);
    const roleMatch = (c.jobTitle || c.role || '').toLowerCase().includes(q);
    const skillsText = Array.isArray(c.skills) ? c.skills.join(' ') : (c.skills || '');
    const skillsMatch = skillsText.toLowerCase().includes(q);
    const locMatch = (c.currentLocation || c.location || '').toLowerCase().includes(q);
    return nameMatch || roleMatch || skillsMatch || locMatch;
  });

  const getSkillsList = (skills) => {
    if (Array.isArray(skills)) return skills.filter(s => s && String(s).trim());
    if (typeof skills === 'string' && skills.trim()) {
      return skills.split(/[,\n]/).map(s => s.trim()).filter(Boolean);
    }
    return [];
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <ScrollView 
        contentContainerStyle={styles.container} 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#485ff4']} />
        }
      >
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#1A1A24" />
          </TouchableOpacity>
          <Text style={styles.title}>Search Candidates</Text>
        </View>

        {/* Search Input Box */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#AEAEAE" />
          <TextInput 
            style={styles.searchInput}
            placeholder="Search by role, skills etc."
            value={searchQuery}
            onChangeText={(text) => {
              setSearchQuery(text);
              if (text === '') fetchCandidates('');
            }}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
            placeholderTextColor="#AEAEAE"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={handleClear} style={{ padding: 4 }}>
              <Ionicons name="close-circle" size={18} color="#AEAEAE" />
            </TouchableOpacity>
          )}
        </View>

        {/* Search Button */}
        <TouchableOpacity 
          style={styles.searchButton} 
          onPress={handleSearch}
          activeOpacity={0.8}
        >
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>

        {/* Results Header */}
        <View style={styles.resultsHeader}>
          <Text style={styles.resultsCount}>
            {loading ? 'Searching candidates...' : `Found ${listData.length} Candidates`}
          </Text>
        </View>

        {/* Candidates List */}
        {loading && !refreshing ? (
          <View style={styles.emptyContainer}>
            <ActivityIndicator size="large" color="#485ff4" />
            <Text style={styles.emptyText}>Loading candidates...</Text>
          </View>
        ) : listData.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="people-outline" size={48} color="#CCCCCC" />
            <Text style={styles.emptyText}>No candidates found</Text>
            <Text style={styles.emptySubtext}>
              {searchQuery ? `No candidates match "${searchQuery}". Try different keywords.` : 'No candidates registered in the system yet.'}
            </Text>
          </View>
        ) : (
          listData.map((item, idx) => {
            const candidateName = item.fullName || item.name || 'Candidate';
            const candidateRole = item.jobTitle || item.role || 'Professional';
            const candidateExp = item.experience || item.exp || '0 Years';
            const candidateLoc = item.currentLocation || item.location || item.loc || 'Location Not Provided';
            const candidateSalary = (item.expectedSalary || item.salary) ? `₹${item.expectedSalary || item.salary}/month` : 'Salary not disclosed';
            const candidateEdu = item.qualification || item.education || item.edu || '';
            const skillsList = getSkillsList(item.skills);
            const initial = candidateName.charAt(0).toUpperCase();

            return (
              <View key={item.id || item.uid || idx} style={styles.card}>
                <View style={styles.cardTopRow}>
                  <View style={styles.avatar}>
                    {item.profileImage ? (
                      <Image source={{ uri: item.profileImage }} style={styles.avatarImage} />
                    ) : (
                      <Text style={styles.avatarText}>{initial}</Text>
                    )}
                  </View>
                  <View style={styles.candidateInfo}>
                    <Text style={styles.candidateName}>{candidateName}</Text>
                    <Text style={styles.candidateRole}>{candidateRole}</Text>
                  </View>
                  {(item.openToWork !== false) && (
                    <View style={styles.openToWorkBadge}>
                      <Text style={styles.openToWorkText}>Open to Work</Text>
                    </View>
                  )}
                </View>

                <Text style={styles.detailsText}>
                  {candidateExp} Exp • {candidateLoc}
                </Text>

                <Text style={styles.detailsText}>
                  {candidateSalary}{candidateEdu ? ` • ${candidateEdu}` : ''}
                </Text>

                {skillsList.length > 0 && (
                  <View style={styles.skillsContainer}>
                    {skillsList.slice(0, 4).map((skill, sIdx) => (
                      <View key={sIdx} style={styles.skillBadge}>
                        <Text style={styles.skillText}>{skill}</Text>
                      </View>
                    ))}
                    {skillsList.length > 4 && (
                      <View style={styles.skillBadge}>
                        <Text style={styles.skillText}>+{skillsList.length - 4} more</Text>
                      </View>
                    )}
                  </View>
                )}

                <TouchableOpacity 
                  style={styles.viewProfileButton}
                  activeOpacity={0.7}
                  onPress={() => navigation.navigate('CandidateProfile', { candidate: item })}
                >
                  <Text style={styles.viewProfileText}>View Profile</Text>
                </TouchableOpacity>
              </View>
            );
          })
        )}

      </ScrollView>
    </SafeAreaView>
  );
};

export default React.memo(SearchCandidates);
