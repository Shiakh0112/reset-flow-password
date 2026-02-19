/**
 * Profile Page
 * Protected route - displays user information
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Calendar, LogOut, Shield } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import Alert from '../components/Alert';
import { getProfile } from '../services/api';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await getProfile();
        setUser(response.user);
      } catch (error) {
        setAlert({
          type: 'error',
          message: 'Failed to load profile. Please login again.',
        });
        setTimeout(() => {
          handleLogout();
        }, 2000);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center" 
           style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
        <div className="spinner-border text-white" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center p-4" 
         style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
      <div className="w-100" style={{ maxWidth: '600px' }}>
        <Card>
          <div className="text-center mb-4">
            <div className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
                 style={{ width: '80px', height: '80px', background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
              <User size={40} color="white" />
            </div>
            <h1 className="h3 fw-bold mb-2">My Profile</h1>
            <p className="text-muted small">Your account information</p>
          </div>

          {alert && (
            <Alert 
              type={alert.type} 
              message={alert.message}
              onClose={() => setAlert(null)}
            />
          )}

          {user && (
            <div className="mb-4">
              <div className="border rounded p-4 mb-3" style={{ background: '#f8f9fa' }}>
                <div className="d-flex align-items-center mb-3 pb-3 border-bottom">
                  <div className="d-flex align-items-center justify-content-center rounded-circle me-3"
                       style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
                    <User size={20} color="white" />
                  </div>
                  <div>
                    <p className="text-muted small mb-1">Full Name</p>
                    <p className="fw-semibold mb-0">{user.name}</p>
                  </div>
                </div>

                <div className="d-flex align-items-center mb-3 pb-3 border-bottom">
                  <div className="d-flex align-items-center justify-content-center rounded-circle me-3"
                       style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
                    <Mail size={20} color="white" />
                  </div>
                  <div>
                    <p className="text-muted small mb-1">Email Address</p>
                    <p className="fw-semibold mb-0">{user.email}</p>
                  </div>
                </div>

                <div className="d-flex align-items-center mb-3 pb-3 border-bottom">
                  <div className="d-flex align-items-center justify-content-center rounded-circle me-3"
                       style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
                    <Calendar size={20} color="white" />
                  </div>
                  <div>
                    <p className="text-muted small mb-1">Member Since</p>
                    <p className="fw-semibold mb-0">{formatDate(user.createdAt)}</p>
                  </div>
                </div>

                <div className="d-flex align-items-center">
                  <div className="d-flex align-items-center justify-content-center rounded-circle me-3"
                       style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
                    <Shield size={20} color="white" />
                  </div>
                  <div>
                    <p className="text-muted small mb-1">Account Status</p>
                    <span className="badge bg-success">Active</span>
                  </div>
                </div>
              </div>

              <Button
                variant="danger"
                size="md"
                fullWidth
                onClick={handleLogout}
                style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', border: 'none' }}
              >
                <LogOut size={18} className="me-2" />
                Logout
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Profile;
