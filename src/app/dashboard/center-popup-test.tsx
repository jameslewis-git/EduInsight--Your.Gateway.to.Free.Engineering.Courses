"use client";

import { Button } from "@/components/ui/button";
import { useCenterPopup } from "@/components/center-popup-provider";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function CenterPopupTestPage() {
  const { showCenterPopup } = useCenterPopup();

  const popups = [
    {
      type: 'login' as const,
      message: 'Welcome back to EduInsight! You are now logged in successfully.',
      label: 'Login'
    },
    {
      type: 'signout' as const,
      message: 'Thank you for using EduInsight. You have been signed out successfully.',
      label: 'Sign out'
    }
  ];

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Center Popup System Test</h1>
      <p className="text-muted-foreground mb-8">
        This page demonstrates the center popup functionality for login and sign out events.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {popups.map((popup, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{popup.label} Popup</CardTitle>
              <CardDescription>
                Click to trigger a {popup.type} center popup
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => showCenterPopup({
                  type: popup.type,
                  message: popup.message,
                  duration: 5000
                })}
                variant={popup.type === 'login' ? 'default' : 'destructive'}
                className="w-full"
              >
                Show {popup.label} Popup
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-10">
        <Card>
          <CardHeader>
            <CardTitle>How to Use Center Popups</CardTitle>
            <CardDescription>
              Add center popups to your components with a few lines of code
            </CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="bg-muted p-4 rounded-md overflow-x-auto">
              <code>{`
// 1. Import the hook
import { useCenterPopup } from "@/components/center-popup-provider";

// 2. Use the hook in your component
function YourComponent() {
  const { showCenterPopup } = useCenterPopup();
  
  // 3. Show a center popup when needed
  const handleLogin = () => {
    showCenterPopup({
      type: 'login',
      message: 'Welcome back! You are now logged in.',
      duration: 5000 // optional, defaults to 5000ms
    });
  };

  return (
    <Button onClick={handleLogin}>
      Login
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