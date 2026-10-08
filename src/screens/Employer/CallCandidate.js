import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StatusBar, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../../styles/Employer/CallCandidate';

const CallCandidate = ({ navigation, route }) => {
  const { candidateName = 'Candidate Name' } = route?.params || {};
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 5 }}>
          <Ionicons name="arrow-back" size={24} color="#1A1A24" />
        </TouchableOpacity>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerName}>{candidateName}</Text>
          <Text style={styles.headerPhone}>+91 98765 43210</Text>
        </View>
      </View>

      <View style={styles.mainContent}>
        {/* Avatar */}
        <View style={styles.avatarWrap}>
          {/* using fallback person icon if user has no image prop */}
          <Ionicons name="person" size={60} color="#CCC" />
        </View>

        <Text style={styles.callStatus}>Calling...</Text>
        <Text style={styles.callName}>{candidateName}</Text>

        <View style={styles.actionRow}>
          <View style={styles.actionBtn}>
            <TouchableOpacity style={styles.iconCircle} activeOpacity={0.7}>
              <Ionicons name="mic-off-outline" size={28} color="#1A1A24" />
            </TouchableOpacity>
            <Text style={styles.actionLabel}>Mute</Text>
          </View>

          <View style={styles.actionBtn}>
            <TouchableOpacity style={styles.iconCircle} activeOpacity={0.7}>
              <Ionicons name="apps-outline" size={28} color="#1A1A24" />
            </TouchableOpacity>
            <Text style={styles.actionLabel}>Keypad</Text>
          </View>

          <View style={styles.actionBtn}>
            <TouchableOpacity style={styles.iconCircle} activeOpacity={0.7}>
              <Ionicons name="volume-high-outline" size={28} color="#1A1A24" />
            </TouchableOpacity>
            <Text style={styles.actionLabel}>Speaker</Text>
          </View>
        </View>

        {/* Hangup Red Button */}
        <TouchableOpacity style={styles.hangupBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <Ionicons name="call" size={32} color="#FFF" style={{ transform: [{ rotate: '135deg' }] }} />
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
};

export default CallCandidate;
