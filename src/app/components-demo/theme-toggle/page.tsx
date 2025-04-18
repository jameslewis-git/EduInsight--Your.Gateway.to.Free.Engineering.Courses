import { DefaultToggle } from "@/components/ui/demos/theme-toggle-demo"
import { EnhancedToggle } from "@/components/ui/demos/theme-toggle-enhanced-demo"

export default function ThemeToggleDemoPage() {
  return (
    <div className="container mx-auto py-10 space-y-10">
      <div>
        <h1 className="text-3xl font-bold mb-6 text-center">Theme Toggle Components</h1>
        <p className="text-center mb-8 text-muted-foreground max-w-2xl mx-auto">
          Clean, modern theme toggle buttons. The first uses local state for demo purposes, 
          while the second integrates with next-themes for actual theme switching.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="p-6 border rounded-lg bg-slate-50 dark:bg-slate-900">
          <h2 className="text-xl font-semibold mb-4 text-center">Demo Toggle</h2>
          <p className="text-sm text-muted-foreground mb-6 text-center">
            Uses React useState for demonstration purposes
          </p>
          <DefaultToggle />
        </div>

        <div className="p-6 border rounded-lg bg-slate-50 dark:bg-slate-900">
          <h2 className="text-xl font-semibold mb-4 text-center">Live Toggle</h2>
          <p className="text-sm text-muted-foreground mb-6 text-center">
            Integrated with next-themes to control site theme
          </p>
          <EnhancedToggle />
        </div>
      </div>
    </div>
  )
} 