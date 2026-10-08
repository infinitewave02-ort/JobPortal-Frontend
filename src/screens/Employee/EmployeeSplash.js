import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  Image,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../../styles/Employee/EmployeeSplash';

const SplashScreen = () => {
  const navigation = useNavigation();

  const employeeLogin = () => {
    navigation.navigate('EmployeeLogin');
  };

  const employerLogin = () => {
    navigation.navigate('EmployerLogin');
  };

  return (
    <LinearGradient
      colors={['#3d76eaff', '#072e7dff']}
      style={styles.container}
    >
      <StatusBar
        backgroundColor="transparent"
        barStyle="light-content"
        translucent={true}
      />  

      <SafeAreaView style={styles.card}>

      {/* ================= HEADER ================= */}

        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Icon name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

      {/* ================= MAIN CARD ================= */}

        <View style={styles.topSection}>
          {/* ================= JOB ICON ================= */}

        <View style={styles.logoContainer}>

          <Image 
            source={require('../../../Assets/Image/splashlogo.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />

        </View>


        {/* ================= TITLE ================= */}

        <Text style={styles.title}>
          Find Right Job
          {'\n'}
          For You
        </Text>


        {/* ================= SUBTITLE ================= */}

        <Text style={styles.subtitle}>
          Smart Search. Better Career
        </Text>

        </View>

        <View style={styles.bottomSection}>
          {/* ================= EMPLOYEE ================= */}

        <TouchableOpacity
          style={styles.employeeButton}
          activeOpacity={0.8}
          onPress={employeeLogin}
        >

          <Text style={styles.employeeText}>
            I'm an Employee
          </Text>

        </TouchableOpacity>


        {/* ================= EMPLOYER ================= */}

        <TouchableOpacity
          style={styles.employerButton}
          activeOpacity={0.8}
          onPress={employerLogin}
        >

          <Text style={styles.employerText}>
            I'm an Employer
          </Text>

          </TouchableOpacity>

        </View>

      </SafeAreaView>

    </LinearGradient>
  );
};

export default SplashScreen;
