/**
 * useViewResume — React hook
 *
 * Handles opening a PDF resume in the device's native PDF reader via Android Intent.
 *
 * Supported sources:
 *  • LOCAL  — file already picked by @react-native-documents/picker (content:// URI)
 *             → wrap with FileProvider authority and fire ACTION_VIEW Intent
 *  • REMOTE — http/https URL
 *             → download to app cache via react-native-blob-util, then fire Intent
 *
 * States returned:
 *  isLoading  — true while downloading a remote file
 *  progress   — download progress 0-100 (remote only)
 *  openResume — call this with a resumeFile object or URL string
 */

import { useState, useCallback } from 'react';
import { Alert, Platform } from 'react-native';
import RNBlobUtil from 'react-native-blob-util';

const APP_ID = 'com.myapp'; // must match applicationId in build.gradle

/**
 * @param {object|string|null} resumeFile
 *   object → { uri: string, name?: string, ... }  (from document picker)
 *   string → remote http/https URL
 *   null   → no resume uploaded
 */
export default function useViewResume() {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const openResume = useCallback(async (resumeFile) => {
    // ── Guard: nothing uploaded ──────────────────────────────────
    if (!resumeFile) {
      Alert.alert(
        'No Resume Found',
        'No resume has been uploaded yet. Please upload a resume first.',
        [{ text: 'OK' }]
      );
      return;
    }

    if (Platform.OS !== 'android') {
      // iOS: react-native-blob-util also supports openDocument on iOS
      Alert.alert('Info', 'PDF viewing is optimised for Android in this app.');
      return;
    }

    // ── Determine URI & file name ────────────────────────────────
    const isRemote =
      typeof resumeFile === 'string' &&
      (resumeFile.startsWith('http://') || resumeFile.startsWith('https://'));

    const isLocalPicker =
      typeof resumeFile === 'object' &&
      resumeFile !== null &&
      typeof resumeFile.uri === 'string';

    try {
      if (isRemote) {
        // ─────────────────── REMOTE PDF ────────────────────────
        const url = resumeFile;
        const fileName = url.split('/').pop().split('?')[0] || 'resume.pdf';
        const destPath = `${RNBlobUtil.fs.dirs.CacheDir}/${Date.now()}_${fileName}`;

        setIsLoading(true);
        setProgress(0);

        await RNBlobUtil.config({
          fileCache: true,
          path: destPath,
          addAndroidDownloads: {
            // No notification, no MediaStore — pure cache download
            useDownloadManager: false,
          },
        })
          .fetch('GET', url)
          .progress({ interval: 250 }, (received, total) => {
            if (total > 0) setProgress(Math.round((received / total) * 100));
          });

        setIsLoading(false);
        setProgress(0);

        // Open from cache via FileProvider Intent
        await _openFileIntent(destPath, 'application/pdf');

      } else if (isLocalPicker) {
        // ─────────────────── LOCAL (content:// URI) ────────────
        // Picked by @react-native-documents/picker → already a content URI.
        // Android can open content:// URIs directly with VIEW Intent.
        const { uri } = resumeFile;

        // Try content:// direct open first
        if (uri.startsWith('content://')) {
          await _openContentUri(uri);
        } else if (uri.startsWith('file://')) {
          // file:// URI — copy to cache to get a FileProvider content:// URI
          const fileName = resumeFile.name || 'resume.pdf';
          const destPath = `${RNBlobUtil.fs.dirs.CacheDir}/${Date.now()}_${fileName}`;
          await RNBlobUtil.fs.cp(uri.replace('file://', ''), destPath);
          await _openFileIntent(destPath, 'application/pdf');
        } else {
          throw new Error('Unknown URI scheme: ' + uri);
        }
      } else {
        Alert.alert('Invalid Resume', 'The resume file format is not recognised.');
      }
    } catch (err) {
      setIsLoading(false);
      setProgress(0);
      console.error('[useViewResume]', err);

      if (err?.message?.includes('No Activity') || err?.message?.includes('ActivityNotFoundException')) {
        Alert.alert(
          'No PDF App Found',
          'Please install a PDF reader app (e.g. Adobe Acrobat, Google Drive) to open this resume.',
          [{ text: 'OK' }]
        );
      } else if (err?.message?.includes('Network') || err?.message?.includes('fetch')) {
        Alert.alert(
          'Download Failed',
          'Could not download the resume. Please check your internet connection and try again.',
          [{ text: 'OK' }]
        );
      } else {
        Alert.alert(
          'Cannot Open Resume',
          'An error occurred while trying to open the resume. Please try again.',
          [{ text: 'OK' }]
        );
      }
    }
  }, []);

  return { isLoading, progress, openResume };
}

// ────────────────────────────────────────────────────────────────
// Helpers
// ────────────────────────────────────────────────────────────────

/** Open a local file path via Android FileProvider → VIEW Intent */
async function _openFileIntent(absolutePath, mimeType) {
  await RNBlobUtil.android.actionViewIntent(absolutePath, mimeType);
}

/** Open a content:// URI via Android VIEW Intent */
async function _openContentUri(contentUri) {
  // react-native-blob-util can open content URIs directly
  await RNBlobUtil.android.actionViewIntent(contentUri, 'application/pdf');
}
