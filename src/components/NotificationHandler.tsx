
import React, { useState } from 'react';
import NotificationPanel, { Notification } from './NotificationPanel';
import { useDatabaseRealtime } from '@/contexts/DatabaseRealtimeContext';

interface NotificationHandlerProps {
  notifications: Notification[];
  onUpdateNotifications: (notifications: Notification[]) => void;
}

const NotificationHandler = ({ notifications, onUpdateNotifications }: NotificationHandlerProps) => {
  const [isNotificationPanelOpen, setIsNotificationPanelOpen] = useState(false);
  const { markNotificationAsRead, clearAllNotifications } = useDatabaseRealtime();

  const handleMarkAsRead = (notificationId: string) => {
    markNotificationAsRead(notificationId);
  };

  const handleMarkAllAsRead = () => {
    clearAllNotifications();
  };

  const unreadNotifications = notifications.filter(n => !n.read).length;

  return (
    <>
      <NotificationPanel
        notifications={notifications}
        isOpen={isNotificationPanelOpen}
        onClose={() => setIsNotificationPanelOpen(false)}
        onMarkAsRead={handleMarkAsRead}
        onMarkAllAsRead={handleMarkAllAsRead}
      />
      {/* Export functions for parent component to use */}
      <div style={{ display: 'none' }} data-notification-handler={{
        unreadNotifications,
        setIsNotificationPanelOpen,
        handleMarkAsRead,
        handleMarkAllAsRead
      }} />
    </>
  );
};

// Export hook for easier usage
export const useNotificationHandler = ({ notifications, onUpdateNotifications }: NotificationHandlerProps) => {
  const [isNotificationPanelOpen, setIsNotificationPanelOpen] = useState(false);
  const { markNotificationAsRead, clearAllNotifications } = useDatabaseRealtime();

  const handleMarkAsRead = (notificationId: string) => {
    markNotificationAsRead(notificationId);
  };

  const handleMarkAllAsRead = () => {
    clearAllNotifications();
  };

  const unreadNotifications = notifications.filter(n => !n.read).length;

  return {
    isNotificationPanelOpen,
    setIsNotificationPanelOpen,
    handleMarkAsRead,
    handleMarkAllAsRead,
    unreadNotifications
  };
};

export default NotificationHandler;
