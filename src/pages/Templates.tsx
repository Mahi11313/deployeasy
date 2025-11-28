import { Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Github, Star, ExternalLink } from "lucide-react";

const templates = [
  {
    id: "react-starter",
    name: "React Starter",
    description: "A minimal React + Vite template with Tailwind CSS and routing.",
    framework: "React",
    icon: "⚛️",
    stars: 1240,
    tags: ["Frontend", "SPA", "Tailwind"],
  },
  {
    id: "nextjs-blog",
    name: "Next.js Blog",
    description: "A full-featured blog template with MDX support and SEO optimization.",
    framework: "Next.js",
    icon: "▲",
    stars: 2100,
    tags: ["Full-stack", "Blog", "SEO"],
  },
  {
    id: "django-api",
    name: "Django REST API",
    description: "A production-ready Django REST framework template with authentication.",
    framework: "Django",
    icon: "🐍",
    stars: 890,
    tags: ["Backend", "API", "Auth"],
  },
  {
    id: "node-express",
    name: "Node.js Express API",
    description: "A lightweight Express.js API template with MongoDB integration.",
    framework: "Node.js",
    icon: "🟢",
    stars: 1560,
    tags: ["Backend", "API", "MongoDB"],
  },
  {
    id: "vue-dashboard",
    name: "Vue Dashboard",
    description: "An admin dashboard template with Vue 3, Pinia, and chart components.",
    framework: "Vue",
    icon: "💚",
    stars: 780,
    tags: ["Frontend", "Dashboard", "Charts"],
  },
  {
    id: "flask-api",
    name: "Flask REST API",
    description: "A minimal Flask API template with SQLAlchemy and JWT auth.",
    framework: "Flask",
    icon: "🌶️",
    stars: 650,
    tags: ["Backend", "API", "SQLAlchemy"],
  },
  {
    id: "portfolio",
    name: "Developer Portfolio",
    description: "A beautiful portfolio template to showcase your projects.",
    framework: "React",
    icon: "👤",
    stars: 3200,
    tags: ["Portfolio", "Personal", "Animations"],
  },
  {
    id: "landing-page",
    name: "SaaS Landing Page",
    description: "A modern landing page template for your startup or SaaS.",
    framework: "Next.js",
    icon: "🚀",
    stars: 1800,
    tags: ["Marketing", "Landing", "Conversion"],
  },
];

export default function Templates() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Start with a <span className="gradient-text">Template</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose from our collection of pre-configured templates and deploy instantly.
          </p>
        </div>
      </section>

      {/* Templates Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {templates.map((template) => (
              <div
                key={template.id}
                className="group rounded-xl border bg-card hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl">{template.icon}</span>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Star className="h-4 w-4 fill-warning text-warning" />
                      {template.stars.toLocaleString()}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{template.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {template.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {template.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 rounded-md bg-secondary text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="border-t p-4 flex gap-2">
                  <Link to="/auth?mode=signup" className="flex-1">
                    <Button variant="hero" size="sm" className="w-full">
                      Deploy
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm">
                    <Github className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Request Template */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Don't See What You Need?</h2>
          <p className="text-muted-foreground mb-6">
            Request a new template and we'll add it to our collection.
          </p>
          <Button variant="outline">
            Request Template
            <ExternalLink className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
