import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../../styles/Employer/PaymentSucess.js';

const PaymentSucess = ({ navigation, route }) => {
  const previousData = route?.params || {};
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <ScrollView contentContainerStyle={styles.container}>
        
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#1A1A24" />
          </TouchableOpacity>
      
        </View>

        <View style={styles.successIconContainer}>
          <View style={styles.successCircle}>
            <Ionicons name="checkmark" size={48} color="#FFFFFF" />
          </View>
        </View>

        <Text style={styles.title}>Payment Successful!</Text>
        <Text style={styles.subtitle}>Your payment of ₹4,000{'\n'}was successful.</Text>

        <View style={styles.planDetailsCard}>
          <Text style={styles.planDetailsLabel}>Plan Details</Text>
          <Text style={styles.planDetailsTitle}>3 Months Plan</Text>
          <Text style={styles.planDetailsValid}>Valid till 14 Aug 2026</Text>
        </View>

        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate('EmployerDashboard', previousData)}
        >
          <Text style={styles.buttonText}>Go to Dashboard</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

export default PaymentSucess;
