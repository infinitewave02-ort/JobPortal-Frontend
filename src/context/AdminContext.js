import React, { createContext, useState, useContext } from 'react';

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const [employers, setEmployers] = useState([]);

  const [jobs, setJobs] = useState([]);

  const addEmployee = (employee) => {
    setEmployees((prev) => {
      const email = employee.email;
      const normalizedEmp = {
        ...employee,
        name: employee.fullName || employee.name,
        role: employee.jobTitle || employee.role,
      };
      const index = prev.findIndex(e => e.email === email);
      if (index >= 0) {
        const updated = [...prev];
        updated[index] = { ...updated[index], ...normalizedEmp };
        return updated;
      }
      return [...prev, { ...normalizedEmp, id: prev.length + 1, status: 'Active', openToWork: true }];
    });
  };

  const deleteEmployee = (id) => {
    setEmployees((prev) => prev.filter(emp => emp.id !== id));
  };

  const addEmployer = (employer) => {
    setEmployers((prev) => {
      const email = employer.companyEmail || employer.email;
      const normalizedEmp = {
        ...employer,
        name: employer.companyName || employer.name,
        role: employer.industryType || employer.role,
      };
      const index = prev.findIndex(e => (e.companyEmail || e.email) === email);
      if (index >= 0) {
        const updated = [...prev];
        updated[index] = { ...updated[index], ...normalizedEmp };
        return updated;
      }
      return [...prev, { ...normalizedEmp, id: prev.length + 1, status: 'Pending' }];
    });
  };
  
  const deleteEmployer = (id) => {
    setEmployers((prev) => prev.filter(emp => emp.id !== id));
  };

  const approveEmployer = (id) => {
    setEmployers((prev) => prev.map(emp => emp.id === id ? { ...emp, status: 'Active' } : emp));
  };

  const addJob = (job) => {
    setJobs((prev) => [...prev, { ...job, id: prev.length + 1, status: 'Active' }]);
  };

  const deleteJob = (id) => {
    setJobs((prev) => prev.filter(j => j.id !== id));
  };

  return (
    <AdminContext.Provider 
      value={{ 
        employees, setEmployees, addEmployee, deleteEmployee,
        employers, setEmployers, addEmployer, deleteEmployer, approveEmployer,
        jobs, setJobs, addJob, deleteJob
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
