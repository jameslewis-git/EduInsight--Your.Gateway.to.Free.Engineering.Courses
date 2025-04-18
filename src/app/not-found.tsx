import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MainLayout } from "@/components/layout/MainLayout";

export default function NotFound() {
  return (
    <MainLayout>
      <div className="container flex flex-col items-center justify-center min-h-[70vh] text-center py-16">
        <h1 className="text-9xl font-bold text-primary">404</h1>
        <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-2">Looks like you're lost</h2>
        <p className="text-xl text-muted-foreground mb-8">
          The page you are looking for is not available!
        </p>
        <Link href="/">
          <Button size="lg" className="gap-2">
            Go to Home
          </Button>
        </Link>
      </div>
    </MainLayout>
  );
}
