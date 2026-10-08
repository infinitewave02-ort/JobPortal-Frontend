import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import dashboardStyles from '../../styles/Employee/Dashboard';
import styles from '../../styles/Employee/ProfileViews';

const ProfileViews = ({navigation}) => {
  const [activeTab, setActiveTab] = useState('All');
  const [views] = useState([]); // Will be populated from API/context in future

  return (
    <SafeAreaView style={dashboardStyles.safeArea}>
      <View style={dashboardStyles.container}>
        
        {/* Header */}
        <View style={dashboardStyles.header}>
          <TouchableOpacity
            style={dashboardStyles.headerButton}
            onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color="#1A1A1A" />
          </TouchableOpacity>
          <Text style={dashboardStyles.title}>Profile Views</Text>
        </View>

        {/* Top Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity onPress={() => setActiveTab('All')} style={[styles.tabItem, activeTab === 'All' && styles.activeTab]}>
            <Text style={[styles.tabText, activeTab === 'All' && styles.activeTabText]}>All ({views.length})</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveTab('Today')} style={[styles.tabItem, activeTab === 'Today' && styles.activeTab]}>
            <Text style={[styles.tabText, activeTab === 'Today' && styles.activeTabText]}>Today (0)</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveTab('Week')} style={[styles.tabItem, activeTab === 'Week' && styles.activeTab]}>
            <Text style={[styles.tabText, activeTab === 'Week' && styles.activeTabText]}>This Week (0)</Text>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          {views.length > 0 ? views.map((item) => (
            <View key={item.id} style={styles.card}>
              <View style={styles.logoContainer}>
                <FeatherIcon name="monitor" size={20} color="#1E3A8A" />
              </View>
              
              <View style={styles.details}>
                <Text style={styles.companyName}>{item.company}</Text>
                <Text style={styles.timeText}>{item.time}</Text>
                <Text style={styles.actionText}>{item.action}</Text>
              </View>
            </View>
          )) : (
            <View style={{ alignItems: 'center', marginTop: 60 }}>
              <FeatherIcon name="eye-off" size={48} color="#D1D1D1" />
              <Text style={{ color: '#888', marginTop: 12, fontSize: 16, fontWeight: '600' }}>No profile views yet</Text>
              <Text style={{ color: '#AAAAAA', marginTop: 6, fontSize: 13, textAlign: 'center', paddingHorizontal: 30 }}>Employers who view your profile will appear here.</Text>
            </View>
          )}
        </ScrollView>

      </View>
    </SafeAreaView>
  );
};

export default ProfileViews;
