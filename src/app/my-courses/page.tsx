"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { RouteGuard } from "@/components/auth/RouteGuard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tab, Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function MyCoursesPage() {
  return (
    <MainLayout>
      <RouteGuard>
        <div className="container py-10">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">My Courses</h1>
            <p className="text-muted-foreground">Manage your enrolled and saved courses</p>
          </div>

          <Tabs defaultValue="enrolled" className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="enrolled">Enrolled Courses</TabsTrigger>
              <TabsTrigger value="saved">Saved Courses</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>

            <TabsContent value="enrolled">
              <Card>
                <CardHeader>
                  <CardTitle>Enrolled Courses</CardTitle>
                  <CardDescription>Courses you are currently taking</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12 text-muted-foreground">
                    <p>You are not currently enrolled in any courses.</p>
                    <p className="mt-2">Browse our catalog to find courses to enroll in.</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="saved">
              <Card>
                <CardHeader>
                  <CardTitle>Saved Courses</CardTitle>
                  <CardDescription>Courses you've bookmarked for later</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12 text-muted-foreground">
                    <p>You haven't saved any courses yet.</p>
                    <p className="mt-2">Save courses to come back to them later.</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="completed">
              <Card>
                <CardHeader>
                  <CardTitle>Completed Courses</CardTitle>
                  <CardDescription>Courses you've successfully finished</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12 text-muted-foreground">
                    <p>You haven't completed any courses yet.</p>
                    <p className="mt-2">Completed courses will appear here.</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </RouteGuard>
    </MainLayout>
  );
} 