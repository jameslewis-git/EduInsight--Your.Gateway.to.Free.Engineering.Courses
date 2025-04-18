import { HeroSection } from "@/components/ui/hero-section"

function HeroSectionDemo() {
  return (
    <HeroSection
      title="Welcome to EduInsight"
      subtitle={{
        regular: "Discover the best courses for ",
        gradient: "your learning journey",
      }}
      description="Find the perfect courses from top providers to enhance your skills and accelerate your career. EduInsight aggregates courses from multiple platforms to help you find exactly what you need."
      ctaText="Explore Courses"
      ctaHref="/courses"
      bottomImage={{
        light: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1470&auto=format&fit=crop",
        dark: "https://images.unsplash.com/photo-1581472723648-909f4851d4ae?q=80&w=1470&auto=format&fit=crop",
      }}
      gridOptions={{
        angle: 65,
        opacity: 0.4,
        cellSize: 50,
        lightLineColor: "#4a4a4a",
        darkLineColor: "#2a2a2a",
      }}
    />
  )
}

export { HeroSectionDemo } 