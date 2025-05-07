
import { useEffect, useRef } from 'react';

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.error("Canvas element not found");
      return;
    }
    
    console.log("AnimatedBackground: Canvas element found");
    
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error("Canvas context not available");
      return;
    }
    
    console.log("AnimatedBackground: Canvas context obtained");
    
    // Set canvas dimensions with pixel ratio consideration
    const setCanvasSize = () => {
      const pixelRatio = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * pixelRatio;
      canvas.height = window.innerHeight * pixelRatio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(pixelRatio, pixelRatio);
      console.log("AnimatedBackground: Canvas sized to", canvas.width, "x", canvas.height);
    };
    
    // Stars array
    const stars: Array<{
      x: number;
      y: number;
      size: number;
      opacity: number;
      twinkleSpeed: number;
      twinklePhase: number;
      speed: number;
    }> = [];
    
    // Create stars with HIGHER OPACITY for visibility
    const createStars = () => {
      stars.length = 0; // Clear existing stars
      const density = Math.max(200, Math.min(300, (window.innerWidth * window.innerHeight) / 10000));
      
      for (let i = 0; i < density; i++) {
        stars.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 2 + 1, // 1-3px stars
          opacity: Math.random() * 0.3 + 0.6, // HIGHER BASE OPACITY (0.6-0.9)
          twinkleSpeed: Math.random() * 0.01 + 0.005,
          twinklePhase: Math.random() * Math.PI * 2,
          speed: 0.05 / (Math.random() * 3 + 1) // Very slight movement
        });
      }
      
      console.log("AnimatedBackground: Created", stars.length, "stars");
    };
    
    // Last shooting star time
    let lastShootingStarTime = 0;
    
    // Create a shooting star
    const createShootingStar = () => {
      const now = Date.now();
      if (now - lastShootingStarTime < 3000) return; // Minimum 3 seconds
      
      const shouldCreate = Math.random() < 0.3; // INCREASED probability (30%)
      if (!shouldCreate) return;
      
      lastShootingStarTime = now;
      console.log("AnimatedBackground: Creating shooting star");
      
      const startX = Math.random() * window.innerWidth;
      const startY = Math.random() * (window.innerHeight / 3);
      const length = 100 + Math.random() * 150;
      
      // Angle shooting star toward bottom-right (approximately π/4 or 45 degrees)
      const angle = Math.PI / 4 + (Math.random() * 0.2 - 0.1); // Small variation around 45 degrees
      
      const duration = 1000; // 1 second
      const startTime = now;
      
      const animateShootingStar = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        ctx.save();
        ctx.beginPath();
        
        // Create a gradient for the trail
        const tailX = startX + Math.cos(angle) * length * progress;
        const tailY = startY + Math.sin(angle) * length * progress;
        
        const gradient = ctx.createLinearGradient(
          tailX, tailY,
          tailX - Math.cos(angle) * length * 0.3,
          tailY - Math.sin(angle) * length * 0.3
        );
        
        gradient.addColorStop(0, `rgba(255, 255, 255, ${1 - progress})`);
        gradient.addColorStop(0.4, `rgba(255, 255, 255, ${(1 - progress) * 0.6})`);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2.5; // THICKER line for visibility
        ctx.lineCap = 'round';
        
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(
          tailX - Math.cos(angle) * length * 0.3,
          tailY - Math.sin(angle) * length * 0.3
        );
        ctx.stroke();
        
        // Add glow effect
        ctx.shadowBlur = 15;
        ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
        ctx.beginPath();
        ctx.arc(tailX, tailY, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fill();
        ctx.restore();
        
        if (progress < 1) {
          requestAnimationFrame(animateShootingStar);
        }
      };
      
      animateShootingStar();
    };
    
    // Schedule shooting stars
    const scheduleShootingStar = () => {
      const timeout = Math.random() * 4000 + 3000; // 3-7 seconds
      setTimeout(() => {
        createShootingStar();
        scheduleShootingStar();
      }, timeout);
    };
    
    // Animation frame ID for cleanup
    let animationFrameId: number;
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw stars with twinkling effect
      stars.forEach(star => {
        // Very slight movement
        star.x += star.speed;
        if (star.x > window.innerWidth) {
          star.x = 0;
        }
        
        // Twinkling effect
        const time = Date.now() * 0.001;
        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinklePhase) * 0.2 + 0.8;
        const opacity = star.opacity * twinkle;
        
        // Draw star with glow
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fill();
        
        // Add glow to larger stars
        if (star.size > 1.5) {
          ctx.save();
          ctx.globalCompositeOperation = 'lighter';
          
          // Inner glow
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.3})`;
          ctx.fill();
          
          // Outer glow
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.1})`;
          ctx.fill();
          
          ctx.restore();
        }
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    // Initialize
    setCanvasSize();
    createStars();
    window.addEventListener('resize', () => {
      setCanvasSize();
      createStars();
    });
    animate();
    scheduleShootingStar();
    
    console.log("AnimatedBackground: Initialization complete");
    
    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', setCanvasSize);
      console.log("AnimatedBackground: Cleanup complete");
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -5, // Adjusted to be behind content but above background
        pointerEvents: 'none',
        backgroundColor: 'transparent'
      }} 
      data-testid="starfield-canvas"
    />
  );
};

export default AnimatedBackground;
