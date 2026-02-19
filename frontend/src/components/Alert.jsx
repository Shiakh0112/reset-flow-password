/**
 * Reusable Alert Component
 * Displays success, error, info, and warning messages
 */

import { CheckCircle, XCircle, AlertCircle, Info } from 'lucide-react';

const Alert = ({ type = 'info', message, onClose }) => {
  // Alert type configurations
  const alertConfig = {
    success: {
      variant: 'success',
      Icon: CheckCircle,
    },
    error: {
      variant: 'danger',
      Icon: XCircle,
    },
    warning: {
      variant: 'warning',
      Icon: AlertCircle,
    },
    info: {
      variant: 'info',
      Icon: Info,
    },
  };

  const config = alertConfig[type];
  const Icon = config.Icon;

  return (
    <div className={`alert alert-${config.variant} alert-dismissible fade show fade-in d-flex align-items-start mb-3`} role="alert">
      <Icon className="me-2" size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
      <div className="flex-grow-1">{message}</div>
      {onClose && (
        <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
      )}
    </div>
  );
};

export default Alert;
