import React, { useEffect } from 'react';

export const Notification = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const notificationClass = `notification notification-${type}`;

  return (
    <div className={notificationClass}>
      <span>{message}</span>
      <button className="close-btn" onClick={onClose}>
        ✕
      </button>
    </div>
  );
};
