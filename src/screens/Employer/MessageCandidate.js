import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../../styles/Employer/MessageCandidate.js';
import { useEmployer } from '../../context/EmployerContext';
import { useEmployee } from '../../context/EmployeeContext';
import { getCurrentUser } from '../../services/authService';
import { getMessagesBetweenUsers, sendMessage } from '../../services/messageService';

const formatTime = (isoString) => {
  if (!isoString) {
    const d = new Date();
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  }
  try {
    const d = new Date(isoString);
    if (isNaN(d.getTime())) return 'Now';
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  } catch (e) {
    return 'Now';
  }
};

const formatDateDivider = (isoString) => {
  if (!isoString) return 'Today';
  try {
    const msgDate = new Date(isoString);
    const today = new Date();
    if (msgDate.toDateString() === today.toDateString()) {
      return 'Today';
    }
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    if (msgDate.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    }
    return msgDate.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
  } catch {
    return 'Today';
  }
};

const MessageCandidate = ({ navigation, route }) => {
  const { employerProfile } = useEmployer();
  const { employeeProfile } = useEmployee();

  // Route parameters
  const params = route?.params || {};
  const isEmployerRole = Boolean(employerProfile?.companyName || params.currentUserRole === 'employer');

  const otherUserName =
    params.candidateName ||
    params.name ||
    params.companyName ||
    params.candidate?.fullName ||
    params.candidate?.name ||
    (isEmployerRole ? 'Candidate' : 'Employer');

  const otherUserRole =
    params.candidateRole ||
    params.role ||
    params.jobRole ||
    params.candidate?.jobTitle ||
    params.candidate?.role ||
    (isEmployerRole ? 'Applicant' : 'Recruiter');

  const candidatePhone = params.phone || params.candidate?.phone || '';

  // Determine other user's ID
  const otherUserId = String(
    params.candidateId ||
    params.otherUserId ||
    params.candidate?.id ||
    params.candidate?.uid ||
    params.candidate?.userId ||
    params.candidate?.email ||
    params.employerId ||
    (isEmployerRole ? 'candidate_default' : 'employer_default')
  );

  const [currentUid, setCurrentUid] = useState(
    getCurrentUser()?.uid ||
    (isEmployerRole ? (employerProfile?.uid || employerProfile?.userId || 'employer_user') : (employeeProfile?.uid || employeeProfile?.userId || 'employee_user'))
  );

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  const scrollViewRef = useRef(null);

  // Suggested prompt chips when starting conversation
  const employerSuggestions = [
    `Hi ${otherUserName}, we have an opening for ${otherUserRole} in our company.`,
    'Are you currently open to new job opportunities?',
    'Could you please share your updated resume?'
  ];

  const employeeSuggestions = [
    'Yes, I am interested. Please share more details.',
    'Thank you for reaching out! What is the job location?',
    'Could we schedule a call to discuss this role?'
  ];

  const suggestions = isEmployerRole ? employerSuggestions : employeeSuggestions;

  // Load current user ID from auth or storage
  useEffect(() => {
    const resolveUser = async () => {
      try {
        const currentUser = getCurrentUser();
        if (currentUser?.uid) {
          setCurrentUid(String(currentUser.uid));
        } else {
          const storedUid = await AsyncStorage.getItem('userUid');
          if (storedUid) {
            setCurrentUid(String(storedUid));
          }
        }
      } catch (err) {
        console.warn('Error resolving user ID:', err);
      }
    };
    resolveUser();
  }, []);

  // Fetch messages from DB
  const fetchMessages = useCallback(async (silent = false) => {
    if (!otherUserId || !currentUid) return;
    try {
      if (!silent) setLoading(true);
      const res = await getMessagesBetweenUsers(otherUserId, { currentUserId: currentUid });
      const data = res?.data?.data || res?.data || [];
      if (Array.isArray(data)) {
        setMessages(data);
      }
    } catch (err) {
      console.warn('Error fetching messages from DB:', err?.message || err);
    } finally {
      if (!silent) setLoading(false);
    }
  }, [otherUserId, currentUid]);

  // Initial fetch and polling every 4 seconds for real-time messages
  useEffect(() => {
    fetchMessages(false);

    const interval = setInterval(() => {
      fetchMessages(true);
    }, 4000);

    return () => clearInterval(interval);
  }, [fetchMessages]);

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  // Send message function
  const handleSend = async (customText = null) => {
    const textToSend = typeof customText === 'string' ? customText.trim() : message.trim();
    if (!textToSend || sending) return;

    setSending(true);
    const now = new Date().toISOString();

    const senderName = isEmployerRole
      ? (employerProfile?.companyName || employerProfile?.contactPerson || 'Employer')
      : (employeeProfile?.fullName || employeeProfile?.name || 'Employee');

    const senderRole = isEmployerRole ? 'employer' : 'employee';
    const receiverRole = isEmployerRole ? 'employee' : 'employer';

    // Optimistic message update
    const optimisticMsg = {
      messageId: 'temp_' + Date.now(),
      senderId: currentUid,
      receiverId: otherUserId,
      message: textToSend,
      senderName,
      receiverName: otherUserName,
      senderRole,
      receiverRole,
      createdAt: now,
      read: false
    };

    setMessages((prev) => [...prev, optimisticMsg]);
    setMessage('');

    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 50);

    try {
      // Save directly into database via Backend API
      await sendMessage({
        senderId: currentUid,
        receiverId: otherUserId,
        message: textToSend,
        senderName,
        receiverName: otherUserName,
        senderRole,
        receiverRole
      });

      // Silently refresh to get persisted message with Firestore ID
      fetchMessages(true);
    } catch (err) {
      console.error('Failed to send message:', err);
      Alert.alert('Error', 'Unable to send message. Please check your network connection.');
    } finally {
      setSending(false);
    }
  };

  const isMyMessage = (msg) => {
    if (String(msg.senderId) === String(currentUid)) return true;
    if (isEmployerRole && msg.senderRole === 'employer') return true;
    if (!isEmployerRole && msg.senderRole === 'employee') return true;
    return false;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="arrow-back" size={24} color="#111827" />
          </TouchableOpacity>
          <View style={styles.avatarContainer}>
            <View style={styles.headerAvatar}>
              <Text style={styles.avatarText}>
                {(otherUserName || 'U').charAt(0).toUpperCase()}
              </Text>
            </View>
            <View style={styles.avatarOnlineDot} />
          </View>
          <View style={styles.headerInfo}>
            <Text style={styles.headerName} numberOfLines={1}>{otherUserName}</Text>
            <Text style={styles.headerRole} numberOfLines={1}>{otherUserRole}</Text>
            <View style={styles.statusRow}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>Online</Text>
            </View>
          </View>
        </View>

        <View style={styles.headerRight}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => {
              if (navigation.navigate) {
                navigation.navigate('CallCandidate', { candidateName: otherUserName, phone: candidatePhone });
              }
            }}
          >
            <Ionicons name="call-outline" size={22} color="#111827" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => {
              Alert.alert(
                'Chat Options',
                `Conversation with ${otherUserName}`,
                [
                  { text: 'Refresh Messages', onPress: () => fetchMessages(false) },
                  { text: 'Cancel', style: 'cancel' }
                ]
              );
            }}
          >
            <Ionicons name="ellipsis-vertical" size={20} color="#111827" />
          </TouchableOpacity>
        </View>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        {/* Chat Area */}
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={[
            styles.chatContainer,
            { flexGrow: 1, justifyContent: messages.length === 0 ? 'center' : 'flex-start' }
          ]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
        >
          {loading && messages.length === 0 ? (
            <View style={{ alignItems: 'center', marginVertical: 30 }}>
              <ActivityIndicator size="small" color="#4361EE" />
              <Text style={{ color: '#888', marginTop: 8, fontSize: 13 }}>Loading conversation...</Text>
            </View>
          ) : messages.length === 0 ? (
            <View style={{ alignItems: 'center', paddingHorizontal: 20 }}>
              <View style={{ width: 68, height: 68, borderRadius: 34, backgroundColor: '#EFF2FE', justifyContent: 'center', alignItems: 'center', marginBottom: 14 }}>
                <Ionicons name="chatbubbles-outline" size={34} color="#4361EE" />
              </View>
              <Text style={{ fontSize: 17, fontWeight: '700', color: '#111827', marginBottom: 6 }}>
                Connect with {otherUserName}
              </Text>
              <Text style={{ fontSize: 13, color: '#6B7280', textAlign: 'center', lineHeight: 19, marginBottom: 20 }}>
                {isEmployerRole
                  ? `Reach out to discuss job openings, project requirements, and interviews.`
                  : `Discuss career opportunities and respond to employer inquiries.`}
              </Text>

              {/* Quick suggestion prompt chips */}
              <View style={styles.suggestionsContainer}>
                <Text style={styles.suggestionsTitle}>Suggested messages</Text>
                <View style={styles.chipList}>
                  {suggestions.map((sug, idx) => (
                    <TouchableOpacity
                      key={idx}
                      style={styles.suggestionChip}
                      onPress={() => handleSend(sug)}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.suggestionText}>{sug}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
          ) : (
            <>
              <View style={styles.dateDividerContainer}>
                <View style={styles.dateDividerBadge}>
                  <Text style={styles.dateDividerText}>
                    {formatDateDivider(messages[0]?.createdAt)}
                  </Text>
                </View>
              </View>

              {messages.map((item, index) => {
                const mine = isMyMessage(item);
                const bubbleStyle = mine ? styles.sentBubble : styles.receivedBubble;
                const textStyle = mine ? styles.sentText : styles.receivedText;

                return (
                  <View key={item.messageId || index} style={[styles.messageBubble, bubbleStyle]}>
                    <Text style={textStyle}>{item.message}</Text>
                    {mine ? (
                      <View style={styles.sentTimeContainer}>
                        <Text style={styles.sentTime}>{formatTime(item.createdAt)}</Text>
                        <Ionicons name="checkmark-done" size={13} color="rgba(255,255,255,0.7)" style={{ marginLeft: 3 }} />
                      </View>
                    ) : (
                      <View style={styles.receivedTimeContainer}>
                        <Text style={styles.receivedTime}>{formatTime(item.createdAt)}</Text>
                      </View>
                    )}
                  </View>
                );
              })}
            </>
          )}
        </ScrollView>

        {/* Input Area */}
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.attachButton} activeOpacity={0.7}>
            <Ionicons name="happy-outline" size={24} color="#9CA3AF" />
          </TouchableOpacity>
          <TextInput
            style={styles.inputField}
            value={message}
            onChangeText={setMessage}
            placeholder="Type a message..."
            placeholderTextColor="#9CA3AF"
            multiline={true}
            returnKeyType="send"
            onSubmitEditing={() => handleSend()}
          />
          <TouchableOpacity
            style={[
              styles.sendButton,
              (!message.trim() || sending) && styles.sendButtonDisabled
            ]}
            onPress={() => handleSend()}
            disabled={!message.trim() || sending}
            activeOpacity={0.8}
          >
            {sending ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <Ionicons name="send" size={17} color="#FFFFFF" style={{ marginLeft: 2 }} />
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default MessageCandidate;
