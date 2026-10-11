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
    location: '',
    website: '',
  });

  const updateEmployerProfile = useCallback((data) => {
    if (!data || typeof data !== 'object') return;
    setEmployerProfile((prev) => {
      const resolvedAddress = 
        data.address !== undefined && data.address !== null
          ? data.address 
          : (data.companyAddress !== undefined ? data.companyAddress : prev.address);
      const resolvedLocation = 
        data.location !== undefined && data.location !== null 
          ? data.location 
          : prev.location;

      return {
        ...prev,
        ...data,
        companyName: data.companyName !== undefined ? data.companyName : prev.companyName,
        industryType: data.industryType !== undefined ? data.industryType : prev.industryType,
        contactPerson: data.contactPerson !== undefined ? data.contactPerson : (data.name !== undefined ? data.name : prev.contactPerson),
        companyEmail: data.companyEmail !== undefined ? data.companyEmail : (data.email !== undefined ? data.email : prev.companyEmail),
        contactNumber: data.contactNumber !== undefined ? data.contactNumber : (data.phone !== undefined ? data.phone : prev.contactNumber),
        address: resolvedAddress,
        location: resolvedLocation,
        website: data.website !== undefined ? data.website : prev.website,
      };
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
      location: '',
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
