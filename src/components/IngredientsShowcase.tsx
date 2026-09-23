import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { DISHES } from '../data';

gsap.registerPlugin(ScrollTrigger);

const MENU_ITEMS = ['Fresh', 'Source', 'Goals', 'Trusted', 'Lifestyle', 'Ingredients', 'Our Family', 'Table'];

export default function IngredientsShowcase() {
  const container = useRef<HTMLDivElement>(null);
  const [currentDish, setCurrentDish] = useState(0);
  const dish = DISHES[currentDish];

  // GSAP Animations
  useGSAP(() => {
    // Basic setup
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: 'top 60%',
        once: true,
      }
    });

    // Intro Animation
    tl.from('.ishow-title-line', {
      y: '100%',
      opacity: 0,
      stagger: 0.08,
      duration: 0.9,
      ease: 'power3.out',
    })
    .from('.ishow-bowl-img', {
      y: 120,
      scale: 0.85,
      opacity: 0,
      duration: 1.1,
      ease: 'expo.out',
    }, '-=0.5')
    .from('.ishow-card', {
      scale: 0.6,
      opacity: 0,
      stagger: 0.08,
      duration: 1,
      ease: 'back.out(1.4)',
    }, '-=0.8')
    .fromTo('.ishow-arc-path', {
      strokeDasharray: 4000,
      strokeDashoffset: 4000,
    }, {
      strokeDashoffset: 0,
      duration: 1.5,
      ease: 'power2.inOut',
    }, '-=1')
    .fromTo('.ishow-guide-line', {
      strokeDasharray: 1000,
      strokeDashoffset: 1000,
    }, {
      strokeDashoffset: 0,
      duration: 1,
      ease: 'power2.out',
    }, '-=1.5');

    // Floating idle loop
    gsap.utils.toArray('.ishow-card').forEach((card: any, i) => {
      gsap.to(card, {
        y: i % 2 === 0 ? -12 : -8,
        duration: 4.5 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: Math.random() * 2,
      });
    });

    // ── AWARD WINNING INTERACTIVE PARALLAX ──
    const bowlXTo = gsap.quickTo('.ishow-bowl-img', 'x', { duration: 0.8, ease: 'power3' });
    const bowlYTo = gsap.quickTo('.ishow-bowl-img', 'y', { duration: 0.8, ease: 'power3' });
    
    const cardsLeftXTo = gsap.quickTo('.ishow-card:nth-child(-n+3)', 'x', { duration: 1.2, ease: 'power2.out' });
    const cardsLeftYTo = gsap.quickTo('.ishow-card:nth-child(-n+3)', 'y', { duration: 1.2, ease: 'power2.out' });
    
    const cardsRightXTo = gsap.quickTo('.ishow-card:nth-child(n+4)', 'x', { duration: 1.2, ease: 'power2.out' });
    const cardsRightYTo = gsap.quickTo('.ishow-card:nth-child(n+4)', 'y', { duration: 1.2, ease: 'power2.out' });

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5);
      const y = (e.clientY / innerHeight - 0.5);
      
      bowlXTo(x * -30);
      bowlYTo(y * -30);
      
      cardsLeftXTo(x * 25);
      cardsLeftYTo(y * 25);
      
      cardsRightXTo(x * 35);
      cardsRightYTo(y * 35);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);

  }, { scope: container });

  const touchStart = useRef(0);
  const isAnimating = useRef(false);

  const handleNext = () => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    gsap.to('.ishow-card', { scale: 0.8, opacity: 0, duration: 0.4, stagger: 0.04 });
    gsap.to('.ishow-arc-path, .ishow-guide-line', { opacity: 0, duration: 0.4 });
    gsap.to('.ishow-bowl-img', { rotation: 10, x: -50, y: 50, opacity: 0, duration: 0.6, ease: 'power2.in' });
    gsap.to('.ishow-title-line', { y: '-100%', opacity: 0, duration: 0.4, onComplete: () => {
      setCurrentDish((prev) => (prev + 1) % DISHES.length);
      gsap.fromTo('.ishow-title-line', { y: '100%', opacity: 0 }, { y: '0%', opacity: 1, stagger: 0.08, duration: 0.9, ease: 'power3.out' });
      gsap.fromTo('.ishow-bowl-img', { rotation: -10, x: 50, y: 50, scale: 0.85, opacity: 0 }, { rotation: 0, x: 0, y: 0, scale: 1, opacity: 1, duration: 1.1, ease: 'expo.out', delay: 0.1 });
      gsap.fromTo('.ishow-arc-path', { strokeDasharray: 4000, strokeDashoffset: 4000, opacity: 1 }, { strokeDashoffset: 0, duration: 1.5, ease: 'power2.inOut', delay: 0.2 });
      gsap.fromTo('.ishow-guide-line', { strokeDasharray: 1000, strokeDashoffset: 1000, opacity: 1 }, { strokeDashoffset: 0, duration: 1, ease: 'power2.out', delay: 0.2 });
      gsap.fromTo('.ishow-card', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, stagger: 0.08, duration: 1, ease: 'back.out(1.4)', delay: 0.3, onComplete: () => isAnimating.current = false });
    }});
  };

  const handlePrev = () => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    gsap.to('.ishow-card', { scale: 0.8, opacity: 0, duration: 0.4, stagger: 0.04 });
    gsap.to('.ishow-arc-path, .ishow-guide-line', { opacity: 0, duration: 0.4 });
    gsap.to('.ishow-bowl-img', { rotation: -10, x: 50, y: 50, opacity: 0, duration: 0.6, ease: 'power2.in' });
    gsap.to('.ishow-title-line', { y: '-100%', opacity: 0, duration: 0.4, onComplete: () => {
      setCurrentDish((prev) => (prev - 1 + DISHES.length) % DISHES.length);
      gsap.fromTo('.ishow-title-line', { y: '100%', opacity: 0 }, { y: '0%', opacity: 1, stagger: 0.08, duration: 0.9, ease: 'power3.out' });
      gsap.fromTo('.ishow-bowl-img', { rotation: 10, x: -50, y: 50, scale: 0.85, opacity: 0 }, { rotation: 0, x: 0, y: 0, scale: 1, opacity: 1, duration: 1.1, ease: 'expo.out', delay: 0.1 });
      gsap.fromTo('.ishow-arc-path', { strokeDasharray: 4000, strokeDashoffset: 4000, opacity: 1 }, { strokeDashoffset: 0, duration: 1.5, ease: 'power2.inOut', delay: 0.2 });
      gsap.fromTo('.ishow-guide-line', { strokeDasharray: 1000, strokeDashoffset: 1000, opacity: 1 }, { strokeDashoffset: 0, duration: 1, ease: 'power2.out', delay: 0.2 });
      gsap.fromTo('.ishow-card', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, stagger: 0.08, duration: 1, ease: 'back.out(1.4)', delay: 0.3, onComplete: () => isAnimating.current = false });
    }});
  };

  const handleTouchStart = (e: React.TouchEvent) => { touchStart.current = e.touches[0].clientX; };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = e.changedTouches[0].clientX - touchStart.current;
    if (Math.abs(diff) > 50) { diff < 0 ? handleNext() : handlePrev(); }
  };

  const getCardStyle = (index: number) => {
    const isLeft = index < 3;
    const xPositions = isLeft ? [354, 274, 194] : [1358, 1438, 1517];
    const yPositions = [320, 442, 564];
    
    return {
      left: `calc(50vw - 960px + ${xPositions[index % 3]}px)`,
      top: `${yPositions[index % 3]}px`
    };
  };

  return (
    <section ref={container} className="ishow-section" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      <style>{`
        .ishow-section { position: relative; width: 100%; height: 100vh; background: #1A1311; overflow: hidden; color: #F3EDE4; font-family: var(--font-1, sans-serif); }
        .ishow-bg { position: absolute; inset: 0; background-image: linear-gradient(rgba(243, 237, 228, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(243, 237, 228, 0.03) 1px, transparent 1px); background-size: 60px 60px; pointer-events: none; z-index: 0; }
        .ishow-bg::after { content: ''; position: absolute; bottom: -30%; left: 50%; transform: translateX(-50%); width: 100vw; height: 100vw; max-width: 1400px; max-height: 1400px; background: radial-gradient(circle, rgba(94, 32, 45, 0.4) 0%, rgba(200, 150, 100, 0.1) 40%, transparent 70%); border-radius: 50%; z-index: 1; filter: blur(80px); animation: pulseGlow 8s ease-in-out infinite alternate; }
        @keyframes pulseGlow { 0% { opacity: 0.6; transform: translateX(-50%) scale(0.9); } 100% { opacity: 1; transform: translateX(-50%) scale(1.1); } }
        
        .ishow-top { position: relative; z-index: 10; display: flex; flex-direction: column; align-items: center; padding-top: 8vh; text-align: center; }
        .ishow-pill { display: inline-block; padding: 10px 28px; background: rgba(30, 22, 20, 0.4); backdrop-filter: blur(10px); border: 1px solid rgba(243, 237, 228, 0.4); border-radius: 40px; font-size: 11px; text-transform: uppercase; letter-spacing: 0.3em; margin-bottom: 30px; color: #F3EDE4; font-weight: 700; box-shadow: 0 10px 30px rgba(0,0,0,0.5), inset 0 0 10px rgba(243, 237, 228, 0.1); position: relative; overflow: hidden; }
        .ishow-pill::before { content: ''; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: conic-gradient(transparent, rgba(255, 215, 140, 0.6), transparent 30%); animation: spin 4s linear infinite; }
        .ishow-pill::after { content: 'Ingredients That Matter'; position: absolute; inset: 1px; background: #1A1311; border-radius: 40px; display: flex; align-items: center; justify-content: center; }
        @keyframes spin { 100% { transform: rotate(1turn); } }
        
        .ishow-title { font-size: clamp(46px, 5vw, 76px); font-weight: 400; line-height: 1.05; max-width: 1100px; color: #FFF2DF !important; font-family: var(--font-2, serif) !important; letter-spacing: 0.02em; margin-bottom: 40px; text-shadow: 0 0 40px rgba(255, 215, 140, 0.6), 0 5px 15px rgba(0,0,0,0.8); }
        .ishow-title-mask { overflow: hidden; display: inline-block; vertical-align: top; }
        .ishow-title-line { display: inline-block; will-change: transform, opacity; padding-right: 12px; }
        .ishow-bowl-container { position: absolute; bottom: -15%; left: 50%; transform: translateX(-50%); width: 110vw; min-width: 1000px; max-width: 1600px; z-index: 5; display: flex; align-items: flex-end; justify-content: center; height: 85vh; animation: bowlBreathe 6s ease-in-out infinite alternate; }
        @keyframes bowlBreathe { 0% { transform: translateX(-50%) translateY(0) scale(1); } 100% { transform: translateX(-50%) translateY(-20px) scale(1.02); } }
        .ishow-bowl-img { width: 100%; max-height: 100%; object-fit: contain; display: block; transform-origin: center bottom; will-change: transform, opacity; filter: drop-shadow(0 40px 60px rgba(0,0,0,0.7)); }
        .ishow-gradient-fade { position: absolute; bottom: 0; left: 0; width: 100%; height: 25%; background: linear-gradient(to bottom, transparent, #1A1311 90%); z-index: 6; pointer-events: none; }

        .ishow-arcs { position: absolute; top: 0; left: 50%; transform: translateX(-50%); width: 1920px; height: 1080px; z-index: 2; pointer-events: none; }
        .ishow-arc-path { fill: none; stroke: rgba(255, 215, 140, 0.3); stroke-width: 2; stroke-dasharray: 10 20; animation: dashFlow 30s linear infinite; filter: drop-shadow(0 0 8px rgba(255, 215, 140, 0.5)); }
        .ishow-guide-line { stroke: rgba(255, 215, 140, 0.2); stroke-width: 1.5; stroke-dasharray: 4 10; animation: dashFlow 15s linear infinite reverse; filter: drop-shadow(0 0 5px rgba(255, 215, 140, 0.4)); }
        @keyframes dashFlow { 100% { stroke-dashoffset: 1000; } }
        
        .ishow-card-wrapper { position: absolute; left: 50%; top: 0; width: 1920px; height: 1080px; transform: translateX(-50%); z-index: 10; }
        .ishow-card { position: absolute; width: 180px; height: 50px; border-radius: 25px; background: rgba(30, 22, 20, 0.4); border: 1px solid rgba(255, 215, 140, 0.25); box-shadow: 0 10px 30px rgba(0,0,0,0.5), inset 0 0 20px rgba(255, 215, 140, 0.1); backdrop-filter: blur(25px); -webkit-backdrop-filter: blur(25px); display: flex; align-items: center; justify-content: center; padding: 0 20px; cursor: pointer; transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1); will-change: transform, opacity; }
        .ishow-card::after { content: ''; position: absolute; inset: -1px; border-radius: 25px; background: linear-gradient(135deg, rgba(255, 215, 140, 0.3) 0%, transparent 100%); z-index: -1; opacity: 0; transition: opacity 0.4s ease; }
        .ishow-card:hover::after { opacity: 1; }
        .ishow-card:hover { background: rgba(255, 215, 140, 0.1); border-color: rgba(255, 215, 140, 0.6); transform: translateY(-8px) scale(1.08) !important; box-shadow: 0 15px 40px rgba(94, 32, 45, 0.6), 0 0 35px rgba(255, 215, 140, 0.4); }
        .ishow-card-label { font-size: 16px; font-weight: 600; color: #FFF2DF; letter-spacing: 0.05em; font-family: var(--font-1, sans-serif); text-shadow: 0 2px 4px rgba(0,0,0,0.8); }
        
        .ishow-nav { position: absolute; bottom: 20%; width: 64px; height: 64px; border-radius: 50%; background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(243, 237, 228, 0.2); display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 20; color: #F3EDE4; transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1); backdrop-filter: blur(10px); }
        .ishow-nav:hover { background: #F3EDE4; color: #1A1311; transform: scale(1.1); box-shadow: 0 10px 25px rgba(243, 237, 228, 0.2); }
        .ishow-nav-prev { left: 8vw; }
        .ishow-nav-next { right: 8vw; }
        .ishow-menu { position: absolute; right: 40px; top: 50%; transform: translateY(-50%); display: flex; flex-direction: column; gap: 24px; z-index: 20; }
        .ishow-menu-item { display: flex; align-items: center; gap: 12px; justify-content: flex-end; cursor: pointer; color: rgba(243, 237, 228, 0.5); font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 600; transition: color 0.3s; }
        .ishow-menu-item.active { color: #F3EDE4; }
        .ishow-menu-line { width: 16px; height: 1px; background: currentColor; opacity: 0.4; transition: opacity 0.3s, width 0.3s; }
        .ishow-menu-item:hover { color: #F3EDE4; }
        .ishow-menu-item.active .ishow-menu-line { opacity: 1; width: 24px; }

        @media (max-width: 1024px) {
          .ishow-bowl-container { width: 70vw; }
          .ishow-card { transform: scale(0.85); }
        }
        @media (max-width: 768px) {
          .ishow-arcs, .ishow-menu, .ishow-card-wrapper { display: none; }
          .ishow-bowl-container { width: 100vw; min-width: unset; bottom: -5%; }
          .ishow-nav-prev { left: 20px; bottom: 20px; width: 60px; height: 60px; }
          .ishow-nav-next { right: 20px; bottom: 20px; width: 60px; height: 60px; }
          .ishow-cards-mobile { position: absolute; top: 250px; left: 0; width: 100%; display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; padding: 0 20px; z-index: 10; }
          .ishow-card-mobile { border-radius: 16px; background: rgba(243, 237, 228, 0.06); backdrop-filter: blur(8px); display: flex; align-items: center; padding: 6px 12px; }
          .ishow-card-label { font-size: 14px; }
        }
        @media (min-width: 769px) { .ishow-cards-mobile { display: none; } }
      `}</style>

      <div className="ishow-bg"></div>

      <div className="ishow-top">
        <div className="ishow-pill">Ingredients That Matter</div>
        <h2 className="ishow-title">
          {dish.title.split(' ').map((part, i) => (
             <React.Fragment key={i}>
               <span className="ishow-title-mask"><span className="ishow-title-line">{part}</span></span>
               {i < dish.title.split(' ').length - 1 && ' '}
             </React.Fragment>
          ))}
        </h2>
      </div>

      <svg className="ishow-arcs" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
        <circle className="ishow-arc-path" cx="960" cy="800" r="600" />
        <line className="ishow-guide-line" x1="732" y1="300" x2="960" y2="800" />
        <line className="ishow-guide-line" x1="577" y1="450" x2="960" y2="800" />
        <line className="ishow-guide-line" x1="498" y1="600" x2="960" y2="800" />
        <line className="ishow-guide-line" x1="1188" y1="300" x2="960" y2="800" />
        <line className="ishow-guide-line" x1="1343" y1="450" x2="960" y2="800" />
        <line className="ishow-guide-line" x1="1422" y1="600" x2="960" y2="800" />
      </svg>

      <div className="ishow-card-wrapper">
        {dish.cards.map((card, idx) => {
            const isLeft = idx < 3;
            // Coordinates perfectly mapped to circle (cx=960, cy=800, r=600)
            const xPositions = isLeft ? [524, 369, 290] : [1188, 1343, 1422];
            const yPositions = [267, 417, 567];
            const style = { left: `${xPositions[idx % 3]}px`, top: `${yPositions[idx % 3]}px` };
            
            return (
              <div className="ishow-card" key={idx} style={style}>
                <span className="ishow-card-label">{card.label}</span>
              </div>
            );
        })}
      </div>

      <div className="ishow-cards-mobile">
        {dish.cards.map((card, idx) => (
          <div className="ishow-card-mobile" key={idx}>
            <span className="ishow-card-label">{card.label}</span>
          </div>
        ))}
      </div>

      <div className="ishow-bowl-container">
        <img src={dish.bowlImage} alt={dish.title} className="ishow-bowl-img" />
        <div className="ishow-gradient-fade"></div>
      </div>

      <button className="ishow-nav ishow-nav-prev" onClick={handlePrev}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 18l-6-6 6-6"/></svg>
      </button>
      <button className="ishow-nav ishow-nav-next" onClick={handleNext}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 18l6-6-6-6"/></svg>
      </button>

      <div className="ishow-menu">
        {MENU_ITEMS.map((item) => (
          <div className={`ishow-menu-item ${item === 'Ingredients' ? 'active' : ''}`} key={item}>
            <span>{item}</span>
            <div className="ishow-menu-line"></div>
          </div>
        ))}
      </div>
    </section>
  );
}
