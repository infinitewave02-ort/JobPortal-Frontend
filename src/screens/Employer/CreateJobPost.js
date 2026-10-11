import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, StatusBar, ScrollView, Alert, ActivityIndicator } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../../styles/Employer/CreateJobPost';
import { AdminContext } from '../../context/AdminContext';
import { useEmployer } from '../../context/EmployerContext';
import { createJob } from '../../services/jobService';

const CreateJobPost = ({ navigation }) => {
  const { addJob } = useContext(AdminContext);
  const { employerProfile } = useEmployer();
  const [jobTitle, setJobTitle] = useState('');
  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePostJob = async () => {
    if (!jobTitle || !location || !description) {
      Alert.alert('Error', 'Please fill in all mandatory fields.');
      return;
    }

    const numericUserId = typeof employerProfile?.userId === 'number' 
      ? employerProfile.userId 
      : (typeof employerProfile?.uid === 'number' 
          ? employerProfile.uid 
          : (!isNaN(Number(employerProfile?.userId)) ? Number(employerProfile.userId) : (!isNaN(Number(employerProfile?.uid)) ? Number(employerProfile.uid) : undefined)));

    const jobData = {
       title: jobTitle.trim(),
       location: location.trim(),
       salary: salary.trim(),
       description: description.trim(),
       company: employerProfile?.companyName || 'Unknown Company',
       companyName: employerProfile?.companyName || 'Unknown Company',
       posted: new Date().toLocaleDateString(),
       employerEmail: employerProfile?.companyEmail || employerProfile?.email || '',
       ...(numericUserId !== undefined ? { userId: numericUserId, employerId: numericUserId } : {})
    };
    
    setLoading(true);
    try {
      const res = await createJob(jobData);
      const savedJob = res?.data?.data || res?.data || jobData;
      addJob(savedJob);
      Alert.alert('Success', 'Job posted successfully!', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (err) {
      console.error('Backend job post error:', err.response?.data || err.message);
      const errorMsg = err.response?.data?.error || err.response?.data?.message || err.message || 'Failed to post job.';
      Alert.alert('Error Posting Job', errorMsg);
    } finally {
      setLoading(false);
    }
  };


  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#1A1A24" />
          </TouchableOpacity>
          <Text style={styles.title}>Post a Job</Text>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Job Title *</Text>
          <TextInput 
            style={styles.input} 
            value={jobTitle} 
            onChangeText={setJobTitle} 
            placeholder="e.g. Software Engineer"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Location *</Text>
          <TextInput 
            style={styles.input} 
            value={location} 
            onChangeText={setLocation} 
            placeholder="e.g. Remote, or New York"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Salary</Text>
          <TextInput 
            style={styles.input} 
            value={salary} 
            onChangeText={setSalary} 
            placeholder="e.g. INR 50,000 / month"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Job Description *</Text>
          <TextInput 
            style={[styles.input, styles.textArea]} 
            value={description} 
            onChangeText={setDescription} 
            placeholder="Describe the responsibilities and requirements..."
            multiline={true}
          />
        </View>

        <TouchableOpacity 
          style={[styles.button, loading && { opacity: 0.7 }]} 
          onPress={handlePostJob}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.buttonText}>Post Job</Text>
          )}
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

export default React.memo(CreateJobPost);
