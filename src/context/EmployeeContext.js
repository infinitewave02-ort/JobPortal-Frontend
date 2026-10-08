import React, { createContext, useState, useContext, useCallback } from 'react';

export const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
  const [employeeProfile, setEmployeeProfile] = useState({
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
  });

  const updateEmployeeProfile = useCallback((data) => {
    // Normalize skills: backend may return array, UI expects comma-separated string
    let normalizedSkills = data.skills || '';
    if (Array.isArray(normalizedSkills)) {
      normalizedSkills = normalizedSkills.join(', ');
    }

    // Normalize expectedSalary: backend may return number, UI expects string
    let normalizedSalary = data.expectedSalary || '';
    if (typeof normalizedSalary === 'number') {
      normalizedSalary = String(normalizedSalary);
    }

    // Full replacement: do NOT spread prev, to avoid stale data from previous sessions
    setEmployeeProfile({
      fullName: data.fullName || data.name || data.displayName || '',
      jobTitle: data.jobTitle || '',
      experience: data.experience || '',
      currentLocation: data.currentLocation || data.location || '',
      preferredLocation: data.preferredLocation || '',
      qualification: data.qualification || data.education || '',
      skills: normalizedSkills,
      expectedSalary: normalizedSalary,
      noticePeriod: data.noticePeriod || '',
      gender: data.gender || '',
      email: data.email || '',
      phone: data.phone || '',
      resumeFile: data.resumeFile || null,
      profileImage: data.profileImage || null,
    });
  }, []);

  const clearEmployeeProfile = useCallback(() => {
    setEmployeeProfile({
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
    });
  }, []);

  return (
    <EmployeeContext.Provider value={{ employeeProfile, updateEmployeeProfile, clearEmployeeProfile }}>
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployee = () => useContext(EmployeeContext);
