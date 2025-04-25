"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, CheckCircle, AlertCircle, Info, LogOut, Bell, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

type NotificationType = 'success' | 'error' | 'info' | 'welcome' | 'signout' | 'achievement';

interface ToastNotificationProps {
  type: NotificationType;
  message: string;
  duration?: number;
  onClose?: () => void;
  visible?: boolean;
}

interface NotificationContextType {
  showNotification: (props: Omit<ToastNotificationProps, 'visible' | 'onClose'>) => void;
  hideNotification: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within a NotificationProvider");
  }
  return context;
};

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notification, setNotification] = useState<ToastNotificationProps | null>(null);

  const showNotification = useCallback(
    (props: Omit<ToastNotificationProps, 'visible' | 'onClose'>) => {
      setNotification({
        ...props,
        visible: true,
        onClose: () => setNotification(null),
        duration: props.duration || 5000,
      });
    },
    []
  );

  const hideNotification = useCallback(() => {
    setNotification(null);
  }, []);

  return (
    <NotificationContext.Provider value={{ showNotification, hideNotification }}>
      {children}
      {notification && (
        <ToastNotification
          type={notification.type}
          message={notification.message}
          duration={notification.duration}
          onClose={notification.onClose}
          visible={notification.visible}
        />
      )}
    </NotificationContext.Provider>
  );
};

export const ToastNotification: React.FC<ToastNotificationProps> = ({
  type,
  message,
  duration = 5000,
  onClose,
  visible = true,
}) => {
  React.useEffect(() => {
    if (visible && duration > 0) {
      const timer = setTimeout(() => {
        onClose?.();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [visible, duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle size={18} />;
      case 'error':
        return <AlertCircle size={18} />;
      case 'info':
        return <Info size={18} />;
      case 'welcome':
        return <Bell size={18} />;
      case 'signout':
        return <LogOut size={18} />;
      case 'achievement':
        return <Trophy size={18} />;
      default:
        return <Info size={18} />;
    }
  };

  const getBgColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 dark:bg-green-900/20';
      case 'error':
        return 'bg-red-50 dark:bg-red-900/20';
      case 'info':
        return 'bg-blue-50 dark:bg-blue-900/20';
      case 'welcome':
        return 'bg-purple-50 dark:bg-purple-900/20';
      case 'signout':
        return 'bg-orange-50 dark:bg-orange-900/20';
      case 'achievement':
        return 'bg-amber-50 dark:bg-amber-900/20';
      default:
        return 'bg-gray-50 dark:bg-gray-800';
    }
  };

  const getBorderColor = () => {
    switch (type) {
      case 'success':
        return 'border-green-200 dark:border-green-800';
      case 'error':
        return 'border-red-200 dark:border-red-800';
      case 'info':
        return 'border-blue-200 dark:border-blue-800';
      case 'welcome':
        return 'border-purple-200 dark:border-purple-800';
      case 'signout':
        return 'border-orange-200 dark:border-orange-800';
      case 'achievement':
        return 'border-amber-200 dark:border-amber-800';
      default:
        return 'border-gray-200 dark:border-gray-700';
    }
  };

  const getTextColor = () => {
    switch (type) {
      case 'success':
        return 'text-green-700 dark:text-green-300';
      case 'error':
        return 'text-red-700 dark:text-red-300';
      case 'info':
        return 'text-blue-700 dark:text-blue-300';
      case 'welcome':
        return 'text-purple-700 dark:text-purple-300';
      case 'signout':
        return 'text-orange-700 dark:text-orange-300';
      case 'achievement':
        return 'text-amber-700 dark:text-amber-300';
      default:
        return 'text-gray-700 dark:text-gray-300';
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <div className="fixed top-4 right-4 z-50 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`${getBgColor()} ${getBorderColor()} border rounded-lg shadow-lg p-4 max-w-md`}
          >
            <div className="flex items-start">
              <div className={`mr-3 ${getTextColor()}`}>
                {getIcon()}
              </div>
              <div className="flex-1">
                <p className={`text-sm font-medium ${getTextColor()}`}>{message}</p>
              </div>
              <button
                onClick={onClose}
                className="ml-4 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}; 