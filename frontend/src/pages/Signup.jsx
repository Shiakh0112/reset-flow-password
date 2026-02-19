/**
 * Signup Page
 * User registration with name, email and password
 */

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, UserPlus } from 'lucide-react';
import Input from '../components/Input';
import Button from '../components/Button';
import Alert from '../components/Alert';
import Card from '../components/Card';
import { signup } from '../services/api';
import { isValidEmail, formatEmail, validatePassword } from '../utils/validation';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
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

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    const passwordErrors = validatePassword(formData.password);
    if (passwordErrors.length > 0) {
      newErrors.password = passwordErrors[0];
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
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
      const response = await signup(
        formData.name,
        formatEmail(formData.email),
        formData.password
      );
      
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      
      setAlert({
        type: 'success',
        message: 'Account created successfully! Redirecting...',
      });
      
      setTimeout(() => {
        navigate('/profile');
      }, 1500);
    } catch (error) {
      setAlert({
        type: 'error',
        message: error.response?.data?.message || 'Signup failed. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center p-4" 
         style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <div className="w-100" style={{ maxWidth: '500px' }}>
        <Card>
          <div className="text-center mb-4">
            <div className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
                 style={{ width: '60px', height: '60px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
              <UserPlus size={30} color="white" />
            </div>
            <h1 className="h3 fw-bold mb-2">Create Account</h1>
            <p className="text-muted small">Join us today! Fill in your details below</p>
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
              label="Full Name"
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              icon={User}
              required
              disabled={loading}
            />

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
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              icon={Lock}
              required
              disabled={loading}
            />

            <Input
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
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
              style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', border: 'none' }}
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </Button>
          </form>

          <div className="mt-3 text-center">
            <span className="text-muted small">Already have an account? </span>
            <Link to="/login" className="text-decoration-none small fw-semibold">
              Login here
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
