import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../../styles/Employee/ChooseOption';

const ChooseOption = ({navigation}) => {
  const [selectedRole, setSelectedRole] = useState('Employee');

  const handleContinue = () => {
    if (selectedRole === 'Employee') {
      navigation?.navigate('EmployeeLogin');
    } else {
      navigation?.navigate('EmployerLogin');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        {/* Top Header Row */}
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigation?.goBack()}>
            <Icon name="arrow-back" size={24} color="#222222" />
          </TouchableOpacity>

          {/* <TouchableOpacity style={styles.iconButton}>
            <Icon name="ellipsis-vertical" size={20} color="#555555" />
          </TouchableOpacity> */}
        </View>

        {/* Title */}
        <Text style={styles.title}>Choose an Option</Text>

        {/* Illustration */}
        <Image
          source={require('../../../Assets/Image/Employee2.png')}
          style={styles.illustration}
          resizeMode="contain"
        />

        {/* Subtitle */}
        <Text style={styles.subtitle}>
          Select how you want{'\n'}to continue
        </Text>

        {/* Employee Option */}
        <View style={styles.option}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[
              styles.optionCard,
              selectedRole === 'Employee' && styles.selectedCard,
            ]}
            onPress={() => {
              setSelectedRole('Employee');
              navigation?.navigate('EmployeeLogin');
            }}>

            <View style={[styles.iconBox, styles.employeeIconBox]}>
              <Icon name="person" size={24} color="#3478DB" />
            </View>

            <View style={styles.optionContent}>
              <Text style={styles.optionTitle}>I'm an Employee</Text>
              <Text style={styles.optionDescription}>
                Find jobs, build profile{'\n'}
                and grow your career
              </Text>
            </View>
          </TouchableOpacity>

          {/* Employer Option */}
          <TouchableOpacity
            activeOpacity={0.8}
            style={[
              styles.optionCard,
              selectedRole === 'Employer' && styles.selectedCard,
            ]}
            onPress={() => {
              setSelectedRole('Employer');
              navigation?.navigate('EmployerLogin');
            }}>

            <View style={[styles.iconBox, styles.employerIconBox]}>
              <Icon name="briefcase" size={22} color="#E99A26" />
            </View>

            <View style={styles.optionContent}>
              <Text style={styles.optionTitle}>I'm an Employer</Text>
              <Text style={styles.optionDescription}>
                Post jobs, find candidates{'\n'}
                and hire the best
              </Text>
            </View>
          </TouchableOpacity>
        </View>

          <TouchableOpacity
          activeOpacity={0.8}
          style={styles.continueLinkContainer}
          onPress={handleContinue}>
          <Text style={styles.continueLinkText}>
            Continue as {selectedRole}
          </Text>
        </TouchableOpacity>


        <View style={{flex: 1}} />

        {/* Continue Text Link */}
      
      </View>
    </SafeAreaView>
  );
};

export default ChooseOption;