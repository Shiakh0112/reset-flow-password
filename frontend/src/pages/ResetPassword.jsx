/**
 * Reset Password Page
 * User sets new password after clicking email link
 */

import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Lock } from 'lucide-react';
import Input from '../components/Input';
import Button from '../components/Button';
import Alert from '../components/Alert';
import Card from '../components/Card';
import { resetPassword, verifyResetToken } from '../services/api';
import { validatePassword, passwordsMatch } from '../utils/validation';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(true);
  const [alert, setAlert] = useState(null);
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setAlert({
          type: 'error',
          message: 'Invalid or missing reset token.',
        });
        setVerifying(false);
        return;
      }

      try {
        await verifyResetToken(token);
        setVerifying(false);
      } catch (error) {
        setAlert({
          type: 'error',
          message: error.response?.data?.message || 'Invalid or expired reset token.',
        });
        setVerifying(false);
      }
    };

    verifyToken();
  }, [token]);

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
    setPasswordError('');
    setAlert(null);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setConfirmPasswordError('');
    setAlert(null);
  };

  const validateForm = () => {
    let isValid = true;

    const passwordErrors = validatePassword(newPassword);
    if (passwordErrors.length > 0) {
      setPasswordError(passwordErrors[0]);
      isValid = false;
    }

    if (!confirmPassword.trim()) {
      setConfirmPasswordError('Please confirm your password');
      isValid = false;
    } else if (!passwordsMatch(newPassword, confirmPassword)) {
      setConfirmPasswordError('Passwords must match');
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert(null);
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await resetPassword(token, newPassword);
      
      setAlert({
        type: 'success',
        message: response.message || 'Your password has been reset successfully!',
      });
      
      setNewPassword('');
      setConfirmPassword('');
      
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error) {
      setAlert({
        type: 'error',
        message: error.response?.data?.message || 'An error occurred. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  if (verifying) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center p-4" 
           style={{ background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' }}>
        <div className="w-100" style={{ maxWidth: '450px' }}>
          <Card>
            <div className="text-center">
              <div className="spinner-border" style={{ color: '#fa709a' }} role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3 text-muted">Verifying reset token...</p>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center p-4" 
         style={{ background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' }}>
      <div className="w-100" style={{ maxWidth: '450px' }}>
        <Card>
          <div className="text-center mb-4">
            <div className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
                 style={{ width: '60px', height: '60px', background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' }}>
              <Lock size={30} color="white" />
            </div>
            <h1 className="h3 fw-bold mb-2">Reset Your Password</h1>
            <p className="text-muted small">Enter your new password below.</p>
          </div>

          {alert && (
            <Alert 
              type={alert.type} 
              message={alert.message}
              onClose={() => setAlert(null)}
            />
          )}

          {!alert || alert.type !== 'error' ? (
            <form onSubmit={handleSubmit}>
              <Input
                label="New Password"
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={handleNewPasswordChange}
                error={passwordError}
                icon={Lock}
                required
                disabled={loading}
              />

              <Input
                label="Confirm Password"
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                error={confirmPasswordError}
                icon={Lock}
                required
                disabled={loading}
              />

              <Button
                type="submit"
                variant="primary"
                size="md"
                fullWidth
                loading={loading}
                disabled={loading}
                style={{ background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', border: 'none' }}
              >
                {loading ? 'Resetting...' : 'Reset Password'}
              </Button>
            </form>
          ) : (
            <div className="text-center">
              <Button
                variant="primary"
                size="md"
                fullWidth
                onClick={() => navigate('/forgot-password')}
              >
                Request New Reset Link
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ResetPassword;
