import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../../styles/Employer/ChoosePlan';

const ChoosePlan = ({ navigation, route }) => {
  const [selectedPlan, setSelectedPlan] = useState('lifetime');

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <ScrollView contentContainerStyle={styles.container}>
        
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#1A1A24" />
          </TouchableOpacity>
         
        </View>

        <Text style={styles.title}>Choose Your Plan</Text>
        <Text style={styles.subtitle}>Select a plan to continue</Text>

        {/* Lifetime Plan Card */}
        <TouchableOpacity 
          style={selectedPlan === 'lifetime' ? styles.planCardSelected : styles.planCardUnselected}
          onPress={() => setSelectedPlan('lifetime')}
          activeOpacity={0.8}
        >
          <View style={selectedPlan === 'lifetime' ? styles.radioOuterSelected : styles.radioOuterUnselected}>
            {selectedPlan === 'lifetime' && <View style={styles.radioInnerSelected} />}
          </View>
          <View style={styles.planInfo}>
            <Text style={styles.planName}>Lifetime Service</Text>
            <Text style={styles.planPrice}>₹4,000</Text>
            <Text style={styles.planDuration}>One-time payment</Text>
          </View>
        </TouchableOpacity>

        <Text style={styles.upgradeText}>You can upgrade or renew later</Text>

        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate('PaymentDetails', route.params)}
        >
          <Text style={styles.buttonText}>Proceed to Payment</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

export default ChoosePlan;