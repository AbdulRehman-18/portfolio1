'use client';

import { useEffect, useState } from 'react';

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    const onMouseMove = (e: MouseEvent) => {
      requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY });
      });
    };

    const onMouseEnter = () => {
      setVisible(true);
      document.body.classList.add('cursor-none');
    };

    const onMouseLeave = () => {
      setVisible(false);
      document.body.classList.remove('cursor-none');
    };

    const onMouseDown = () => setClicked(true);
    const onMouseUp = () => setClicked(false);

    const handleElementHover = () => setHovered(true);
    const handleElementLeave = () => setHovered(false);

    const interactiveElements = document.querySelectorAll('a, button, [role="button"]');
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', handleElementHover);
      element.addEventListener('mouseleave', handleElementLeave);
    });

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mouseenter', onMouseEnter);
    window.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mouseenter', onMouseEnter);
      window.removeEventListener('mouseleave', onMouseLeave);
      
      interactiveElements.forEach(element => {
        element.removeEventListener('mouseenter', handleElementHover);
        element.removeEventListener('mouseleave', handleElementLeave);
      });

      document.body.classList.remove('cursor-none');
    };
  }, []);

  if (!mounted || isMobile) return null;

  return (
    <div
      className={`pointer-events-none fixed z-[100] flex items-center justify-center transition-opacity duration-300 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        left: position.x,
        top: position.y,
        transform: 'translate(-50%, -50%)',
        width: clicked ? '24px' : hovered ? '40px' : '32px',
        height: clicked ? '24px' : hovered ? '40px' : '32px',
        transition: 'width 0.2s, height 0.2s',
      }}
    >
      <div className="relative h-full w-full">
        <div className="absolute inset-0 rounded-full bg-primary/20 blur-[2px]" />
        <div className="absolute inset-0 rounded-full bg-primary/40" 
             style={{
               transform: `scale(${clicked ? 0.8 : hovered ? 1.2 : 1})`,
               transition: 'transform 0.2s',
             }}
        />
      </div>
    </div>
  );
}