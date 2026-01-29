import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/features", label: "Features" },
  { href: "/templates", label: "Templates" },
  { href: "/analyze", label: "AI Analysis" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/docs", label: "Docs" },
  { href: "/pricing", label: "Pricing" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed left-1/2 transform -translate-x-1/2 z-50 transition-all duration-700 ease-in-out",
      isScrolled 
        ? "top-4 bg-black/95 backdrop-blur-xl border border-white/20 rounded-full shadow-2xl w-auto min-w-fit navbar-float" 
        : "top-0 bg-transparent w-full max-w-none navbar-pull"
    )}>
      <div className={cn(
        "transition-all duration-700 ease-in-out",
        isScrolled ? "px-10 w-auto min-w-fit" : "container mx-auto px-6"
      )}>
        <div className={cn(
          "flex items-center transition-all duration-700 ease-in-out",
          isScrolled ? "h-16 justify-between w-full" : "h-24 justify-between"
        )}>
          <Link to="/" className={cn(
            "flex items-center font-bold transition-all duration-700 ease-in-out",
            isScrolled ? "shrink-0" : ""
          )}>
            <span className={cn(
              "font-bold transition-all duration-700 ease-in-out whitespace-nowrap",
              isScrolled ? "text-white text-2xl" : "text-black text-3xl"
            )}>
              OneShip
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className={cn(
            "hidden lg:flex items-center transition-all duration-700 ease-in-out",
            isScrolled ? "gap-8" : "gap-10"
          )}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "font-semibold transition-all duration-300 ease-in-out whitespace-nowrap hover:scale-105",
                  isScrolled 
                    ? "text-gray-300 hover:text-white text-lg px-3 py-2" 
                    : "text-gray-600 hover:text-black text-lg px-3 py-2"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className={cn(
            "hidden lg:flex items-center transition-all duration-700 ease-in-out",
            isScrolled ? "" : ""
          )}>
            <Link to="/auth?mode=signup">
              <Button 
                className={cn(
                  "bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold transition-all duration-300 ease-in-out hover:scale-105 shadow-lg hover:shadow-xl",
                  isScrolled ? "px-7 py-3 text-lg" : "px-8 py-3 text-lg"
                )}
              >
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={cn(
              "lg:hidden p-2 transition-all duration-700 ease-in-out",
              isScrolled ? "ml-auto" : ""
            )}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X className={cn(
                "transition-all duration-300",
                isScrolled ? "h-5 w-5 text-white" : "h-6 w-6 text-black"
              )} />
            ) : (
              <Menu className={cn(
                "transition-all duration-300",
                isScrolled ? "h-5 w-5 text-white" : "h-6 w-6 text-black"
              )} />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden pb-4 animate-fade-in">
            <div className="flex flex-col gap-2 bg-white rounded-lg mt-4 p-4 shadow-lg">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="block px-4 py-3 text-base font-semibold text-gray-700 hover:text-black hover:bg-gray-50 rounded-lg transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-4 pt-4 border-t">
                <Link to="/auth?mode=signup" onClick={() => setIsOpen(false)}>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full py-3 text-base font-semibold">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
