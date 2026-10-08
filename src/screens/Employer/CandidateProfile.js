import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../../styles/Employer/CandidateProfile.js';

const CandidateProfile = ({ navigation, route }) => {
  const { candidate } = route?.params || {};
  
  // Use received candidate data, fallback to generic placeholders
  const name = candidate?.name || candidate?.fullName || 'Candidate Name';
  const role = candidate?.role || candidate?.jobTitle || 'Job Role';
  const experience = candidate?.experience || candidate?.exp || '0 Years';
  const location = candidate?.currentLocation || candidate?.loc || 'Location Not Provided';
  const salary = candidate?.expectedSalary || candidate?.salary || 'Not Provided';
  const education = candidate?.qualification || candidate?.edu || 'Not Provided';
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#1A1A24" />
        </TouchableOpacity>
      
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Profile Identity */}
        <View style={styles.profileCard}>
          <View style={styles.largeAvatar} />
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.role}>{role}</Text>
          <View style={styles.iconRow}>
            <Ionicons name="briefcase-outline" size={14} color="#707070" />
            <Text style={styles.iconText}>{experience} Experience</Text>
          </View>
          <View style={styles.iconRow}>
            <Ionicons name="location-outline" size={14} color="#707070" />
            <Text style={styles.iconText}>{location}</Text>
          </View>
        </View>

        {/* About */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.sectionText}>
            {candidate?.summary || `${education} graduate with experience as a ${role}.`}
          </Text>
        </View>

        {/* Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Details</Text>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Experience</Text>
            <Text style={styles.detailValue}>{experience}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Qualification</Text>
            <Text style={styles.detailValue}>{education}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Skills</Text>
            <Text style={styles.detailValue}>{candidate?.skills || 'Not Provided'}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Expected Salary (₹/month)</Text>
            <Text style={styles.detailValue}>{salary ? `₹${salary}` : 'Not Provided'}</Text>
          </View>
          {/* Static details removed */}
          <View style={styles.actionBtnRow}>
            <TouchableOpacity style={styles.actionBtnSolid} onPress={() => navigation.navigate('ResumePreview', { candidateName: name, candidateRole: role, candidate })}>
              <Text style={styles.actionBtnSolidText}>View Resume</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtnSolid}>
              <Text style={styles.actionBtnSolidText}>Download Resume</Text>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>

      {/* Sticky Bottom Actions */}
      <View style={styles.stickyFooter}>
        <TouchableOpacity style={styles.messageBtn} onPress={() => navigation.navigate('MessageCandidate', { candidateName: name, candidateRole: role })}>
          <Ionicons name="chatbubble-outline" size={20} color="#FFFFFF" />
          <Text style={styles.messageBtnText}>Message</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.callBtn} onPress={() => navigation.navigate('CallCandidate', { candidateName: name })}>
          <Ionicons name="call-outline" size={20} color="#3DD598" />
          <Text style={styles.callBtnText}>Call</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
};

export default CandidateProfile;
