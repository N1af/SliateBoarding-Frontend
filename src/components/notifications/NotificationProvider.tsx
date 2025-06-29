
import React, { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { notificationService } from '@/services/notificationService';

interface NotificationProviderProps {
  children: React.ReactNode;
}

const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const { toast } = useToast();

  useEffect(() => {
    notificationService.setToast(toast);
  }, [toast]);

  return <>{children}</>;
};

export default NotificationProvider;
