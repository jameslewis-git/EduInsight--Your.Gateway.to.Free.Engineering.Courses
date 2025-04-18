import { MainLayout } from "@/components/layout/MainLayout";
import { Bot, ArrowRight, ExternalLink, Zap, Target, BarChart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function AITeachingPage() {
  return (
    <MainLayout>
      <div className="container py-16">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Bot className="w-8 h-8 text-blue-600" />
            <h1 className="text-4xl font-bold">AI Teaching Systems</h1>
          </div>

          <div className="space-y-8">
            {/* Active Systems */}
            <section>
              <h2 className="text-2xl font-semibold mb-6">Active Systems</h2>
              <div className="grid gap-6">
                {[
                  {
                    title: "Adaptive Learning AI",
                    description: "Personalized learning paths based on individual progress and learning style",
                    metrics: {
                      accuracy: "98%",
                      users: "50k+",
                      satisfaction: "4.8/5"
                    },
                    status: "Live",
                    link: "#"
                  },
                  {
                    title: "Intelligent Tutoring System",
                    description: "Real-time feedback and assistance for complex problem-solving",
                    metrics: {
                      accuracy: "96%",
                      users: "35k+",
                      satisfaction: "4.7/5"
                    },
                    status: "Beta",
                    link: "#"
                  },
                  {
                    title: "Knowledge Assessment Engine",
                    description: "Advanced evaluation system using natural language processing",
                    metrics: {
                      accuracy: "94%",
                      users: "20k+",
                      satisfaction: "4.6/5"
                    },
                    status: "Live",
                    link: "#"
                  }
                ].map((system, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-semibold mb-2">{system.title}</h3>
                          <p className="text-gray-600">{system.description}</p>
                        </div>
                        <Badge 
                          variant="outline" 
                          className={system.status === "Live" ? "bg-green-50 text-green-700" : "bg-blue-50 text-blue-700"}
                        >
                          {system.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <div className="text-sm text-gray-600 mb-1">Accuracy</div>
                          <div className="font-semibold">{system.metrics.accuracy}</div>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <div className="text-sm text-gray-600 mb-1">Active Users</div>
                          <div className="font-semibold">{system.metrics.users}</div>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <div className="text-sm text-gray-600 mb-1">Rating</div>
                          <div className="font-semibold">{system.metrics.satisfaction}</div>
                        </div>
                      </div>
                      <a 
                        href={system.link}
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                      >
                        Try system
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Key Features */}
            <section>
              <h2 className="text-2xl font-semibold mb-6">Key Features</h2>
              <div className="grid gap-6">
                {[
                  {
                    icon: Zap,
                    title: "Real-time Adaptation",
                    description: "Instantly adjusts to student's learning pace and style",
                    link: "#"
                  },
                  {
                    icon: Target,
                    title: "Precision Learning",
                    description: "Targeted interventions based on performance analytics",
                    link: "#"
                  },
                  {
                    icon: BarChart,
                    title: "Progress Tracking",
                    description: "Comprehensive analytics and learning path visualization",
                    link: "#"
                  }
                ].map((feature, index) => (
                  <a 
                    key={index}
                    href={feature.link}
                    className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50/50 transition-all group"
                  >
                    <div className="flex items-start gap-4">
                      <feature.icon className="w-5 h-5 text-blue-600 mt-1" />
                      <div>
                        <div className="font-medium mb-1">{feature.title}</div>
                        <div className="text-sm text-gray-600">{feature.description}</div>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-500" />
                  </a>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 