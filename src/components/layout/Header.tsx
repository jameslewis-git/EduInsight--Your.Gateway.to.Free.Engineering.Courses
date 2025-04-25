"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Menu, User, LayoutDashboard, BookOpen, Bookmark, Settings } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { HeaderSearch } from "./HeaderSearch";
import { useAuth } from "@/context/auth-context";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter, usePathname } from "next/navigation";
import { Badge } from "@/components/ui/badge";

export function Header() {
  const { user, logout, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [showDashboardPopup, setShowDashboardPopup] = useState(false);
  const [hideFloatingButton, setHideFloatingButton] = useState(false);

  // Function to get user initials for avatar fallback
  const getUserInitials = () => {
    if (!user || !user.email) return "?";
    return user.email.substring(0, 2).toUpperCase();
  };

  // Show dashboard popup if user is logged in and not already on dashboard
  useEffect(() => {
    if (user && pathname !== '/dashboard' && !localStorage.getItem('dashboardPopupDismissed')) {
      const timer = setTimeout(() => {
        setShowDashboardPopup(true);
      }, 2000);
      
      return () => clearTimeout(timer);
    }

    // Hide floating button if already on dashboard
    setHideFloatingButton(pathname === '/dashboard');

  }, [user, pathname]);

  const dismissDashboardPopup = () => {
    setShowDashboardPopup(false);
    localStorage.setItem('dashboardPopupDismissed', 'true');
  };

  const goToDashboard = () => {
    dismissDashboardPopup();
    router.push('/dashboard');
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" aria-label="Menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[80%] sm:w-[350px]">
                <div className="flex flex-col gap-6 mt-6">
                  <Link href="/" className="font-semibold text-2xl">EduInsight</Link>
                  <nav className="flex flex-col gap-2">
                    <Link href="/subjects" className="hover:underline">Subjects</Link>
                    <Link href="/providers" className="hover:underline">Providers</Link>
                    <Link href="/universities" className="hover:underline">Universities</Link>
                    <Link href="/rankings" className="hover:underline">Rankings</Link>
                    <Link href="/report" className="hover:underline">The Report</Link>
                    {user && (
                      <>
                        <div className="h-px bg-border my-2"></div>
                        <Link href="/dashboard" className="flex items-center gap-2 hover:underline text-primary font-medium">
                          <LayoutDashboard size={16} />
                          My Dashboard
                        </Link>
                        <Link href="/my-courses" className="flex items-center gap-2 hover:underline">
                          <BookOpen size={16} />
                          My Courses
                        </Link>
                        <Link href="/settings" className="flex items-center gap-2 hover:underline">
                          <Settings size={16} />
                          Settings
                        </Link>
                        <button 
                          onClick={() => logout()}
                          className="text-left hover:underline text-destructive flex items-center gap-2"
                        >
                          <LogOut size={16} />
                          Sign Out
                        </button>
                      </>
                    )}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>

            <Link href="/" className="hidden md:flex items-center gap-1">
              <div className="font-bold text-xl md:text-2xl">
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  EduInsight
                </motion.span>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 500 }}>
                <Link href="/subjects" className="text-sm font-medium hover:text-primary transition-colors">
                  Subjects
                </Link>
              </motion.div>
              <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 500 }}>
                <Link href="/providers" className="text-sm font-medium hover:text-primary transition-colors">
                  Providers
                </Link>
              </motion.div>
              <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 500 }}>
                <Link href="/report" className="text-sm font-medium hover:text-primary transition-colors">
                  The Report
                </Link>
              </motion.div>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            {/* Modern Search Component */}
            <HeaderSearch />
            
            <ThemeToggle />

            {!isLoading && (
              <>
                {user ? (
                  <>
                    {/* Direct dashboard button for quick access */}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="hidden md:flex items-center gap-2 hover:bg-primary/10"
                      onClick={() => router.push('/dashboard')}
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      <span>Dashboard</span>
                    </Button>
                  
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="rounded-full h-9 w-9 p-0 border-primary/20 bg-background hover:bg-primary/10 hover:text-primary relative overflow-hidden transition-all duration-300 group"
                        >
                          <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-primary/10 to-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                          <Avatar 
                            size="sm"
                            variant="futuristic"
                            className="transition-all duration-300 group-hover:scale-110"
                          >
                            <AvatarImage src={user.user_metadata?.avatar_url} alt={user.email || "User"} />
                            <AvatarFallback gradient glowing>
                              {getUserInitials()}
                            </AvatarFallback>
                          </Avatar>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuLabel className="font-normal">
                          <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none">{user.user_metadata?.full_name || user.email}</p>
                            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                          </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild className="flex items-center gap-2 cursor-pointer">
                          <Link href="/dashboard">
                            <LayoutDashboard className="mr-2 h-4 w-4" />
                            <span>Dashboard</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild className="flex items-center gap-2 cursor-pointer">
                          <Link href="/my-courses">
                            <BookOpen className="mr-2 h-4 w-4" />
                            <span>My Courses</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild className="flex items-center gap-2 cursor-pointer">
                          <Link href="/saved-courses">
                            <Bookmark className="mr-2 h-4 w-4" />
                            <span>Saved Courses</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild className="flex items-center gap-2 cursor-pointer">
                          <Link href="/settings">
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Settings</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          onClick={() => logout()}
                          className="text-destructive focus:text-destructive cursor-pointer"
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          <span>Sign Out</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Dashboard Popup for New Users */}
                    <AnimatePresence>
                      {showDashboardPopup && (
                        <motion.div 
                          className="fixed bottom-5 right-5 bg-card border shadow-lg rounded-lg p-4 max-w-sm z-50"
                          initial={{ opacity: 0, y: 50, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex gap-3 items-center">
                              <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                                <LayoutDashboard className="h-5 w-5" />
                              </div>
                              <div>
                                <h4 className="font-semibold">Your Dashboard is Ready</h4>
                                <p className="text-sm text-muted-foreground mt-1">Track your courses and learning progress</p>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm" onClick={dismissDashboardPopup} className="h-8 w-8 p-0">
                              &times;
                            </Button>
                          </div>
                          <div className="flex gap-2 mt-4">
                            <Button variant="default" size="sm" onClick={goToDashboard} className="flex-1">
                              Go to Dashboard
                            </Button>
                            <Button variant="outline" size="sm" onClick={dismissDashboardPopup}>
                              Later
                            </Button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <>
                    <div className="hidden md:flex gap-2">
                      <Button variant="ghost" size="sm" asChild>
                        <Link href="/login">Log in</Link>
                      </Button>
                      <Button size="sm" asChild>
                        <Link href="/signup">Sign up</Link>
                      </Button>
                    </div>

                    <div className="md:hidden">
                      <Button variant="outline" size="sm" asChild>
                        <Link href="/login">Log in</Link>
                      </Button>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </header>

      {/* Floating Dashboard Button for Mobile */}
      {user && !hideFloatingButton && (
        <motion.div 
          className="fixed bottom-6 right-6 md:hidden z-40"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 500, delay: 0.5 }}
        >
          <Button 
            size="icon" 
            className="h-14 w-14 rounded-full shadow-lg shadow-primary/20 bg-gradient-to-br from-primary to-primary/80 hover:shadow-xl hover:shadow-primary/30 hover:scale-105 transition-all"
            onClick={() => router.push('/dashboard')}
          >
            <LayoutDashboard size={24} />
            <span className="sr-only">Go to Dashboard</span>
          </Button>
        </motion.div>
      )}
    </>
  );
}
