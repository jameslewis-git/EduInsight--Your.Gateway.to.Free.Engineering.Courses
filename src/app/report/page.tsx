"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Globe,
  TrendingUp,
  Newspaper,
  GraduationCap,
  Code2,
  Briefcase,
  Clock,
  ArrowRight,
  ExternalLink,
  Zap,
  Brain,
  Bot,
  Cpu
} from "lucide-react";
import Link from "next/link";
import { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useMemo } from "react";

// This would typically come from an API
const techNews = [
  {
    title: "Quantum Computing Goes Mainstream in Education",
    source: "TechCrunch",
    category: "Quantum Computing",
    date: "3 hours ago",
    summary: "Major universities now offer quantum programming as core curriculum, powered by cloud-based quantum computers.",
    impact: "High",
    link: "#"
  },
  {
    title: "Neural Link Integration in Online Learning",
    source: "Neural Times",
    category: "Brain-Computer Interface",
    date: "6 hours ago",
    summary: "First successful trials of direct-to-brain learning interfaces show promising results in skill acquisition.",
    impact: "High",
    link: "#"
  },
  {
    title: "AI Teachers Get Human-Level Ratings",
    source: "EdTech Weekly",
    category: "Artificial Intelligence",
    date: "1 day ago",
    summary: "Advanced AI tutors achieve parity with human teachers in student satisfaction and learning outcomes.",
    impact: "High",
    link: "#"
  }
];

const emergingTech = [
  {
    tech: "Quantum-AI Hybrid Learning",
    adoption: 92,
    impact: "Revolutionary",
    timeline: "Current"
  },
  {
    tech: "Holographic Classrooms",
    adoption: 78,
    impact: "Transformative",
    timeline: "Scaling"
  },
  {
    tech: "Neural Enhancement Learning",
    adoption: 65,
    impact: "Experimental",
    timeline: "Early Adoption"
  }
];

const educationTrends = [
  {
    trend: "Metaverse Campuses",
    growth: 95,
    description: "Full-immersion virtual learning environments",
    regions: ["Global", "Space Colonies", "Virtual Realms"]
  },
  {
    trend: "Neural-Enhanced Learning",
    growth: 88,
    description: "Brain-computer interface education",
    regions: ["North America", "Asia", "Europe"]
  },
  {
    trend: "Quantum Programming",
    growth: 82,
    description: "Next-gen computing education",
    regions: ["Global Tech Hubs", "Research Centers"]
  }
];

const techTimeline = [
  {
    date: "December 2024",
    events: [
      "OpenAI GPT-5 Integration in Education",
      "First Brain-Computer Interface Learning Lab",
      "Quantum Computing Bootcamps Launch"
    ]
  },
  {
    date: "October 2024",
    events: [
      "Meta's Educational Metaverse Release",
      "Tesla Neural Link Educational Trials",
      "SpaceX Mars Academy Announcement"
    ]
  },
  {
    date: "August 2024",
    events: [
      "Apple Vision Pro Education Platform",
      "Google's Quantum Learning Initiative",
      "Microsoft-OpenAI Teacher Assistant"
    ]
  }
];

const futureProjections = [
  {
    year: 2026,
    predictions: [
      "Universal Neural Learning Interface",
      "Quantum Programming as Core Skill",
      "AI Teachers in Every Virtual Classroom"
    ]
  },
  {
    year: 2027,
    predictions: [
      "Direct Brain-to-Brain Knowledge Transfer",
      "Holographic Universities Become Standard",
      "Space-Earth Integrated Learning Network"
    ]
  }
];

