import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import styles from '../../styles/Employer/EmployerMessages';
import { useEmployer } from '../../context/EmployerContext';

const EmployerMessages = ({ navigation }) => {
  const { employerProfile } = useEmployer();
  const [activeTab, setActiveTab] = useState('All');
  const [messages] = useState([]); // Will be populated from API in future

  const unreadMessages = messages.filter(m => m.unread);
  const displayedMessages = activeTab === 'Unread' ? unreadMessages : messages;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#1A1A24" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Messages</Text>
      </View>

      <View style={styles.tabsRow}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'All' && styles.activeTab]}
          onPress={() => setActiveTab('All')}
        >
          <Text style={[styles.tabText, activeTab === 'All' && styles.activeTabText]}>All ({messages.length})</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'Unread' && styles.activeTab]}
          onPress={() => setActiveTab('Unread')}
        >
          <Text style={[styles.tabText, activeTab === 'Unread' && styles.activeTabText]}>Unread ({unreadMessages.length})</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.listContainer} showsVerticalScrollIndicator={false}>
        {displayedMessages.length > 0 ? displayedMessages.map((msg) => (
          <TouchableOpacity 
            key={msg.id} 
            style={styles.messageRow}
            onPress={() => navigation.navigate('MessageCandidate')}
            activeOpacity={0.7}
          >
            <View style={styles.avatar} />
            <View style={styles.msgInfo}>
              <View style={styles.nameTimeRow}>
                <Text style={styles.name}>{msg.name}</Text>
                <Text style={styles.time}>{msg.time}</Text>
              </View>
              <View style={styles.msgPreviewRow}>
                <Text style={styles.msgPreview} numberOfLines={1}>{msg.preview}</Text>
                {msg.unread && <View style={styles.unreadDot} />}
              </View>
            </View>
          </TouchableOpacity>
        )) : (
          <View style={{ alignItems: 'center', marginTop: 60 }}>
            <FeatherIcon name="message-square" size={48} color="#D1D1D1" />
            <Text style={{ color: '#888', marginTop: 12, fontSize: 16, fontWeight: '600' }}>
              No {activeTab === 'Unread' ? 'unread messages' : 'messages'} yet
            </Text>
            <Text style={{ color: '#AAAAAA', marginTop: 6, fontSize: 13, textAlign: 'center', paddingHorizontal: 30 }}>
              Messages from candidates will appear here.
            </Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate({ name: 'EmployerDashboard', merge: true })}>
          <Ionicons name="home-outline" size={24} color="#A0A0A0" />
          <Text style={[styles.navLabel, { color: '#A0A0A0' }]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('SearchCandidates')}>
          <Ionicons name="search-outline" size={24} color="#A0A0A0" />
          <Text style={[styles.navLabel, { color: '#A0A0A0' }]}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="chatbubble-ellipses" size={24} color="#485ff4" />
          <Text style={[styles.navLabel, { color: '#485ff4' }]}>Messages</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate({ name: 'EmployerProfileView', params: { ...employerProfile }, merge: true })}>
          <Ionicons name="person-outline" size={24} color="#A0A0A0" />
          <Text style={[styles.navLabel, { color: '#A0A0A0' }]}>Profile</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
};

export default React.memo(EmployerMessages);
