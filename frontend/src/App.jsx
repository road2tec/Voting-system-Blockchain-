import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import DashboardLayout from './layouts/DashboardLayout';
import ProtectedRoute from './components/ProtectedRoute';

// Public Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Results from './pages/Results';
import Home from './pages/Home';

// Super Admin Pages
import SuperAdminDashboard from './pages/SuperAdmin/Dashboard';
import CreateAdmin from './pages/SuperAdmin/CreateAdmin';
import SuperAdminElectionControl from './pages/SuperAdmin/ElectionControl'; // Keeping for ref if needed
import Analytics from './pages/SuperAdmin/Analytics';
import SystemLogs from './pages/SuperAdmin/SystemLogs';
import SuperAdminAdminList from './pages/SuperAdmin/Admins';
import SuperAdminVoterList from './pages/SuperAdmin/Voters';

// Admin Pages
import AdminDashboard from './pages/Admin/Dashboard';
import AddCandidate from './pages/Admin/AddCandidate';
import AddVoter from './pages/Admin/AddVoter';
import VerifyVoter from './pages/Admin/VerifyVoter';
import AdminElectionControl from './pages/Admin/ElectionControl';
import LiveMonitor from './pages/Admin/LiveMonitor';
import AdminVoterList from './pages/Admin/Voters';

// Voter Pages
import VoterHome from './pages/Voter/VoterHome';
import VoteNow from './pages/Voter/VoteNow';
import Profile from './pages/Voter/Profile';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes inside Dashboard Layout */}
          <Route element={<DashboardLayout />}>

            {/* Super Admin Routes */}
            <Route element={<ProtectedRoute allowedRoles={['superadmin']} />}>
              <Route path="/superadmin/dashboard" element={<SuperAdminDashboard />} />
              <Route path="/superadmin/create-admin" element={<CreateAdmin />} />
              <Route path="/superadmin/election" element={<SuperAdminElectionControl />} />
              <Route path="/superadmin/analytics" element={<Analytics />} />
              <Route path="/superadmin/logs" element={<SystemLogs />} />
              <Route path="/superadmin/admins" element={<SuperAdminAdminList />} />
              <Route path="/superadmin/voters" element={<SuperAdminVoterList />} />
            </Route>

            {/* Admin Routes */}
            <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/add-candidate" element={<AddCandidate />} />
              <Route path="/admin/add-voter" element={<AddVoter />} />
              <Route path="/admin/verify-voters" element={<VerifyVoter />} />
              <Route path="/admin/live-monitor" element={<LiveMonitor />} />
              <Route path="/admin/voter-list" element={<AdminVoterList />} />
            </Route>

            {/* Voter Routes */}
            <Route element={<ProtectedRoute allowedRoles={['voter', 'admin', 'superadmin']} />}>
              <Route path="/voter/dashboard" element={<VoterHome />} />
              <Route path="/voter/vote" element={<VoteNow />} />
              <Route path="/voter/profile" element={<Profile />} />
              <Route path="/results" element={<Results />} />
            </Route>

          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
