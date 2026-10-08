import api from '../api/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth, {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword as fbCreateUserWithEmailAndPassword,
  signOut as fbSignOut,
  sendPasswordResetEmail as fbSendPasswordResetEmail,
} from '@react-native-firebase/auth';

export const registerEmployee = (data) => api.post('/api/auth/register', data);
export const syncUser = (data) => api.post('/api/auth/sync', data);
export const getMe = () => api.get(`/api/auth/me?t=${new Date().getTime()}`);

export const getAuthInstance = () => {
  if (typeof getAuth === 'function') {
    try {
      const a = getAuth();
      if (a) return a;
    } catch (e) {
      // fallback
    }
  }
  if (typeof auth === 'function') {
    try {
      const a = auth();
      if (a) return a;
    } catch (e) {
      // fallback
    }
  }
  return auth;
};

export const loginUser = async (email, password) => {
  const authInstance = getAuthInstance();
  let userCredential;

  if (typeof signInWithEmailAndPassword === 'function') {
    userCredential = await signInWithEmailAndPassword(authInstance, email, password);
  } else if (authInstance && typeof authInstance.signInWithEmailAndPassword === 'function') {
    userCredential = await authInstance.signInWithEmailAndPassword(email, password);
  } else {
    throw new Error('Authentication method signInWithEmailAndPassword is not available');
  }

  const idToken = await userCredential.user.getIdToken();
  await AsyncStorage.setItem('userToken', idToken);
  return userCredential.user;
};

export const registerUser = async (email, password) => {
  const authInstance = getAuthInstance();
  let userCredential;

  if (typeof fbCreateUserWithEmailAndPassword === 'function') {
    userCredential = await fbCreateUserWithEmailAndPassword(authInstance, email, password);
  } else if (authInstance && typeof authInstance.createUserWithEmailAndPassword === 'function') {
    userCredential = await authInstance.createUserWithEmailAndPassword(email, password);
  } else {
    throw new Error('Authentication method createUserWithEmailAndPassword is not available');
  }

  const idToken = await userCredential.user.getIdToken();
  await AsyncStorage.setItem('userToken', idToken);
  return userCredential.user;
};

export const logoutUser = async () => {
  try {
    const authInstance = getAuthInstance();
    if (typeof fbSignOut === 'function') {
      await fbSignOut(authInstance);
    } else if (authInstance && typeof authInstance.signOut === 'function') {
      await authInstance.signOut();
    }
  } catch (err) {
    console.warn('Firebase signout error:', err);
  }
  await AsyncStorage.removeItem('userToken');
  await AsyncStorage.removeItem('userRole');
  await AsyncStorage.removeItem('userData');
};

export const forgotPassword = async (email) => {
  const authInstance = getAuthInstance();
  if (typeof fbSendPasswordResetEmail === 'function') {
    return await fbSendPasswordResetEmail(authInstance, email);
  } else if (authInstance && typeof authInstance.sendPasswordResetEmail === 'function') {
    return await authInstance.sendPasswordResetEmail(email);
  } else {
    throw new Error('Send password reset email method is not available');
  }
};

export const changePassword = async (newPassword) => {
  const authInstance = getAuthInstance();
  const user = authInstance?.currentUser;
  if (!user) throw new Error('No user is currently signed in');
  return await user.updatePassword(newPassword);
};


