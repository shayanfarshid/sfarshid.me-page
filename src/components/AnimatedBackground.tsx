import { useEffect, useRef } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isMobile = useIsMobile();
  
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
    
    // Stars array with additional properties for twinkling and fading
    const stars: Array<{
      x: number;
      y: number;
      size: number;
      opacity: number;
      maxOpacity: number;
      twinkleSpeed: number;
      twinklePhase: number;
      speedX: number;
      speedY: number;
      fadeState: 'in' | 'out' | 'stable';
      fadeSpeed: number;
    }> = [];
    
    // Create stars with proper properties
    const createStars = () => {
      stars.length = 0; // Clear existing stars
      
      // Slightly increased density for more stars
      const density = Math.max(250, Math.min(350, (window.innerWidth * window.innerHeight) / 9000));
      
      for (let i = 0; i < density; i++) {
        const maxOpacity = Math.random() * 0.4 + 0.3; // 0.3-0.7 max opacity
        // Faster fade speed for more frequent appearing/disappearing
        const fadeSpeed = Math.random() * 0.003 + 0.002; // Increased for more frequent fading
        
        // Very subtle random movement speed - significantly reduced for mobile
        const baseSpeed = isMobile ? 0.003 : 0.008; // Much lower speed for mobile
        const speedMultiplier = isMobile ? 0.3 : 1.0; // Further reduction for mobile
        
        stars.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 0.9 + 0.3, // Smaller stars: 0.3-1.2px
          opacity: Math.random() * maxOpacity, // Start with random opacity
          maxOpacity: maxOpacity,
          twinkleSpeed: Math.random() * 0.012 + 0.005, // Slightly faster twinkling
          twinklePhase: Math.random() * Math.PI * 2,
          speedX: (Math.random() * 2 - 1) * baseSpeed * speedMultiplier, // Random direction, very slow
          speedY: (Math.random() * 2 - 1) * baseSpeed * speedMultiplier, // Random direction, very slow
          fadeState: Math.random() > 0.4 ? 'in' : 'out', // More likely to start fading in
          fadeSpeed: fadeSpeed // Slightly faster fade speed
        });
      }
      
      console.log("AnimatedBackground: Created", stars.length, "stars");
    };
    
    // Last shooting star time
    let lastShootingStarTime = 0;
    
    // Create a shooting star
    const createShootingStar = () => {
      const now = Date.now();
      if (now - lastShootingStarTime < 2000) return; // Reduced for more frequent shooting stars
      
      const shouldCreate = Math.random() < 0.4; // Increased to 40% probability
      if (!shouldCreate) return;
      
      lastShootingStarTime = now;
      console.log("AnimatedBackground: Creating shooting star");
      
      const startX = Math.random() * window.innerWidth;
      const startY = Math.random() * (window.innerHeight / 3);
      const length = 100 + Math.random() * 150;
      
      // Angle shooting star more toward bottom-right (approximately π/3 or 60 degrees)
      const angle = Math.PI / 3 + (Math.random() * 0.2 - 0.1); // Small variation around 60 degrees
      
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
        ctx.lineWidth = 1.5; // Thinner line for better visuals
        ctx.lineCap = 'round';
        
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(
          tailX - Math.cos(angle) * length * 0.3,
          tailY - Math.sin(angle) * length * 0.3
        );
        ctx.stroke();
        
        // Add small glow effect
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'rgba(255, 255, 255, 0.6)';
        ctx.beginPath();
        ctx.arc(tailX, tailY, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
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
      const timeout = Math.random() * 3000 + 2000; // 2-5 seconds (reduced from before)
      setTimeout(() => {
        createShootingStar();
        scheduleShootingStar();
      }, timeout);
    };
    
    // Animation frame ID for cleanup
    let animationFrameId: number;
    
    // Fix for mobile scrolling - position canvas as fixed
    const handleScroll = () => {
      // Always keep it fixed regardless of device
      canvas.style.position = 'fixed';
      canvas.style.top = '0';
      canvas.style.left = '0';
    };
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw stars with twinkling and fading effect
      stars.forEach(star => {
        // Very subtle movement
        star.x += star.speedX;
        star.y += star.speedY;
        
        // Wrap around edges
        if (star.x < 0) star.x = window.innerWidth;
        if (star.x > window.innerWidth) star.x = 0;
        if (star.y < 0) star.y = window.innerHeight;
        if (star.y > window.innerHeight) star.y = 0;
        
        // Handle fade in/out state
        if (star.fadeState === 'in') {
          star.opacity += star.fadeSpeed;
          if (star.opacity >= star.maxOpacity) {
            star.opacity = star.maxOpacity;
            star.fadeState = 'stable';
            // After stable for a while, start fading out
            setTimeout(() => {
              star.fadeState = 'out';
            }, Math.random() * 6000 + 3000); // Stable for 3-9 seconds (reduced from before)
          }
        } else if (star.fadeState === 'out') {
          star.opacity -= star.fadeSpeed;
          if (star.opacity <= 0.05) { // Don't go fully invisible
            star.opacity = 0.05;
            star.fadeState = 'in'; // Start fading in again
          }
        }
        
        // Twinkling effect on top of fade
        const time = Date.now() * 0.001;
        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinklePhase) * 0.2 + 0.8;
        const finalOpacity = star.opacity * twinkle;
        
        // Draw star
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${finalOpacity})`;
        ctx.fill();
        
        // Add subtle glow to larger stars
        if (star.size > 0.8) {
          ctx.save();
          ctx.globalCompositeOperation = 'lighter';
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 1.8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${finalOpacity * 0.2})`;
          ctx.fill();
          ctx.restore();
        }
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    // Initialize
    setCanvasSize();
    createStars();
    handleScroll(); // Set initial position
    
    window.addEventListener('resize', () => {
      setCanvasSize();
      createStars();
      handleScroll();
    });
    
    window.addEventListener('scroll', handleScroll);
    
    animate();
    scheduleShootingStar();
    
    console.log("AnimatedBackground: Initialization complete");
    
    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', setCanvasSize);
      window.removeEventListener('scroll', handleScroll);
      console.log("AnimatedBackground: Cleanup complete");
    };
  }, [isMobile]);

  return (
    <canvas 
      ref={canvasRef} 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -5,
        pointerEvents: 'none',
        backgroundColor: 'transparent'
      }} 
      data-testid="starfield-canvas"
      aria-hidden="true"
    />
  );
};

export default AnimatedBackground;
