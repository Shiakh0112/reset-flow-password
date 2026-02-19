/**
 * Login Page
 * User authentication with email and password
 */

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn } from 'lucide-react';
import Input from '../components/Input';
import Button from '../components/Button';
import Alert from '../components/Alert';
import Card from '../components/Card';
import { login } from '../services/api';
import { isValidEmail, formatEmail } from '../utils/validation';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
    setAlert(null);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert(null);
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await login(
        formatEmail(formData.email),
        formData.password
      );
      
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      
      setAlert({
        type: 'success',
        message: 'Login successful! Redirecting...',
      });
      
      setTimeout(() => {
        navigate('/profile');
      }, 1500);
    } catch (error) {
      setAlert({
        type: 'error',
        message: error.response?.data?.message || 'Login failed. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center p-4" 
         style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <div className="w-100" style={{ maxWidth: '450px' }}>
        <Card>
          <div className="text-center mb-4">
            <div className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
                 style={{ width: '60px', height: '60px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
              <LogIn size={30} color="white" />
            </div>
            <h1 className="h3 fw-bold mb-2">Welcome Back</h1>
            <p className="text-muted small">Sign in to your account</p>
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
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              icon={Mail}
              required
              disabled={loading}
            />

            <Input
              label="Password"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              icon={Lock}
              required
              disabled={loading}
            />

            <div className="mb-3 text-end">
              <Link to="/forgot-password" className="text-decoration-none small">
                Forgot Password?
              </Link>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              fullWidth
              loading={loading}
              disabled={loading}
              style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', border: 'none' }}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-3 text-center">
            <span className="text-muted small">Don't have an account? </span>
            <Link to="/signup" className="text-decoration-none small fw-semibold">
              Sign up here
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;
