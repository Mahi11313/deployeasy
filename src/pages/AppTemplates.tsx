import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Search, ArrowRight, Star, Github } from "lucide-react";

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
];

const categories = ["All", "Frontend", "Backend", "Full-stack"];

export default function AppTemplates() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || template.tags.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold">Templates</h1>
          <p className="text-muted-foreground">
            Start your project with a pre-configured template
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search templates..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              className="rounded-xl border bg-card hover:shadow-md transition-all overflow-hidden"
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
                <div className="flex flex-wrap gap-2">
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
                <Link to="/deploy" className="flex-1">
                  <Button variant="hero" size="sm" className="w-full">
                    Use Template
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

        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No templates found matching your criteria</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
