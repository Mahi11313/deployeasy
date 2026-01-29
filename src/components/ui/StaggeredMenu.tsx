import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface StaggeredMenuProps {
  className?: string;
}

const StaggeredMenu: React.FC<StaggeredMenuProps> = ({ className = '' }) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (menuRef.current) {
      const items = menuRef.current.querySelectorAll('.menu-item');
      
      gsap.fromTo(items, 
        { 
          opacity: 0, 
          y: 20 
        },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out"
        }
      );
    }
  }, []);

  return (
    <div ref={menuRef} className={`staggered-menu ${className}`}>
      <div className="menu-item p-4 bg-white rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold">Menu Item 1</h3>
        <p className="text-gray-600">Description for menu item 1</p>
      </div>
      <div className="menu-item p-4 bg-white rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold">Menu Item 2</h3>
        <p className="text-gray-600">Description for menu item 2</p>
      </div>
      <div className="menu-item p-4 bg-white rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold">Menu Item 3</h3>
        <p className="text-gray-600">Description for menu item 3</p>
      </div>
    </div>
  );
};

export default StaggeredMenu;