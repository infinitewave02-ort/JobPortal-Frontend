import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  RefreshControl,
  ActivityIndicator
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../../styles/Employer/EmployerMessages';
import { useEmployer } from '../../context/EmployerContext';
import { getCurrentUser } from '../../services/authService';
import { getConversations } from '../../services/messageService';

const EmployerMessages = ({ navigation }) => {
  const { employerProfile } = useEmployer();
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchEmployerConversations = useCallback(async (isRefresh = false) => {
    try {
      if (!isRefresh) setLoading(true);
      const currentUser = getCurrentUser();
      const storedUid = await AsyncStorage.getItem('userUid');
      const uid = currentUser?.uid || storedUid || employerProfile?.uid || employerProfile?.userId || 'employer_user';
      const res = await getConversations({ userId: uid });
      const data = res?.data?.data || res?.data || [];
      if (Array.isArray(data)) {
        setConversations(data);
      }
    } catch (err) {
      console.warn('Error fetching employer conversations:', err?.message || err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [employerProfile]);

  useEffect(() => {
    fetchEmployerConversations();
    const unsubscribe = navigation.addListener('focus', () => {
      fetchEmployerConversations(true);
    });
    return unsubscribe;
  }, [navigation, fetchEmployerConversations]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchEmployerConversations(true);
  };

  const unreadMessages = conversations.filter(m => (m.unread || 0) > 0);
  const baseList = activeTab === 'Unread' ? unreadMessages : conversations;

  const filteredConversations = baseList.filter(item => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    const nameMatch = (item.name || '').toLowerCase().includes(q);
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
          <TouchableOpacity onPress={() => fetchEmployerConversations(false)}>
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

      {/* Tabs */}
      <View style={styles.tabsRow}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'All' && styles.activeTab]}
          onPress={() => setActiveTab('All')}
        >
          <Text style={[styles.tabText, activeTab === 'All' && styles.activeTabText]}>
            All ({conversations.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Unread' && styles.activeTab]}
          onPress={() => setActiveTab('Unread')}
        >
          <Text style={[styles.tabText, activeTab === 'Unread' && styles.activeTabText]}>
            Unread ({unreadMessages.length})
          </Text>
        </TouchableOpacity>
      </View>

      {/* Conversations list */}
      <ScrollView
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#4361EE']} />}
      >
        {loading && conversations.length === 0 ? (
          <View style={{ alignItems: 'center', marginTop: 60 }}>
            <ActivityIndicator size="small" color="#4361EE" />
            <Text style={{ color: '#888', marginTop: 10 }}>Loading conversations...</Text>
          </View>
        ) : filteredConversations.length > 0 ? (
          filteredConversations.map((msg) => (
            <TouchableOpacity
              key={msg.id || msg.conversationId}
              style={styles.messageRow}
              onPress={() =>
                navigation.navigate('MessageCandidate', {
                  candidateId: msg.otherUserId,
                  candidateName: msg.name,
                  candidateRole: msg.role || 'Applicant',
                  currentUserRole: 'employer'
                })
              }
              activeOpacity={0.7}
            >
              <View style={styles.avatarWrapper}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>
                    {(msg.name || 'C').charAt(0).toUpperCase()}
                  </Text>
                </View>
                <View style={styles.onlineBadge} />
              </View>

              <View style={styles.msgInfo}>
                <View style={styles.nameTimeRow}>
                  <Text style={styles.name} numberOfLines={1}>{msg.name}</Text>
                  <Text style={styles.time}>{msg.time}</Text>
                </View>
                {Boolean(msg.role) && (
                  <Text style={styles.roleText} numberOfLines={1}>
                    {msg.role.toLowerCase() === 'employee' ? 'Candidate' : msg.role.toLowerCase() === 'employer' ? 'Employer' : msg.role}
                  </Text>
                )}
                <View style={styles.msgPreviewRow}>
                  <Text style={styles.msgPreview} numberOfLines={1}>
                    {msg.preview || msg.msg || 'Tap to view conversation'}
                  </Text>
                  {msg.unread > 0 ? (
                    <View style={styles.unreadDot}>
                      <Text style={styles.unreadBadgeText}>{msg.unread}</Text>
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
                : 'Connect with candidates and initiate chat discussions regarding opportunities.'}
            </Text>
            {!searchQuery && (
              <TouchableOpacity
                style={styles.emptyButton}
                onPress={() => navigation.navigate('SearchCandidates')}
                activeOpacity={0.8}
              >
                <Text style={styles.emptyButtonText}>Find Candidates</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default React.memo(EmployerMessages);
