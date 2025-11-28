import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Upload,
  Cpu,
  Shield,
  Rocket,
  Globe,
  ArrowRight,
  Github,
  FileArchive,
  Palette,
} from "lucide-react";

const steps = [
  {
    step: "01",
    icon: Upload,
    title: "Import Your Project",
    description: "Choose how to import your code - from GitHub, upload a ZIP file, or start from a template.",
    options: [
      { icon: Github, label: "GitHub Import" },
      { icon: FileArchive, label: "ZIP Upload" },
      { icon: Palette, label: "Templates" },
    ],
  },
  {
    step: "02",
    icon: Cpu,
    title: "Auto-Configuration",
    description: "We automatically detect your framework and configure the optimal build settings.",
    frameworks: ["React", "Next.js", "Vue", "Django", "Flask", "Node.js"],
  },
  {
    step: "03",
    icon: Shield,
    title: "Security Scan",
    description: "Before deploying, we scan your code for vulnerabilities and exposed secrets.",
    checks: ["Dependencies", "API Keys", "Best Practices"],
  },
  {
    step: "04",
    icon: Rocket,
    title: "Build & Deploy",
    description: "Your project is built and deployed to our global edge network in seconds.",
  },
  {
    step: "05",
    icon: Globe,
    title: "Go Live",
    description: "Get your live URL instantly. Add it to your resume, share with friends, or submit for your hackathon.",
  },
];

export default function HowItWorks() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            How <span className="gradient-text">DeployEasy</span> Works
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From code to production in under 60 seconds. No DevOps experience required.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-16">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.step}
                  className="flex flex-col md:flex-row gap-8 items-start"
                >
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 rounded-2xl gradient-hero flex items-center justify-center">
                      <Icon className="h-10 w-10 text-primary-foreground" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-primary mb-2">Step {step.step}</div>
                    <h2 className="text-2xl font-bold mb-3">{step.title}</h2>
                    <p className="text-lg text-muted-foreground mb-6">{step.description}</p>

                    {step.options && (
                      <div className="flex flex-wrap gap-4">
                        {step.options.map((option) => {
                          const OptionIcon = option.icon;
                          return (
                            <div
                              key={option.label}
                              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary"
                            >
                              <OptionIcon className="h-4 w-4" />
                              <span className="text-sm font-medium">{option.label}</span>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {step.frameworks && (
                      <div className="flex flex-wrap gap-2">
                        {step.frameworks.map((fw) => (
                          <span
                            key={fw}
                            className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium"
                          >
                            {fw}
                          </span>
                        ))}
                      </div>
                    )}

                    {step.checks && (
                      <div className="flex flex-wrap gap-4">
                        {step.checks.map((check) => (
                          <div key={check} className="flex items-center gap-2">
                            <Shield className="h-4 w-4 text-success" />
                            <span className="text-sm">{check}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Demo */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">See It In Action</h2>
              <p className="text-muted-foreground">
                Watch how quickly you can deploy a project
              </p>
            </div>

            <div className="rounded-xl border bg-card overflow-hidden shadow-lg">
              <div className="flex items-center gap-2 p-4 border-b bg-secondary/50">
                <div className="w-3 h-3 rounded-full bg-destructive" />
                <div className="w-3 h-3 rounded-full bg-warning" />
                <div className="w-3 h-3 rounded-full bg-success" />
                <span className="ml-2 text-sm text-muted-foreground">Terminal</span>
              </div>
              <div className="p-6 font-mono text-sm space-y-2 bg-foreground text-background">
                <p><span className="text-accent">$</span> deployeasy deploy my-project</p>
                <p className="text-muted-foreground">→ Importing from GitHub...</p>
                <p className="text-muted-foreground">→ Detected: React + Vite</p>
                <p className="text-muted-foreground">→ Installing dependencies...</p>
                <p className="text-muted-foreground">→ Running security scan...</p>
                <p className="text-success">✓ No vulnerabilities found</p>
                <p className="text-muted-foreground">→ Building project...</p>
                <p className="text-success">✓ Build successful (45s)</p>
                <p className="text-muted-foreground">→ Deploying to edge network...</p>
                <p className="text-success">✓ Deployed!</p>
                <p className="mt-4 text-primary">🚀 Live at: https://my-project.deployeasy.app</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Deploy Your First Project?</h2>
          <p className="text-muted-foreground mb-8">
            Get started in under a minute. No credit card required.
          </p>
          <Link to="/auth?mode=signup">
            <Button variant="hero" size="lg">
              Start Deploying Free
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
