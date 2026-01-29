import CardNav from '@/components/ui/CardNav';
import logo from '@/assets/logo.svg';
import { useNavigate } from 'react-router-dom';

export function CardNavbar() {
  const navigate = useNavigate();
  const items = [
    {
      label: "Features",
      bgColor: "#1E40AF",
      textColor: "#fff",
      links: [
        { label: "One-Click Deploy", href: "/features", ariaLabel: "One-Click Deploy Feature" },
        { label: "Auto-Detect Framework", href: "/features", ariaLabel: "Auto-Detect Framework Feature" },
        { label: "Security Scanning", href: "/features", ariaLabel: "Security Scanning Feature" }
      ]
    },
    {
      label: "Templates", 
      bgColor: "#7C3AED",
      textColor: "#fff",
      links: [
        { label: "React Templates", href: "/templates", ariaLabel: "React Templates" },
        { label: "Next.js Templates", href: "/templates", ariaLabel: "Next.js Templates" },
        { label: "Vue Templates", href: "/templates", ariaLabel: "Vue Templates" }
      ]
    },
    {
      label: "Resources",
      bgColor: "#059669", 
      textColor: "#fff",
      links: [
        { label: "Documentation", href: "/docs", ariaLabel: "Documentation" },
        { label: "How it works", href: "/how-it-works", ariaLabel: "How it works" },
        { label: "Pricing", href: "/pricing", ariaLabel: "Pricing" }
      ]
    }
  ];

  return (
    <CardNav
      logo={logo}
      logoAlt="OneShip Logo"
      items={items}
      baseColor="#fff"
      menuColor="#000"
      buttonBgColor="#3B82F6"
      buttonTextColor="#fff"
      ease="power3.out"
      onButtonClick={() => navigate('/auth?mode=signup')}
    />
  );
}