import React from 'react';
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
import dashboardStyles from '../../styles/Employee/Dashboard'; // Reuse dashboard styles for bottom bar

import { useState } from 'react';

const Activity = ({navigation, route}) => {
  const [activities, setActivities] = useState([]); // Dynamic activities

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
          <Text style={dashboardStyles.title}>Activity</Text>
        </View>

        <ScrollView contentContainerStyle={localStyles.scrollContainer} showsVerticalScrollIndicator={false}>
          {activities.length > 0 ? activities.map((item) => (
            <View key={item.id} style={localStyles.activityRow}>
              <View style={[localStyles.iconContainer, { backgroundColor: item.color + '20' }]}>
                <Icon name={item.icon} size={24} color={item.color} />
              </View>
              
              <View style={localStyles.activityDetails}>
                <Text style={localStyles.activityTitle}>{item.title}</Text>
                <Text style={localStyles.activityDesc}>{item.desc}</Text>
                <Text style={localStyles.timeText}>{item.time}</Text>
              </View>
            </View>
          )) : (
            <View style={{ alignItems: 'center', marginTop: 40 }}>
              <FeatherIcon name="bell-off" size={48} color="#D1D1D1" />
              <Text style={{ color: '#888', marginTop: 10 }}>No recent activity.</Text>
            </View>
          )}
        </ScrollView>

        

      </View>
    </SafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 90, 
  },
  activityRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  activityDetails: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  activityDesc: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 6,
  },
  timeText: {
    fontSize: 12,
    color: '#999',
  }
});

export default React.memo(Activity);
