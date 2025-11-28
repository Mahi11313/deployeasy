import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Zap,
  Shield,
  Globe,
  Code2,
  Terminal,
  BarChart3,
  Lock,
  Clock,
  Users,
  GitBranch,
  Palette,
  FileText,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "One-Click Deploy",
    description: "Deploy any project with a single click. No configuration needed, no command line required.",
    details: ["Instant deployment", "Zero configuration", "Automatic SSL certificates"],
  },
  {
    icon: Code2,
    title: "Auto-Detect Framework",
    description: "We automatically detect your project's framework and configure the build process.",
    details: ["React, Next.js, Vue, Angular", "Django, Flask, FastAPI", "Node.js, Express, Deno"],
  },
  {
    icon: Shield,
    title: "Security Scanning",
    description: "Every deployment is scanned for vulnerabilities before going live.",
    details: ["Dependency vulnerability checks", "Exposed secrets detection", "Best practice enforcement"],
  },
  {
    icon: Globe,
    title: "Instant Live URL",
    description: "Get a shareable URL for every deployment. Perfect for portfolios and demos.",
    details: ["Custom subdomains", "HTTPS by default", "Global CDN distribution"],
  },
  {
    icon: Terminal,
    title: "Real-Time Build Logs",
    description: "Watch your deployment progress with detailed, beginner-friendly logs.",
    details: ["Step-by-step progress", "Error highlighting", "Helpful suggestions"],
  },
  {
    icon: BarChart3,
    title: "Portfolio Generator",
    description: "Create a professional portfolio page showcasing all your deployed projects.",
    details: ["Customizable design", "Social links", "Project filtering"],
  },
  {
    icon: GitBranch,
    title: "GitHub Integration",
    description: "Connect your GitHub account for automatic deployments on every push.",
    details: ["Auto-deploy on push", "Branch previews", "Pull request previews"],
  },
  {
    icon: Lock,
    title: "Environment Variables",
    description: "Securely manage your API keys and secrets without exposing them in code.",
    details: ["Encrypted storage", "Per-environment vars", "Easy management UI"],
  },
  {
    icon: Clock,
    title: "Deploy History",
    description: "Track all your deployments and rollback to any previous version instantly.",
    details: ["Full history", "One-click rollback", "Deployment diffs"],
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Invite team members to collaborate on hackathon projects.",
    details: ["Role-based access", "Activity logs", "Shared projects"],
  },
  {
    icon: Palette,
    title: "Starter Templates",
    description: "Start new projects from pre-configured templates for popular frameworks.",
    details: ["React, Next.js, Vue", "Django, Flask", "Node.js, Express"],
  },
  {
    icon: FileText,
    title: "Auto Documentation",
    description: "Generate README files and documentation for your projects automatically.",
    details: ["README generation", "API documentation", "Deployment badges"],
  },
];

export default function Features() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Everything You Need to<br />
            <span className="gradient-text">Ship Projects Fast</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            DeployEasy handles all the complex DevOps so you can focus on building amazing projects.
          </p>
          <Link to="/auth?mode=signup">
            <Button variant="hero" size="lg">
              Get Started Free
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="p-6 rounded-xl border bg-card hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-lg gradient-hero flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground mb-4">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.details.map((detail, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Deploying?</h2>
          <p className="text-muted-foreground mb-8">
            Join thousands of students shipping their projects with DeployEasy.
          </p>
          <Link to="/auth?mode=signup">
            <Button variant="hero" size="lg">
              Create Free Account
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
