/**
 * Reusable Card Component
 * Container with shadow and rounded corners for forms and content
 */

const Card = ({ children, className = '' }) => {
  return (
    <div className={`card shadow ${className}`}>
      <div className="card-body p-4">
        {children}
      </div>
    </div>
  );
};

export default Card;
