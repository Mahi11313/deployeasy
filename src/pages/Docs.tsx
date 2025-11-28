import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";
import { Search, Book, Rocket, Code, Shield, Terminal, Settings, Users } from "lucide-react";

const docSections = [
  {
    title: "Getting Started",
    icon: Rocket,
    articles: [
      { title: "Quick Start Guide", description: "Deploy your first project in under 5 minutes" },
      { title: "Account Setup", description: "Create and configure your DeployEasy account" },
      { title: "Connecting GitHub", description: "Link your GitHub account for auto-deployments" },
    ],
  },
  {
    title: "Deploying Projects",
    icon: Code,
    articles: [
      { title: "GitHub Import", description: "Deploy directly from your repositories" },
      { title: "ZIP Upload", description: "Upload project files manually" },
      { title: "Using Templates", description: "Start from pre-configured templates" },
      { title: "Framework Detection", description: "How auto-detection works" },
    ],
  },
  {
    title: "Configuration",
    icon: Settings,
    articles: [
      { title: "Build Settings", description: "Customize your build configuration" },
      { title: "Environment Variables", description: "Manage secrets and configuration" },
      { title: "Custom Domains", description: "Use your own domain name" },
      { title: "Deploy Hooks", description: "Trigger deployments programmatically" },
    ],
  },
  {
    title: "Security",
    icon: Shield,
    articles: [
      { title: "Security Scanning", description: "How vulnerability scanning works" },
      { title: "Managing Secrets", description: "Best practices for API keys" },
      { title: "Access Control", description: "Manage team permissions" },
    ],
  },
  {
    title: "Build & Logs",
    icon: Terminal,
    articles: [
      { title: "Understanding Build Logs", description: "Read and debug build output" },
      { title: "Common Errors", description: "Troubleshoot frequent issues" },
      { title: "Performance Tips", description: "Optimize build times" },
    ],
  },
  {
    title: "Team Features",
    icon: Users,
    articles: [
      { title: "Inviting Members", description: "Add collaborators to your projects" },
      { title: "Roles & Permissions", description: "Configure access levels" },
      { title: "Activity Logs", description: "Track team actions" },
    ],
  },
];

export default function Docs() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSections = docSections.map((section) => ({
    ...section,
    articles: section.articles.filter(
      (article) =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.description.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter((section) => section.articles.length > 0);

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 rounded-2xl gradient-hero flex items-center justify-center mx-auto mb-6">
              <Book className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Documentation</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Everything you need to deploy and manage your projects
            </p>
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search documentation..."
                className="pl-12 h-12"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Documentation Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSections.map((section) => {
              const Icon = section.icon;
              return (
                <div key={section.title} className="space-y-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <h2 className="text-xl font-semibold">{section.title}</h2>
                  </div>
                  <div className="space-y-2">
                    {section.articles.map((article) => (
                      <button
                        key={article.title}
                        className="w-full text-left p-4 rounded-lg border bg-card hover:border-primary/50 hover:shadow-sm transition-all"
                      >
                        <h3 className="font-medium mb-1">{article.title}</h3>
                        <p className="text-sm text-muted-foreground">{article.description}</p>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {filteredSections.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No articles found matching "{searchQuery}"</p>
            </div>
          )}
        </div>
      </section>

      {/* Help Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Still Need Help?</h2>
          <p className="text-muted-foreground mb-6">
            Can't find what you're looking for? Reach out to our support team.
          </p>
          <div className="flex justify-center gap-4">
            <button className="px-6 py-3 rounded-lg border bg-card hover:border-primary transition-colors">
              Join Discord
            </button>
            <button className="px-6 py-3 rounded-lg border bg-card hover:border-primary transition-colors">
              Contact Support
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
