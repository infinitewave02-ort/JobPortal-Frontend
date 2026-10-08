import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../../styles/Employer/PaymentDetails.js';

const PaymentDetails = ({ navigation, route }) => {
  const [amount, setAmount] = useState('₹4,000');
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

        <Text style={styles.title}>Payment Details</Text>
        <Text style={styles.subtitle}>3 Months Plan - ₹4,000</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Amount</Text>
          <TextInput
            style={styles.input}
            value={amount}
            onChangeText={setAmount}
            editable={false}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Payment Method</Text>
          
          <TouchableOpacity style={styles.paymentMethodCard}>
            <View style={styles.paymentMethodIcon}>
               <Ionicons name="logo-google-playstore" size={22} color="#34A853" />
            </View>
            <Text style={styles.paymentMethodText}>UPI / QR</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.paymentMethodCard}>
            <View style={styles.paymentMethodIcon}>
               <Ionicons name="card-outline" size={22} color="#1A1A24" />
            </View>
            <Text style={styles.paymentMethodText}>Card</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.paymentMethodCard}>
            <View style={styles.paymentMethodIcon}>
               <Ionicons name="business-outline" size={22} color="#1A1A24" />
            </View>
            <Text style={styles.paymentMethodText}>Net Banking</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate('PaymentSucess', previousData)}
        >
          <Text style={styles.buttonText}>Pay ₹4,000 Securely</Text>
        </TouchableOpacity>

        <View style={styles.secureTextContainer}>
          <Ionicons name="lock-closed-outline" size={16} color="#707070" />
          <Text style={styles.secureText}>100% Secure Payment</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default PaymentDetails;
