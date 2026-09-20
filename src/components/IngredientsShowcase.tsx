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

  }, { scope: container });

  const handleNext = () => {
    gsap.to('.ishow-card', { scale: 0.8, opacity: 0, duration: 0.4, stagger: 0.04 });
    gsap.to('.ishow-bowl-img', { rotation: 10, y: 50, opacity: 0, duration: 0.6 });
    gsap.to('.ishow-title-line', { y: '-100%', opacity: 0, duration: 0.4, onComplete: () => {
      setCurrentDish((prev) => (prev + 1) % DISHES.length);
      gsap.fromTo('.ishow-title-line', { y: '100%', opacity: 0 }, { y: '0%', opacity: 1, stagger: 0.08, duration: 0.9, ease: 'power3.out' });
      gsap.fromTo('.ishow-bowl-img', { rotation: -10, y: 120, scale: 0.85, opacity: 0 }, { rotation: 0, y: 0, scale: 1, opacity: 1, duration: 1.1, ease: 'expo.out', delay: 0.2 });
      gsap.fromTo('.ishow-card', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, stagger: 0.08, duration: 1, ease: 'back.out(1.4)', delay: 0.4 });
    }});
  };

  const handlePrev = () => {
    gsap.to('.ishow-card', { scale: 0.8, opacity: 0, duration: 0.4, stagger: 0.04 });
    gsap.to('.ishow-bowl-img', { rotation: -10, y: 50, opacity: 0, duration: 0.6 });
    gsap.to('.ishow-title-line', { y: '-100%', opacity: 0, duration: 0.4, onComplete: () => {
      setCurrentDish((prev) => (prev - 1 + DISHES.length) % DISHES.length);
      gsap.fromTo('.ishow-title-line', { y: '100%', opacity: 0 }, { y: '0%', opacity: 1, stagger: 0.08, duration: 0.9, ease: 'power3.out' });
      gsap.fromTo('.ishow-bowl-img', { rotation: 10, y: 120, scale: 0.85, opacity: 0 }, { rotation: 0, y: 0, scale: 1, opacity: 1, duration: 1.1, ease: 'expo.out', delay: 0.2 });
      gsap.fromTo('.ishow-card', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, stagger: 0.08, duration: 1, ease: 'back.out(1.4)', delay: 0.4 });
    }});
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
    <section ref={container} className="ishow-section">
      <style>{`
        .ishow-section { position: relative; width: 100%; height: 100vh; background-color: #251C19; overflow: hidden; color: #F3EDE4; font-family: 'Inter', system-ui, sans-serif; }
        .ishow-bg { position: absolute; inset: 0; background-image: linear-gradient(rgba(243, 237, 228, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(243, 237, 228, 0.04) 1px, transparent 1px); background-size: 40px 40px; pointer-events: none; }
        .ishow-bg::after { content: ''; position: absolute; inset: 0; background-image: radial-gradient(circle at center, rgba(243, 237, 228, 0.2) 1px, transparent 1px); background-size: 160px 160px; background-position: -20px -20px; }
        .ishow-top { position: relative; z-index: 10; display: flex; flex-direction: column; align-items: center; padding-top: 40px; text-align: center; }
        .ishow-pill { display: inline-block; padding: 8px 24px; background: #F3EDE4; border: 1px solid rgba(243, 237, 228, 0.2); border-radius: 40px; font-size: 13px; text-transform: capitalize; letter-spacing: 0.05em; margin-bottom: 24px; color: #251C19; }
        .ishow-title { font-size: clamp(36px, 3vw, 48px); font-weight: 500; line-height: 1.15; max-width: 700px; color: #F3EDE4 !important; font-family: 'Inter', system-ui, sans-serif !important; letter-spacing: -0.01em; }
        .ishow-title-mask { overflow: hidden; display: inline-block; vertical-align: top; }
        .ishow-title-line { display: inline-block; will-change: transform, opacity; padding-right: 8px; }
        .ishow-bowl-container { position: absolute; bottom: -5%; left: 50%; transform: translateX(-50%); width: 70vw; min-width: 700px; max-width: 1200px; z-index: 5; display: flex; align-items: flex-end; justify-content: center; height: 70vh; }
        .ishow-bowl-img { width: 100%; max-height: 100%; object-fit: contain; display: block; transform-origin: center bottom; will-change: transform, opacity; }
        .ishow-gradient-fade { position: absolute; bottom: 0; left: 0; width: 100%; height: 40%; background: linear-gradient(to bottom, transparent, #251C19 80%); z-index: 6; pointer-events: none; }
        .ishow-arcs { position: absolute; top: 0; left: 50%; transform: translateX(-50%); width: 1920px; height: 1080px; z-index: 2; pointer-events: none; }
        .ishow-arc-path { fill: none; stroke: rgba(243, 237, 228, 0.08); stroke-width: 1.5; }
        .ishow-guide-line { stroke: rgba(243, 237, 228, 0.05); stroke-width: 1; }
        
        .ishow-card-wrapper {
            position: absolute;
            left: 50%;
            top: 0;
            width: 1920px;
            height: 1080px;
            transform: translateX(-50%);
            z-index: 10;
        }

        .ishow-card { position: absolute; width: 208px; height: 66px; border-radius: 12px; background: rgba(37, 28, 25, 0.85); border: 1px solid rgba(243, 237, 228, 0.1); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); display: flex; align-items: center; padding: 8px 12px; gap: 12px; cursor: pointer; transition: background 0.3s, transform 0.3s, border-color 0.3s; will-change: transform, opacity; }
        .ishow-card:hover { background: rgba(243, 237, 228, 0.15); border-color: rgba(243, 237, 228, 0.2); transform: translateY(-4px) !important; }
        .ishow-card-icon { width: 44px; height: 44px; border-radius: 8px; background: rgba(243, 237, 228, 0.08); display: flex; align-items: center; justify-content: center; transition: transform 0.3s; overflow: hidden; padding: 6px; }
        .ishow-card-icon img { width: 100%; height: 100%; object-fit: contain; }
        .ishow-card:hover .ishow-card-icon { transform: scale(1.08); background: rgba(243, 237, 228, 0.15); }
        .ishow-card-label { font-size: 15px; font-weight: 500; color: #F3EDE4; letter-spacing: 0.02em; }
        .ishow-nav { position: absolute; bottom: 25%; width: 56px; height: 56px; border-radius: 50%; background: rgba(243, 237, 228, 0.05); border: 1px solid rgba(243, 237, 228, 0.15); display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 20; color: #F3EDE4; transition: background 0.3s, transform 0.3s; }
        .ishow-nav:hover { background: rgba(243, 237, 228, 0.15); transform: scale(1.05); }
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
                <div className="ishow-card-icon">
                  {/* Provide your own icon image or svg here later */}
                </div>
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
