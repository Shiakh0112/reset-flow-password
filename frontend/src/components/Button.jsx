/**
 * Reusable Button Component
 * Supports different variants, sizes, loading states, and icons
 */

import { Loader2 } from 'lucide-react';

const Button = ({ 
  children, 
  onClick, 
  type = 'button',
  variant = 'primary', 
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  icon: Icon,
  className = '',
}) => {
  // Variant styles
  const variantClass = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    outline: 'btn-outline-primary',
  }[variant];

  // Size styles
  const sizeClass = {
    sm: 'btn-sm',
    md: '',
    lg: 'btn-lg',
  }[size];

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`btn ${variantClass} ${sizeClass} ${fullWidth ? 'w-100' : ''} d-flex align-items-center justify-content-center gap-2 ${className}`}
    >
      {loading && (
        <Loader2 size={20} className="spinner-border-sm" style={{ animation: 'spin 1s linear infinite' }} />
      )}
      {!loading && Icon && <Icon size={20} />}
      {children}
    </button>
  );
};

export default Button;
