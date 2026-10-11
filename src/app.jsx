import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Root from './screens/Root';
import EmployeeSplash from './screens/Employee/EmployeeSplash';
import ChooseOption from './screens/Employee/ChooseOption';
import EmployerSplash from './screens/Employer/EmployerSplash';
import CompanyDetails from './screens/Employer/CompanyDetails';
import CompanyProfile from './screens/Employer/CompanyProfile';
import ChoosePlan from './screens/Employer/ChoosePlan';
import PaymentDetails from './screens/Employer/PaymentDetails';
import PaymentSucess from './screens/Employer/PaymentSucess';
import EmployerDashboard from './screens/Employer/Dashboard';
import SearchCandidates from './screens/Employer/SearchCandidates';
import SearchResults from './screens/Employer/SearchResults';
import CandidateProfile from './screens/Employer/CandidateProfile';
import MessageCandidate from './screens/Employer/MessageCandidate';
import CallCandidate from './screens/Employer/CallCandidate';
import ResumePreview from './screens/Employer/ResumePreview';
import EmployerMessages from './screens/Employer/EmployerMessages';
import EmployerProfileView from './screens/Employer/EmployerProfileView';
import CreateJobPost from './screens/Employer/CreateJobPost';
import Register from './screens/Common/Register';
import OtpVerification from './screens/Common/OtpVerfication';
import CreateAccount from './screens/Employee/CreateAccount';
import BasicDetails from './screens/Employee/BasicDetails';
import CompleteProfile from './screens/Employee/CompleteProfile';
import UploadResume from './screens/Employee/UploadResume';
import ProfileCreated from './screens/Employee/ProfileCreated';
import Jobs from './screens/Employee/Jobs';
import Messages from './screens/Employee/Messages';
import Activity from './screens/Employee/Activity';
import Profile from './screens/Employee/Profile';
import ProfileViews from './screens/Employee/ProfileViews';
import ContactRequests from './screens/Employee/ContactRequests';
import EditEmployeeProfile from './screens/Employee/EditProfile';
import EmployeeLogin from './screens/Employee/Login';
import EditEmployerProfile from './screens/Employer/EditProfile';
import EmployerLogin from './screens/Employer/Login';
import AdminLogin from './screens/Admin/Login';
import AdminDashboard from './screens/Admin/Dashboard';
import ManageEmployees from './screens/Admin/ManageEmployees';
import ManageEmployers from './screens/Admin/ManageEmployers';
import ManageJobs from './screens/Admin/ManageJobs';
import ReportsAnalytics from './screens/Admin/ReportsAnalytics';
import OpenToWork from './screens/Admin/OpenToWork';
import TotalResumes from './screens/Admin/TotalResumes';
import AdminProfile from './screens/Admin/AdminProfile';
import { AdminProvider } from './context/AdminContext';
import { EmployeeProvider } from './context/EmployeeContext';
import { EmployerProvider } from './context/EmployerContext';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const EmployeeTabs = () => (
  <Tab.Navigator
    screenOptions={{ 
      headerShown: false,
      tabBarStyle: {
        height: 65,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
        paddingBottom: 10,
        paddingTop: 10,
      },
      tabBarActiveTintColor: '#1E3A8A',
      tabBarInactiveTintColor: '#888888',
      unmountOnBlur: false
    }}
  >
    <Tab.Screen 
      name="Jobs" 
      component={Jobs} 
      options={{ tabBarIcon: ({ color }) => <FeatherIcon name="briefcase" size={24} color={color} /> }} 
    />
    <Tab.Screen 
      name="Messages" 
      component={Messages} 
      options={{ tabBarIcon: ({ color }) => <FeatherIcon name="message-square" size={24} color={color} /> }} 
    />
    <Tab.Screen 
      name="Activity" 
      component={Activity} 
      options={{ tabBarIcon: ({ color }) => <FeatherIcon name="bell" size={24} color={color} /> }} 
    />
    <Tab.Screen 
      name="Profile" 
      component={Profile} 
      options={{ tabBarIcon: ({ color }) => <FeatherIcon name="user" size={24} color={color} /> }} 
    />
  </Tab.Navigator>
);

const EmployerTabs = () => (
  <Tab.Navigator
    screenOptions={{ 
      headerShown: false,
      tabBarStyle: {
        height: 65,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
        paddingBottom: 10,
        paddingTop: 10,
      },
      tabBarActiveTintColor: '#485ff4',
      tabBarInactiveTintColor: '#A0A0A0',
      unmountOnBlur: false
    }}
  >
    <Tab.Screen 
      name="EmployerDashboard" 
      component={EmployerDashboard} 
      options={{ tabBarLabel: 'Home', tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} /> }} 
    />
    <Tab.Screen 
      name="SearchCandidates" 
      component={SearchCandidates} 
      options={{ tabBarLabel: 'Search', tabBarIcon: ({ color }) => <Ionicons name="search-outline" size={24} color={color} /> }} 
    />
    <Tab.Screen 
      name="EmployerMessages" 
      component={EmployerMessages} 
      options={{ tabBarLabel: 'Messages', tabBarIcon: ({ color }) => <Ionicons name="chatbubble-ellipses-outline" size={24} color={color} /> }} 
    />
    <Tab.Screen 
      name="EmployerProfileView" 
      component={EmployerProfileView} 
      options={{ tabBarLabel: 'Profile', tabBarIcon: ({ color }) => <Ionicons name="person-outline" size={24} color={color} /> }} 
    />
  </Tab.Navigator>
);