const metrics = [
  {
    name: "Autonomous Decision Making",
    color: "#3b82f6",
    data: [
      { quarter: "Q1 2024", value: 45 },
      { quarter: "Q2 2024", value: 60 },
      { quarter: "Q3 2024", value: 75 },
      { quarter: "Q4 2024", value: 92 },
      { quarter: "Q1 2025", value: 92 },
    ],
  },
  {
    name: "Human-AI Collaboration",
    color: "#22c55e",
    data: [
      { quarter: "Q1 2024", value: 40 },
      { quarter: "Q2 2024", value: 55 },
      { quarter: "Q3 2024", value: 70 },
      { quarter: "Q4 2024", value: 88 },
      { quarter: "Q1 2025", value: 88 },
    ],
  },
  {
    name: "Complex Task Automation",
    color: "#a855f7",
    data: [
      { quarter: "Q1 2024", value: 35 },
      { quarter: "Q2 2024", value: 50 },
      { quarter: "Q3 2024", value: 65 },
      { quarter: "Q4 2024", value: 85 },
      { quarter: "Q1 2025", value: 85 },
    ],
  },
];

interface DataPoint {
  quarter: string;
  value: number;
}

interface Metric {
  name: string;
  color: string;
  data: DataPoint[];
}

interface ChartDataEntry {
  quarter: string;
  [key: string]: string | number;
}

const transformData = (metrics: Metric[]): ChartDataEntry[] => {
  const quarters = metrics[0].data.map((point: DataPoint) => point.quarter);
  return quarters.map((quarter: string, i: number) => {
    const entry: ChartDataEntry = { quarter };
    metrics.forEach((metric: Metric) => {
      entry[metric.name] = metric.data[i].value;
    });
    return entry;
  });
};

