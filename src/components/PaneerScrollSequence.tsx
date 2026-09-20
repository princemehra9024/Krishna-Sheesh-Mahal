import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 150;

export default function PaneerScrollSequence() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track images
  const imagesRef = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    // Preload images
    const currentFrame = (index: number) => 
      `/images/paneer-animation/ezgif-frame-${(index + 1).toString().padStart(3, '0')}.jpg`;

    // Only load if not already loaded to prevent duplicate loading on React strict mode
    if (imagesRef.current.length === 0) {
      for (let i = 0; i < FRAME_COUNT; i++) {
        const img = new Image();
        img.src = currentFrame(i);
        imagesRef.current.push(img);
      }
    }
    
    // Draw first frame once loaded
    imagesRef.current[0].onload = () => {
      render(0);
    };

    function render(index: number) {
      if (!canvasRef.current || !imagesRef.current[index]) return;
      const ctx = canvasRef.current.getContext('2d');
      if (!ctx) return;
      
      let img = imagesRef.current[index];
      
      // If the image hasn't finished loading, find the closest previous loaded frame
      if (!img.complete || img.naturalWidth === 0) {
        let fallbackFound = false;
        for (let i = index - 1; i >= 0; i--) {
          const prevImg = imagesRef.current[i];
          if (prevImg && prevImg.complete && prevImg.naturalWidth > 0) {
            img = prevImg;
            fallbackFound = true;
            break;
          }
        }
        if (!fallbackFound) return; // No frames loaded yet to show
      }
      
      // Calculate aspect ratio covering
      const canvas = canvasRef.current;
      const canvasAspect = canvas.width / canvas.height;
      const imgAspect = img.naturalWidth / img.naturalHeight;
      
      let drawWidth = canvas.width;
      let drawHeight = canvas.height;
      let offsetX = 0;
      let offsetY = 0;

      if (canvasAspect > imgAspect) {
        // Canvas is wider than image
        drawHeight = canvas.width / imgAspect;
        offsetY = (canvas.height - drawHeight) / 2;
      } else {
        // Canvas is taller than image
        drawWidth = canvas.height * imgAspect;
        offsetX = (canvas.width - drawWidth) / 2;
      }
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    }

    // Resize canvas correctly
    let playhead = { frame: 0 };
    
    const handleResize = () => {
      if (!canvasRef.current) return;
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
      render(playhead.frame);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    // GSAP ScrollTrigger
    const tl = gsap.to(playhead, {
      frame: FRAME_COUNT - 1,
      snap: "frame",
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=3000",
        scrub: 1, // 1 second smoothing
        pin: true,
      },
      onUpdate: () => render(playhead.frame)
    });
    
    // Fade out text overlay during scroll
    gsap.to('.paneer-text-overlay', {
      opacity: 0,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=500",
        scrub: true,
      }
    });

    return () => {
      window.removeEventListener('resize', handleResize);
      tl.scrollTrigger?.kill();
    };
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-screen overflow-hidden"
      style={{ backgroundColor: '#251C19' }}
    >
      <canvas 
        ref={canvasRef} 
        className="block w-full h-full"
      />
      {/* Title overlay that fades out as you scroll */}
      <div className="paneer-text-overlay absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 p-8 text-center text-[#F3EDE4]">
          <h2 className="text-4xl md:text-6xl font-serif opacity-90 drop-shadow-lg max-w-4xl mx-auto tracking-wide leading-tight" style={{ color: '#F3EDE4' }}>
             Experience The <span style={{ color: '#F3EDE4', opacity: 0.8}}>Perfect Crisp</span>
          </h2>
      </div>
    </section>
  );
}
