
import { useEffect, useRef } from 'react';

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Array<{
    x: number;
    y: number;
    size: number;
    depth: number;
    opacity: number;
    twinkleSpeed: number;
    twinklePhase: number;
    speed: number;
  }>>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const shootingStarTimerRef = useRef<number | null>(null);
  const requestAnimationFrameIdRef = useRef<number | null>(null);
  const lastShootingStarTimeRef = useRef<number>(0);
  
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
      
      // Regenerate stars when resizing
      createStars();
    };
    
    // Create stars with varying properties
    const createStars = () => {
      starsRef.current = [];
      const density = Math.max(200, Math.min(300, (canvas.width * canvas.height) / 10000));
      
      for (let i = 0; i < density; i++) {
        starsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 1, // 1-3px stars
          depth: Math.random() * 3 + 1, // Depth for parallax
          opacity: Math.random() * 0.3 + 0.6, // 0.6-0.9 opacity for better visibility
          twinkleSpeed: Math.random() * 0.01 + 0.005, // How fast it twinkles
          twinklePhase: Math.random() * Math.PI * 2, // Starting phase
          speed: 0.1 / (Math.random() * 3 + 1) // Speed based on depth
        });
      }
      
      console.log("Created", starsRef.current.length, "stars");
    };
    
    // Handle mouse movement for parallax effect
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX - (window.innerWidth / 2),
        y: e.clientY - (window.innerHeight / 2)
      };
    };
    
    // Create a shooting star
    const createShootingStar = () => {
      const now = Date.now();
      if (now - lastShootingStarTimeRef.current < 3000) return; // Minimum 3 seconds
      
      const shouldCreate = Math.random() < 0.2; // Probability check
      if (!shouldCreate) return;
      
      lastShootingStarTimeRef.current = now;
      console.log("Shooting star created");
      
      const startX = Math.random() * canvas.width;
      const startY = Math.random() * (canvas.height / 3);
      const length = 100 + Math.random() * 150;
      const angle = Math.PI / 4 + (Math.random() * Math.PI / 4);
      const duration = 1500; // 1.5 seconds
      const startTime = now;
      
      const animateShootingStar = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        ctx.save();
        ctx.beginPath();
        
        // Create a gradient for the shooting star trail
        const tailX = startX + Math.cos(angle) * length * progress;
        const tailY = startY + Math.sin(angle) * length * progress;
        
        const gradient = ctx.createLinearGradient(
          tailX, tailY,
          tailX - Math.cos(angle) * length * 0.3,
          tailY - Math.sin(angle) * length * 0.3
        );
        
        gradient.addColorStop(0, `rgba(255, 255, 255, ${1 - progress})`);
        gradient.addColorStop(0.4, `rgba(200, 180, 255, ${(1 - progress) * 0.6})`);
        gradient.addColorStop(1, 'rgba(150, 130, 255, 0)');
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(
          tailX - Math.cos(angle) * length * 0.3 * (1 - progress * 0.5),
          tailY - Math.sin(angle) * length * 0.3 * (1 - progress * 0.5)
        );
        ctx.stroke();
        
        // Add a glow effect to the shooting star
        ctx.shadowBlur = 10;
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
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create dark blue gradient for background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, 'rgba(10, 10, 25, 0.1)'); // More transparent to show underlying background
      gradient.addColorStop(1, 'rgba(8, 8, 20, 0.1)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Calculate parallax offset based on mouse position
      const parallaxStrength = 0.01;
      const mouseX = mouseRef.current.x * parallaxStrength;
      const mouseY = mouseRef.current.y * parallaxStrength;
      
      // Update and draw stars
      starsRef.current.forEach(star => {
        // Update position based on speed
        star.x += star.speed;
        if (star.x > canvas.width) {
          star.x = 0;
        }
        
        // Calculate twinkling effect
        const time = Date.now() * 0.001;
        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinklePhase) * 0.2 + 0.8;
        const opacity = star.opacity * twinkle;
        
        // Calculate position with parallax effect
        const parallaxX = mouseX * (4 - star.depth);
        const parallaxY = mouseY * (4 - star.depth);
        const displayX = star.x + parallaxX;
        const displayY = star.y + parallaxY;
        
        // Draw main star with glow effect
        ctx.beginPath();
        ctx.arc(displayX, displayY, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fill();
        
        // Add glow effect for larger stars
        if (star.size > 1.5) {
          ctx.save();
          ctx.globalCompositeOperation = 'lighter';
          
          // Inner glow
          ctx.beginPath();
          ctx.arc(displayX, displayY, star.size * 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.3})`;
          ctx.fill();
          
          // Outer glow
          ctx.beginPath();
          ctx.arc(displayX, displayY, star.size * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.1})`;
          ctx.fill();
          
          ctx.restore();
        }
      });
      
      requestAnimationFrameIdRef.current = requestAnimationFrame(animate);
    };
    
    // Initialize everything
    resizeCanvas();
    createStars();
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    animate();
    scheduleShootingStar();
    console.log("Starfield background initialized");
    
    // Cleanup
    return () => {
      if (requestAnimationFrameIdRef.current) {
        cancelAnimationFrame(requestAnimationFrameIdRef.current);
      }
      
      if (shootingStarTimerRef.current) {
        clearTimeout(shootingStarTimerRef.current);
      }
      
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 -z-10" 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -10,
        background: 'transparent',
        pointerEvents: 'none'
      }} 
      data-testid="starfield-canvas"
    />
  );
};

export default AnimatedBackground;
