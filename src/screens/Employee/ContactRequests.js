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

const ContactRequests = ({navigation}) => {
  const [activeTab, setActiveTab] = useState('All');
  const [requests] = useState([]); // Will be populated from API/context in future

  const filteredRequests = activeTab === 'Missed'
    ? requests.filter(r => r.status === 'Missed Call')
    : requests;

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
          <Text style={dashboardStyles.title}>Calls / Contact Requests</Text>
        </View>

        {/* Top Segmented Tabs */}
        <View style={localStyles.segmentContainerWrapper}>
          <View style={localStyles.segmentContainer}>
            <TouchableOpacity 
              onPress={() => setActiveTab('All')} 
              style={[localStyles.segmentButton, activeTab === 'All' && localStyles.activeSegmentButton]}>
              <Text style={[localStyles.segmentText, activeTab === 'All' && localStyles.activeSegmentText]}>All</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => setActiveTab('Missed')} 
              style={[localStyles.segmentButton, activeTab === 'Missed' && localStyles.activeSegmentButton]}>
              <Text style={[localStyles.segmentText, activeTab === 'Missed' && localStyles.activeSegmentText]}>Missed</Text>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView contentContainerStyle={localStyles.scrollContainer} showsVerticalScrollIndicator={false}>
          {filteredRequests.length > 0 ? filteredRequests.map((item) => (
            <View key={item.id} style={localStyles.card}>
                <View style={localStyles.avatarContainer}>
                    <FeatherIcon name="user" size={20} color="#333" />
                </View>
                
                <View style={localStyles.infoContainer}>
                    <Text style={localStyles.companyName}>{item.company}</Text>
                    <Text style={localStyles.timeText}>{item.time}</Text>
                    <View style={localStyles.statusRow}>
                        <Icon 
                          name={item.status === 'Missed Call' ? 'return-down-back' : (item.status === 'Incoming Call' ? 'arrow-down-left' : 'arrow-up-right')} 
                          size={14} 
                          color={item.status === 'Missed Call' ? '#666' : '#2EBA63'} 
                        />
                        <Text style={localStyles.statusText}>{item.status}</Text>
                    </View>
                </View>
                
                <TouchableOpacity style={localStyles.callBtn}>
                    <Icon name="call" size={24} color={item.iconColor} />
                </TouchableOpacity>
            </View>
          )) : (
            <View style={{ alignItems: 'center', marginTop: 60 }}>
              <FeatherIcon name="phone-off" size={48} color="#D1D1D1" />
              <Text style={{ color: '#888', marginTop: 12, fontSize: 16, fontWeight: '600' }}>No {activeTab === 'Missed' ? 'missed calls' : 'calls'} yet</Text>
              <Text style={{ color: '#AAAAAA', marginTop: 6, fontSize: 13, textAlign: 'center', paddingHorizontal: 30 }}>Call and contact requests from employers will appear here.</Text>
            </View>
          )}
        </ScrollView>

      </View>
    </SafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  segmentContainerWrapper: {
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  segmentContainer: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 4,
  },
  segmentButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 6,
  },
  activeSegmentButton: {
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  segmentText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  activeSegmentText: {
    color: '#1A1A1A',
    fontWeight: '700',
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 48,
    height: 48,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  infoContainer: {
    flex: 1,
  },
  companyName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  timeText: {
    fontSize: 13,
    color: '#888',
    marginBottom: 6,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 13,
    color: '#555',
    marginLeft: 6,
    fontWeight: '500',
  },
  callBtn: {
    padding: 10,
  }
});

export default ContactRequests;
