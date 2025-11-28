import { Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Check, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for students and hobby projects",
    features: [
      "3 projects",
      "100 deployments/month",
      "Automatic SSL",
      "Basic security scanning",
      "Community support",
      "Shared resources",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    price: "$9",
    period: "per month",
    description: "For serious developers and hackathon teams",
    features: [
      "Unlimited projects",
      "Unlimited deployments",
      "Custom domains",
      "Advanced security scanning",
      "Priority support",
      "Team collaboration (up to 5)",
      "Deploy previews",
      "Analytics dashboard",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Team",
    price: "$29",
    period: "per month",
    description: "For student organizations and clubs",
    features: [
      "Everything in Pro",
      "Unlimited team members",
      "Role-based access",
      "Audit logs",
      "SLA guarantee",
      "Dedicated support",
      "Custom branding",
      "API access",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

const faqs = [
  {
    question: "Is the free plan really free forever?",
    answer: "Yes! Our free plan is designed for students and will always be free. No credit card required.",
  },
  {
    question: "Can I upgrade or downgrade anytime?",
    answer: "Absolutely. You can change your plan at any time. Upgrades take effect immediately, and downgrades apply at the next billing cycle.",
  },
  {
    question: "Do you offer student discounts?",
    answer: "Yes! Students with a valid .edu email get 50% off Pro plans. Contact us to apply.",
  },
  {
    question: "What happens if I exceed my limits?",
    answer: "We'll notify you before you hit your limits. Your deployments won't be interrupted, but you may need to upgrade for additional capacity.",
  },
];

export default function Pricing() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Simple, <span className="gradient-text">Student-Friendly</span> Pricing
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Start for free, upgrade when you're ready. No surprises, no hidden fees.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={cn(
                  "rounded-2xl border bg-card p-8 relative",
                  plan.popular && "border-primary shadow-lg scale-105"
                )}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1.5 rounded-full gradient-hero text-primary-foreground text-sm font-medium flex items-center gap-1">
                      <Sparkles className="h-4 w-4" />
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="text-center mb-8">
                  <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                  <div className="flex items-baseline justify-center gap-1 mb-2">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">/{plan.period}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm">
                      <Check className="h-4 w-4 text-success shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link to="/auth?mode=signup" className="block">
                  <Button
                    variant={plan.popular ? "hero" : "outline"}
                    className="w-full"
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Student Discount Banner */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-4xl mb-4 block">🎓</span>
            <h2 className="text-2xl font-bold mb-4">50% Off for Students</h2>
            <p className="text-muted-foreground mb-6">
              Verify your student status with a .edu email and get Pro features at half the price.
            </p>
            <Button variant="outline">Claim Student Discount</Button>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="max-w-2xl mx-auto space-y-6">
            {faqs.map((faq) => (
              <div key={faq.question} className="p-6 rounded-xl border bg-card">
                <h3 className="font-semibold mb-2">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Deploying?</h2>
          <p className="text-muted-foreground mb-8">
            Join thousands of students shipping their projects with DeployEasy.
          </p>
          <Link to="/auth?mode=signup">
            <Button variant="hero" size="lg">Get Started Free</Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
