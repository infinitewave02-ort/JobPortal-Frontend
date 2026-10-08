import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../../styles/Employer/MessageCandidate.js';

const MessageCandidate = ({ navigation, route }) => {
  const { candidateName = 'Candidate Name', candidateRole = 'Job Role' } = route?.params || {};
  const [message, setMessage] = useState('');

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#1A1A24" />
          </TouchableOpacity>
          <View style={styles.headerAvatar} />
          <View style={styles.headerInfo}>
            <Text style={styles.headerName}>{candidateName}</Text>
            <Text style={styles.headerRole}>{candidateRole}</Text>
            <View style={styles.statusRow}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>Online</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="call-outline" size={22} color="#1A1A24" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="ellipsis-vertical" size={22} color="#1A1A24" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Chat Area */}
      <ScrollView contentContainerStyle={styles.chatContainer} showsVerticalScrollIndicator={false}>
        
        <Text style={styles.dateHeader}>Today</Text>

        {/* Employer Message 1 */}
        <View style={[styles.messageBubble, styles.employerBubble]}>
          <Text style={styles.employerText}>Hi Ravi,</Text>
          <Text style={styles.employerText}>We have an opening for HR Executive in our company.</Text>
          <Text style={styles.employerText}>Are you interested?</Text>
          <Text style={styles.employerTime}>10:30 AM</Text>
        </View>

        {/* Candidate Message 1 */}
        <View style={[styles.messageBubble, styles.candidateBubble]}>
          <Text style={styles.candidateText}>Yes, I am interested.</Text>
          <Text style={styles.candidateText}>Please share more details.</Text>
          <Text style={styles.candidateTime}>10:32 AM</Text>
        </View>

        {/* Employer Message 2 */}
        <View style={[styles.messageBubble, styles.employerBubble]}>
          <Text style={styles.employerText}>Sure, I will share the job details with you.</Text>
          <Text style={styles.employerTime}>10:33 AM</Text>
        </View>

      </ScrollView>

      {/* Input Area */}
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.attachButton}>
          <Ionicons name="happy-outline" size={26} color="#A0A0A0" />
        </TouchableOpacity>
        <TextInput
          style={styles.inputField}
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message..."
          placeholderTextColor="#A0A0A0"
        />
        <TouchableOpacity style={styles.sendButton}>
          <Ionicons name="send" size={18} color="#FFFFFF" style={{ marginLeft: 4 }} />
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
};

export default MessageCandidate;
