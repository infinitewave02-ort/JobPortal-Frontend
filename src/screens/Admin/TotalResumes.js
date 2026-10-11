import React, { useState } from 'react';
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
import Feather from 'react-native-vector-icons/Feather';
import styles from '../../styles/Admin/TotalResumes';
import { AdminContext } from '../../context/AdminContext';
import useViewResume from '../../hooks/useViewResume';

const TotalResumes = ({ navigation }) => {
  const { employees, resumes, loading, fetchDashboardData } = React.useContext(AdminContext);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('ALL'); // 'ALL' | 'PDF' | 'DOC'

  const { isLoading: isOpeningPdf, openResume } = useViewResume();

  // Combine resumes from employees & standalone resumes
  const allResumeItems = React.useMemo(() => {
    const items = [];
    const seenUris = new Set();

    (employees || []).forEach(emp => {
      const res = emp.resumeFile || emp.resumeUrl;
      if (res) {
        const uri = typeof res === 'object' ? (res.uri || res.fileUrl || '') : String(res);
        const name = typeof res === 'object' ? (res.name || `${emp.fullName || emp.name || 'Candidate'}_Resume.pdf`) : `${emp.fullName || emp.name || 'Candidate'}_Resume.pdf`;
        const size = typeof res === 'object' ? res.size : null;
        if (uri) seenUris.add(uri);
        items.push({
          id: `emp-${emp.id}`,
          candidateId: emp.id,
          candidateName: emp.fullName || emp.name || 'Candidate',
          candidateRole: emp.jobTitle || emp.role || 'Job Seeker',
          candidateEmail: emp.email || '',
          candidatePhone: emp.phone || '',
          fileName: name,
          uri: uri,
          size: size,
          uploadedAt: emp.updatedAt || emp.createdAt || 'Active',
          originalCandidate: emp,
          resumeObj: typeof res === 'object' ? res : { name, uri }
        });
      }
    });

    (resumes || []).forEach(r => {
      const uri = r.downloadUrl || r.fileUrl || r.resumeUrl || '';
      if (uri && !seenUris.has(uri)) {
        seenUris.add(uri);
        const name = r.fileName || 'Resume.pdf';
        items.push({
          id: `res-${r.id || r.resumeId || Math.random()}`,
          candidateName: r.name || r.candidateName || 'Candidate',
          candidateRole: r.role || 'Job Seeker',
          candidateEmail: r.email || '',
          candidatePhone: r.phone || '',
          fileName: name,
          uri: uri,
          size: r.fileSize,
          uploadedAt: r.uploadedAt || 'Recently',
          resumeObj: { name, uri }
        });
      }
    });

    return items;
  }, [employees, resumes]);

  const pdfCount = allResumeItems.filter(i => (i.fileName || '').toLowerCase().includes('.pdf')).length;
  const docCount = allResumeItems.filter(i => (i.fileName || '').toLowerCase().match(/\.(doc|docx)$/)).length;

  const tabs = [
    { key: 'ALL', label: 'All Resumes', count: allResumeItems.length },
    { key: 'PDF', label: 'PDF Files', count: pdfCount },
    { key: 'DOC', label: 'Word / Docs', count: docCount },
  ];

  const filtered = allResumeItems.filter(item => {
    const isPdf = (item.fileName || '').toLowerCase().includes('.pdf');
    const isDoc = (item.fileName || '').toLowerCase().match(/\.(doc|docx)$/);

    if (activeTab === 'PDF' && !isPdf) return false;
    if (activeTab === 'DOC' && !isDoc) return false;

    if (!search.trim()) return true;
    const q = search.toLowerCase();
    const name = item.candidateName.toLowerCase();
    const role = item.candidateRole.toLowerCase();
    const file = item.fileName.toLowerCase();
    const email = item.candidateEmail.toLowerCase();
    return name.includes(q) || role.includes(q) || file.includes(q) || email.includes(q);
  });

  const handleOpenResume = (item) => {
    // Navigate to ResumePreview screen which provides full preview + download options
    navigation.navigate('ResumePreview', { 
      candidateName: item.candidateName, 
      candidateRole: item.candidateRole, 
      candidate: {
        ...(item.originalCandidate || {}),
        name: item.candidateName,
        role: item.candidateRole,
        resumeFile: item.resumeObj || { name: item.fileName, uri: item.uri }
      }
    });
  };

  const handleQuickView = (item) => {
    // Directly opens via native Intent reader hook
    openResume(item.resumeObj || { name: item.fileName, uri: item.uri });
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return null;
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
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
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={20} color="#0F172A" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Uploaded Resumes</Text>
          <View style={styles.headerBadge}>
            <Text style={styles.headerBadgeText}>{filtered.length}</Text>
          </View>
        </View>
        <TouchableOpacity 
          style={styles.reloadButton}
          onPress={fetchDashboardData} 
          activeOpacity={0.7}
        >
          <Ionicons name="reload-outline" size={18} color="#EA580C" />
        </TouchableOpacity>
      </View>

      {/* Search Input */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Feather name="search" size={18} color="#94A3B8" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search candidate, role, or resume name..."
            placeholderTextColor="#94A3B8"
            value={search}
            onChangeText={setSearch}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')} activeOpacity={0.7}>
              <Ionicons name="close-circle" size={18} color="#94A3B8" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Filter Tabs */}
      <View style={styles.tabContainer}>
        {tabs.map(tab => {
          const isActive = activeTab === tab.key;
          return (
            <TouchableOpacity
              key={tab.key}
              style={[styles.tabButton, isActive && styles.tabButtonActive]}
              onPress={() => setActiveTab(tab.key)}
              activeOpacity={0.7}
            >
              <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
                {tab.label}
              </Text>
              <View style={[styles.tabCountBadge, isActive && styles.tabCountBadgeActive]}>
                <Text style={[styles.tabCountText, isActive && styles.tabCountTextActive]}>
                  {tab.count}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Resumes List */}
      <ScrollView 
        contentContainerStyle={styles.listContainer} 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={!!loading} onRefresh={fetchDashboardData} colors={['#EA580C']} />
        }
      >
        {filtered.length === 0 ? (
          <View style={styles.emptyStateContainer}>
            <View style={styles.emptyIconCircle}>
              <Ionicons name="document-text-outline" size={38} color="#94A3B8" />
            </View>
            <Text style={styles.emptyTitle}>
              {search ? 'No matching resumes found' : 'No resumes uploaded yet'}
            </Text>
            <Text style={styles.emptySubtitle}>
              Resumes uploaded by job seekers and candidates will appear here with full view and download options.
            </Text>
          </View>
        ) : (
          filtered.map((item) => {
            const isPdf = (item.fileName || '').toLowerCase().includes('.pdf');
            const sizeStr = formatFileSize(item.size);

            return (
              <View key={item.id} style={styles.card}>
                {/* Top Section */}
                <View style={styles.cardTop}>
                  <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                    <View style={[styles.docIconWrap, { backgroundColor: isPdf ? '#FEF2F2' : '#EFF6FF', borderColor: isPdf ? '#FEE2E2' : '#DBEAFE' }]}>
                      <Ionicons 
                        name={isPdf ? 'document-text' : 'document'} 
                        size={22} 
                        color={isPdf ? '#DC2626' : '#2563EB'} 
                      />
                    </View>
                    <View style={styles.titleArea}>
                      <Text style={styles.candidateName} numberOfLines={1}>{item.candidateName}</Text>
                      <Text style={styles.candidateRole} numberOfLines={1}>{item.candidateRole}</Text>
                      <Text style={[styles.fileNameText, { color: isPdf ? '#DC2626' : '#2563EB' }]} numberOfLines={1}>
                        {item.fileName}
                      </Text>
                    </View>
                  </View>
                  <View style={[styles.fileBadge, { backgroundColor: isPdf ? '#FEF2F2' : '#EFF6FF', borderColor: isPdf ? '#FECACA' : '#BFDBFE' }]}>
                    <Text style={[styles.fileBadgeText, { color: isPdf ? '#DC2626' : '#2563EB' }]}>
                      {isPdf ? 'PDF' : 'DOC'}
                    </Text>
                  </View>
                </View>

                {/* Tags Section */}
                <View style={styles.tagsRow}>
                  {item.candidateEmail ? (
                    <View style={styles.tagChip}>
                      <Ionicons name="mail-outline" size={13} color="#475569" />
                      <Text style={styles.tagText}>{item.candidateEmail}</Text>
                    </View>
                  ) : null}
                  {sizeStr ? (
                    <View style={styles.tagChip}>
                      <Ionicons name="folder-outline" size={13} color="#475569" />
                      <Text style={styles.tagText}>{sizeStr}</Text>
                    </View>
                  ) : null}
                  <View style={styles.tagChip}>
                    <Ionicons name="time-outline" size={13} color="#475569" />
                    <Text style={styles.tagText}>Active Resume</Text>
                  </View>
                </View>

                {/* Card Actions Row */}
                <View style={styles.cardActionsRow}>
                  <TouchableOpacity 
                    style={styles.actionBtnLeft}
                    onPress={() => handleQuickView(item)}
                    activeOpacity={0.7}
                    disabled={isOpeningPdf}
                  >
                    <Ionicons name="eye-outline" size={16} color="#334155" />
                    <Text style={styles.actionBtnLeftText}>Quick Open</Text>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    style={styles.viewResumeBtn}
                    onPress={() => handleOpenResume(item)}
                    activeOpacity={0.8}
                  >
                    <Ionicons name="document-attach-outline" size={16} color="#FFFFFF" />
                    <Text style={styles.viewResumeBtnText}>View Resume</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })
        )}
      </ScrollView>

    </SafeAreaView>
  );
};

export default React.memo(TotalResumes);
