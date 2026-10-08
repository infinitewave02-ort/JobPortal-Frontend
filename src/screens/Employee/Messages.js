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
import styles from '../../styles/Employee/Messages';

const Messages = ({navigation, route}) => {
  const [activeTab, setActiveTab] = useState('All');
  const [messages, setMessages] = useState([]); // Replace with real data source

  const unreadMessages = messages.filter(m => m.unread > 0);
  const displayedMessages = activeTab === 'Unread' ? unreadMessages : messages;
  const unreadCount = unreadMessages.length;

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
          <Text style={dashboardStyles.title}>Messages</Text>
        </View>

        {/* Segmented Tabs */}
        <View style={styles.tabWrapper}>
          <TouchableOpacity
            onPress={() => setActiveTab('All')}
            style={[styles.tabButton, activeTab === 'All' && styles.activeTabButton]}>
            <Text style={[styles.tabText, activeTab === 'All' && styles.activeTabText]}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab('Unread')}
            style={[styles.tabButton, activeTab === 'Unread' && styles.activeTabButton]}>
            <Text style={[styles.tabText, activeTab === 'Unread' && styles.activeTabText]}>
              Unread ({unreadCount})
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          {displayedMessages.length > 0 ? displayedMessages.map((chat) => (
            <TouchableOpacity key={chat.id} style={styles.chatRow}>
              <View style={[styles.avatarContainer, { backgroundColor: chat.iconColor + '18' }]}>
                <FeatherIcon name="user" size={22} color={chat.iconColor || '#333'} />
              </View>

              <View style={styles.chatDetails}>
                <View style={styles.chatHeader}>
                  <Text style={[styles.companyName, chat.unread > 0 && styles.unreadText]}>
                    {chat.company}
                  </Text>
                  <Text style={[styles.timeText, chat.unread > 0 && styles.unreadTime]}>{chat.time}</Text>
                </View>

                <View style={styles.chatMessageContainer}>
                  <Text numberOfLines={1} style={[styles.messageSnippet, chat.unread > 0 && styles.unreadSnippet]}>
                    {chat.msg}
                  </Text>
                  {chat.unread > 0 && (
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>{chat.unread}</Text>
                    </View>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          )) : (
            <View style={{ alignItems: 'center', marginTop: 40 }}>
              <FeatherIcon name="message-square" size={48} color="#D1D1D1" />
              <Text style={{ color: '#888', marginTop: 10 }}>
                {activeTab === 'Unread' ? 'No unread messages.' : 'No messages yet.'}
              </Text>
            </View>
          )}
        </ScrollView>

        

      </View>
    </SafeAreaView>
  );
};


export default React.memo(Messages);
