import { MainLayout } from "@/components/layout/MainLayout";
import { Globe, ArrowRight, ExternalLink, Rocket, Satellite, Radio } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function SpaceEarthLearningPage() {
  return (
    <MainLayout>
      <div className="container py-16">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Globe className="w-8 h-8 text-blue-600" />
            <h1 className="text-4xl font-bold">Space-Earth Learning</h1>
          </div>

          <div className="space-y-8">
            {/* Active Programs */}
            <section>
              <h2 className="text-2xl font-semibold mb-6">Active Programs</h2>
              <div className="grid gap-6">
                {[
                  {
                    title: "Mars Education Initiative",
                    organization: "Space Academy International",
                    description: "Cross-planetary educational program focusing on Mars colonization studies",
                    participants: "15k students",
                    locations: ["Earth", "Mars Base One"],
                    status: "Active",
                    link: "#"
                  },
                  {
                    title: "Lunar Learning Lab",
                    organization: "Global Space Education",
                    description: "Interactive lunar science and astronomy education program",
                    participants: "12k students",
                    locations: ["Earth", "Lunar Station"],
                    status: "Enrolling",
                    link: "#"
                  },
                  {
                    title: "Space Station Academy",
                    organization: "International Space Coalition",
                    description: "Advanced space technology and engineering education",
                    participants: "8k students",
                    locations: ["Earth", "ISS", "Orbital Labs"],
                    status: "Active",
                    link: "#"
                  }
                ].map((program, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-semibold mb-2">{program.title}</h3>
                          <div className="text-gray-600 mb-2">{program.organization}</div>
                          <p className="text-gray-600">{program.description}</p>
                        </div>
                        <Badge 
                          variant="outline" 
                          className={program.status === "Active" ? "bg-green-50 text-green-700" : "bg-blue-50 text-blue-700"}
                        >
                          {program.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="text-sm text-gray-600">
                          <span className="font-medium">{program.participants}</span> enrolled
                        </div>
                        <div className="flex items-center gap-2">
                          {program.locations.map((location, i) => (
                            <Badge key={i} variant="outline" className="bg-gray-50">
                              {location}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <a 
                        href={program.link}
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                      >
                        Learn more
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Technologies */}
            <section>
              <h2 className="text-2xl font-semibold mb-6">Learning Technologies</h2>
              <div className="grid gap-6">
                {[
                  {
                    icon: Rocket,
                    title: "Virtual Space Missions",
                    description: "Immersive VR-based space exploration simulations",
                    status: "Operational",
                    link: "#"
                  },
                  {
                    icon: Satellite,
                    title: "Satellite Learning Network",
                    description: "Real-time data streaming for space education",
                    status: "Active",
                    link: "#"
                  },
                  {
                    icon: Radio,
                    title: "Interplanetary Classroom",
                    description: "Live cross-planetary educational sessions",
                    status: "Beta",
                    link: "#"
                  }
                ].map((tech, index) => (
                  <a 
                    key={index}
                    href={tech.link}
                    className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50/50 transition-all group"
                  >
                    <div className="flex items-start gap-4">
                      <tech.icon className="w-5 h-5 text-blue-600 mt-1" />
                      <div>
                        <div className="font-medium mb-1">{tech.title}</div>
                        <div className="text-sm text-gray-600">{tech.description}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="bg-gray-50">
                        {tech.status}
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