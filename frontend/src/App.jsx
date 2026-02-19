/**
 * Main App Component
 * Sets up routing for authentication and password reset flow
 */

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route redirects to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Signup page */}
        <Route path="/signup" element={<Signup />} />
        
        {/* Login page */}
        <Route path="/login" element={<Login />} />
        
        {/* Profile page (protected) */}
        <Route path="/profile" element={<Profile />} />
        
        {/* Forgot password page */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
        {/* Reset password page (with token query param) */}
        <Route path="/reset-password" element={<ResetPassword />} />
        
        {/* Catch all - redirect to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
