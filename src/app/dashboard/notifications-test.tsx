"use client";

import { Button } from "@/components/ui/button";
import { useNotification } from "@/components/ui/toast-notification";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function NotificationsTestPage() {
  const { showNotification } = useNotification();

  const notifications = [
    {
      type: 'success' as const,
      message: 'Course successfully completed! Your progress has been saved.',
      label: 'Success'
    },
    {
      type: 'error' as const,
      message: 'Failed to load course content. Please try again later.',
      label: 'Error'
    },
    {
      type: 'info' as const,
      message: 'New courses available in your interested categories!',
      label: 'Info'
    },
    {
      type: 'welcome' as const,
      message: 'Welcome back! Continue your learning journey.',
      label: 'Welcome'
    },
    {
      type: 'signout' as const,
      message: 'You have been signed out successfully.',
      label: 'Sign out'
    },
    {
      type: 'achievement' as const,
      message: 'Congratulations! You earned the "Learning Streak" badge',
      label: 'Achievement'
    }
  ];

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Notification System Test</h1>
      <p className="text-muted-foreground mb-8">
        This page demonstrates the different types of notifications available in the system.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notifications.map((notification, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{notification.label} Notification</CardTitle>
              <CardDescription>
                Click to trigger a {notification.type} notification
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => showNotification({
                  type: notification.type,
                  message: notification.message,
                  duration: 5000
                })}
                variant={notification.type === 'error' ? 'destructive' : 
                         notification.type === 'success' ? 'default' : 
                         notification.type === 'info' ? 'secondary' : 
                         notification.type === 'welcome' ? 'outline' : 'ghost'}
                className="w-full"
              >
                Show {notification.label} Notification
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-10">
        <Card>
          <CardHeader>
            <CardTitle>How to Use Notifications</CardTitle>
            <CardDescription>
              Add notifications to your components with a few lines of code
            </CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="bg-muted p-4 rounded-md overflow-x-auto">
              <code>{`
// 1. Import the hook
import { useNotification } from "@/components/ui/toast-notification";

// 2. Use the hook in your component
function YourComponent() {
  const { showNotification } = useNotification();
  
  // 3. Show a notification when needed
  const handleSuccess = () => {
    showNotification({
      type: 'success',
      message: 'Operation completed successfully!',
      duration: 5000 // optional, defaults to 5000ms
    });
  };

  return (
    <Button onClick={handleSuccess}>
      Complete Action
    </Button>
  );
}
              `}</code>
            </pre>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 