import { useEffect } from "react";
import { WHATSAPP_BOOKING_LINK } from "../data";

interface CafeProps {
  onBookNow?: (type: string) => void;
}

export default function Cafe({ onBookNow }: CafeProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <style>{`
        /* ── CAFE PAGE ── */
        .cafe-page {
          background-color: #F8F5F0;
        }

        /* ── HERO SECTION ── */
        .cafe-hero {
          position: relative;
          height: 60vh;
          min-height: 450px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background-color: #1A1311;
        }
        .cafe-hero::after {
          content: '';
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          background: linear-gradient(135deg, rgba(37, 28, 25, 0.7) 0%, rgba(94, 32, 45, 0.4) 100%);
          z-index: 1;
        }
        .cafe-hero__bg {
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          object-fit: cover;
          opacity: 0.6;
          transform: scale(1.05);
          animation: cafeHeroZoom 20s infinite alternate linear;
        }
        @keyframes cafeHeroZoom {
          0% { transform: scale(1.05); }
          100% { transform: scale(1.15); }
        }
        .cafe-hero__content {
          position: relative;
          z-index: 2;
          text-align: center;
          color: #F3EDE4;
          padding: 0 5vw;
          max-width: 900px;
        }
        .cafe-hero__subtitle {
          font-family: var(--font-1);
          font-size: 1.1rem;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          margin-bottom: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 15px;
          color: #FFD78C;
          opacity: 0.9;
          animation: fadeUp 1s ease forwards;
          opacity: 0; transform: translateY(20px);
        }
        .cafe-hero__subtitle::before,
        .cafe-hero__subtitle::after {
          content: '';
          width: 40px;
          height: 1px;
          background: #FFD78C;
          opacity: 0.6;
        }
        .cafe-hero__title {
          font-family: var(--font-2);
          font-size: clamp(3.5rem, 8vw, 7rem);
          line-height: 1;
          margin-bottom: 30px;
          font-weight: 500;
          color: #F3EDE4 !important;
          text-shadow: 0 10px 30px rgba(0,0,0,0.5);
          animation: fadeUp 1s ease forwards 0.3s;
          opacity: 0; transform: translateY(20px);
        }
        .cafe-hero__title em {
          font-family: var(--font-3);
          font-style: italic;
          font-weight: 300;
          color: rgba(255, 215, 140, 0.9);
        }
        @keyframes fadeUp {
          to { opacity: 1; transform: translateY(0); }
        }

        /* ── CAFE TEAR EFFECT ── */
        .cafe-tear {
          position: absolute;
          bottom: -1px;
          left: 0;
          width: 100%;
          height: 40px;
          z-index: 5;
        }
        .cafe-tear svg {
          display: block;
          width: 100%;
          height: 100%;
        }
        @media (min-width: 1200px) {
          .cafe-tear { height: 60px; }
        }

        /* ── FEATURES STRIP ── */
        .cafe-features {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2px;
          background: rgba(37, 28, 25, 0.1);
        }
        .cafe-feat {
          background: #F8F5F0;
          padding: 60px 30px;
          text-align: center;
          transition: background 0.4s, transform 0.4s;
        }
        .cafe-feat:hover {
          background: #fff;
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
          z-index: 1;
          position: relative;
        }
        .cafe-feat__icon {
          width: 48px; height: 48px;
          margin: 0 auto 24px;
          stroke: #5E202D;
        }
        .cafe-feat__title {
          font-family: var(--font-2);
          font-size: 1.25rem;
          color: #251C19;
          margin-bottom: 12px;
        }
        .cafe-feat__desc {
          font-family: var(--font-1);
          font-size: 0.95rem;
          color: #251C19;
          opacity: 0.7;
          line-height: 1.6;
        }

        /* ── STORY SECTION ── */
        .cafe-story {
          padding: 120px 5vw;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8vw;
          align-items: center;
          max-width: 1400px;
          margin: 0 auto;
        }
        .cafe-story__images {
          position: relative;
          height: 600px;
        }
        .cafe-story__img-1 {
          width: 70%;
          height: 80%;
          object-fit: cover;
          border-radius: 4px;
          position: absolute;
          top: 0; left: 0;
          box-shadow: 0 20px 40px rgba(0,0,0,0.15);
        }
        .cafe-story__img-2 {
          width: 60%;
          height: 70%;
          object-fit: cover;
          border-radius: 4px;
          position: absolute;
          bottom: 0; right: 0;
          box-shadow: 0 20px 40px rgba(0,0,0,0.2);
          border: 10px solid #F8F5F0;
        }
        .cafe-story__content {
          padding-right: 2vw;
        }
        .cafe-story__eyebrow {
          font-family: var(--font-1);
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.3em;
          color: #5E202D;
          font-weight: 700;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 15px;
        }
        .cafe-story__eyebrow::before {
          content: '';
          width: 40px; height: 1px;
          background: #5E202D;
        }
        .cafe-story__title {
          font-family: var(--font-2);
          font-size: clamp(2.5rem, 4vw, 4rem);
          color: #251C19;
          line-height: 1.1;
          margin-bottom: 30px;
        }
        .cafe-story__title .outline-text {
          color: transparent;
          -webkit-text-stroke: 1.5px #251C19;
          font-style: italic;
          font-family: var(--font-3);
        }
        
        .cafe-story__text-lead {
          font-family: var(--font-1);
          font-size: 1.25rem;
          color: #5E202D;
          font-weight: 500;
          line-height: 1.6;
          margin-bottom: 20px;
          padding-left: 20px;
          border-left: 3px solid #FFD78C;
        }
        
        .cafe-story__text {
          font-family: var(--font-1);
          font-size: 1.05rem;
          color: #251C19;
          opacity: 0.8;
          line-height: 1.8;
          margin-bottom: 20px;
        }
        
        .cafe-story__structured-box {
          position: relative;
          padding: 30px;
          border: 1px solid rgba(94, 32, 45, 0.15);
          border-radius: 4px;
          background: #fff;
          margin-top: 35px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.03);
        }
        .cafe-story__structured-box::before {
          content: '';
          position: absolute;
          top: 8px; left: 8px; right: -8px; bottom: -8px;
          border: 1px solid #FFD78C;
          border-radius: 4px;
          z-index: -1;
        }
        
        .cafe-story__list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        .cafe-story__list li {
          display: flex;
          align-items: flex-start;
          gap: 15px;
          font-family: var(--font-1);
          font-size: 1.05rem;
          color: #251C19;
          line-height: 1.6;
        }
        .cafe-story__list-icon {
          width: 20px;
          height: 20px;
          color: #5E202D;
          flex-shrink: 0;
          margin-top: 3px;
        }
        .cafe-story__list strong {
          color: #5E202D;
          font-weight: 600;
        }
        
        /* ── AVANT-GARDE COLLAGE ── */
        .cafe-crazy {
          padding: 150px 5vw 250px;
          background-color: #1A1311;
          color: #F8F5F0;
          position: relative;
        }
        .cafe-crazy__bg-text-wrapper {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }
        .cafe-crazy__bg-text {
          position: absolute;
          top: 50%; left: 0%;
          width: 200%;
          transform: translateY(-50%);
          font-family: var(--font-2);
          font-size: 30vw;
          line-height: 0.8;
          color: transparent;
          -webkit-text-stroke: 2px rgba(255, 215, 140, 0.05);
          white-space: nowrap;
          z-index: 0;
          animation: marquee 40s linear infinite;
        }
        @keyframes marquee {
          0% { transform: translate(0, -50%); }
          100% { transform: translate(-50%, -50%); }
        }

        .cafe-crazy__container {
          max-width: 1400px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 40px;
          position: relative;
          z-index: 1;
        }

        /* TEXT BLOCK */
        .crazy-text-block {
          grid-column: 1 / 6;
          position: sticky;
          top: 150px;
          align-self: start;
          z-index: 5;
        }
        .crazy-title {
          font-family: var(--font-2);
          font-size: clamp(3rem, 6vw, 6.5rem);
          line-height: 0.85;
          color: #FFD78C;
          margin-bottom: 40px;
          text-transform: uppercase;
        }
        .crazy-title span {
          display: block;
          color: transparent;
          -webkit-text-stroke: 2px #FFD78C;
          font-style: italic;
          margin-left: 15%;
        }
        .crazy-desc {
          font-family: var(--font-1);
          font-size: 1.3rem;
          color: rgba(248, 245, 240, 0.9);
          max-width: 450px;
          border-left: 3px solid #5E202D;
          padding-left: 25px;
          line-height: 1.6;
        }
        
        .crazy-profile {
          margin-top: 60px;
          display: flex;
          flex-direction: column;
          gap: 25px;
          padding-left: 25px;
          border-left: 1px solid rgba(255, 215, 140, 0.2);
        }
        .crazy-profile-item {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        .crazy-profile-item .label {
          font-family: var(--font-1);
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.25em;
          color: #FFD78C;
          opacity: 0.7;
        }
        .crazy-profile-item .value {
          font-family: var(--font-2);
          font-size: 1.8rem;
          color: #fff;
          letter-spacing: 0.02em;
        }


        /* IMAGES COLUMN */
        .crazy-images {
          grid-column: 6 / 13;
          display: flex;
          flex-direction: column;
          gap: 120px;
          margin-top: 100px;
          position: relative;
          z-index: 2;
        }
        
        .crazy-img-wrap {
          position: relative;
          overflow: hidden;
          box-shadow: 0 40px 80px rgba(0,0,0,0.6);
          transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .crazy-img-wrap::after {
          content: '';
          position: absolute;
          inset: 0;
          box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.2);
          pointer-events: none;
        }
        .crazy-img-wrap:hover {
          transform: translateY(-20px) scale(1.02);
        }
        .crazy-img-wrap img {
          width: 100%; height: 100%; object-fit: cover;
          transition: transform 1.5s ease;
        }
        .crazy-img-wrap:hover img {
          transform: scale(1.1);
        }

        .crazy-img-1 {
          height: 700px;
          width: 85%;
          align-self: flex-end;
          border-radius: 300px 300px 0 0;
          border-bottom: 6px solid #FFD78C;
        }

        .crazy-img-2 {
          height: 500px;
          width: 500px;
          align-self: flex-start;
          border-radius: 50%;
          margin-left: -120px;
          border: 15px solid rgba(255, 215, 140, 0.05);
        }
        .crazy-img-2::after {
          border-radius: 50%;
        }

        .crazy-img-3 {
          height: 400px;
          width: 90%;
          align-self: flex-end;
          border-radius: 0 200px 200px 0;
        }

        /* CIRCULAR TEXT BADGE */
        .crazy-badge {
          position: absolute;
          top: 50px; right: 5%;
          width: 180px; height: 180px;
          z-index: 10;
          animation: spinBadge 15s linear infinite;
        }
        @keyframes spinBadge {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .crazy-badge svg {
          width: 100%; height: 100%;
          fill: #FFD78C;
        }

        /* MOUSE HOVER TAGS */
        .crazy-tag {
          position: absolute;
          bottom: 40px; left: 40px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(15px);
          color: #fff;
          font-family: var(--font-1);
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.25em;
          padding: 12px 24px;
          border-radius: 40px;
          border: 1px solid rgba(255,255,255,0.3);
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.5s ease;
        }
        .crazy-img-wrap:hover .crazy-tag {
          opacity: 1;
          transform: translateY(0);
        }
        /* ── HIGHLIGHT SECTION ── */
        .cafe-highlight {
          background: #251C19;
          color: #F8F5F0;
          padding: 100px 5vw;
          text-align: center;
          position: relative;
        }
        .cafe-highlight__inner {
          max-width: 800px;
          margin: 0 auto;
        }
        .cafe-highlight__title {
          font-family: var(--font-3);
          font-size: clamp(2rem, 4vw, 3.5rem);
          font-weight: 300;
          margin-bottom: 20px;
          color: #FFD78C;
        }
        .cafe-highlight__desc {
          font-family: var(--font-1);
          font-size: 1.15rem;
          line-height: 1.7;
          opacity: 0.85;
        }

        /* ── MENU PREVIEW ── */
        .cafe-menu-preview {
          padding: 120px 5vw;
          max-width: 1200px;
          margin: 0 auto;
        }
        .cafe-menu__header {
          text-align: center;
          margin-bottom: 80px;
        }
        .cafe-menu__title {
          font-family: var(--font-2);
          font-size: 3rem;
          color: #251C19;
          margin-bottom: 15px;
        }
        .cafe-menu__grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 40px;
        }
        .cafe-item {
          background: #fff;
          border-radius: 20px;
          padding: 0 30px 40px;
          text-align: center;
          box-shadow: 0 10px 40px rgba(37, 28, 25, 0.05);
          transition: all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
          position: relative;
          z-index: 1;
          margin-top: 80px;
          border: 1px solid rgba(37, 28, 25, 0.03);
        }
        .cafe-item:hover {
          transform: translateY(-15px);
          box-shadow: 0 20px 50px rgba(37, 28, 25, 0.1);
          z-index: 2;
        }
        @media (min-width: 900px) {
          .cafe-item:nth-child(2) {
            transform: translateY(40px);
          }
          .cafe-item:nth-child(2):hover {
            transform: translateY(25px);
          }
        }
        .cafe-item__img-wrap {
          width: 200px;
          height: 200px;
          margin: -60px auto 30px;
          border-radius: 50%;
          overflow: hidden;
          border: 8px solid #fff;
          box-shadow: 0 15px 35px rgba(0,0,0,0.15);
          position: relative;
        }
        .cafe-item__img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 1s ease;
        }
        .cafe-item:hover .cafe-item__img {
          transform: scale(1.15) rotate(5deg);
        }
        .cafe-item__title {
          font-family: var(--font-2);
          font-size: 1.4rem;
          color: #251C19;
          margin-bottom: 10px;
        }
        .cafe-item__desc {
          font-family: var(--font-1);
          font-size: 0.95rem;
          color: #251C19;
          opacity: 0.7;
          line-height: 1.5;
          margin-bottom: 24px;
        }
        .cafe-item__price {
          font-family: var(--font-3);
          font-size: 1.4rem;
          color: #5E202D;
          font-style: italic;
          font-weight: 500;
        }
        .cafe-menu__subtitle {
          color: #5E202D;
          font-family: var(--font-1);
          text-transform: uppercase;
          letter-spacing: 0.2em;
          font-size: 0.9rem;
          font-weight: bold;
          margin-top: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 15px;
        }
        .cafe-menu__subtitle::before,
        .cafe-menu__subtitle::after {
          content: '';
          width: 30px;
          height: 1px;
          background: #5E202D;
          opacity: 0.5;
        }

        /* ── PROCESS SECTION ── */
        .cafe-process {
          background-color: #16100E;
          color: #F8F5F0;
          padding: 120px 5vw;
          position: relative;
        }
        .cafe-process::before {
          content: '';
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          background: radial-gradient(circle at center, rgba(94, 32, 45, 0.15) 0%, transparent 70%);
          pointer-events: none;
        }
        .cafe-process__header {
          text-align: center;
          margin-bottom: 70px;
          position: relative;
          z-index: 2;
        }
        .cafe-process__header-subtitle {
          color: #FFD78C;
          font-family: var(--font-1);
          text-transform: uppercase;
          letter-spacing: 0.3em;
          font-size: 0.9rem;
          font-weight: 700;
          margin-bottom: 15px;
        }
        .cafe-process__header-title {
          font-family: var(--font-2);
          font-size: clamp(2.5rem, 5vw, 4rem);
          color: #F8F5F0;
          line-height: 1.1;
        }
        .cafe-process__inner {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 40px;
          position: relative;
          z-index: 2;
        }
        .cafe-process__step {
          position: relative;
          padding: 50px 40px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 215, 140, 0.1);
          border-radius: 12px;
          text-align: left;
          overflow: hidden;
          transition: all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
          backdrop-filter: blur(10px);
        }
        .cafe-process__step:hover {
          transform: translateY(-10px);
          background: rgba(255, 215, 140, 0.05);
          border-color: rgba(255, 215, 140, 0.3);
          box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        }
        .cafe-process__num {
          position: absolute;
          top: -10px;
          right: 15px;
          font-family: var(--font-3);
          font-size: 8rem;
          color: rgba(255, 215, 140, 0.05);
          font-weight: 700;
          z-index: 0;
          transition: all 0.5s ease;
          line-height: 1;
        }
        .cafe-process__step:hover .cafe-process__num {
          color: rgba(255, 215, 140, 0.15);
          transform: scale(1.05) translateY(-5px);
        }
        .cafe-process__title {
          font-family: var(--font-2);
          font-size: 2rem;
          color: #FFD78C;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 15px;
          position: relative;
          z-index: 1;
        }
        .cafe-process__title::before {
          content: '';
          width: 40px;
          height: 1px;
          background: #FFD78C;
        }
        .cafe-process__desc {
          font-family: var(--font-1);
          font-size: 1.05rem;
          color: #F3EDE4;
          opacity: 0.85;
          line-height: 1.8;
          position: relative;
          z-index: 1;
        }

        /* ── CAFE CTA ── */
        .cafe-cta {
          padding: 140px 5vw;
          background: url('/images/cafe/cafe_booking_plate.jpg') center/cover fixed;
          position: relative;
          text-align: center;
          color: #F3EDE4;
        }
        .cafe-cta::before {
          content: '';
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          background: rgba(37, 28, 25, 0.75);
        }
        .cafe-cta__content {
          position: relative;
          z-index: 2;
          max-width: 600px;
          margin: 0 auto;
        }
        .cafe-cta__title {
          font-family: var(--font-2);
          font-size: clamp(2.5rem, 5vw, 4rem);
          margin-bottom: 25px;
          color: #fff;
        }
        .cafe-cta__desc {
          font-family: var(--font-1);
          font-size: 1.15rem;
          margin-bottom: 40px;
          line-height: 1.6;
          opacity: 0.9;
        }
        .cafe-cta__btn {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 16px 40px;
          background: #FFD78C;
          color: #251C19;
          font-family: var(--font-1);
          text-transform: uppercase;
          letter-spacing: 0.15em;
          font-weight: bold;
          font-size: 0.9rem;
          border-radius: 40px;
          border: none;
          transition: all 0.4s ease;
          cursor: pointer;
          text-decoration: none;
        }
        .cafe-cta__btn:hover {
          background: #fff;
          transform: translateY(-4px);
          box-shadow: 0 15px 30px rgba(0,0,0,0.4);
        }
        .cafe-cta__btn svg {
          transition: transform 0.4s ease;
        }
        .cafe-cta__btn:hover svg {
          transform: translateX(4px);
        }

        @media (max-width: 1024px) {
          .crazy-text-block { position: relative; top: 0; grid-column: 1 / -1; margin-bottom: 60px; }
          
          /* Cluster Grid for Crazy Section */
          .crazy-images {
            grid-column: 1 / -1;
            display: block;
            position: relative;
            height: 600px;
            margin-top: 0;
          }
          .crazy-img-wrap { position: absolute; box-shadow: 0 20px 40px rgba(0,0,0,0.5); }
          .crazy-img-1 {
            top: 0; left: 0;
            width: 75%; height: 400px;
            border-radius: 150px 150px 0 0;
            border-bottom: 4px solid #FFD78C;
          }
          .crazy-img-2 {
            top: 250px; right: 0;
            width: 250px; height: 250px;
            border-radius: 50%;
            border: 8px solid rgba(255, 215, 140, 0.1);
            margin: 0;
            z-index: 3;
          }
          .crazy-img-3 {
            bottom: 0; left: 10%;
            width: 80%; height: 200px;
            border-radius: 100px;
            z-index: 2;
          }
          .crazy-badge { display: none; }
        }

        @media (max-width: 900px) {
          .cafe-story { grid-template-columns: 1fr; gap: 40px; padding: 80px 5vw; }
          .cafe-story__images { 
             height: 450px; 
             margin-bottom: 20px; 
             display: flex;
             align-items: center;
             justify-content: center;
          }
          .cafe-story__img-1 {
            position: relative;
            width: 90%;
            height: 90%;
            border-radius: 12px;
          }
          .cafe-story__img-2 {
            width: 50%;
            height: auto;
            aspect-ratio: 1;
            position: absolute;
            bottom: -20px;
            right: 5%;
            border-width: 6px;
            border-radius: 12px;
          }
          .cafe-crazy__container { grid-template-columns: 1fr; gap: 40px; }
        }

        @media (max-width: 600px) {
          .cafe-features { grid-template-columns: 1fr; }
          .cafe-story__images { height: 350px; }
          .crazy-images { height: 500px; }
          .crazy-img-1 { width: 85%; height: 350px; }
          .crazy-img-2 { width: 180px; height: 180px; top: 220px; border-width: 4px; }
          .crazy-img-3 { width: 90%; height: 150px; left: 5%; bottom: 20px; }
          .crazy-title { font-size: clamp(2.5rem, 10vw, 3.5rem); }
          .crazy-desc { font-size: 1.1rem; margin-left: 0; padding-left: 15px; border-width: 2px; }
        }
      `}</style>

      <div className="cafe-page">
        {/* ── HERO ── */}
        <section className="cafe-hero">
          <img src="/images/cafe/cafe_hero.jpg" alt="Cafe Hero" className="cafe-hero__bg" />
          <div className="cafe-hero__content">
            <span className="cafe-hero__subtitle">Artisanal Brews & Bites</span>
            <h1 className="cafe-hero__title">
              The Cafe <em>Experience</em>
            </h1>
          </div>
          <div className="cafe-tear" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none">
              <path fill="rgba(248, 245, 240, 0.5)" d="M0,100 L0,30 L15,45 L40,25 L70,50 L100,20 L130,55 L160,30 L200,60 L250,25 L300,55 L350,20 L400,45 L450,30 L500,60 L550,25 L600,50 L650,35 L700,65 L750,25 L800,50 L850,30 L900,55 L950,25 L1000,45 L1000,100 Z" />
              <path fill="#F8F5F0" d="M0,100 L0,40 L15,55 L40,35 L70,60 L100,30 L130,65 L160,40 L200,70 L250,35 L300,65 L350,30 L400,55 L450,40 L500,70 L550,35 L600,60 L650,45 L700,75 L750,35 L800,60 L850,40 L900,65 L950,35 L1000,55 L1000,100 Z" />
            </svg>
          </div>
        </section>

        {/* ── FEATURES ── */}
        <section className="cafe-features">
          <div className="cafe-feat">
            <svg className="cafe-feat__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="1" x2="6" y2="4"></line><line x1="10" y1="1" x2="10" y2="4"></line><line x1="14" y1="1" x2="14" y2="4"></line>
            </svg>
            <h3 className="cafe-feat__title">Specialty Coffee</h3>
            <p className="cafe-feat__desc">Expertly roasted beans brewed to absolute perfection every time.</p>
          </div>
          <div className="cafe-feat">
            <svg className="cafe-feat__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
            <h3 className="cafe-feat__title">Fresh Bakery</h3>
            <p className="cafe-feat__desc">Warm pastries, cakes, and breads baked fresh in-house daily.</p>
          </div>
          <div className="cafe-feat">
            <svg className="cafe-feat__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            <h3 className="cafe-feat__title">All-Day Dining</h3>
            <p className="cafe-feat__desc">From quick morning bites to relaxing evening conversations.</p>
          </div>
          <div className="cafe-feat">
            <svg className="cafe-feat__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line>
            </svg>
            <h3 className="cafe-feat__title">Cozy Ambience</h3>
            <p className="cafe-feat__desc">Designed for comfort, making every visit a memorable one.</p>
          </div>
        </section>

        {/* ── STORY ── */}
        <section className="cafe-story">
          <div className="cafe-story__images">
            <img src="/images/cafe/cafe_story_1.jpg" alt="Barista preparing coffee" className="cafe-story__img-1" />
            <img src="/images/cafe/cafe_story_2.jpg" alt="Cozy cafe seating" className="cafe-story__img-2" />
          </div>
          <div className="cafe-story__content">
            <p className="cafe-story__eyebrow">Our Passion</p>
            <h2 className="cafe-story__title">Brewed with <span className="outline-text">Love</span>,<br/>Served with <span className="outline-text">Joy</span>.</h2>
            
            <p className="cafe-story__text-lead">
              At our cafe, we believe that every cup of coffee tells a story.
            </p>
            <p className="cafe-story__text">
              From sourcing the finest beans to the careful art of brewing, we are dedicated to providing an experience that awakens the senses and comforts the soul.
            </p>
            
            <div className="cafe-story__structured-box">
              <ul className="cafe-story__list">
                <li>
                  <svg className="cafe-story__list-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <span><strong>Artisanal Pairings:</strong> Complement your beverage with our selection of pastries and bites, crafted for quality and flavor.</span>
                </li>
                <li>
                  <svg className="cafe-story__list-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <span><strong>Your Perfect Space:</strong> Whether catching up with friends or finding a quiet moment, our space is yours to enjoy.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ── AVANT-GARDE COLLAGE ── */}
        <section className="cafe-crazy">
          <div className="cafe-crazy__bg-text-wrapper">
            <div className="cafe-crazy__bg-text" aria-hidden="true">
              ROAST • BREW • SIP • ROAST • BREW • SIP •
            </div>
          </div>

          <div className="crazy-badge" aria-hidden="true">
            <svg viewBox="0 0 100 100">
              <path id="circlePath" fill="none" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
              <text>
                <textPath href="#circlePath" startOffset="0%" textLength="232" style={{fontSize: '10px', letterSpacing: '2px', fontWeight: 'bold', fill: '#FFD78C'}}>
                  ARTISAN COFFEE • PREMIUM ROAST • FRESH BAKE • 
                </textPath>
              </text>
            </svg>
          </div>

          <div className="cafe-crazy__container">
            <div className="crazy-text-block">
              <h2 className="crazy-title">
                The Art <span>Of</span> Roasting
              </h2>
              <p className="crazy-desc">
                Step into a world where coffee is an experience, not just a drink. Bold flavors, careful craftsmanship, and a space designed to inspire.
              </p>
              
              <div className="crazy-profile">
                <div className="crazy-profile-item">
                  <span className="label">Origin</span>
                  <span className="value">Ethiopia & Colombia</span>
                </div>
                <div className="crazy-profile-item">
                  <span className="label">Roast Level</span>
                  <span className="value">Medium-Dark</span>
                </div>
                <div className="crazy-profile-item">
                  <span className="label">Flavor Notes</span>
                  <span className="value">Dark Chocolate, Caramel, Berry</span>
                </div>
              </div>
            </div>


            <div className="crazy-images">
              <div className="crazy-img-wrap crazy-img-1">
                <img src="/images/cafe/cafe_hero.jpg" alt="Atmosphere" />
                <div className="crazy-tag">Vibe</div>
              </div>

              <div className="crazy-img-wrap crazy-img-2">
                <img src="/images/cafe/cafe_special.jpg" alt="Latte Art" />
                <div className="crazy-tag">Art</div>
              </div>

              <div className="crazy-img-wrap crazy-img-3">
                <img src="/images/cafe/cafe_story_1.jpg" alt="Hand Pour" />
                <div className="crazy-tag">Craft</div>
              </div>
            </div>
          </div>
        </section>
        {/* ── HIGHLIGHT ── */}
        <section className="cafe-highlight">
          <div className="cafe-highlight__inner">
            <h2 className="cafe-highlight__title">“A perfect blend of warmth and flavor.”</h2>
            <p className="cafe-highlight__desc">
              Discover a space where time slows down, and every sip brings you closer to the perfect moment. Join us for a taste of handcrafted excellence.
            </p>
          </div>
        </section>

        {/* ── MENU PREVIEW ── */}
        <section className="cafe-menu-preview">
          <div className="cafe-menu__header">
            <h2 className="cafe-menu__title">Cafe Favorites</h2>
            <p className="cafe-menu__subtitle">A glimpse of what we offer</p>
          </div>
          <div className="cafe-menu__grid">
            <div className="cafe-item">
              <div className="cafe-item__img-wrap">
                <img src="/images/cafe/cafe_special.jpg" alt="Signature Latte" className="cafe-item__img" />
              </div>
              <h3 className="cafe-item__title">Signature Latte</h3>
              <p className="cafe-item__desc">Rich espresso poured over steamed milk with a delicate art finish.</p>
              <div className="cafe-item__price">₹350</div>
            </div>
            <div className="cafe-item">
              <div className="cafe-item__img-wrap">
                <img src="/images/cafe/cafe_booking_plate.jpg" alt="Artisan Pastries" className="cafe-item__img" />
              </div>
              <h3 className="cafe-item__title">Artisan Pastries</h3>
              <p className="cafe-item__desc">Flaky, buttery croissants and sweet treats baked fresh every morning.</p>
              <div className="cafe-item__price">₹250</div>
            </div>
            <div className="cafe-item">
              <div className="cafe-item__img-wrap">
                <img src="/images/cafe/cafe_contact.jpg" alt="Craft Cold Brews" className="cafe-item__img" />
              </div>
              <h3 className="cafe-item__title">Craft Cold Brews</h3>
              <p className="cafe-item__desc">Slow-steeped for 18 hours to bring out a smooth, bold flavor.</p>
              <div className="cafe-item__price">₹280</div>
            </div>
          </div>
        </section>

        {/* ── PROCESS ── */}
        <section className="cafe-process">
          <div className="cafe-process__header">
            <p className="cafe-process__header-subtitle">The Journey</p>
            <h2 className="cafe-process__header-title">From Bean to Cup</h2>
          </div>
          <div className="cafe-process__inner">
            <div className="cafe-process__step">
              <div className="cafe-process__num">01</div>
              <h3 className="cafe-process__title">Sourcing</h3>
              <p className="cafe-process__desc">We partner directly with farmers to source the highest quality, ethically grown beans from around the world.</p>
            </div>
            <div className="cafe-process__step">
              <div className="cafe-process__num">02</div>
              <h3 className="cafe-process__title">Roasting</h3>
              <p className="cafe-process__desc">Our beans are meticulously roasted in small batches to unlock their unique, complex flavor profiles.</p>
            </div>
            <div className="cafe-process__step">
              <div className="cafe-process__num">03</div>
              <h3 className="cafe-process__title">Brewing</h3>
              <p className="cafe-process__desc">Our expert baristas carefully craft each cup, ensuring the perfect balance of aroma, body, and taste.</p>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="cafe-cta">
          <div className="cafe-cta__content">
            <h2 className="cafe-cta__title">Join Us for a Cup</h2>
            <p className="cafe-cta__desc">Whether you're looking for a quiet morning coffee or an afternoon treat, we have a table waiting for you.</p>
            <button className="cafe-cta__btn" onClick={() => window.open(WHATSAPP_BOOKING_LINK, '_blank')}>
              Reserve a Table
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </button>
          </div>
        </section>
      </div>
    </>
  );
}
