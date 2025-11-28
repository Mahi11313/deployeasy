import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
  Rocket,
  Zap,
  Shield,
  Globe,
  Github,
  FileArchive,
  Code2,
  ArrowRight,
  Check,
  Terminal,
  Lock,
  BarChart3,
} from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const features = [
  {
    icon: Zap,
    title: "One-Click Deploy",
    description: "Deploy your project in seconds. No DevOps knowledge required.",
  },
  {
    icon: Code2,
    title: "Auto-Detect Framework",
    description: "We automatically detect React, Next.js, Django, Flask, Node.js, and more.",
  },
  {
    icon: Shield,
    title: "Security Scanning",
    description: "Automatic vulnerability scanning before every deployment.",
  },
  {
    icon: Globe,
    title: "Instant Live URL",
    description: "Get a shareable live URL for your project immediately.",
  },
  {
    icon: Terminal,
    title: "Real-Time Build Logs",
    description: "Watch your deployment progress with detailed, beginner-friendly logs.",
  },
  {
    icon: BarChart3,
    title: "Portfolio Generator",
    description: "Create a professional portfolio page showcasing all your projects.",
  },
];

const steps = [
  {
    step: "01",
    title: "Import Your Project",
    description: "Connect your GitHub repo or upload a ZIP file",
  },
  {
    step: "02",
    title: "Auto-Configure",
    description: "We detect your framework and set up everything",
  },
  {
    step: "03",
    title: "Deploy",
    description: "Click deploy and watch the magic happen",
  },
  {
    step: "04",
    title: "Share",
    description: "Get your live URL and add it to your portfolio",
  },
];

const frameworks = [
  "React", "Next.js", "Vue", "Angular", "Django", "Flask", "Node.js", "Express", "FastAPI"
];

export default function Index() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url(${heroBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/90 to-background" />
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-8 animate-fade-in">
              <Rocket className="h-4 w-4" />
              <span className="text-sm font-medium">Built for students, by students</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              Ship Your Projects<br />
              <span className="gradient-text">In One Click</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Stop wrestling with Docker, CI/CD, and server configs. Deploy your hackathon projects, class assignments, and side projects instantly.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <Link to="/auth?mode=signup">
                <Button variant="hero" size="xl">
                  Start Deploying Free
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/how-it-works">
                <Button variant="outline" size="xl">
                  See How It Works
                </Button>
              </Link>
            </div>

            <div className="mt-12 flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-success" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-success" />
                <span>Free tier forever</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-success" />
                <span>Deploy in under 60 seconds</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Frameworks */}
      <section className="py-12 border-y bg-secondary/30">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm text-muted-foreground mb-6">
            Supports all your favorite frameworks
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            {frameworks.map((fw) => (
              <span key={fw} className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors">
                {fw}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to Ship Fast
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We handle the complex DevOps so you can focus on building amazing projects.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="group p-6 rounded-xl border bg-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-12 h-12 rounded-lg gradient-hero flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Deploy in 4 Simple Steps
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From code to production in under a minute.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={step.step} className="relative">
                <div className="text-6xl font-bold text-primary/10 mb-4">{step.step}</div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
                {index < steps.length - 1 && (
                  <ArrowRight className="hidden lg:block absolute top-8 -right-4 h-6 w-6 text-primary/30" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Import Options */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Multiple Ways to Import
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Whether your code is on GitHub or your local machine, we've got you covered.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 rounded-xl border bg-card">
                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                    <Github className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">GitHub Import</h4>
                    <p className="text-sm text-muted-foreground">
                      Connect your GitHub account and import any repository with one click.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-4 rounded-xl border bg-card">
                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                    <FileArchive className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">ZIP Upload</h4>
                    <p className="text-sm text-muted-foreground">
                      Drag and drop your project folder or upload a ZIP file directly.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-4 rounded-xl border bg-card">
                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                    <Code2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Template Start</h4>
                    <p className="text-sm text-muted-foreground">
                      Start from a pre-configured template for React, Django, Node.js, and more.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-card rounded-xl border p-6 shadow-lg">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-destructive" />
                  <div className="w-3 h-3 rounded-full bg-warning" />
                  <div className="w-3 h-3 rounded-full bg-success" />
                </div>
                <div className="font-mono text-sm space-y-2">
                  <p className="text-muted-foreground">$ deployeasy deploy</p>
                  <p className="text-accent">→ Detected: React + Vite</p>
                  <p className="text-muted-foreground">→ Installing dependencies...</p>
                  <p className="text-muted-foreground">→ Running security scan...</p>
                  <p className="text-success">✓ No vulnerabilities found</p>
                  <p className="text-muted-foreground">→ Building project...</p>
                  <p className="text-success">✓ Build successful</p>
                  <p className="text-muted-foreground">→ Deploying to edge network...</p>
                  <p className="text-success">✓ Deployed!</p>
                  <p className="text-primary mt-4">🚀 Live at: https://my-project.deployeasy.app</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Ship Your Next Project?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of students who are deploying their projects with DeployEasy.
            </p>
            <Link to="/auth?mode=signup">
              <Button variant="hero" size="xl">
                Get Started Free
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
