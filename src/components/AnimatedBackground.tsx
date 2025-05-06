
import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  z: number;
  size: number;
  color: string;
  speed: number;
  opacity: number;
  twinkleSpeed: number;
}

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const shootingStarTimerRef = useRef<number | null>(null);
  const requestAnimationRef = useRef<number | null>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas to full screen with proper pixel ratio
    const resizeCanvas = () => {
      const pixelRatio = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * pixelRatio;
      canvas.height = window.innerHeight * pixelRatio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(pixelRatio, pixelRatio);
    };
    
    // Initialize particles with enhanced visual properties
    const initParticles = () => {
      particlesRef.current = [];
      // Increased count for better starfield density
      const particleCount = 350; 
      
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          z: Math.random() * 3 + 0.1, // depth (0.1 to 3.1)
          size: Math.random() * 3 + 0.5, // Larger size range
          color: `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.5})`, // More varied opacity
          speed: Math.random() * 0.15 + 0.05, // Speed variation
          opacity: Math.random() * 0.7 + 0.3, // Base opacity for twinkling
          twinkleSpeed: Math.random() * 0.02 + 0.005 // How fast it twinkles
        });
      }
    };
    
    // Handle mouse movement for enhanced parallax
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };
    
    // Create a dynamic shooting star
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
        gradient.addColorStop(0.4, `rgba(200, 180, 255, ${0.8 - progress * 0.6})`);
        gradient.addColorStop(1, 'rgba(150, 130, 255, 0)');
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 3; // Thicker line for visibility
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(
          x - Math.cos(angle) * 60 * (1 - progress),
          y - Math.sin(angle) * 60 * (1 - progress)
        );
        ctx.stroke();
        
        // Add a glow effect to the shooting star
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fill();
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
    
    // Animation loop with enhanced parallax and twinkling
    const animate = () => {
      if (!canvas || !ctx) return;
      
      // Create enhanced parallax effect based on mouse position
      const mouseX = mouseRef.current.x || canvas.width / 2;
      const mouseY = mouseRef.current.y || canvas.height / 2;
      
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      const offsetX = (mouseX - centerX) * 0.01; // Enhanced parallax
      const offsetY = (mouseY - centerY) * 0.01;
      
      // Clear canvas with improved gradient background
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      const gradient = ctx.createLinearGradient(0, 0, 0, window.innerHeight);
      gradient.addColorStop(0, 'rgba(10, 10, 25, 1)');
      gradient.addColorStop(1, 'rgba(8, 8, 20, 1)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
      
      // Update and draw particles with enhanced twinkling
      particlesRef.current.forEach((particle) => {
        // Move particles based on z-depth (improved parallax)
        const parallaxX = offsetX * (4 - particle.z);
        const parallaxY = offsetY * (4 - particle.z);
        
        particle.y += particle.speed / particle.z; // Speed relative to depth
        
        // Update opacity for twinkling effect
        particle.opacity += Math.sin(Date.now() * particle.twinkleSpeed) * 0.05;
        const currentOpacity = Math.max(0.1, Math.min(1, particle.opacity));
        
        // Wrap around edges
        if (particle.y > window.innerHeight) {
          particle.y = 0;
          particle.x = Math.random() * window.innerWidth;
        }
        
        // Size based on z-depth
        const size = particle.size / particle.z;
        
        // Draw particle with glow effect
        ctx.beginPath();
        
        // Main star
        ctx.arc(
          particle.x + parallaxX, 
          particle.y + parallaxY, 
          size, 
          0, 
          Math.PI * 2
        );
        
        // Use opacity for twinkling
        const color = particle.color.replace(')', `, ${currentOpacity})`);
        ctx.fillStyle = color;
        ctx.fill();
        
        // Add glow for larger stars
        if (size > 1) {
          ctx.save();
          ctx.globalCompositeOperation = 'lighter';
          ctx.shadowBlur = size * 3;
          ctx.shadowColor = 'rgba(255, 255, 255, 0.5)';
          
          // Inner glow
          ctx.beginPath();
          ctx.arc(
            particle.x + parallaxX, 
            particle.y + parallaxY, 
            size * 1.2, 
            0, 
            Math.PI * 2
          );
          ctx.fillStyle = color.replace(')', ', 0.4)');
          ctx.fill();
          
          // Outer faint glow
          ctx.beginPath();
          ctx.arc(
            particle.x + parallaxX, 
            particle.y + parallaxY, 
            size * 2.5, 
            0, 
            Math.PI * 2
          );
          ctx.fillStyle = color.replace(')', ', 0.1)');
          ctx.fill();
          ctx.restore();
        }
      });
      
      requestAnimationRef.current = requestAnimationFrame(animate);
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
      
      if (requestAnimationRef.current) {
        cancelAnimationFrame(requestAnimationRef.current);
      }
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 -z-10 bg-space" 
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default AnimatedBackground;
