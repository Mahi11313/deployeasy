import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import LogoLoop from "@/components/ui/LogoLoop";
import FlowingMenu from "@/components/ui/FlowingMenu";
import {
  Github,
  FileArchive,
  Code2,
  ArrowRight,
} from "lucide-react";
import { 
  SiReact, 
  SiNextdotjs, 
  SiVuedotjs, 
  SiAngular, 
  SiDjango, 
  SiFlask, 
  SiNodedotjs, 
  SiExpress, 
  SiFastapi, 
  SiSvelte, 
  SiNuxtdotjs, 
  SiLaravel, 
  SiSpring, 
  SiRubyonrails 
} from 'react-icons/si';

const features = [
  {
    link: '#',
    text: 'Real-Time Build Logs',
    image: 'https://picsum.photos/600/400?random=1'
  },
  {
    link: '#',
    text: 'Portfolio Generator',
    image: 'https://picsum.photos/600/400?random=2'
  },
  {
    link: '#',
    text: 'Auto-Detect Framework',
    image: 'https://picsum.photos/600/400?random=3'
  },
  {
    link: '#',
    text: 'Security Scanning',
    image: 'https://picsum.photos/600/400?random=4'
  }
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

const techLogos = [
  { node: <SiReact />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
  { node: <SiVuedotjs />, title: "Vue.js", href: "https://vuejs.org" },
  { node: <SiAngular />, title: "Angular", href: "https://angular.io" },
  { node: <SiDjango />, title: "Django", href: "https://djangoproject.com" },
  { node: <SiFlask />, title: "Flask", href: "https://flask.palletsprojects.com" },
  { node: <SiNodedotjs />, title: "Node.js", href: "https://nodejs.org" },
  { node: <SiExpress />, title: "Express", href: "https://expressjs.com" },
  { node: <SiFastapi />, title: "FastAPI", href: "https://fastapi.tiangolo.com" },
  { node: <SiSvelte />, title: "Svelte", href: "https://svelte.dev" },
  { node: <SiNuxtdotjs />, title: "Nuxt.js", href: "https://nuxt.com" },
  { node: <SiLaravel />, title: "Laravel", href: "https://laravel.com" },
  { node: <SiSpring />, title: "Spring Boot", href: "https://spring.io" },
  { node: <SiRubyonrails />, title: "Ruby on Rails", href: "https://rubyonrails.org" },
];

export default function Index() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white overflow-hidden pt-32">
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl lg:text-8xl mb-16 leading-tight animate-fade-in" style={{ 
              fontFamily: 'Inter, sans-serif',
              fontWeight: '300',
              letterSpacing: '-0.04em'
            }}>
              <span className="block text-gray-900">Ship Your Projects</span>
              <span className="block text-black font-semibold italic" style={{ fontWeight: '600' }}>In One Click</span>
            </h1>
            
            {/* Centered Deploy Button */}
            <div className="flex justify-center mt-12 animate-slide-up" style={{ animationDelay: "0.3s" }}>
              <Link to="/auth?mode=signup">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform">
                  DEPLOY NOW!
                </Button>
              </Link>
            </div>
            
            {/* Stats Section */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 mt-16 animate-slide-up" style={{ animationDelay: "0.5s" }}>
              <div className="flex items-center gap-4 hover:scale-105 transition-transform duration-300">
                <div className="text-center">
                  <div className="text-3xl font-bold text-black">5+</div>
                  <div className="text-sm text-gray-600">Years of Excellence</div>
                </div>
              </div>
              
              <div className="flex items-center gap-4 hover:scale-105 transition-transform duration-300">
                <div className="text-center">
                  <div className="text-3xl font-bold text-black">99%</div>
                  <div className="text-sm text-gray-600">Success Rate</div>
                </div>
              </div>
              
              <div className="flex items-center gap-4 hover:scale-105 transition-transform duration-300">
                <div className="text-center">
                  <div className="text-3xl font-bold text-black">1000+</div>
                  <div className="text-sm text-gray-600">Projects Deployed</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Frameworks */}
      <section className="py-20 bg-black overflow-hidden">
        <div className="container mx-auto px-4">
          <p className="text-center text-lg text-gray-300 mb-12 font-semibold">
            Supports all your favorite frameworks
          </p>
          
          <LogoLoop
            logos={techLogos}
            speed={120}
            direction="left"
            logoHeight={48}
            gap={60}
            hoverSpeed={20}
            scaleOnHover
            fadeOut
            fadeOutColor="#000000"
            ariaLabel="Supported technology frameworks"
            className="text-gray-400 hover:text-blue-400"
          />
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">
              Everything You Need to Ship Fast
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We handle the complex DevOps so you can focus on building amazing projects.
            </p>
          </div>
          
          <div style={{ height: '600px', position: 'relative' }}>
            <FlowingMenu items={features} />
          </div>
        </div>
      </section>

      {/* AI Analysis Section */}
      <section className="py-24 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
              Powered by Gemini AI
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              Instant Repository Analysis
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Drop any GitHub repository URL and get instant AI-powered analysis of technology stack, 
              build commands, environment variables, and deployment requirements.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Code2 className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">Tech Stack Detection</h3>
                <p className="text-sm text-gray-600">Automatically identify frameworks, languages, and dependencies</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <FileArchive className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">Build Commands</h3>
                <p className="text-sm text-gray-600">Get the exact build and start commands for your project</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Github className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">Environment Setup</h3>
                <p className="text-sm text-gray-600">Discover required environment variables and configurations</p>
              </div>
            </div>
            
            <Link to="/analyze">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                Try AI Analysis Free
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
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
                  <p className="text-muted-foreground">$ oneship deploy</p>
                  <p className="text-accent">→ Detected: React + Vite</p>
                  <p className="text-muted-foreground">→ Installing dependencies...</p>
                  <p className="text-muted-foreground">→ Running security scan...</p>
                  <p className="text-success">✓ No vulnerabilities found</p>
                  <p className="text-muted-foreground">→ Building project...</p>
                  <p className="text-success">✓ Build successful</p>
                  <p className="text-muted-foreground">→ Deploying to edge network...</p>
                  <p className="text-success">✓ Deployed!</p>
                  <p className="text-primary mt-4">🚀 Live at: https://my-project.oneship.app</p>
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
              Join thousands of developers who are deploying their projects with OneShip.
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
