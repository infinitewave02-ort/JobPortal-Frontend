import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const EmployeeContext = createContext();

const initialProfile = {
  fullName: '',
  jobTitle: '',
  experience: '',
  currentLocation: '',
  preferredLocation: '',
  qualification: '',
  skills: '',
  expectedSalary: '',
  noticePeriod: '',
  gender: '',
  email: '',
  phone: '',
  resumeFile: null,
  profileImage: null,
};

export const EmployeeProvider = ({ children }) => {
  const [employeeProfile, setEmployeeProfile] = useState(initialProfile);

  // Load persisted profile on app launch
  useEffect(() => {
    const loadPersistedProfile = async () => {
      try {
        const stored = await AsyncStorage.getItem('employeeProfile');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed && typeof parsed === 'object') {
            setEmployeeProfile(prev => ({ ...prev, ...parsed }));
          }
        }
      } catch (err) {
        console.warn('Error loading employeeProfile from AsyncStorage:', err);
      }
    };
    loadPersistedProfile();
  }, []);

  const updateEmployeeProfile = useCallback((data) => {
    if (!data || typeof data !== 'object') return;

    setEmployeeProfile((prev) => {
      // Normalize skills
      let normalizedSkills = data.skills !== undefined ? data.skills : prev.skills;
      if (Array.isArray(normalizedSkills)) {
        normalizedSkills = normalizedSkills.join(', ');
      }

      // Normalize expectedSalary
      let normalizedSalary = data.expectedSalary !== undefined ? data.expectedSalary : prev.expectedSalary;
      if (typeof normalizedSalary === 'number') {
        normalizedSalary = String(normalizedSalary);
      }

      const updated = {
        fullName: data.fullName || data.name || data.displayName || prev.fullName || '',
        jobTitle: data.jobTitle !== undefined && data.jobTitle !== '' ? data.jobTitle : (data.role || prev.jobTitle || ''),
        experience: data.experience !== undefined && data.experience !== '' ? data.experience : (data.exp || prev.experience || ''),
        currentLocation: data.currentLocation || data.location || data.loc || prev.currentLocation || '',
        preferredLocation: data.preferredLocation !== undefined ? data.preferredLocation : prev.preferredLocation,
        qualification: data.qualification || data.education || data.edu || prev.qualification || '',
        skills: normalizedSkills || '',
        expectedSalary: normalizedSalary || '',
        noticePeriod: data.noticePeriod !== undefined && data.noticePeriod !== '' ? data.noticePeriod : prev.noticePeriod,
        gender: data.gender !== undefined && data.gender !== '' ? data.gender : prev.gender,
        email: data.email || prev.email || '',
        phone: data.phone || prev.phone || '',
        resumeFile: data.resumeFile !== undefined ? data.resumeFile : prev.resumeFile,
        profileImage: data.profileImage !== undefined ? data.profileImage : prev.profileImage,
      };

      // Persist asynchronously
      AsyncStorage.setItem('employeeProfile', JSON.stringify(updated)).catch(() => {});

      return updated;
    });
  }, []);

  const clearEmployeeProfile = useCallback(() => {
    setEmployeeProfile(initialProfile);
    AsyncStorage.removeItem('employeeProfile').catch(() => {});
  }, []);

  return (
    <EmployeeContext.Provider value={{ employeeProfile, updateEmployeeProfile, clearEmployeeProfile }}>
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployee = () => useContext(EmployeeContext);
