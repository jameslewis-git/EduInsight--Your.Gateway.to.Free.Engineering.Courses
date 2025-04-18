"use client";

import { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/context/auth-context";
import { RouteGuard } from "@/components/auth/RouteGuard";
import { Bell, BookOpen, Calendar, Clock, Trophy, User, BookMarked, Settings, BarChart3 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function DashboardPage() {
  const { user } = useAuth();
  const [greeting, setGreeting] = useState("Good day");
  
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user || !user.email) return "?";
    const name = user.user_metadata?.full_name || user.email.split('@')[0];
    return name.substring(0, 2).toUpperCase();
  };

  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Learner';

  return (
    <MainLayout>
      <RouteGuard>
        <div className="container py-10">
          {/* Enhanced Header Section */}
          <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background rounded-xl p-6 mb-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16 border-2 border-primary/20">
                  <AvatarImage src={user?.user_metadata?.avatar_url} alt={userName} />
                  <AvatarFallback className="bg-primary/10 text-primary text-xl">
                    {getUserInitials()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-3xl font-bold">{greeting}, {userName}</h1>
                    <Badge variant="outline" className="ml-2 bg-primary/10 text-primary border-primary/20">
                      Student
                    </Badge>
                  </div>
                  <p className="text-muted-foreground mt-1">
                    Track your progress and continue your learning journey
                  </p>
                </div>
              </div>
              <div className="flex gap-2 mt-4 md:mt-0">
                <Button size="sm" variant="outline" className="gap-1">
                  <Bell className="h-4 w-4 mr-1" /> Notifications
                </Button>
                <Button size="sm" variant="outline" className="gap-1">
                  <Calendar className="h-4 w-4 mr-1" /> Schedule
                </Button>
              </div>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
              <div className="bg-background/80 rounded-lg p-3 flex items-center gap-3 shadow-sm">
                <div className="bg-blue-100 dark:bg-blue-900/20 p-2 rounded-full">
                  <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Courses</p>
                  <p className="text-xl font-semibold">5</p>
                </div>
              </div>
              <div className="bg-background/80 rounded-lg p-3 flex items-center gap-3 shadow-sm">
                <div className="bg-green-100 dark:bg-green-900/20 p-2 rounded-full">
                  <Clock className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Hours</p>
                  <p className="text-xl font-semibold">24.5</p>
                </div>
              </div>
              <div className="bg-background/80 rounded-lg p-3 flex items-center gap-3 shadow-sm">
                <div className="bg-amber-100 dark:bg-amber-900/20 p-2 rounded-full">
                  <Trophy className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Achievements</p>
                  <p className="text-xl font-semibold">7</p>
                </div>
              </div>
              <div className="bg-background/80 rounded-lg p-3 flex items-center gap-3 shadow-sm">
                <div className="bg-purple-100 dark:bg-purple-900/20 p-2 rounded-full">
                  <BookMarked className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Certificates</p>
                  <p className="text-xl font-semibold">2</p>
                </div>
              </div>
            </div>
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="overview" className="flex items-center gap-1">
                <BarChart3 className="h-4 w-4" />
                <span>Overview</span>
              </TabsTrigger>
              <TabsTrigger value="courses" className="flex items-center gap-1">
                <BookOpen className="h-4 w-4" />
                <span>My Courses</span>
              </TabsTrigger>
              <TabsTrigger value="certificates" className="flex items-center gap-1">
                <Trophy className="h-4 w-4" />
                <span>Certificates</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-1">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Learning Progress Card */}
                <Card className="border-t-4 border-t-blue-500">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-blue-500" />
                        Learning Progress
                      </CardTitle>
                      <Button variant="ghost" size="sm" className="text-xs">View All</Button>
                    </div>
                    <CardDescription>Your ongoing course completion</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <div className="bg-blue-100 dark:bg-blue-900/20 p-1.5 rounded-md">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
                                <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
                                <path d="M2 2l7.586 7.586"></path>
                                <circle cx="11" cy="11" r="2"></circle>
                              </svg>
                            </div>
                            <span className="text-sm font-medium">Web Development Fundamentals</span>
                          </div>
                          <span className="text-sm font-medium text-blue-600 dark:text-blue-400">75%</span>
                        </div>
                        <Progress value={75} className="h-2 bg-blue-100 dark:bg-blue-900/20" indicatorClassName="bg-blue-500" />
                        <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                          <span>12/16 lessons</span>
                          <span>Last activity: Today</span>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <div className="bg-purple-100 dark:bg-purple-900/20 p-1.5 rounded-md">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-purple-600 dark:text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                <polyline points="14 2 14 8 20 8"></polyline>
                                <line x1="16" y1="13" x2="8" y2="13"></line>
                                <line x1="16" y1="17" x2="8" y2="17"></line>
                                <polyline points="10 9 9 9 8 9"></polyline>
                              </svg>
                            </div>
                            <span className="text-sm font-medium">Data Science Essentials</span>
                          </div>
                          <span className="text-sm font-medium text-purple-600 dark:text-purple-400">45%</span>
                        </div>
                        <Progress value={45} className="h-2 bg-purple-100 dark:bg-purple-900/20" indicatorClassName="bg-purple-500" />
                        <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                          <span>9/20 lessons</span>
                          <span>Last activity: 2 days ago</span>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <div className="bg-green-100 dark:bg-green-900/20 p-1.5 rounded-md">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-green-600 dark:text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                                <line x1="8" y1="21" x2="16" y2="21"></line>
                                <line x1="12" y1="17" x2="12" y2="21"></line>
                              </svg>
                            </div>
                            <span className="text-sm font-medium">UX Design Principles</span>
                          </div>
                          <span className="text-sm font-medium text-green-600 dark:text-green-400">20%</span>
                        </div>
                        <Progress value={20} className="h-2 bg-green-100 dark:bg-green-900/20" indicatorClassName="bg-green-500" />
                        <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                          <span>3/15 lessons</span>
                          <span>Last activity: 1 week ago</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button variant="outline" size="sm" className="w-full text-xs">
                      Continue Learning
                    </Button>
                  </CardFooter>
                </Card>

                {/* Upcoming Deadlines Card */}
                <Card className="border-t-4 border-t-amber-500">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-amber-500" />
                        Upcoming Deadlines
                      </CardTitle>
                      <Button variant="ghost" size="sm" className="text-xs">View Calendar</Button>
                    </div>
                    <CardDescription>Course assignments due soon</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex gap-3 items-start border-l-4 border-red-500 pl-3 py-1 bg-red-50/30 dark:bg-red-900/5 rounded-r-md">
                        <div className="bg-red-100 dark:bg-red-900/20 p-1.5 rounded-md flex-shrink-0 mt-0.5">
                          <Clock className="h-4 w-4 text-red-600 dark:text-red-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap justify-between items-start gap-2">
                            <p className="font-medium text-sm">React Components Quiz</p>
                            <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200 dark:bg-red-900/10 dark:text-red-400 dark:border-red-900/20 text-xs">
                              Tomorrow
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">Web Development Fundamentals • 10:00 AM</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-3 items-start border-l-4 border-yellow-500 pl-3 py-1 bg-yellow-50/30 dark:bg-yellow-900/5 rounded-r-md">
                        <div className="bg-yellow-100 dark:bg-yellow-900/20 p-1.5 rounded-md flex-shrink-0 mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-600 dark:text-yellow-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                            <polyline points="14 2 14 8 20 8"></polyline>
                            <path d="M12 18v-6"></path>
                            <path d="M8 18v-1"></path>
                            <path d="M16 18v-3"></path>
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap justify-between items-start gap-2">
                            <p className="font-medium text-sm">JavaScript Final Project</p>
                            <Badge variant="outline" className="bg-yellow-50 text-yellow-600 border-yellow-200 dark:bg-yellow-900/10 dark:text-yellow-400 dark:border-yellow-900/20 text-xs">
                              3 days
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">Web Development Fundamentals • 11:59 PM</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-3 items-start border-l-4 border-green-500 pl-3 py-1 bg-green-50/30 dark:bg-green-900/5 rounded-r-md">
                        <div className="bg-green-100 dark:bg-green-900/20 p-1.5 rounded-md flex-shrink-0 mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600 dark:text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="12 2 19 21 12 17 5 21 12 2"></polygon>
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap justify-between items-start gap-2">
                            <p className="font-medium text-sm">Python Data Analysis</p>
                            <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200 dark:bg-green-900/10 dark:text-green-400 dark:border-green-900/20 text-xs">
                              1 week
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">Data Science Essentials • 11:59 PM</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-3 items-start border-l-4 border-blue-500 pl-3 py-1 bg-blue-50/30 dark:bg-blue-900/5 rounded-r-md">
                        <div className="bg-blue-100 dark:bg-blue-900/20 p-1.5 rounded-md flex-shrink-0 mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600 dark:text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 20h9"></path>
                            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap justify-between items-start gap-2">
                            <p className="font-medium text-sm">UX Case Study</p>
                            <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-900/10 dark:text-blue-400 dark:border-blue-900/20 text-xs">
                              2 weeks
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">UX Design Principles • 11:59 PM</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button variant="outline" size="sm" className="w-full text-xs">
                      Set Reminders
                    </Button>
                  </CardFooter>
                </Card>

                {/* Learning Stats and Recommendations */}
                <div className="space-y-6">
                  {/* Learning Stats Card */}
                  <Card className="border-t-4 border-t-purple-500">
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="h-5 w-5 text-purple-500" />
                        Learning Stats
                      </CardTitle>
                      <CardDescription>Your activity summary</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-purple-50/50 dark:bg-purple-900/10 p-3 rounded-lg text-center">
                          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">3</div>
                          <div className="text-xs text-muted-foreground">Courses in Progress</div>
                        </div>
                        <div className="bg-green-50/50 dark:bg-green-900/10 p-3 rounded-lg text-center">
                          <div className="text-2xl font-bold text-green-600 dark:text-green-400">2</div>
                          <div className="text-xs text-muted-foreground">Completed Courses</div>
                        </div>
                        <div className="bg-blue-50/50 dark:bg-blue-900/10 p-3 rounded-lg text-center">
                          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">12</div>
                          <div className="text-xs text-muted-foreground">Hours this Week</div>
                        </div>
                        <div className="bg-amber-50/50 dark:bg-amber-900/10 p-3 rounded-lg text-center">
                          <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">86%</div>
                          <div className="text-xs text-muted-foreground">Average Score</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Recommended for You */}
                  <Card className="border-t-4 border-t-indigo-500">
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                        </svg>
                        Recommended for You
                      </CardTitle>
                      <CardDescription>Based on your interests</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="bg-indigo-50/30 dark:bg-indigo-900/10 rounded-md p-3 flex gap-3">
                        <div className="w-12 h-12 rounded-md bg-indigo-100 dark:bg-indigo-900/20 flex items-center justify-center flex-shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 dark:text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="16 18 22 12 16 6"></polyline>
                            <polyline points="8 6 2 12 8 18"></polyline>
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium">Advanced React Patterns</h4>
                          <p className="text-xs text-muted-foreground mt-1">Learn advanced React techniques and patterns</p>
                          <div className="flex items-center gap-1 mt-2">
                            <Badge variant="outline" className="text-xs bg-indigo-50 dark:bg-indigo-900/20 border-indigo-100 dark:border-indigo-800">
                              React
                            </Badge>
                            <Badge variant="outline" className="text-xs bg-indigo-50 dark:bg-indigo-900/20 border-indigo-100 dark:border-indigo-800">
                              Advanced
                            </Badge>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-indigo-50/30 dark:bg-indigo-900/10 rounded-md p-3 flex gap-3">
                        <div className="w-12 h-12 rounded-md bg-indigo-100 dark:bg-indigo-900/20 flex items-center justify-center flex-shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 dark:text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <path d="M12 16c2.2 0 4-1.8 4-4s-1.8-4-4-4-4 1.8-4 4 1.8 4 4 4z"></path>
                            <path d="M12 8v1"></path>
                            <path d="M12 15v1"></path>
                            <path d="M16 12h-1"></path>
                            <path d="M9 12H8"></path>
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium">Machine Learning Fundamentals</h4>
                          <p className="text-xs text-muted-foreground mt-1">Introduction to ML algorithms and applications</p>
                          <div className="flex items-center gap-1 mt-2">
                            <Badge variant="outline" className="text-xs bg-indigo-50 dark:bg-indigo-900/20 border-indigo-100 dark:border-indigo-800">
                              Python
                            </Badge>
                            <Badge variant="outline" className="text-xs bg-indigo-50 dark:bg-indigo-900/20 border-indigo-100 dark:border-indigo-800">
                              Beginner
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <Button variant="outline" size="sm" className="w-full text-xs">
                        View All Recommendations
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="courses">
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold">My Enrolled Courses</h2>
                    <p className="text-muted-foreground">Manage and continue your learning journey</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                      My Instructors
                    </Button>
                    <Button variant="default" size="sm" className="gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                      </svg>
                      Browse Courses
                    </Button>
                  </div>
                </div>
                
                {/* Course Filter */}
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="text-sm font-medium">Filter:</span>
                  <Badge variant="outline" className="cursor-pointer bg-primary/10 hover:bg-primary/20">All Courses</Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">In Progress</Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">Completed</Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">Not Started</Badge>
                </div>
                
                {/* Course Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {/* Web Development Course Card */}
                  <Card className="overflow-hidden">
                    <div className="relative w-full h-36 bg-gradient-to-r from-blue-500 to-purple-600">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"></polygon>
                          <line x1="12" y1="22" x2="12" y2="15.5"></line>
                          <polyline points="22 8.5 12 15.5 2 8.5"></polyline>
                          <polyline points="2 15.5 12 8.5 22 15.5"></polyline>
                          <line x1="12" y1="2" x2="12" y2="8.5"></line>
                        </svg>
                      </div>
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-white/90 text-blue-600 hover:bg-white border-transparent">
                          75% Complete
                        </Badge>
                      </div>
                      <div className="absolute bottom-4 left-4">
                        <Badge className="bg-blue-700/80 hover:bg-blue-700 text-white border-transparent">
                          Web Development
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="pt-4 pb-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-bold text-lg">Web Development Fundamentals</h3>
                          <p className="text-sm text-muted-foreground mt-1">Learn HTML, CSS, JavaScript and more</p>
                        </div>
                        <Button size="sm" variant="ghost" className="rounded-full h-8 w-8 p-0">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="1"></circle>
                            <circle cx="19" cy="12" r="1"></circle>
                            <circle cx="5" cy="12" r="1"></circle>
                          </svg>
                        </Button>
                      </div>
                      
                      <div className="mt-4">
                        <Progress value={75} className="h-2" />
                        <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                          <span>12/16 lessons completed</span>
                          <span>4 lessons left</span>
                        </div>
                      </div>
                      
                      <div className="mt-4 space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                            <polyline points="16 2 12 6 8 2"></polyline>
                          </svg>
                          <span>Next lesson: Advanced JavaScript Concepts</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                          </svg>
                          <span>Duration: 2 hrs 30 mins</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="ghost" size="sm">View Course</Button>
                      <Button variant="default" size="sm">Continue</Button>
                    </CardFooter>
                  </Card>
                  
                  {/* Data Science Course Card */}
                  <Card className="overflow-hidden">
                    <div className="relative w-full h-36 bg-gradient-to-r from-purple-500 to-pink-600">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                          <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                          <line x1="12" y1="22.08" x2="12" y2="12"></line>
                        </svg>
                      </div>
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-white/90 text-purple-600 hover:bg-white border-transparent">
                          45% Complete
                        </Badge>
                      </div>
                      <div className="absolute bottom-4 left-4">
                        <Badge className="bg-purple-700/80 hover:bg-purple-700 text-white border-transparent">
                          Data Science
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="pt-4 pb-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-bold text-lg">Data Science Essentials</h3>
                          <p className="text-sm text-muted-foreground mt-1">Master Python, pandas, and data visualization</p>
                        </div>
                        <Button size="sm" variant="ghost" className="rounded-full h-8 w-8 p-0">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="1"></circle>
                            <circle cx="19" cy="12" r="1"></circle>
                            <circle cx="5" cy="12" r="1"></circle>
                          </svg>
                        </Button>
                      </div>
                      
                      <div className="mt-4">
                        <Progress value={45} className="h-2" />
                        <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                          <span>9/20 lessons completed</span>
                          <span>11 lessons left</span>
                        </div>
                      </div>
                      
                      <div className="mt-4 space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                            <polyline points="16 2 12 6 8 2"></polyline>
                          </svg>
                          <span>Next lesson: Statistical Analysis with Python</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                          </svg>
                          <span>Duration: 3 hrs 15 mins</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="ghost" size="sm">View Course</Button>
                      <Button variant="default" size="sm">Continue</Button>
                    </CardFooter>
                  </Card>
                  
                  {/* UX Design Course Card */}
                  <Card className="overflow-hidden">
                    <div className="relative w-full h-36 bg-gradient-to-r from-green-500 to-teal-600">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"></circle>
                          <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                          <line x1="9" y1="9" x2="9.01" y2="9"></line>
                          <line x1="15" y1="9" x2="15.01" y2="9"></line>
                        </svg>
                      </div>
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-white/90 text-green-600 hover:bg-white border-transparent">
                          20% Complete
                        </Badge>
                      </div>
                      <div className="absolute bottom-4 left-4">
                        <Badge className="bg-green-700/80 hover:bg-green-700 text-white border-transparent">
                          UX Design
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="pt-4 pb-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-bold text-lg">UX Design Principles</h3>
                          <p className="text-sm text-muted-foreground mt-1">Learn user experience design fundamentals</p>
                        </div>
                        <Button size="sm" variant="ghost" className="rounded-full h-8 w-8 p-0">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="1"></circle>
                            <circle cx="19" cy="12" r="1"></circle>
                            <circle cx="5" cy="12" r="1"></circle>
                          </svg>
                        </Button>
                      </div>
                      
                      <div className="mt-4">
                        <Progress value={20} className="h-2" />
                        <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                          <span>3/15 lessons completed</span>
                          <span>12 lessons left</span>
                        </div>
                      </div>
                      
                      <div className="mt-4 space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                            <polyline points="16 2 12 6 8 2"></polyline>
                          </svg>
                          <span>Next lesson: User Research Methods</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                          </svg>
                          <span>Duration: 1 hr 45 mins</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="ghost" size="sm">View Course</Button>
                      <Button variant="default" size="sm">Continue</Button>
                    </CardFooter>
                  </Card>
                </div>
                
                {/* Recent Activity */}
                <div className="mt-8">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                    </svg>
                    Recent Activity
                  </h3>
                  <Card>
                    <CardContent className="p-0">
                      <div className="divide-y">
                        <div className="flex items-center gap-4 p-4">
                          <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium">Completed lesson: Introduction to JavaScript</p>
                            <p className="text-sm text-muted-foreground">Web Development Fundamentals</p>
                          </div>
                          <div className="text-sm text-muted-foreground">Today, 10:30 AM</div>
                        </div>
                        
                        <div className="flex items-center gap-4 p-4">
                          <div className="h-9 w-9 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                              <polyline points="14 2 14 8 20 8"></polyline>
                              <circle cx="10" cy="13" r="2"></circle>
                              <path d="m14 17-2-2-2 2"></path>
                            </svg>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap justify-between items-start gap-2">
                              <p className="font-medium text-sm">Submitted assignment: Data Cleaning Exercise</p>
                              <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200 dark:bg-red-900/10 dark:text-red-400 dark:border-red-900/20 text-xs">
                                Yesterday, 3:45 PM
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">Data Science Essentials</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4 p-4">
                          <div className="h-9 w-9 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                            </svg>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap justify-between items-start gap-2">
                              <p className="font-medium text-sm">Started course: UX Design Principles</p>
                              <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200 dark:bg-green-900/10 dark:text-green-400 dark:border-green-900/20 text-xs">
                                Apr 15, 2023
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">Completed first 3 lessons</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Browse More Courses */}
                <div className="flex justify-center mt-8">
                  <Button>Browse More Courses</Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="certificates">
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold">My Certificates</h2>
                    <p className="text-muted-foreground">View and download your earned certificates</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="16" x2="12" y2="16"></line>
                      <line x1="8" y1="12" x2="16" y2="12"></line>
                    </svg>
                    Share Credentials
                  </Button>
                </div>
                
                <div className="bg-muted/30 rounded-lg p-4 flex items-center gap-4">
                  <div className="bg-amber-100 dark:bg-amber-900/20 p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-600 dark:text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"></path>
                      <path d="M8.5 9.5 11 7"></path>
                      <path d="M15.5 9.5 13 7"></path>
                      <path d="M8.5 14.5 11 17"></path>
                      <path d="M15.5 14.5 13 17"></path>
                      <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"></path>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">You're making great progress!</p>
                    <p className="text-sm text-muted-foreground">Complete your courses to earn certificates and showcase your skills.</p>
                  </div>
                </div>
                
                {/* Certificates Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* JavaScript Certificate */}
                  <Card className="overflow-hidden border border-slate-200 dark:border-slate-800">
                    <div className="relative w-full h-48 bg-gradient-to-r from-amber-400 to-orange-500">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 w-4/5 h-4/5 flex flex-col items-center justify-center text-white">
                          <div className="absolute top-3 left-3 right-3 flex justify-between items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                            </svg>
                            <div className="text-xs font-mono">CERTIFICATE ID: JS-2023-1084</div>
                          </div>
                          <div className="text-sm uppercase tracking-widest mb-1">Certificate of Completion</div>
                          <div className="text-xl font-bold mb-2">Advanced JavaScript</div>
                          <div className="text-sm">Awarded to</div>
                          <div className="text-lg font-semibold">John Doe</div>
                        </div>
                      </div>
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-green-600 hover:bg-green-700 text-white border-transparent">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          Verified
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="pt-4">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-bold text-lg">Advanced JavaScript</h3>
                          <p className="text-sm text-muted-foreground">Comprehensive JavaScript Programming</p>
                        </div>
                        <div className="flex flex-col items-end">
                          <div className="text-sm font-medium">March 15, 2023</div>
                          <div className="text-xs text-muted-foreground">Issue Date</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center text-sm text-muted-foreground">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                        </svg>
                        <div>Issued by <span className="font-medium">Udemy</span></div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                          <polyline points="7 10 12 15 17 10"></polyline>
                          <line x1="12" y1="15" x2="12" y2="3"></line>
                        </svg>
                        Download
                      </Button>
                      <Button variant="default" size="sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                          <polyline points="15 3 21 3 21 9"></polyline>
                          <line x1="10" y1="14" x2="21" y2="3"></line>
                        </svg>
                        Share
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  {/* Python Certificate */}
                  <Card className="overflow-hidden border border-slate-200 dark:border-slate-800">
                    <div className="relative w-full h-48 bg-gradient-to-r from-blue-500 to-indigo-600">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 w-4/5 h-4/5 flex flex-col items-center justify-center text-white">
                          <div className="absolute top-3 left-3 right-3 flex justify-between items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                            </svg>
                            <div className="text-xs font-mono">CERTIFICATE ID: PY-2023-2245</div>
                          </div>
                          <div className="text-sm uppercase tracking-widest mb-1">Certificate of Completion</div>
                          <div className="text-xl font-bold mb-2">Python for Data Science</div>
                          <div className="text-sm">Awarded to</div>
                          <div className="text-lg font-semibold">John Doe</div>
                        </div>
                      </div>
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-green-600 hover:bg-green-700 text-white border-transparent">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          Verified
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="pt-4">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-bold text-lg">Python for Data Science</h3>
                          <p className="text-sm text-muted-foreground">Data Analysis with Python</p>
                        </div>
                        <div className="flex flex-col items-end">
                          <div className="text-sm font-medium">January 10, 2023</div>
                          <div className="text-xs text-muted-foreground">Issue Date</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center text-sm text-muted-foreground">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                        </svg>
                        <div>Issued by <span className="font-medium">Coursera</span></div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                          <polyline points="7 10 12 15 17 10"></polyline>
                          <line x1="12" y1="15" x2="12" y2="3"></line>
                        </svg>
                        Download
                      </Button>
                      <Button variant="default" size="sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                          <polyline points="15 3 21 3 21 9"></polyline>
                          <line x1="10" y1="14" x2="21" y2="3"></line>
                        </svg>
                        Share
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
                
                {/* In-Progress Certificates */}
                <div className="mt-8">
                  <h3 className="text-lg font-bold mb-4">Certificates in Progress</h3>
                  <Card>
                    <div className="divide-y">
                      <div className="p-4 flex items-center gap-4">
                        <div className="bg-blue-100 dark:bg-blue-900/20 p-1.5 rounded-md">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 dark:text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="16 18 22 12 16 6"></polyline>
                            <polyline points="8 6 2 12 8 18"></polyline>
                          </svg>
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                            <div>
                              <p className="font-medium">Web Development Fundamentals</p>
                              <p className="text-sm text-muted-foreground">Complete 4 more lessons to earn this certificate</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="text-sm text-blue-600 dark:text-blue-400 font-medium">75% Complete</div>
                              <Progress value={75} className="w-24 h-2" />
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 flex items-center gap-4">
                        <div className="bg-purple-100 dark:bg-purple-900/20 p-1.5 rounded-md">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600 dark:text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
                            <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
                            <path d="M2 2l7.586 7.586"></path>
                            <circle cx="11" cy="11" r="2"></circle>
                          </svg>
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                            <div>
                              <p className="font-medium">Data Science Essentials</p>
                              <p className="text-sm text-muted-foreground">Complete 11 more lessons to earn this certificate</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="text-sm text-purple-600 dark:text-purple-400 font-medium">45% Complete</div>
                              <Progress value={45} className="w-24 h-2" />
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 flex items-center gap-4">
                        <div className="bg-green-100 dark:bg-green-900/20 p-1.5 rounded-md">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 dark:text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                            <line x1="8" y1="21" x2="16" y2="21"></line>
                            <line x1="12" y1="17" x2="12" y2="21"></line>
                          </svg>
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                            <div>
                              <p className="font-medium">UX Design Principles</p>
                              <p className="text-sm text-muted-foreground">Complete 12 more lessons to earn this certificate</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="text-sm text-green-600 dark:text-green-400 font-medium">20% Complete</div>
                              <Progress value={20} className="w-24 h-2" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="settings">
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold">Account Settings</h2>
                  <p className="text-muted-foreground">Manage your account settings and preferences</p>
                </div>
                
                <Tabs defaultValue="profile" className="w-full">
                  <TabsList className="w-full md:w-auto grid grid-cols-3 md:inline-flex">
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="notifications">Notifications</TabsTrigger>
                    <TabsTrigger value="privacy">Privacy</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="profile" className="space-y-4 mt-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Profile Information</CardTitle>
                        <CardDescription>Update your personal information</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                          <div className="relative">
                            <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-semibold text-primary">
                              JD
                            </div>
                            <div className="absolute -bottom-1 -right-1">
                              <Button size="sm" variant="outline" className="h-8 w-8 rounded-full p-0">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7"></path>
                                  <path d="m12 15 3-3 4.5 4.5a2 2 0 1 1-3 3L12 15Z"></path>
                                  <path d="m15 12 3-3 3 3-3 3-3-3Z"></path>
                                </svg>
                                <span className="sr-only">Edit avatar</span>
                              </Button>
                            </div>
                          </div>
                          <div className="space-y-1.5">
                            <h3 className="text-lg font-semibold">John Doe</h3>
                            <p className="text-sm text-muted-foreground">Student since January 2023</p>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">Web Development</Badge>
                              <Badge variant="outline" className="text-xs">Data Science</Badge>
                              <Badge variant="outline" className="text-xs">UX Design</Badge>
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="fullName">Full Name</Label>
                              <Input id="fullName" defaultValue="John Doe" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="email">Email</Label>
                              <Input id="email" defaultValue="john.doe@example.com" readOnly />
                            </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="username">Username</Label>
                              <Input id="username" defaultValue="johndoe" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="phone">Phone Number</Label>
                              <Input id="phone" defaultValue="+1 (555) 123-4567" />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="bio">Bio</Label>
                            <Textarea id="bio" placeholder="Tell us about yourself" className="min-h-[100px]" defaultValue="Learning enthusiast passionate about web development and data science. I'm currently working on building my skills to transition into a tech career." />
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-end gap-2">
                        <Button variant="outline">Cancel</Button>
                        <Button>Save Changes</Button>
                      </CardFooter>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Learning Preferences</CardTitle>
                        <CardDescription>Customize your learning experience</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label>Areas of Interest</Label>
                              <div className="flex flex-wrap gap-2">
                                <Badge variant="secondary">Web Development</Badge>
                                <Badge variant="secondary">Data Science</Badge>
                                <Badge variant="secondary">UX Design</Badge>
                                <Button variant="outline" size="sm" className="h-6 rounded-full">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="12" y1="5" x2="12" y2="19"></line>
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                  </svg>
                                  Add
                                </Button>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="studyPreference">Study Preference</Label>
                              <Select defaultValue="project-based">
                                <SelectTrigger id="studyPreference">
                                  <SelectValue placeholder="Select study preference" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="project-based">Project-based learning</SelectItem>
                                  <SelectItem value="video-lectures">Video lectures</SelectItem>
                                  <SelectItem value="reading">Reading materials</SelectItem>
                                  <SelectItem value="interactive">Interactive exercises</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="weeklyGoal">Weekly Learning Goal</Label>
                              <Select defaultValue="5-10">
                                <SelectTrigger id="weeklyGoal">
                                  <SelectValue placeholder="Select weekly goal" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="1-5">1-5 hours</SelectItem>
                                  <SelectItem value="5-10">5-10 hours</SelectItem>
                                  <SelectItem value="10-15">10-15 hours</SelectItem>
                                  <SelectItem value="15+">15+ hours</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="difficulty">Preferred Difficulty</Label>
                              <Select defaultValue="intermediate">
                                <SelectTrigger id="difficulty">
                                  <SelectValue placeholder="Select difficulty" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="beginner">Beginner</SelectItem>
                                  <SelectItem value="intermediate">Intermediate</SelectItem>
                                  <SelectItem value="advanced">Advanced</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-end gap-2">
                        <Button variant="outline">Reset</Button>
                        <Button>Save Preferences</Button>
                      </CardFooter>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="notifications" className="mt-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Notification Settings</CardTitle>
                        <CardDescription>Control how you receive notifications</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <h4 className="font-medium">Email Notifications</h4>
                              <p className="text-sm text-muted-foreground">Receive course updates via email</p>
                            </div>
                            <Switch defaultChecked={true} />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <h4 className="font-medium">Browser Notifications</h4>
                              <p className="text-sm text-muted-foreground">Show notifications in your browser</p>
                            </div>
                            <Switch defaultChecked={false} />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <h4 className="font-medium">Weekly Digests</h4>
                              <p className="text-sm text-muted-foreground">Get a summary of your progress weekly</p>
                            </div>
                            <Switch defaultChecked={true} />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <h4 className="font-medium">Course Reminders</h4>
                              <p className="text-sm text-muted-foreground">Remind you of upcoming deadlines</p>
                            </div>
                            <Switch defaultChecked={true} />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <h4 className="font-medium">New Course Announcements</h4>
                              <p className="text-sm text-muted-foreground">Be notified when new courses are available</p>
                            </div>
                            <Switch defaultChecked={false} />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="privacy" className="mt-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Privacy Settings</CardTitle>
                        <CardDescription>Control your privacy and data settings</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <h4 className="font-medium">Public Profile</h4>
                              <p className="text-sm text-muted-foreground">Allow others to see your profile and achievements</p>
                            </div>
                            <Switch defaultChecked={true} />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <h4 className="font-medium">Share Learning Progress</h4>
                              <p className="text-sm text-muted-foreground">Share your learning progress with other users</p>
                            </div>
                            <Switch defaultChecked={false} />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <h4 className="font-medium">Data Collection</h4>
                              <p className="text-sm text-muted-foreground">Allow us to collect usage data to improve your experience</p>
                            </div>
                            <Switch defaultChecked={true} />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <h4 className="font-medium">Two-Factor Authentication</h4>
                              <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">Not Enabled</Badge>
                              <Button variant="outline" size="sm">Enable</Button>
                            </div>
                          </div>
                        </div>
                        
                        <div className="pt-4 border-t">
                          <h4 className="font-medium mb-3">Connected Accounts</h4>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="bg-slate-100 dark:bg-slate-800 w-8 h-8 rounded-full flex items-center justify-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path>
                                  </svg>
                                </div>
                                <div>
                                  <h5 className="font-medium">Facebook</h5>
                                  <p className="text-xs text-muted-foreground">Not connected</p>
                                </div>
                              </div>
                              <Button variant="outline" size="sm">Connect</Button>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="bg-slate-100 dark:bg-slate-800 w-8 h-8 rounded-full flex items-center justify-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
                                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                                  </svg>
                                </div>
                                <div>
                                  <h5 className="font-medium">Twitter/X</h5>
                                  <p className="text-xs text-muted-foreground">Connected as @johndoe</p>
                                </div>
                              </div>
                              <Button variant="outline" size="sm">Disconnect</Button>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="bg-slate-100 dark:bg-slate-800 w-8 h-8 rounded-full flex items-center justify-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-900 dark:text-white">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
                                  </svg>
                                </div>
                                <div>
                                  <h5 className="font-medium">GitHub</h5>
                                  <p className="text-xs text-muted-foreground">Connected as johndoe-dev</p>
                                </div>
                              </div>
                              <Button variant="outline" size="sm">Disconnect</Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-end">
                        <Button>Save Changes</Button>
                      </CardFooter>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </RouteGuard>
    </MainLayout>
  );
} 