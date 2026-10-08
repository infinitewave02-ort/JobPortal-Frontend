import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../../styles/Employee/ProfileCreated';

const ProfileCreated = ({navigation, route}) => {
  const previousData = route?.params || {};

  const handleGoToDashboard = () => {
    navigation.navigate('Profile', { ...previousData });
  };

    const handleGoToHome = () => {
    navigation.navigate('Root', { ...previousData });
  };


  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Optional back button if needed, although user finished flow it's in the design */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color="#1A1A1A" />
          </TouchableOpacity>
        </View>

        {/* Success Icon */}
        <View style={styles.iconContainer}>
            <Icon name="checkmark" size={48} color="#FFFFFF" />
        </View>

        {/* Title */}
        <Text style={styles.title}>Profile Created{'\n'}Successfully!</Text>

        {/* Subtitle */}
        <Text style={styles.subtitle}>Your profile has been created.{'\n'}You can update anytime.</Text>

        {/* Dashboard Button */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.actionButton}
          onPress={handleGoToDashboard}>
          <Text style={styles.actionButtonText}>Go to Profile</Text>
        </TouchableOpacity>


      </View>
    </SafeAreaView>
  );
};

export default ProfileCreated;
