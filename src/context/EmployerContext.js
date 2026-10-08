import React, { createContext, useState, useContext, useCallback } from 'react';

export const EmployerContext = createContext();

export const EmployerProvider = ({ children }) => {
  const [employerProfile, setEmployerProfile] = useState({
    companyName: '',
    industryType: '',
    contactPerson: '',
    companyEmail: '',
    contactNumber: '',
    address: '',
    website: '',
  });

  const updateEmployerProfile = useCallback((data) => {
    // Full replacement — prevent stale data from previous sessions bleeding through
    setEmployerProfile({
      companyName: data.companyName || '',
      industryType: data.industryType || '',
      contactPerson: data.contactPerson || '',
      companyEmail: data.companyEmail || '',
      contactNumber: data.contactNumber || '',
      address: data.address || '',
      website: data.website || '',
    });
  }, []);

  const clearEmployerProfile = useCallback(() => {
    setEmployerProfile({
      companyName: '',
      industryType: '',
      contactPerson: '',
      companyEmail: '',
      contactNumber: '',
      address: '',
      website: '',
    });
  }, []);

  return (
    <EmployerContext.Provider value={{ employerProfile, updateEmployerProfile, clearEmployerProfile }}>
      {children}
    </EmployerContext.Provider>
  );
};

export const useEmployer = () => useContext(EmployerContext);