const AdminTabs = () => (
  <Tab.Navigator
    screenOptions={{ 
      headerShown: false,
      tabBarStyle: { display: 'none' },
      unmountOnBlur: false
    }}
  >
    <Tab.Screen name="AdminDashboard" component={AdminDashboard} />
    <Tab.Screen name="ManageEmployees" component={ManageEmployees} />
    <Tab.Screen name="ManageEmployers" component={ManageEmployers} />
    <Tab.Screen name="ManageJobs" component={ManageJobs} />
    <Tab.Screen name="ReportsAnalytics" component={ReportsAnalytics} />
    <Tab.Screen name="OpenToWork" component={OpenToWork} />
    <Tab.Screen name="TotalResumes" component={TotalResumes} />
    <Tab.Screen name="AdminProfile" component={AdminProfile} />
  </Tab.Navigator>
);


const App = () => {
  return (
    <AdminProvider>
      <EmployeeProvider>
        <EmployerProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Root" component={Root} />
          <Stack.Screen name="EmployeeTabs" component={EmployeeTabs} />
          <Stack.Screen name="EmployerTabs" component={EmployerTabs} />
          <Stack.Screen name="AdminTabs" component={AdminTabs} />
          
          <Stack.Screen name="EmployeeSplash" component={EmployeeSplash} />
          <Stack.Screen name="EmployerSplash" component={EmployerSplash} />
          <Stack.Screen name="CompanyDetails" component={CompanyDetails} />
          <Stack.Screen name="CompanyProfile" component={CompanyProfile} />
          <Stack.Screen name="ChoosePlan" component={ChoosePlan} />
          <Stack.Screen name="PaymentDetails" component={PaymentDetails} />
          <Stack.Screen name="PaymentSucess" component={PaymentSucess} />
          
          <Stack.Screen name="SearchResults" component={SearchResults} />
          <Stack.Screen name="CandidateProfile" component={CandidateProfile} />
          <Stack.Screen name="MessageCandidate" component={MessageCandidate} />
          <Stack.Screen name="Chat" component={MessageCandidate} />
          <Stack.Screen name="EmployeeChat" component={MessageCandidate} />
          <Stack.Screen name="CallCandidate" component={CallCandidate} />
          <Stack.Screen name="ResumePreview" component={ResumePreview} />
          <Stack.Screen name="CreateJobPost" component={CreateJobPost} />
          
          <Stack.Screen name="ChooseOption" component={ChooseOption} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="OTPVerification" component={OtpVerification} />
          <Stack.Screen name="CreateAccount" component={CreateAccount} />
          <Stack.Screen name="BasicDetails" component={BasicDetails} />
          <Stack.Screen name="CompleteProfile" component={CompleteProfile} />
          <Stack.Screen name="UploadResume" component={UploadResume} />
          <Stack.Screen name="ProfileCreated" component={ProfileCreated} />
          <Stack.Screen name="ProfileViews" component={ProfileViews} />
          <Stack.Screen name="ContactRequests" component={ContactRequests} />
          <Stack.Screen name="EditEmployeeProfile" component={EditEmployeeProfile} />
          <Stack.Screen name="EmployeeLogin" component={EmployeeLogin} />
          <Stack.Screen name="EditEmployerProfile" component={EditEmployerProfile} />
          <Stack.Screen name="EmployerLogin" component={EmployerLogin} />
          <Stack.Screen name="AdminLogin" component={AdminLogin} />
          <Stack.Screen name="AdminProfile" component={AdminProfile} />


          {/* Alias Screens mapping to Tabs so existing navigate('Jobs') goes to the Tab */}
          <Stack.Screen name="Jobs" component={EmployeeTabs} />
          <Stack.Screen name="Messages" component={EmployeeTabs} />
          <Stack.Screen name="Activity" component={EmployeeTabs} />
          <Stack.Screen name="Profile" component={EmployeeTabs} />
          <Stack.Screen name="EmployerDashboard" component={EmployerTabs} />
          <Stack.Screen name="SearchCandidates" component={EmployerTabs} />
          <Stack.Screen name="EmployerMessages" component={EmployerTabs} />
          <Stack.Screen name="EmployerProfileView" component={EmployerTabs} />
          <Stack.Screen name="AdminDashboard" component={AdminTabs} />
          <Stack.Screen name="ManageEmployees" component={AdminTabs} />
          <Stack.Screen name="ManageEmployers" component={AdminTabs} />
          <Stack.Screen name="ManageJobs" component={AdminTabs} />
          <Stack.Screen name="ReportsAnalytics" component={AdminTabs} />
          <Stack.Screen name="OpenToWork" component={AdminTabs} />
          <Stack.Screen name="TotalResumes" component={AdminTabs} />
        </Stack.Navigator>
      </NavigationContainer>
        </EmployerProvider>
      </EmployeeProvider>
    </AdminProvider>
  );
};

export default App;
