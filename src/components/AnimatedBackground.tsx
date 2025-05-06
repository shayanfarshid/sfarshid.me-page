
import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  z: number;
  size: number;
  color: string;
  speed: number;
}

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const shootingStarTimerRef = useRef<number | null>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas to full screen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    // Initialize particles with improved depth variation
    const initParticles = () => {
      particlesRef.current = [];
      const particleCount = 200; // Increased count for better starfield density
      
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          z: Math.random() * 3 + 0.1, // depth (0.1 to 3.1)
          size: Math.random() * 2.5 + 0.5, // Slightly larger size range
          color: `rgba(255, 255, 255, ${Math.random() * 0.6 + 0.4})`, // More varied opacity
          speed: Math.random() * 0.2 + 0.05 // Subtle speed variation
        });
      }
    };
    
    // Handle mouse movement for enhanced parallax
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };
    
    // Create a more dynamic shooting star
    const createShootingStar = () => {
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      const startX = Math.random() * canvas.width;
      const startY = Math.random() * (canvas.height / 3);
      const length = Math.random() * 150 + 100; // Longer trail
      const angle = Math.PI / 4 + (Math.random() * Math.PI / 4);
      
      let progress = 0;
      const speed = 0.008; // Slower for more visible effect
      
      const drawStar = () => {
        ctx.save();
        ctx.globalCompositeOperation = 'lighter';
        
        const x = startX + Math.cos(angle) * length * progress;
        const y = startY + Math.sin(angle) * length * progress;
        
        const gradient = ctx.createLinearGradient(
          x, y,
          x - Math.cos(angle) * 50, y - Math.sin(angle) * 50
        );
        
        gradient.addColorStop(0, `rgba(255, 255, 255, ${1 - progress})`);
        gradient.addColorStop(0.4, `rgba(180, 180, 255, ${0.6 - progress * 0.6})`);
        gradient.addColorStop(1, 'rgba(120, 120, 255, 0)');
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2.5; // Thicker line
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(
          x - Math.cos(angle) * 50 * (1 - progress),
          y - Math.sin(angle) * 50 * (1 - progress)
        );
        ctx.stroke();
        ctx.restore();
        
        progress += speed;
        if (progress < 1) {
          requestAnimationFrame(drawStar);
        }
      };
      
      drawStar();
    };
    
    // Schedule shooting stars at random intervals
    const scheduleShootingStar = () => {
      const timeout = Math.random() * 4000 + 3000; // 3-7 seconds
      shootingStarTimerRef.current = window.setTimeout(() => {
        createShootingStar();
        scheduleShootingStar();
      }, timeout);
    };
    
    // Animation loop with enhanced parallax
    const animate = () => {
      if (!canvas || !ctx) return;
      
      // Create enhanced parallax effect based on mouse position
      const mouseX = mouseRef.current.x || canvas.width / 2;
      const mouseY = mouseRef.current.y || canvas.height / 2;
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      const offsetX = (mouseX - centerX) * 0.01; // Enhanced parallax
      const offsetY = (mouseY - centerY) * 0.01;
      
      // Clear canvas with improved gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, 'rgba(10, 10, 25, 1)');
      gradient.addColorStop(1, 'rgba(8, 8, 20, 1)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles with enhanced parallax and depth
      particlesRef.current.forEach(particle => {
        // Move particles based on z-depth (improved parallax)
        const parallaxX = offsetX * (4 - particle.z);
        const parallaxY = offsetY * (4 - particle.z);
        
        particle.y += particle.speed / particle.z; // Speed relative to depth
        
        // Wrap around edges
        if (particle.y > canvas.height) {
          particle.y = 0;
          particle.x = Math.random() * canvas.width;
        }
        
        // Size based on z-depth
        const size = particle.size / particle.z;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(
          particle.x + parallaxX, 
          particle.y + parallaxY, 
          size, 
          0, 
          Math.PI * 2
        );
        ctx.fillStyle = particle.color;
        ctx.fill();
        
        // Add enhanced glow for larger particles
        if (size > 1.2) {
          ctx.beginPath();
          ctx.arc(
            particle.x + parallaxX, 
            particle.y + parallaxY, 
            size * 2.5, 
            0, 
            Math.PI * 2
          );
          ctx.fillStyle = particle.color.replace(')', ', 0.2)');
          ctx.fill();
        }
      });
      
      requestAnimationFrame(animate);
    };
    
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    
    resizeCanvas();
    initParticles();
    animate();
    scheduleShootingStar();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (shootingStarTimerRef.current) {
        clearTimeout(shootingStarTimerRef.current);
      }
    };
  }, []);
  
  return <canvas ref={canvasRef} className="fixed inset-0 -z-10 bg-space" />;
};

export default AnimatedBackground;