export default function ReportPage() {
  const chartData = useMemo(() => transformData(metrics), []);

  return (
    <MainLayout>
      <div className="container py-16">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">2025 Global Tech Education Report</h1>
          <p className="text-xl text-muted-foreground">
            The Future of Learning is Here: Quantum, Neural, and Beyond
          </p>
        </div>

        {/* Breaking News Section */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <Zap className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-semibold">Breaking Tech Education News</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techNews.map((news, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <Badge 
                    variant="outline" 
                    className="bg-purple-100 text-purple-800 border-purple-200"
                  >
                    {news.category}
                  </Badge>
                  <h3 className="text-lg font-semibold mt-4 mb-2">{news.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{news.summary}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-primary">{news.source}</span>
                    <span className="text-muted-foreground">{news.date}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Emerging Technologies */}
        <Card className="mb-16">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Bot className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold">Emerging Technologies</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {emergingTech.map((tech, index) => (
                <div key={index} className="p-4 bg-muted/30 rounded-lg">
                  <h3 className="font-semibold mb-2">{tech.tech}</h3>
                  <div className="space-y-2">
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary"
                        style={{ width: `${tech.adoption}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{tech.adoption}% Adoption</span>
                      <Badge variant="outline" className="bg-primary/10">
                        {tech.timeline}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Agentic AI Trends */}
        <Card className="mb-16">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Bot className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold">Agentic AI Revolution</h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Growth Metrics */}
              <div>
                <h3 className="text-lg font-medium mb-4">Adoption & Impact</h3>
                <div className="w-full h-[400px] bg-white rounded-lg">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis 
                        dataKey="quarter" 
                        tick={{ fill: "#6b7280" }}
                        axisLine={{ stroke: "#e5e7eb" }}
                      />
                      <YAxis 
                        tick={{ fill: "#6b7280" }}
                        axisLine={{ stroke: "#e5e7eb" }}
                        tickFormatter={(value) => `${value}%`}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: "white",
                          borderRadius: "8px",
                          border: "1px solid #e5e7eb",
                          boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                        }}
                        formatter={(value) => [`${value}%`]}
                      />
                      <Legend />
                      {metrics.map((metric) => (
                        <Line
                          key={metric.name}
                          type="monotone"
                          dataKey={metric.name}
                          stroke={metric.color}
                          strokeWidth={2}
                          dot={{ r: 4, fill: metric.color }}
                          activeDot={{ r: 6 }}
                        />
                      ))}
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Key Applications */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium mb-4">Key Applications</h3>
                {[
                  {
                    area: "Personalized Learning",
                    details: [
                      "Dynamic curriculum adaptation",
                      "Real-time skill assessment",
                      "Predictive learning paths"
                    ],
                    impact: "Revolutionary"
                  },
                  {
                    area: "Research Assistance",
                    details: [
                      "Autonomous data analysis",
                      "Literature review automation",
                      "Hypothesis generation"
                    ],
                    impact: "Transformative"
                  },
                  {
                    area: "Educational Operations",
                    details: [
                      "Smart resource allocation",
                      "Automated scheduling",
                      "Performance optimization"
                    ],
                    impact: "High"
                  }
                ].map((item, index) => (
                  <div key={index} className="p-4 bg-muted/30 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold">{item.area}</h4>
                      <Badge 
                        variant="outline" 
                        className={
                          item.impact === "Revolutionary" 
                            ? "bg-purple-100 text-purple-800" 
                            : item.impact === "Transformative"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-green-100 text-green-800"
                        }
                      >
                        {item.impact}
                      </Badge>
                    </div>
                    <ul className="space-y-1">
                      {item.details.map((detail, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-primary" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Global Trends */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <Brain className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold">Neural-Age Learning Trends</h2>
              </div>
              <div className="space-y-6">
                {educationTrends.map((trend, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{trend.trend}</span>
                      <span className="text-sm text-muted-foreground">{trend.growth}% growth</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden mb-2">
                      <div 
                        className="h-full bg-primary"
                        style={{ width: `${trend.growth}%` }}
                      />
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {trend.regions.map((region, i) => (
                        <Badge key={i} variant="outline" className="bg-primary/5">
                          {region}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <Cpu className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold">Future Projections</h2>
              </div>
              <div className="space-y-6">
                {futureProjections.map((projection, index) => (
                  <div key={index} className="p-4 bg-muted/30 rounded-lg">
                    <h3 className="font-semibold mb-3">Year {projection.year}</h3>
                    <div className="space-y-2">
                      {projection.predictions.map((prediction, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <ArrowRight className="w-4 h-4 text-primary mt-1" />
                          <span className="text-sm text-muted-foreground">{prediction}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tech Timeline */}
        <Card className="mb-16">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Clock className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold">2024 Milestones</h2>
            </div>
            <div className="space-y-8">
              {techTimeline.map((period, index) => (
                <div key={index} className="relative pl-6 border-l-2 border-primary/20">
                  <div className="absolute w-4 h-4 bg-primary rounded-full -left-[9px] top-0" />
                  <h3 className="font-semibold mb-4">{period.date}</h3>
                  <div className="space-y-3">
                    {period.events.map((event, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <ArrowRight className="w-4 h-4 text-primary mt-1" />
                        <p className="text-muted-foreground">{event}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              icon: Brain,
              title: "Neural Tech Updates",
              link: "/tech/neural",
              description: "Latest advancements in neural technology and brain-computer interfaces"
            },
            {
              icon: Cpu,
              title: "Quantum Education",
              link: "/education/quantum",
              description: "Quantum computing curriculum and learning resources"
            },
            {
              icon: Bot,
              title: "AI Teaching Systems",
              link: "/systems/ai-teaching",
              description: "Intelligent tutoring and automated learning platforms"
            },
            {
              icon: Globe,
              title: "Space-Earth Learning",
              link: "/education/space-earth",
              description: "Cross-planetary educational initiatives and programs"
            }
          ].map((item, index) => (
            <Link 
              key={index} 
              href={item.link}
              className="group flex items-center gap-3 p-4 rounded-lg border border-[#e5e7eb] hover:border-blue-500 hover:bg-blue-50/50 transition-all"
            >
              <div className="flex items-center gap-3 flex-1">
                <item.icon className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-gray-900">{item.title}</span>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
            </Link>
          ))}
        </div>
      </div>
    </MainLayout>
  );
} 