
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
    
    // Initialize particles
    const initParticles = () => {
      particlesRef.current = [];
      const particleCount = 150;
      
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          z: Math.random() * 3 + 0.1, // depth (0.1 to 3)
          size: Math.random() * 2 + 1,
          color: `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.3})`,
          speed: Math.random() * 0.2 + 0.1
        });
      }
    };
    
    // Handle mouse movement for subtle parallax
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };
    
    // Create a shooting star
    const createShootingStar = () => {
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      const startX = Math.random() * canvas.width;
      const startY = Math.random() * (canvas.height / 3);
      const length = Math.random() * 100 + 100;
      const angle = Math.PI / 4 + (Math.random() * Math.PI / 4);
      
      let progress = 0;
      const speed = 0.01;
      
      const drawStar = () => {
        ctx.save();
        ctx.globalCompositeOperation = 'lighter';
        
        const x = startX + Math.cos(angle) * length * progress;
        const y = startY + Math.sin(angle) * length * progress;
        
        const gradient = ctx.createLinearGradient(
          x, y,
          x - Math.cos(angle) * 30, y - Math.sin(angle) * 30
        );
        
        gradient.addColorStop(0, `rgba(255, 255, 255, ${1 - progress})`);
        gradient.addColorStop(1, 'rgba(120, 120, 255, 0)');
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(
          x - Math.cos(angle) * 30 * (1 - progress),
          y - Math.sin(angle) * 30 * (1 - progress)
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
    
    // Schedule shooting stars
    const scheduleShootingStar = () => {
      const timeout = Math.random() * 5000 + 5000;
      shootingStarTimerRef.current = window.setTimeout(() => {
        createShootingStar();
        scheduleShootingStar();
      }, timeout);
    };
    
    // Animation loop
    const animate = () => {
      if (!canvas || !ctx) return;
      
      // Create subtle parallax effect based on mouse position
      const mouseX = mouseRef.current.x || canvas.width / 2;
      const mouseY = mouseRef.current.y || canvas.height / 2;
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      const offsetX = (mouseX - centerX) * 0.005;
      const offsetY = (mouseY - centerY) * 0.005;
      
      // Clear canvas with gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, 'rgba(10, 10, 22, 1)');
      gradient.addColorStop(1, 'rgba(8, 8, 18, 1)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particlesRef.current.forEach(particle => {
        // Move particles based on z-depth (parallax)
        const parallaxX = offsetX * (4 - particle.z);
        const parallaxY = offsetY * (4 - particle.z);
        
        particle.y += particle.speed;
        
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
        
        // Add subtle glow for larger particles
        if (size > 1.5) {
          ctx.beginPath();
          ctx.arc(
            particle.x + parallaxX, 
            particle.y + parallaxY, 
            size * 2, 
            0, 
            Math.PI * 2
          );
          ctx.fillStyle = particle.color.replace(')', ', 0.15)');
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
