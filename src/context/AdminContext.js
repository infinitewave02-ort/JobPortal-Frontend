import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const [employers, setEmployers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [resumes, setResumes] = useState([]);
  const [payments, setPayments] = useState([]);
  const [adminProfile, setAdminProfile] = useState({
    username: 'Jobportaladmin',
    email: 'admin@jobportal.com',
  });

  useEffect(() => {
    const loadAdminProfile = async () => {
      try {
        const saved = await AsyncStorage.getItem('adminProfile');
        if (saved) {
          const parsed = JSON.parse(saved);
          setAdminProfile(prev => ({ ...prev, ...parsed }));
        }
      } catch (e) {
        console.warn('Failed to load admin profile:', e);
      }
    };
    loadAdminProfile();
  }, []);

  const updateAdminProfileData = async (data) => {
    const updated = { ...adminProfile, ...data };
    setAdminProfile(updated);
    try {
      await AsyncStorage.setItem('adminProfile', JSON.stringify(updated));
    } catch (e) {
      console.warn('Failed to save admin profile:', e);
    }
  };


  const [dashboardStats, setDashboardStats] = useState({
    totalEmployees: 0,
    totalEmployers: 0,
    openToWork: 0,
    totalResumes: 0,
    totalJobs: 0,
    activeJobs: 0,
    totalPayments: 0,
    pendingPayments: 0,
    pendingPaymentsCount: 0,
    completedPaymentsCount: 0,
  });
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const { getAdminDashboard } = await import('../services/adminService');
      const res = await getAdminDashboard();
      const data = res?.data?.data || res?.data;
      if (data) {
        if (Array.isArray(data.employees)) setEmployees(data.employees);
        if (Array.isArray(data.employers)) setEmployers(data.employers);
        if (Array.isArray(data.jobs)) setJobs(data.jobs);
        if (Array.isArray(data.resumes)) setResumes(data.resumes);
        if (Array.isArray(data.payments)) setPayments(data.payments);
        setDashboardStats({
          totalEmployees: data.totalEmployees || (data.employees ? data.employees.length : 0),
          totalEmployers: data.totalEmployers || (data.employers ? data.employers.length : 0),
          openToWork: data.openToWork || (data.employees ? data.employees.filter(e => e.openToWork).length : 0),
          totalResumes: data.totalResumes || (data.employees ? data.employees.filter(e => e.resumeFile).length : 0),
          totalJobs: data.totalJobs || (data.jobs ? data.jobs.length : 0),
          activeJobs: data.activeJobs || (data.jobs ? data.jobs.filter(j => j.status?.toLowerCase() === 'active').length : 0),
          totalPayments: data.totalPayments || 0,
          pendingPayments: data.pendingPayments || 0,
          pendingPaymentsCount: data.pendingPaymentsCount || 0,
          completedPaymentsCount: data.completedPaymentsCount || 0,
        });
      }
    } catch (e) {
      console.warn('Failed to fetch admin dashboard from DB:', e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const approveEmployer = async (id) => {
    try {
      const { approveEmployer: apiApprove } = await import('../services/adminService');
      await apiApprove(id);
      setEmployers((prev) => prev.map(emp => emp.id === id ? { ...emp, status: 'Active' } : emp));
      // Refresh to ensure company job posts from DB are loaded
      await fetchDashboardData();
    } catch (e) {
      console.warn('Failed to approve employer in DB:', e.message);
      // Fallback update in state
      setEmployers((prev) => prev.map(emp => emp.id === id ? { ...emp, status: 'Active' } : emp));
    }
  };

  const deleteEmployer = async (id) => {
    try {
      const { deleteEmployer: apiDelete } = await import('../services/adminService');
      await apiDelete(id);
    } catch (e) {
      console.warn('Failed to delete employer in DB:', e.message);
    }
    setEmployers((prev) => prev.filter(emp => emp.id !== id));
  };

  const deleteEmployee = async (id) => {
    try {
      const { deleteEmployee: apiDelete } = await import('../services/adminService');
      await apiDelete(id);
    } catch (e) {
      console.warn('Failed to delete employee in DB:', e.message);
    }
    setEmployees((prev) => prev.filter(emp => emp.id !== id));
  };

  const deleteJob = async (id) => {
    try {
      const { deleteJob: apiDelete } = await import('../services/adminService');
      await apiDelete(id);
    } catch (e) {
      console.warn('Failed to delete job in DB:', e.message);
    }
    setJobs((prev) => prev.filter(j => j.id !== id));
  };

  const approveJob = async (id) => {
    try {
      const { approveJob: apiApprove } = await import('../services/adminService');
      await apiApprove(id);
      setJobs((prev) => prev.map(j => (j.id === id || j.jobId === id) ? { ...j, status: 'Active' } : j));
      await fetchDashboardData();
    } catch (e) {
      console.warn('Failed to approve job in DB:', e.message);
      setJobs((prev) => prev.map(j => (j.id === id || j.jobId === id) ? { ...j, status: 'Active' } : j));
    }
  };

  const updateJobStatus = async (id, status) => {
    try {
      const { updateJobStatus: apiUpdate } = await import('../services/adminService');
      await apiUpdate(id, status);
      const capStatus = status ? (status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()) : 'Active';
      setJobs((prev) => prev.map(j => (j.id === id || j.jobId === id) ? { ...j, status: capStatus } : j));
      await fetchDashboardData();
    } catch (e) {
      console.warn('Failed to update job status in DB:', e.message);
    }
  };

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

  const addJob = (job) => {
    setJobs((prev) => [...prev, { ...job, id: prev.length + 1, status: 'Active' }]);
  };


  const updatePaymentStatus = async (paymentId, status) => {
    try {
      const { updatePaymentStatus: apiUpdate } = await import('../services/adminService');
      await apiUpdate(paymentId, status);
      setPayments((prev) => prev.map(p => (p.id === paymentId || p.paymentId === paymentId) ? { ...p, status: status.toLowerCase() } : p));
      await fetchDashboardData();
    } catch (e) {
      console.warn('Failed to update payment status in DB:', e.message);
      setPayments((prev) => prev.map(p => (p.id === paymentId || p.paymentId === paymentId) ? { ...p, status: status.toLowerCase() } : p));
    }
  };

  return (
    <AdminContext.Provider 
      value={{ 
        employees, setEmployees, addEmployee, deleteEmployee,
        employers, setEmployers, addEmployer, deleteEmployer, approveEmployer,
        jobs, setJobs, addJob, deleteJob, approveJob, updateJobStatus,
        resumes, setResumes,
        payments, setPayments, updatePaymentStatus,
        dashboardStats, loading, fetchDashboardData,
        adminProfile, setAdminProfile, updateAdminProfileData
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
