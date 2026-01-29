import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface HeroIllustrationProps {
  className?: string;
}

const HeroIllustration: React.FC<HeroIllustrationProps> = ({ className = '' }) => {
  const illustrationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (illustrationRef.current) {
      const elements = illustrationRef.current.querySelectorAll('.floating-element');
      
      // Animate floating elements
      elements.forEach((element, index) => {
        gsap.to(element, {
          y: -20,
          duration: 2 + index * 0.5,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut",
          delay: index * 0.2
        });
      });

      // Initial fade in animation
      gsap.fromTo(illustrationRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1, ease: "power2.out" }
      );
    }
  }, []);

  return (
    <div ref={illustrationRef} className={`hero-illustration ${className}`}>
      <div className="relative w-full h-96 flex items-center justify-center">
        {/* Main illustration container */}
        <div className="relative">
          {/* Central element */}
          <div className="floating-element w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-2xl flex items-center justify-center">
            <div className="w-16 h-16 bg-white rounded-lg opacity-90"></div>
          </div>
          
          {/* Floating elements around */}
          <div className="floating-element absolute -top-8 -left-8 w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-full shadow-lg"></div>
          <div className="floating-element absolute -top-4 -right-12 w-12 h-12 bg-gradient-to-br from-pink-400 to-red-500 rounded-lg shadow-lg"></div>
          <div className="floating-element absolute -bottom-6 -left-12 w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl shadow-lg"></div>
          <div className="floating-element absolute -bottom-8 -right-8 w-14 h-14 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full shadow-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default HeroIllustration;