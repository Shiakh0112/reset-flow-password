/**
 * Forgot Password Page
 * User enters email to receive password reset link
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
import Input from '../components/Input';
import Button from '../components/Button';
import Alert from '../components/Alert';
import Card from '../components/Card';
import { forgotPassword } from '../services/api';
import { isValidEmail, formatEmail } from '../utils/validation';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [emailError, setEmailError] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError('');
    setAlert(null);
  };

  const validateForm = () => {
    if (!email.trim()) {
      setEmailError('Email address is required');
      return false;
    }

    if (!isValidEmail(email)) {
      setEmailError('Please enter a valid email address');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert(null);
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const formattedEmail = formatEmail(email);
      const response = await forgotPassword(formattedEmail);
      
      setAlert({
        type: 'success',
        message: response.message || 'The reset link has been sent to your email.',
      });
      
      setEmail('');
    } catch (error) {
      setAlert({
        type: 'error',
        message: error.response?.data?.message || 'An error occurred. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center p-4" 
         style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
      <div className="w-100" style={{ maxWidth: '450px' }}>
        <Card>
          <div className="text-center mb-4">
            <div className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
                 style={{ width: '60px', height: '60px', background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
              <Mail size={30} color="white" />
            </div>
            <h1 className="h3 fw-bold mb-2">Forgot Password</h1>
            <p className="text-muted small">
              Enter your email address and we'll send you a link to reset your password.
            </p>
          </div>

          {alert && (
            <Alert 
              type={alert.type} 
              message={alert.message}
              onClose={() => setAlert(null)}
            />
          )}

          <form onSubmit={handleSubmit}>
            <Input
              label="Email Address"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
              error={emailError}
              icon={Mail}
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
              style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', border: 'none' }}
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </Button>
          </form>

          <div className="mt-3 text-center">
            <Link to="/login" className="text-decoration-none small">
              Back to Login
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;
