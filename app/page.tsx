import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Zap, Palette, Code2, Rocket } from "lucide-react"

export default function Page() {
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Built with Next.js 15 and Turbopack for blazing-fast development and production builds.",
    },
    {
      icon: Palette,
      title: "Beautiful UI",
      description: "Tailwind CSS v4 with shadcn/ui components for a modern, customizable design system.",
    },
    {
      icon: Code2,
      title: "Type Safe",
      description: "Full TypeScript support with strict type checking for a robust codebase.",
    },
    {
      icon: Rocket,
      title: "Ready to Deploy",
      description: "Integrated with Supabase for authentication and database, deployed to Vercel.",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto max-w-7xl px-4 py-24 sm:py-32">
        <div className="space-y-8 text-center">
          <Badge variant="secondary" className="mx-auto w-fit">
            🚀 Latest Technology Stack
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            Next.js Starter Kit
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl">
            A modern, fully-featured starter template for building web applications.
            Built with Next.js, TypeScript, Tailwind CSS v4, shadcn/ui, and Supabase.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row items-center justify-center">
            <Button asChild size="lg">
              <Link href="/dashboard">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                View on GitHub
              </a>
            </Button>
          </div>

          {/* Tech Stack Badges */}
          <div className="flex flex-wrap gap-3 justify-center pt-4">
            {["Next.js 15", "React 19", "TypeScript", "Tailwind v4", "shadcn/ui", "Supabase"].map(
              (tech) => (
                <Badge key={tech} variant="outline">
                  {tech}
                </Badge>
              )
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto max-w-7xl px-4 py-24">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold">Why Choose This Stack?</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground text-lg">
              Everything you need to build modern, scalable web applications.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <Card key={feature.title}>
                  <CardHeader>
                    <Icon className="h-8 w-8 text-primary mb-2" />
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto max-w-7xl px-4 py-24">
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl">Ready to Get Started?</CardTitle>
            <CardDescription className="text-base mt-2">
              Clone the repository and start building your next great project.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button asChild size="lg">
              <Link href="/dashboard">
                Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/login">Sign In</Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
