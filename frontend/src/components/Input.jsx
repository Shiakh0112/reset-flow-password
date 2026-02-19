/**
 * Reusable Input Component
 * Supports text, email, and password input types with icons and error states
 */

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const Input = ({ 
  label, 
  type = 'text', 
  name,
  placeholder, 
  value, 
  onChange, 
  error, 
  required = false,
  icon: Icon,
  disabled = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const inputType = type === 'password' && showPassword ? 'text' : type;

  return (
    <div className="mb-3">
      {label && (
        <label className="form-label">
          {label}
          {required && <span className="text-danger ms-1">*</span>}
        </label>
      )}
      
      <div className="input-group">
        {Icon && (
          <span className="input-group-text bg-white">
            <Icon size={20} className="text-muted" />
          </span>
        )}
        
        <input
          type={inputType}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`form-control ${error ? 'is-invalid' : ''}`}
        />
        
        {type === 'password' && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="btn btn-outline-secondary"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
        
        {error && <div className="invalid-feedback d-block">{error}</div>}
      </div>
    </div>
  );
};

export default Input;
