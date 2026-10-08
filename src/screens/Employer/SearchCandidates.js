import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../../styles/Employer/SearchCandidates';

const SearchCandidates = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    // Optionally pass the query
    navigation.navigate('SearchResults', { query: searchQuery });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        
        {/* Header: Back button + Title in one line */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#1A1A24" />
          </TouchableOpacity>
          <Text style={styles.title}>Search Candidates</Text>
        </View>

        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#AEAEAE" />
          <TextInput 
            style={styles.searchInput}
            placeholder="Search by role, skills etc."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#AEAEAE"
          />
        </View>

        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

export default React.memo(SearchCandidates);
