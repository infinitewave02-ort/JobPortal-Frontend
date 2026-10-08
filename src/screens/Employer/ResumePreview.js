import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../../styles/Employer/ResumePreview';
import useViewResume from '../../hooks/useViewResume';

const ResumePreview = ({ navigation, route }) => {
  const { candidateName = 'Candidate Name', candidateRole = 'Job Role', candidate = {} } = route?.params || {};

  const hasPdf = !!candidate.resumeFile;
  const fileName = candidate.resumeFile?.name || `${candidateName}_Resume.pdf`;

  const { isLoading, progress, openResume } = useViewResume();

  const handleOpenPdf = () => openResume(candidate.resumeFile || null);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#1A1A24" />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {hasPdf ? fileName : 'Resume Preview'}
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.documentContainer}>

          {hasPdf ? (
            <View style={{ flex: 1, alignItems: 'center', padding: 24 }}>

              {/* Tappable PDF card */}
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={handleOpenPdf}
                disabled={isLoading}
                style={{
                  width: '100%',
                  backgroundColor: '#FFF4F4',
                  borderRadius: 20,
                  padding: 28,
                  alignItems: 'center',
                  borderWidth: 2,
                  borderColor: '#E74C3C',
                  borderStyle: 'dashed',
                  marginBottom: 20,
                }}
              >
                <Ionicons name="document-text" size={64} color="#E74C3C" />
                <Text style={{ fontSize: 16, fontWeight: '700', color: '#1A1A24', textAlign: 'center', marginTop: 14 }}>
                  {fileName}
                </Text>
                {candidate.resumeFile?.size ? (
                  <Text style={{ fontSize: 13, color: '#888', marginTop: 6 }}>
                    {(candidate.resumeFile.size / (1024 * 1024)).toFixed(2)} MB
                  </Text>
                ) : null}

                {/* Action pill */}
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 18,
                  backgroundColor: isLoading ? '#AAAAAA' : '#E74C3C',
                  paddingHorizontal: 24,
                  paddingVertical: 12,
                  borderRadius: 30,
                  minWidth: 180,
                  justifyContent: 'center',
                }}>
                  {isLoading ? (
                    <>
                      <ActivityIndicator size="small" color="#fff" style={{ marginRight: 8 }} />
                      <Text style={{ color: '#fff', fontWeight: '700', fontSize: 15 }}>
                        Downloading… {progress}%
                      </Text>
                    </>
                  ) : (
                    <>
                      <Ionicons name="eye-outline" size={18} color="#fff" />
                      <Text style={{ color: '#fff', fontWeight: '700', fontSize: 15, marginLeft: 8 }}>
                        Tap to Open PDF
                      </Text>
                    </>
                  )}
                </View>
              </TouchableOpacity>

              {/* Uploaded badge */}
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#F0FDF4',
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 20,
                marginBottom: 24,
              }}>
                <Ionicons name="checkmark-circle" size={16} color="#2EBA63" />
                <Text style={{ color: '#2EBA63', marginLeft: 6, fontWeight: '600', fontSize: 13 }}>
                  Resume Uploaded Successfully
                </Text>
              </View>

              {/* Candidate info card */}
              <View style={{ width: '100%', backgroundColor: '#F8F9FA', borderRadius: 12, padding: 16 }}>
                <Text style={{ fontSize: 13, color: '#888', marginBottom: 2 }}>Candidate</Text>
                <Text style={{ fontSize: 16, fontWeight: '700', color: '#1A1A24', marginBottom: 14 }}>{candidateName}</Text>

                <Text style={{ fontSize: 13, color: '#888', marginBottom: 2 }}>Role</Text>
                <Text style={{ fontSize: 15, fontWeight: '600', color: '#1A1A24', marginBottom: 14 }}>{candidateRole}</Text>

                {candidate.skills ? (
                  <>
                    <Text style={{ fontSize: 13, color: '#888', marginBottom: 2 }}>Skills</Text>
                    <Text style={{ fontSize: 15, color: '#1A1A24', marginBottom: 14 }}>{candidate.skills}</Text>
                  </>
                ) : null}

                {candidate.exp ? (
                  <>
                    <Text style={{ fontSize: 13, color: '#888', marginBottom: 2 }}>Experience</Text>
                    <Text style={{ fontSize: 15, color: '#1A1A24' }}>{candidate.exp}</Text>
                  </>
                ) : null}
              </View>

            </View>
          ) : (
            /* No resume state */
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', minHeight: 420, padding: 24 }}>
              <View style={{
                width: 110,
                height: 110,
                borderRadius: 24,
                backgroundColor: '#F5F5F5',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 24,
              }}>
                <Ionicons name="document-text-outline" size={60} color="#D1D1D1" />
              </View>
              <Text style={{ fontSize: 20, fontWeight: '700', color: '#1A1A24', textAlign: 'center', marginBottom: 10 }}>
                No Resume Uploaded
              </Text>
              <Text style={{ fontSize: 14, color: '#AAAAAA', textAlign: 'center', lineHeight: 22 }}>
                {candidateName} has not uploaded a resume yet.
              </Text>
            </View>
          )}

        </View>
      </ScrollView>

      {/* Bottom Open Button — only shown when PDF exists */}
      {hasPdf && (
        <View style={styles.bottomFixed}>
          <TouchableOpacity
            style={[styles.downloadBtn, {
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              opacity: isLoading ? 0.6 : 1,
            }]}
            activeOpacity={0.8}
            onPress={handleOpenPdf}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <ActivityIndicator size="small" color="#fff" style={{ marginRight: 8 }} />
                <Text style={styles.downloadBtnText}>Downloading… {progress}%</Text>
              </>
            ) : (
              <>
                <Ionicons name="open-outline" size={20} color="#fff" style={{ marginRight: 8 }} />
                <Text style={styles.downloadBtnText}>Open Resume in PDF App</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      )}

    </SafeAreaView>
  );
};

export default ResumePreview;
