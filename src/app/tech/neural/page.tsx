import { MainLayout } from "@/components/layout/MainLayout";
import { Brain, ArrowRight, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function NeuralTechPage() {
  return (
    <MainLayout>
      <div className="container py-16">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Brain className="w-8 h-8 text-blue-600" />
            <h1 className="text-4xl font-bold">Neural Tech Updates</h1>
          </div>

          <div className="space-y-8">
            {/* Latest Updates */}
            <section>
              <h2 className="text-2xl font-semibold mb-6">Latest Developments</h2>
              <div className="grid gap-6">
                {[
                  {
                    title: "Brain-Computer Interface Breakthroughs",
                    date: "March 2024",
                    description: "New advancements in direct neural feedback systems enabling faster learning and skill acquisition.",
                    impact: "High Impact",
                    link: "#"
                  },
                  {
                    title: "Neural Learning Enhancement",
                    date: "February 2024",
                    description: "Revolutionary neural pathway optimization techniques for accelerated knowledge retention.",
                    impact: "Breakthrough",
                    link: "#"
                  },
                  {
                    title: "Cognitive Processing Amplification",
                    date: "January 2024",
                    description: "Novel methods for enhancing mental processing speed and information synthesis.",
                    impact: "Emerging",
                    link: "#"
                  }
                ].map((update, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-semibold">{update.title}</h3>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700">
                          {update.impact}
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-4">{update.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">{update.date}</span>
                        <a 
                          href={update.link}
                          className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                        >
                          Learn more
                          <ArrowRight className="w-4 h-4" />
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Research Highlights */}
            <section>
              <h2 className="text-2xl font-semibold mb-6">Research Highlights</h2>
              <div className="grid gap-6">
                {[
                  {
                    institution: "Neural Science Institute",
                    title: "Cognitive Enhancement Through Direct Neural Stimulation",
                    status: "Ongoing",
                    link: "#"
                  },
                  {
                    institution: "Brain-Tech Research Center",
                    title: "Memory Formation Acceleration Techniques",
                    status: "Published",
                    link: "#"
                  },
                  {
                    institution: "Neurology Advanced Studies",
                    title: "Neural Network Pattern Recognition in Learning",
                    status: "Peer Review",
                    link: "#"
                  }
                ].map((research, index) => (
                  <a 
                    key={index}
                    href={research.link}
                    className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50/50 transition-all group"
                  >
                    <div>
                      <div className="text-sm text-gray-500 mb-1">{research.institution}</div>
                      <div className="font-medium">{research.title}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="bg-gray-50">
                        {research.status}
                      </Badge>
                      <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-500" />
                    </div>
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
 