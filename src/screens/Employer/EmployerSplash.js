import React from 'react';
import { View, Text, Image, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from '../../styles/Employer/EmployerSplash.js';

const Employer = ({ navigation }) => {
  return (
    <LinearGradient
      colors={['#485ff4ff', '#090D37']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" backgroundColor="#1F2B7B" />
        
        <View style={styles.content}>
          {/* Logo Section */}
          <View style={styles.logoContainer}>
       
              <Image 
                source={require('../../../Assets/Image/Berif.png')}
                style={styles.logoImage}
                resizeMode="contain"
              />
           
          </View>

          {/* Text Section */}
          <View style={styles.textContainer}>
            <Text style={styles.title}>
              Find Right Talent{'\n'}For Your Company
            </Text>
            <Text style={styles.subtitle}>
              Smart Search. Quality Hiring.
            </Text>
          </View>
        </View>

        {/* Action Buttons Section */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={() => navigation.navigate('EmployerLogin')}
          >
            <Text style={styles.primaryButtonText}>I'm an Employer</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.secondaryButton}
            onPress={() => navigation.navigate('EmployeeSplash')}
          >
            <Text style={styles.secondaryButtonText}>I'm a Job Seeker</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Employer;
