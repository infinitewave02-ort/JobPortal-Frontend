import React, { useState, useEffect, useCallback } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  StatusBar
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../../styles/Employee/Messages';
import { useEmployee } from '../../context/EmployeeContext';
import { getCurrentUser } from '../../services/authService';
import { getConversations } from '../../services/messageService';

const Messages = ({ navigation, route }) => {
  const { employeeProfile } = useEmployee();
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchEmployeeConversations = useCallback(async (isRefresh = false) => {
    try {
      if (!isRefresh) setLoading(true);
      const currentUser = getCurrentUser();
      const storedUid = await AsyncStorage.getItem('userUid');
      const uid = currentUser?.uid || storedUid || employeeProfile?.uid || employeeProfile?.userId || 'employee_user';
      const res = await getConversations({ userId: uid });
      const data = res?.data?.data || res?.data || [];
      if (Array.isArray(data)) {
        setConversations(data);
      }
    } catch (err) {
      console.warn('Error fetching employee conversations:', err?.message || err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [employeeProfile]);

  useEffect(() => {
    fetchEmployeeConversations();
    const unsubscribe = navigation.addListener('focus', () => {
      fetchEmployeeConversations(true);
    });
    return unsubscribe;
  }, [navigation, fetchEmployeeConversations]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchEmployeeConversations(true);
  };

  const unreadMessages = conversations.filter(m => (m.unread || 0) > 0);
  const baseList = activeTab === 'Unread' ? unreadMessages : conversations;

  const filteredConversations = baseList.filter(item => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    const nameMatch = (item.company || item.name || '').toLowerCase().includes(q);
    const msgMatch = (item.preview || item.msg || '').toLowerCase().includes(q);
    const roleMatch = (item.role || '').toLowerCase().includes(q);
    return nameMatch || msgMatch || roleMatch;
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTopRow}>
          {navigation.canGoBack() && (
            <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <Ionicons name="arrow-back" size={24} color="#111827" />
            </TouchableOpacity>
          )}
          <Text style={styles.headerTitle}>Messages</Text>
          <TouchableOpacity onPress={() => fetchEmployeeConversations(false)}>
            <Ionicons name="refresh-outline" size={22} color="#6B7280" />
          </TouchableOpacity>
        </View>

        {/* Search input */}
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={18} color="#9CA3AF" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search conversations..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={16} color="#9CA3AF" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Segmented Tabs */}
      <View style={styles.tabsRow}>
        <TouchableOpacity
          onPress={() => setActiveTab('All')}
          style={[styles.tab, activeTab === 'All' && styles.activeTab]}
        >
          <Text style={[styles.tabText, activeTab === 'All' && styles.activeTabText]}>
            All ({conversations.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab('Unread')}
          style={[styles.tab, activeTab === 'Unread' && styles.activeTab]}
        >
          <Text style={[styles.tabText, activeTab === 'Unread' && styles.activeTabText]}>
            Unread ({unreadMessages.length})
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#1E3A8A']} />}
      >
        {loading && conversations.length === 0 ? (
          <View style={{ alignItems: 'center', marginTop: 60 }}>
            <ActivityIndicator size="small" color="#1E3A8A" />
            <Text style={{ color: '#888', marginTop: 10 }}>Loading conversations...</Text>
          </View>
        ) : filteredConversations.length > 0 ? (
          filteredConversations.map((chat) => (
            <TouchableOpacity
              key={chat.id || chat.conversationId}
              style={styles.chatRow}
              onPress={() =>
                navigation.navigate('MessageCandidate', {
                  candidateId: chat.otherUserId,
                  otherUserId: chat.otherUserId,
                  candidateName: chat.company || chat.name,
                  candidateRole: chat.role || 'Hiring Manager',
                  companyName: chat.company || chat.name,
                  currentUserRole: 'employee'
                })
              }
              activeOpacity={0.7}
            >
              <View style={styles.avatarWrapper}>
                <View style={styles.avatarContainer}>
                  <Text style={styles.avatarText}>
                    {(chat.company || chat.name || 'C').charAt(0).toUpperCase()}
                  </Text>
                </View>
                <View style={styles.onlineBadge} />
              </View>

              <View style={styles.chatDetails}>
                <View style={styles.chatHeader}>
                  <Text style={styles.companyName} numberOfLines={1}>
                    {chat.company || chat.name}
                  </Text>
                  <Text style={styles.timeText}>{chat.time}</Text>
                </View>

                {Boolean(chat.role) && (
                  <Text style={styles.roleText} numberOfLines={1}>
                    {chat.role.toLowerCase() === 'employer' ? 'Employer' : chat.role.toLowerCase() === 'employee' ? 'Candidate' : chat.role}
                  </Text>
                )}

                <View style={styles.chatMessageContainer}>
                  <Text numberOfLines={1} style={styles.messageSnippet}>
                    {chat.preview || chat.msg || 'Tap to view conversation'}
                  </Text>
                  {chat.unread > 0 ? (
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>{chat.unread}</Text>
                    </View>
                  ) : null}
                </View>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconContainer}>
              <FeatherIcon name="message-square" size={38} color="#9CA3AF" />
            </View>
            <Text style={styles.emptyTitle}>
              {searchQuery ? 'No matching conversations' : `No ${activeTab === 'Unread' ? 'unread messages' : 'messages'} yet`}
            </Text>
            <Text style={styles.emptySubtitle}>
              {searchQuery
                ? 'Try a different keyword to find conversations.'
                : 'Messages and interview invitations from employers will appear here.'}
            </Text>
            {!searchQuery && (
              <TouchableOpacity
                style={styles.emptyButton}
                onPress={() => navigation.navigate('Jobs')}
                activeOpacity={0.8}
              >
                <Text style={styles.emptyButtonText}>Explore Jobs</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default React.memo(Messages);
