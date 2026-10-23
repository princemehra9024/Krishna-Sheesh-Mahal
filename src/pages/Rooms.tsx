import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HERO_POSTER, WHATSAPP_BOOKING_LINK, MEAL_PLANS, ROOMS_TARIFF_DATA, MealPlanCode } from "../data";
import QuoteSlider from "../components/QuoteSlider";

const ROOM_HERO = "/images/rooms/room-hero-page-img.png";
const ROOM_DELUXE = "/images/rooms/deluxe-room.png";
const ROOM_SUPER_DELUXE = "/images/rooms/super-deluxe-room.png";
const ROOM_PREMIUM = "/images/rooms/premium-room.png";
const ROOM_SUITE = "/images/rooms/Suite.png";
const ROOM_EXPERIENCES = "/images/rooms/Experiences.png";

interface RoomsProps {
  onBookNow?: (type: string) => void;
}

import { useSEO } from "../hooks/useSEO";

export default function Rooms({ onBookNow }: RoomsProps) {
  useSEO("Luxury Rooms & Suites | Krishna Sheesh Mahal Kota", "Book your luxurious stay in Kota. Explore our Premium, Super Deluxe, and Deluxe rooms featuring world-class amenities, stunning views, and royal comfort.");
  
  const [roomPlans, setRoomPlans] = useState<Record<string, MealPlanCode>>({
    deluxe: "EP",
    "super-deluxe": "EP",
    premium: "EP",
    suite: "EP",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <style>
        {`
          .rooms-container {
            background-color: var(--cream);
            padding: 0;
          }
          /* Improve header visibility on scroll for this page */
          body.scroll-active .header {
            box-shadow: 0 10px 30px rgba(0,0,0,0.05);
          }
          .room-card {
            position: relative;
            display: block;
            height: 90vh;
            min-height: 600px;
            margin: 0;
            width: 100%;
            overflow: hidden;
            background: var(--cream);
          }
          .room-image-wrapper {
            position: absolute;
            top: 0;
            left: 0;
            width: 75%;
            height: 100%;
            overflow: hidden;
            z-index: 1;
          }
          .room-card--reverse .room-image-wrapper {
            left: auto;
            right: 0;
          }
          .room-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 1.2s cubic-bezier(0.2, 1, 0.2, 1);
          }
          .room-card:hover .room-img {
            transform: scale(1.05);
          }
          
          .room-content {
            position: absolute;
            top: 50%;
            right: 5%;
            transform: translateY(-50%);
            width: 40%;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(24px);
            -webkit-backdrop-filter: blur(24px);
            padding: 4%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            z-index: 2;
            box-shadow: 0 30px 60px rgba(0,0,0,0.08);
            border: 1px solid rgba(255,255,255,0.5);
            transition: transform 0.6s cubic-bezier(0.2, 1, 0.2, 1), box-shadow 0.6s ease;
          }
          /* Improve readability inside the glass card */
          .room-content p {
            color: var(--text-color) !important;
            font-weight: 500;
          }
          .room-content h2.subtitle {
            color: color-mix(in srgb, var(--heading-color) 85%, transparent) !important;
            font-weight: 700;
          }
          .room-card--reverse .room-content {
            right: auto;
            left: 5%;
          }
          .room-card:hover .room-content {
            transform: translateY(-52%);
            box-shadow: 0 40px 80px rgba(0,0,0,0.12);
          }

          @media (max-width: 1024px) {
            .room-card {
              height: auto;
              display: flex;
              flex-direction: column;
              padding-bottom: var(--spacing-large);
            }
            .room-image-wrapper {
              position: relative;
              width: 100%;
              height: 50vh;
            }
            .room-content {
              position: relative;
              top: auto; right: auto; left: auto;
              transform: none !important;
              width: 90%;
              margin: -10vh auto 0;
            }
            .room-card--reverse .room-content {
              left: auto;
            }
          }
          .feature-list {
            list-style: none;
            padding: 0;
            margin: var(--spacing-mini) 0;
          }
          .feature-item {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 12px;
            font-size: 1.05rem;
            color: var(--text-color);
            font-weight: 500;
          }
          .feature-dot {
            width: 8px;
            height: 8px;
            background-color: var(--maroon);
            border-radius: 50%;
          }
          .price-tag {
            font-size: 2.2rem;
            font-family: var(--font-2);
            color: var(--maroon);
            margin-bottom: 2px;
            font-weight: 700;
            line-height: 1;
          }
          .price-label {
            font-size: 0.825rem;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            color: color-mix(in srgb, var(--text-color) 85%, transparent);
            font-weight: 600;
          }

          /* --- MEAL PLAN SELECTOR STYLES --- */
          .plan-switcher {
            margin: 18px 0 14px 0;
            display: flex;
            flex-direction: column;
            gap: 10px;
          }
          .plan-switcher-title {
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 0.15em;
            font-weight: 700;
            color: var(--maroon);
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .plan-tabs {
            display: flex;
            background: rgba(0, 0, 0, 0.05);
            padding: 4px;
            border-radius: 12px;
            gap: 6px;
          }
          .plan-tab-btn {
            flex: 1;
            border: 1px solid transparent;
            background: transparent;
            padding: 8px 10px;
            border-radius: 9px;
            cursor: pointer;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            transition: all 0.25s cubic-bezier(0.2, 1, 0.2, 1);
            font-family: inherit;
          }
          .plan-tab-btn:hover {
            background: rgba(255, 255, 255, 0.6);
          }
          .plan-tab-btn.active {
            background: #FAF7F2;
            border-color: rgba(197, 29, 36, 0.25);
            box-shadow: 0 4px 12px rgba(197, 29, 36, 0.12);
          }
          .plan-tab-code {
            font-size: 0.85rem;
            font-weight: 700;
            color: var(--heading-color);
            transition: color 0.2s ease;
          }
          .plan-tab-btn.active .plan-tab-code {
            color: var(--red, #C51D24);
          }
          .plan-tab-price {
            font-size: 0.8rem;
            color: var(--text-color);
            font-weight: 600;
          }
          .plan-tab-btn.active .plan-tab-price {
            color: var(--red, #C51D24);
            font-weight: 700;
          }
          .plan-inclusion-box {
            background: #FAF6F1;
            border: 1px dashed rgba(197, 29, 36, 0.25);
            border-radius: 10px;
            padding: 10px 14px;
            font-size: 0.825rem;
            color: var(--heading-color);
            line-height: 1.45;
            display: flex;
            align-items: flex-start;
            gap: 8px;
            margin-top: 2px;
          }
          .plan-inclusion-icon {
            font-size: 1.1rem;
            flex-shrink: 0;
            line-height: 1;
            margin-top: 1px;
          }

          /* --- TARIFF & MEAL PLANS SHOWCASE SECTION --- */
          .tariff-section {
            padding: 90px 5% 100px;
            background: linear-gradient(180deg, #FAF7F2 0%, #F5EFEB 100%);
            border-top: 1px solid rgba(0,0,0,0.06);
            border-bottom: 1px solid rgba(0,0,0,0.06);
          }
          .tariff-container {
            max-width: 1200px;
            margin: 0 auto;
          }
          .tariff-header {
            text-align: center;
            max-width: 800px;
            margin: 0 auto 50px;
          }
          .tariff-subtitle {
            font-size: 0.85rem;
            text-transform: uppercase;
            letter-spacing: 0.25em;
            color: var(--maroon);
            font-weight: 700;
            margin-bottom: 12px;
          }
          .tariff-title {
            font-size: clamp(2.2rem, 3.8vw, 3.4rem);
            font-family: var(--font-2);
            color: var(--heading-color);
            line-height: 1.15;
            margin-bottom: 16px;
          }
          .tariff-desc {
            font-size: 1.05rem;
            color: color-mix(in srgb, var(--text-color) 80%, transparent);
            line-height: 1.6;
          }
          .tariff-plans-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: 25px;
            margin-bottom: 50px;
          }
          .tariff-plan-card {
            background: #FAF7F2;
            border-radius: 20px;
            padding: 36px 30px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.04);
            border: 1px solid rgba(197, 160, 89, 0.25);
            display: flex;
            flex-direction: column;
            position: relative;
            transition: transform 0.35s ease, box-shadow 0.35s ease;
          }
          .tariff-plan-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 18px 40px rgba(197, 29, 36, 0.12);
          }
          .tariff-plan-card.featured {
            border: 2px solid var(--red, #C51D24);
            background: linear-gradient(180deg, #FAF7F2 0%, #FAF0E8 100%);
          }
          .tariff-plan-badge {
            position: absolute;
            top: -12px;
            left: 30px;
            background: linear-gradient(135deg, #C51D24 0%, #8C1C24 100%);
            color: #FAF7F2;
            font-size: 0.725rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            padding: 4px 14px;
            border-radius: 20px;
            box-shadow: 0 3px 10px rgba(197, 29, 36, 0.3);
          }
          .tariff-card-name {
            font-size: 1.5rem;
            font-family: var(--font-2);
            color: var(--heading-color);
            margin-bottom: 6px;
          }
          .tariff-card-tagline {
            font-size: 0.85rem;
            font-weight: 600;
            color: var(--maroon);
            margin-bottom: 16px;
          }
          .tariff-rates-box {
            background: #fbf7f4;
            border-radius: 12px;
            padding: 14px 16px;
            margin-bottom: 20px;
          }
          .tariff-rates-title {
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            color: #777;
            font-weight: 700;
            margin-bottom: 8px;
          }
          .tariff-rate-row {
            display: flex;
            justify-content: space-between;
            font-size: 0.875rem;
            padding: 4px 0;
            border-bottom: 1px dashed rgba(0,0,0,0.06);
            color: var(--heading-color);
          }
          .tariff-rate-row:last-child {
            border-bottom: none;
          }
          .tariff-rate-row strong {
            color: var(--maroon);
            font-weight: 700;
          }
          .tariff-inclusions-list {
            list-style: none;
            padding: 0;
            margin: 0 0 24px 0;
            display: flex;
            flex-direction: column;
            gap: 10px;
          }
          .tariff-inclusion-item {
            display: flex;
            align-items: flex-start;
            gap: 10px;
            font-size: 0.875rem;
            color: var(--text-color);
            line-height: 1.45;
          }
          .tariff-check {
            color: var(--maroon);
            font-weight: bold;
            font-size: 1rem;
            line-height: 1;
            margin-top: 1px;
          }
          .tariff-matrix-card {
            background: #FAF7F2;
            border-radius: 20px;
            padding: 35px 30px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.05);
            border: 1px solid rgba(197, 160, 89, 0.25);
            overflow-x: auto;
          }
          .tariff-table {
            width: 100%;
            border-collapse: collapse;
            min-width: 680px;
          }
          .tariff-table th {
            padding: 16px 20px;
            text-align: left;
            font-size: 0.85rem;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            color: var(--heading-color);
            border-bottom: 2px solid #ede1db;
            background: #faf5f2;
          }
          .tariff-table th:first-child {
            border-top-left-radius: 10px;
          }
          .tariff-table th:last-child {
            border-top-right-radius: 10px;
          }
          .tariff-table td {
            padding: 18px 20px;
            border-bottom: 1px solid #f2e9e4;
            color: var(--text-color);
            font-size: 0.95rem;
          }
          .tariff-table tr:hover td {
            background-color: #fdfaf8;
          }
          .tariff-table-price {
            font-size: 1.15rem;
            font-weight: 700;
            color: var(--maroon);
          }


          /* --- ROOMS GRID HERO --- */
          .rooms-hero-grid {
            width: 100%;
            min-height: 100vh;
            padding-top: calc(var(--header-height) + 16px);
            background-color: var(--cream);
            display: flex;
            flex-direction: column;
            gap: 16px;
            padding-bottom: 16px;
            overflow: hidden;
          }

          .rg-top-row {
            display: flex;
            height: 60vh;
            min-height: 550px;
            gap: 16px;
          }

          .rg-text-block {
            flex: 1;
            background: var(--cream);
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: 0 4% 0 6%;
            opacity: 0;
            animation: rgFadeInUp 0.8s cubic-bezier(0.2, 1, 0.2, 1) 0.1s forwards;
          }

          .rg-subtitle {
            font-size: 0.85rem;
            text-transform: uppercase;
            letter-spacing: 0.4em;
            color: var(--charcoal);
            margin-bottom: 20px;
            font-weight: 600;
          }

          .rg-title {
            font-size: clamp(3.5rem, 5.5vw, 6.5rem);
            font-family: var(--font-2);
            line-height: 1.05;
            color: var(--charcoal);
            margin-bottom: 24px;
            font-weight: 500;
          }
          
          .rg-title em {
            font-family: var(--font-3);
            font-style: italic;
            font-weight: 400;
            color: var(--body-gray);
          }

          .rg-desc {
            font-size: 1.05rem;
            color: var(--body-gray);
            line-height: 1.6;
            max-width: 90%;
            margin-bottom: 40px;
          }

          .rg-buttons {
            display: flex;
            align-items: center;
            gap: 24px;
          }

          .rg-btn-primary {
            background: var(--maroon);
            color: #fff;
            padding: 16px 36px;
            border-radius: 40px;
            font-weight: 500;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 12px;
            transition: all 0.4s cubic-bezier(0.2, 1, 0.2, 1);
            position: relative;
            overflow: hidden;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          }
          .rg-btn-primary::before {
            content: '';
            position: absolute;
            top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(255,255,255,0.1);
            transform: translateX(-100%);
            transition: transform 0.4s ease;
          }
          .rg-btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
          }
          .rg-btn-primary:hover::before {
            transform: translateX(0);
          }
          .rg-btn-primary svg {
            transition: transform 0.4s cubic-bezier(0.2, 1, 0.2, 1);
          }
          .rg-btn-primary:hover svg {
            transform: translateX(4px);
          }

          .rg-btn-secondary {
            color: var(--charcoal);
            text-decoration: none;
            font-weight: 500;
            display: flex;
            align-items: center;
            gap: 8px;
            transition: opacity 0.3s;
          }
          .rg-btn-secondary:hover {
            opacity: 0.7;
          }

          .rg-media-block {
            flex: 1.2;
            border-top-left-radius: 40px;
            border-bottom-left-radius: 40px;
            overflow: hidden;
            position: relative;
            opacity: 0;
            animation: rgFadeInRight 0.8s cubic-bezier(0.2, 1, 0.2, 1) 0.3s forwards;
          }

          .rg-media-block img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 1.5s cubic-bezier(0.2, 1, 0.2, 1);
          }
          .rg-media-block:hover img {
            transform: scale(1.03);
          }

          .rg-bottom-row {
            display: flex;
            height: 22vh;
            min-height: 200px;
            gap: 16px;
          }

          .rg-feature-box {
            flex: 1;
            background: var(--cream);
            display: flex;
            align-items: center;
            padding: 2% 4%;
            gap: 24px;
            opacity: 0;
            animation: rgFadeInUp 0.8s cubic-bezier(0.2, 1, 0.2, 1) forwards;
          }
          
          .rg-feature-box-1 {
            border-top-right-radius: 40px;
            border-bottom-right-radius: 40px;
            animation-delay: 0.4s;
          }

          .rg-feature-box-2 {
            border-radius: 40px;
            animation-delay: 0.5s;
          }

          .rg-feature-col {
            flex: 1;
          }
          
          /* Icons */
          .rg-feature-icon {
            width: 32px;
            height: 32px;
            margin-bottom: 16px;
            opacity: 0.6;
            stroke-width: 1.2;
          }

          .rg-feature-col h4 {
            font-size: 0.95rem;
            color: var(--charcoal);
            margin-bottom: 8px;
            font-weight: 600;
            letter-spacing: 0.02em;
          }
          .rg-feature-col p {
            font-size: 0.85rem;
            color: var(--body-gray);
            line-height: 1.6;
          }

          .rg-arrow-box {
            flex: 0 0 22vh;
            max-width: 250px;
            background: var(--maroon);
            border-top-left-radius: 40px;
            border-bottom-left-radius: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            text-decoration: none;
            transition: all 0.4s cubic-bezier(0.2, 1, 0.2, 1);
            opacity: 0;
            animation: rgFadeInRight 0.8s cubic-bezier(0.2, 1, 0.2, 1) 0.6s forwards;
          }
          .rg-arrow-box:hover {
            background: var(--charcoal);
            box-shadow: 0 15px 30px rgba(0,0,0,0.2);
          }
          .rg-arrow-box:hover svg {
            transform: translate(6px, -6px) scale(1.1);
          }
          .rg-arrow-box svg {
            transition: transform 0.5s cubic-bezier(0.2, 1, 0.2, 1);
            stroke-width: 1.2;
          }

          @keyframes rgFadeInUp {
            0% { opacity: 0; transform: translateY(30px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          
          @keyframes rgFadeInRight {
            0% { opacity: 0; transform: translateX(30px); }
            100% { opacity: 1; transform: translateX(0); }
          }

          @media (max-width: 1024px) {
            .rg-top-row {
              flex-direction: column;
              height: auto;
            }
            .rg-text-block {
              padding: 5% 4%;
            }
            .rg-media-block {
              border-top-left-radius: 0;
              border-bottom-left-radius: 0;
              height: 50vh;
            }
            .rg-bottom-row {
              flex-direction: column;
              height: auto;
            }
            .rg-feature-box {
              border-radius: 0 !important;
              padding: 40px 6%;
              flex-direction: column;
              align-items: flex-start;
              gap: 30px;
            }
            .rg-feature-col { width: 100%; }
            .rg-arrow-box {
              border-radius: 0 !important;
              padding: 40px 6%;
            }
            .rg-arrow-box {
              max-width: none;
              height: 150px;
              flex: 0 0 150px;
            }
          }


          /* --- SERVICES GRID --- */
          .services-section {
            background-color: #050505;
            min-height: 100vh;
            width: 100%;
            padding: 0;
            margin: 0;
            display: flex;
            align-items: stretch;
            overflow: hidden;
          }
          .services-grid-wrapper {
            width: 100%;
            height: 100%;
            max-width: none;
            margin: 0;
            padding: 0;
          }
          .services-grid {
            display: grid;
            width: 100%;
            height: 100%;
            /* 4 columns on desktop */
            grid-template-columns: repeat(4, 1fr);
            grid-auto-rows: minmax(300px, 1fr);
            gap: 2px;
            background: #111;
          }
          
          /* Grid placement */
          .srv-block:nth-child(1) { grid-column: 1 / 3; grid-row: 1 / 3; } /* Large left */
          .srv-block:nth-child(2) { grid-column: 3 / 4; grid-row: 1 / 2; }
          .srv-block:nth-child(3) { grid-column: 4 / 5; grid-row: 1 / 2; }
          .srv-block:nth-child(4) { grid-column: 3 / 4; grid-row: 2 / 3; }
          .srv-block:nth-child(5) { grid-column: 4 / 5; grid-row: 2 / 3; }
          .srv-block:nth-child(6) { grid-column: 1 / 5; grid-row: 3 / 4; } /* Wide banner at bottom */

          .srv-block {
            position: relative;
            padding: clamp(20px, 3vw, 40px);
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            background-color: #0a0a0a;
            color: #fff;
            overflow: hidden;
            transition: all 0.5s cubic-bezier(0.2, 1, 0.2, 1);
            cursor: pointer;
            text-decoration: none;
            z-index: 1;
          }
          .srv-block:hover {
            background-color: #1a1a1a;
            transform: scale(0.98);
            border-radius: 12px;
            box-shadow: 0 20px 50px rgba(0,0,0,0.8);
            z-index: 10;
          }
          /* Glare effect on hover */
          .srv-block::before {
            content: '';
            position: absolute;
            top: 0; left: -100%;
            width: 50%; height: 100%;
            background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0) 100%);
            transform: skewX(-25deg);
            z-index: 3;
            pointer-events: none;
          }
          .srv-block:hover::before {
            animation: glare 0.8s ease forwards;
          }
          @keyframes glare {
            0% { left: -100%; }
            100% { left: 200%; }
          }
          
          .srv-block::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: #fff;
            transition: width 0.6s cubic-bezier(0.8, 0, 0.2, 1);
            z-index: 5;
          }
          .srv-block:hover::after {
            width: 100%;
          }
          
          .srv-block-bg {
            position: absolute;
            top: 0; left: 0; width: 100%; height: 100%;
            background-size: cover;
            background-position: center;
            z-index: 0;
            transition: transform 1.5s cubic-bezier(0.2, 1, 0.2, 1);
          }
          .srv-block:hover .srv-block-bg {
            transform: scale(1.05);
          }
          .srv-overlay {
            position: absolute;
            top: 0; left: 0; width: 100%; height: 100%;
            background: linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.95));
            z-index: 1;
            transition: opacity 0.5s ease;
          }
          .srv-block:hover .srv-overlay {
            opacity: 0.7;
          }
          
          .srv-content {
            position: relative;
            z-index: 4;
            display: flex;
            flex-direction: column;
            height: 100%;
          }

          .srv-block-num {
            position: absolute;
            top: 2vw;
            right: 2vw;
            font-size: clamp(1.2rem, 2vw, 1.5rem);
            font-family: var(--font-2);
            color: rgba(255,255,255,0.15);
            font-weight: 300;
            transition: color 0.3s ease;
            z-index: 4;
          }
          .srv-block:hover .srv-block-num {
            color: rgba(255,255,255,0.5);
          }
          
          .srv-icon {
            width: clamp(32px, 4vw, 48px);
            height: clamp(32px, 4vw, 48px);
            stroke: rgba(255,255,255,0.4);
            margin-bottom: auto;
            transition: all 0.5s cubic-bezier(0.2, 1, 0.2, 1);
            transform-origin: left center;
          }
          .srv-block:hover .srv-icon {
            stroke: #fff;
            transform: scale(1.15) translateY(-5px);
            filter: drop-shadow(0 0 10px rgba(255,255,255,0.5));
          }
          
          .srv-title {
            font-size: clamp(1.5rem, 3vw, 2.2rem);
            font-family: var(--font-2);
            line-height: 1.1;
            margin-bottom: 10px;
            color: #fff;
            transition: transform 0.4s ease;
          }
          .srv-block:hover .srv-title {
            transform: translateY(-5px);
          }
          
          .srv-desc {
            font-size: clamp(0.9rem, 1.5vw, 1.05rem);
            color: rgba(255,255,255,0.6);
            line-height: 1.5;
            transition: color 0.4s ease, transform 0.4s ease;
          }
          .srv-block:hover .srv-desc {
            color: rgba(255,255,255,1);
            transform: translateY(-2px);
          }
          
          .srv-link {
            align-self: flex-start;
            margin-top: 20px;
            font-size: 0.875rem;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            color: #fff;
            opacity: 0;
            transform: translateY(10px);
            transition: opacity 0.4s ease, transform 0.4s ease;
          }
          .srv-block:hover .srv-link {
            opacity: 1;
            transform: translateY(0);
          }
          .srv-link::after {
            content: "↗";
            font-size: 1.2rem;
            transition: transform 0.3s ease;
          }
          .srv-link:hover::after {
            transform: translate(3px, -3px);
          }

          .srv-block--large .srv-title {
            font-size: clamp(2.5rem, 5vw, 4rem);
          }
          .srv-block--large .srv-desc {
            font-size: clamp(1rem, 2vw, 1.2rem);
          }

          @media (max-width: 1024px) {
            .services-section { height: auto; min-height: 100vh; padding: 2px 0; }
            .services-grid { grid-template-columns: repeat(2, 1fr); grid-auto-rows: auto; }
            
            /* On tablet: */
            .srv-block:nth-child(1) { grid-column: 1 / 3; grid-row: auto; min-height: 400px; }
            .srv-block:nth-child(2) { grid-column: 1 / 2; grid-row: auto; min-height: 250px; }
            .srv-block:nth-child(3) { grid-column: 2 / 3; grid-row: auto; min-height: 250px; }
            .srv-block:nth-child(4) { grid-column: 1 / 2; grid-row: auto; min-height: 250px; }
            .srv-block:nth-child(5) { grid-column: 2 / 3; grid-row: auto; min-height: 250px; }
            .srv-block:nth-child(6) { grid-column: 1 / 3; grid-row: auto; min-height: 350px; }
            
            .srv-block-num { top: 20px; right: 20px; }
          }
          @media (max-width: 650px) {
            .services-grid { grid-template-columns: 1fr; }
            
            /* On mobile: stack everything */
            .srv-block:nth-child(1),
            .srv-block:nth-child(2),
            .srv-block:nth-child(3),
            .srv-block:nth-child(4),
            .srv-block:nth-child(5),
            .srv-block:nth-child(6) {
              grid-column: 1 / -1;
              min-height: 300px;
              padding: 30px 20px;
            }
          }
        `}
      </style>      {/* Rooms Grid Hero */}
      <section className="rooms-hero-grid">
        <div className="rg-top-row">
          <div className="rg-text-block">
            <h2 className="rg-subtitle">Krishna Sheesh Mahal</h2>
            <h1 className="rg-title">Our <em>Rooms</em></h1>
            <p className="rg-desc">
              Discover a sanctuary of peace in the heart of Kota. Immerse yourself in refined luxury, 
              thoughtful amenities, and spaces designed for ultimate relaxation.
            </p>
            <div className="rg-buttons">
              <a href="#single-room" className="rg-btn-primary">
                Explore Rooms 
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </a>
            </div>
          </div>
          
          <div className="rg-media-block">
            <img src={ROOM_HERO} alt="Luxury Room" />
          </div>
        </div>

        <div className="rg-bottom-row">
          {/* Block 1 */}
          <div className="rg-feature-box rg-feature-box-1">
            <div className="rg-feature-col">
              <svg className="rg-feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 4v16M22 4v16M4 8h16M4 16h16"></path></svg>
              <h4>Plush Bedding</h4>
              <p>Premium mattresses and fine linens for a perfect night's sleep.</p>
            </div>
            <div className="rg-feature-col">
              <svg className="rg-feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"></path><path d="M1.42 9a16 16 0 0 1 21.16 0"></path><path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path><line x1="12" y1="20" x2="12.01" y2="20"></line></svg>
              <h4>High-Speed Wi-Fi</h4>
              <p>Stay connected with complimentary high-speed internet in every room.</p>
            </div>
          </div>
          
          {/* Block 2 */}
          <div className="rg-feature-box rg-feature-box-2">
            <div className="rg-feature-col">
              <svg className="rg-feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h4l3-9 5 18 3-9h5"></path></svg>
              <h4>Smart Climate</h4>
              <p>Personalized temperature control for your optimal comfort.</p>
            </div>
            <div className="rg-feature-col">
              <svg className="rg-feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
              <h4>In-Room Dining</h4>
              <p>Exquisite culinary experiences delivered right to your door.</p>
            </div>
          </div>
          
          {/* Arrow Block (Pointing down to the rooms list) */}
          <a href="#single-room" className="rg-arrow-box">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="19" x2="19" y2="5"></line>
              <polyline points="9 5 19 5 19 15"></polyline>
            </svg>
          </a>
        </div>
      </section>

      <div className="rooms-container">
        {/* Deluxe Room Section */}
        <section id="deluxe">
          <div className="room-card">
            <div className="room-image-wrapper">
              <img src={ROOM_DELUXE} alt="Deluxe Room" className="room-img" loading="lazy" />
            </div>
            
            <div className="room-content">
              <h2 className="subtitle" style={{ letterSpacing: '0.2em', color: 'color-mix(in srgb, var(--heading-color) 60%, transparent)' }}>COMFORT & STYLE</h2>
              <h3 style={{ fontSize: 'var(--h3)', lineHeight: '1.1', marginBottom: '10px', fontFamily: 'var(--font-2)', color: 'var(--heading-color)' }}>
                Deluxe <em style={{ fontFamily: 'var(--font-3)', fontStyle: 'italic', fontWeight: '300' }}>Room</em>
              </h3>
              <div style={{ width: '40px', height: '2px', backgroundColor: 'var(--maroon)', margin: '14px 0' }}></div>
              <p style={{ fontSize: '1rem', lineHeight: '1.6', marginBottom: '16px', color: 'color-mix(in srgb, var(--text-color) 70%, transparent)' }}>
                Perfect for your stay, offering comfort and style with modern amenities. Size: 19m²
              </p>
              <ul className="feature-list" style={{ marginBottom: '14px' }}>
                <li className="feature-item"><div className="feature-dot"></div> Free Wi-Fi</li>
                <li className="feature-item"><div className="feature-dot"></div> Smart TV</li>
                <li className="feature-item"><div className="feature-dot"></div> AC & Tea Kettle</li>
              </ul>

              {/* Meal Plan Switcher */}
              <div className="plan-switcher">
                <div className="plan-switcher-title">
                  <span>Select Meal Plan</span>
                  <span style={{ color: 'var(--maroon)' }}>{roomPlans["deluxe"]} Plan</span>
                </div>
                <div className="plan-tabs">
                  <button
                    type="button"
                    className={`plan-tab-btn ${roomPlans["deluxe"] === "EP" ? "active" : ""}`}
                    onClick={() => setRoomPlans((prev) => ({ ...prev, deluxe: "EP" }))}
                  >
                    <span className="plan-tab-code">EP</span>
                    <span className="plan-tab-price">₹1200</span>
                  </button>
                  <button
                    type="button"
                    className={`plan-tab-btn ${roomPlans["deluxe"] === "CP" ? "active" : ""}`}
                    onClick={() => setRoomPlans((prev) => ({ ...prev, deluxe: "CP" }))}
                  >
                    <span className="plan-tab-code">CP</span>
                    <span className="plan-tab-price">₹1500</span>
                  </button>
                  <button
                    type="button"
                    className={`plan-tab-btn ${roomPlans["deluxe"] === "AMP" ? "active" : ""}`}
                    onClick={() => setRoomPlans((prev) => ({ ...prev, deluxe: "AMP" }))}
                  >
                    <span className="plan-tab-code">AMP</span>
                    <span className="plan-tab-price">₹1800</span>
                  </button>
                </div>

                <div className="plan-inclusion-box">
                  <span className="plan-inclusion-icon">
                    {roomPlans["deluxe"] === "EP" && "🛏️"}
                    {roomPlans["deluxe"] === "CP" && "🥞"}
                    {roomPlans["deluxe"] === "AMP" && "🍛"}
                  </span>
                  <div>
                    {roomPlans["deluxe"] === "EP" && (
                      <>
                        <strong>EP (Room Only):</strong> Pure royal living with all in-room amenities, AC, Smart TV, Wi-Fi & 24/7 room service.
                      </>
                    )}
                    {roomPlans["deluxe"] === "CP" && (
                      <>
                        <strong>CP (Bed & Breakfast):</strong> Includes hot Stuffed Aloo Paratha with fresh curd, iconic Kota Kadhi Kachori, and Tea / Coffee.
                      </>
                    )}
                    {roomPlans["deluxe"] === "AMP" && (
                      <>
                        <strong>AMP (Breakfast + Super Deluxe Thali):</strong> Morning Breakfast + Grand Royal Super Deluxe Thali (Lunch or Dinner).
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '15px' }}>
                <div>
                  <div className="price-tag">
                    ₹{roomPlans["deluxe"] === "EP" ? "1200" : roomPlans["deluxe"] === "CP" ? "1500" : "1800"}
                  </div>
                  <div className="price-label">Per Night ({roomPlans["deluxe"]} Plan)</div>
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <Link
                    to={`/booking?type=rooms&room=deluxe&plan=${roomPlans["deluxe"]}`}
                    className="btn btn--regular"
                    style={{ backgroundColor: 'var(--heading-color)', color: '#fff', border: 'none', padding: '10px 22px', borderRadius: '30px', textDecoration: 'none', fontSize: '0.9rem' }}
                  >
                    Book Now
                  </Link>
                  <a
                    href={`https://wa.me/918302903734?text=${encodeURIComponent(`Hello Krishna Sheesh Mahal, I would like to book Deluxe Room on ${roomPlans["deluxe"]} Plan at ₹${roomPlans["deluxe"] === "EP" ? "1200" : roomPlans["deluxe"] === "CP" ? "1500" : "1800"}/night.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--regular"
                    style={{ backgroundColor: '#25D366', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: '30px', textDecoration: 'none', fontSize: '0.85rem' }}
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Super Deluxe Room Section */}
        <section id="super-deluxe">
          <div className="room-card room-card--reverse">
            <div className="room-image-wrapper">
              <img src={ROOM_SUPER_DELUXE} alt="Super Deluxe Room" className="room-img" loading="lazy" />
            </div>
            
            <div className="room-content">
              <h2 className="subtitle" style={{ letterSpacing: '0.2em', color: 'color-mix(in srgb, var(--heading-color) 60%, transparent)' }}>SPACIOUS LUXURY</h2>
              <h3 style={{ fontSize: 'var(--h3)', lineHeight: '1.1', marginBottom: '10px', fontFamily: 'var(--font-2)', color: 'var(--heading-color)' }}>
                Super Deluxe <em style={{ fontFamily: 'var(--font-3)', fontStyle: 'italic', fontWeight: '300' }}>Room</em>
              </h3>
              <div style={{ width: '40px', height: '2px', backgroundColor: 'var(--maroon)', margin: '14px 0' }}></div>
              <p style={{ fontSize: '1rem', lineHeight: '1.6', marginBottom: '16px', color: 'color-mix(in srgb, var(--text-color) 70%, transparent)' }}>
                Provides ample space and premium comfort for relaxing evenings. Size: 20m²
              </p>
              <ul className="feature-list" style={{ marginBottom: '14px' }}>
                <li className="feature-item"><div className="feature-dot"></div> Free Wi-Fi</li>
                <li className="feature-item"><div className="feature-dot"></div> Smart TV</li>
                <li className="feature-item"><div className="feature-dot"></div> AC & Tea Kettle</li>
              </ul>

              {/* Meal Plan Switcher */}
              <div className="plan-switcher">
                <div className="plan-switcher-title">
                  <span>Select Meal Plan</span>
                  <span style={{ color: 'var(--maroon)' }}>{roomPlans["super-deluxe"]} Plan</span>
                </div>
                <div className="plan-tabs">
                  <button
                    type="button"
                    className={`plan-tab-btn ${roomPlans["super-deluxe"] === "EP" ? "active" : ""}`}
                    onClick={() => setRoomPlans((prev) => ({ ...prev, "super-deluxe": "EP" }))}
                  >
                    <span className="plan-tab-code">EP</span>
                    <span className="plan-tab-price">₹1500</span>
                  </button>
                  <button
                    type="button"
                    className={`plan-tab-btn ${roomPlans["super-deluxe"] === "CP" ? "active" : ""}`}
                    onClick={() => setRoomPlans((prev) => ({ ...prev, "super-deluxe": "CP" }))}
                  >
                    <span className="plan-tab-code">CP</span>
                    <span className="plan-tab-price">₹1800</span>
                  </button>
                  <button
                    type="button"
                    className={`plan-tab-btn ${roomPlans["super-deluxe"] === "AMP" ? "active" : ""}`}
                    onClick={() => setRoomPlans((prev) => ({ ...prev, "super-deluxe": "AMP" }))}
                  >
                    <span className="plan-tab-code">AMP</span>
                    <span className="plan-tab-price">₹2100</span>
                  </button>
                </div>

                <div className="plan-inclusion-box">
                  <span className="plan-inclusion-icon">
                    {roomPlans["super-deluxe"] === "EP" && "🛏️"}
                    {roomPlans["super-deluxe"] === "CP" && "🥞"}
                    {roomPlans["super-deluxe"] === "AMP" && "🍛"}
                  </span>
                  <div>
                    {roomPlans["super-deluxe"] === "EP" && (
                      <>
                        <strong>EP (Room Only):</strong> Pure royal living with all in-room amenities, AC, Smart TV, Wi-Fi & 24/7 room service.
                      </>
                    )}
                    {roomPlans["super-deluxe"] === "CP" && (
                      <>
                        <strong>CP (Bed & Breakfast):</strong> Includes hot Stuffed Aloo Paratha with fresh curd, iconic Kota Kadhi Kachori, and Tea / Coffee.
                      </>
                    )}
                    {roomPlans["super-deluxe"] === "AMP" && (
                      <>
                        <strong>AMP (Breakfast + Super Deluxe Thali):</strong> Morning Breakfast + Grand Royal Super Deluxe Thali (Lunch or Dinner).
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '15px' }}>
                <div>
                  <div className="price-tag">
                    ₹{roomPlans["super-deluxe"] === "EP" ? "1500" : roomPlans["super-deluxe"] === "CP" ? "1800" : "2100"}
                  </div>
                  <div className="price-label">Per Night ({roomPlans["super-deluxe"]} Plan)</div>
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <Link
                    to={`/booking?type=rooms&room=super-deluxe&plan=${roomPlans["super-deluxe"]}`}
                    className="btn btn--regular"
                    style={{ backgroundColor: 'var(--heading-color)', color: '#fff', border: 'none', padding: '10px 22px', borderRadius: '30px', textDecoration: 'none', fontSize: '0.9rem' }}
                  >
                    Book Now
                  </Link>
                  <a
                    href={`https://wa.me/918302903734?text=${encodeURIComponent(`Hello Krishna Sheesh Mahal, I would like to book Super Deluxe Room on ${roomPlans["super-deluxe"]} Plan at ₹${roomPlans["super-deluxe"] === "EP" ? "1500" : roomPlans["super-deluxe"] === "CP" ? "1800" : "2100"}/night.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--regular"
                    style={{ backgroundColor: '#25D366', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: '30px', textDecoration: 'none', fontSize: '0.85rem' }}
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Premium Room Section */}
        <section id="premium">
          <div className="room-card">
            <div className="room-image-wrapper">
              <img src={ROOM_PREMIUM} alt="Premium Room" className="room-img" loading="lazy" />
            </div>
            
            <div className="room-content">
              <h2 className="subtitle" style={{ letterSpacing: '0.2em', color: 'color-mix(in srgb, var(--heading-color) 60%, transparent)' }}>ELEVATED COMFORT</h2>
              <h3 style={{ fontSize: 'var(--h3)', lineHeight: '1.1', marginBottom: '10px', fontFamily: 'var(--font-2)', color: 'var(--heading-color)' }}>
                Premium <em style={{ fontFamily: 'var(--font-3)', fontStyle: 'italic', fontWeight: '300' }}>Room</em>
              </h3>
              <div style={{ width: '40px', height: '2px', backgroundColor: 'var(--maroon)', margin: '14px 0' }}></div>
              <p style={{ fontSize: '1rem', lineHeight: '1.6', marginBottom: '16px', color: 'color-mix(in srgb, var(--text-color) 70%, transparent)' }}>
                Elevate your experience with upgraded amenities and additional space. Size: 22m²
              </p>
              <ul className="feature-list" style={{ marginBottom: '14px' }}>
                <li className="feature-item"><div className="feature-dot"></div> Free Wi-Fi</li>
                <li className="feature-item"><div className="feature-dot"></div> Smart TV</li>
                <li className="feature-item"><div className="feature-dot"></div> AC & Tea Kettle</li>
              </ul>

              {/* Meal Plan Switcher */}
              <div className="plan-switcher">
                <div className="plan-switcher-title">
                  <span>Select Meal Plan</span>
                  <span style={{ color: 'var(--maroon)' }}>{roomPlans["premium"]} Plan</span>
                </div>
                <div className="plan-tabs">
                  <button
                    type="button"
                    className={`plan-tab-btn ${roomPlans["premium"] === "EP" ? "active" : ""}`}
                    onClick={() => setRoomPlans((prev) => ({ ...prev, premium: "EP" }))}
                  >
                    <span className="plan-tab-code">EP</span>
                    <span className="plan-tab-price">₹1800</span>
                  </button>
                  <button
                    type="button"
                    className={`plan-tab-btn ${roomPlans["premium"] === "CP" ? "active" : ""}`}
                    onClick={() => setRoomPlans((prev) => ({ ...prev, premium: "CP" }))}
                  >
                    <span className="plan-tab-code">CP</span>
                    <span className="plan-tab-price">₹2100</span>
                  </button>
                  <button
                    type="button"
                    className={`plan-tab-btn ${roomPlans["premium"] === "AMP" ? "active" : ""}`}
                    onClick={() => setRoomPlans((prev) => ({ ...prev, premium: "AMP" }))}
                  >
                    <span className="plan-tab-code">AMP</span>
                    <span className="plan-tab-price">₹2400</span>
                  </button>
                </div>

                <div className="plan-inclusion-box">
                  <span className="plan-inclusion-icon">
                    {roomPlans["premium"] === "EP" && "🛏️"}
                    {roomPlans["premium"] === "CP" && "🥞"}
                    {roomPlans["premium"] === "AMP" && "🍛"}
                  </span>
                  <div>
                    {roomPlans["premium"] === "EP" && (
                      <>
                        <strong>EP (Room Only):</strong> Pure royal living with all in-room amenities, AC, Smart TV, Wi-Fi & 24/7 room service.
                      </>
                    )}
                    {roomPlans["premium"] === "CP" && (
                      <>
                        <strong>CP (Bed & Breakfast):</strong> Includes hot Stuffed Aloo Paratha with fresh curd, iconic Kota Kadhi Kachori, and Tea / Coffee.
                      </>
                    )}
                    {roomPlans["premium"] === "AMP" && (
                      <>
                        <strong>AMP (Breakfast + Super Deluxe Thali):</strong> Morning Breakfast + Grand Royal Super Deluxe Thali (Lunch or Dinner).
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '15px' }}>
                <div>
                  <div className="price-tag">
                    ₹{roomPlans["premium"] === "EP" ? "1800" : roomPlans["premium"] === "CP" ? "2100" : "2400"}
                  </div>
                  <div className="price-label">Per Night ({roomPlans["premium"]} Plan)</div>
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <Link
                    to={`/booking?type=rooms&room=premium&plan=${roomPlans["premium"]}`}
                    className="btn btn--regular"
                    style={{ backgroundColor: 'var(--heading-color)', color: '#fff', border: 'none', padding: '10px 22px', borderRadius: '30px', textDecoration: 'none', fontSize: '0.9rem' }}
                  >
                    Book Now
                  </Link>
                  <a
                    href={`https://wa.me/918302903734?text=${encodeURIComponent(`Hello Krishna Sheesh Mahal, I would like to book Premium Room on ${roomPlans["premium"]} Plan at ₹${roomPlans["premium"] === "EP" ? "1800" : roomPlans["premium"] === "CP" ? "2100" : "2400"}/night.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--regular"
                    style={{ backgroundColor: '#25D366', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: '30px', textDecoration: 'none', fontSize: '0.85rem' }}
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Suite Section */}
        <section id="suite">
          <div className="room-card room-card--reverse">
            <div className="room-image-wrapper">
              <img src={ROOM_SUITE} alt="Suite" className="room-img" loading="lazy" />
            </div>
            
            <div className="room-content">
              <h2 className="subtitle" style={{ letterSpacing: '0.2em', color: 'color-mix(in srgb, var(--heading-color) 60%, transparent)' }}>ULTIMATE EXPERIENCE</h2>
              <h3 style={{ fontSize: 'var(--h3)', lineHeight: '1.1', marginBottom: '10px', fontFamily: 'var(--font-2)', color: 'var(--heading-color)' }}>
                Suite <em style={{ fontFamily: 'var(--font-3)', fontStyle: 'italic', fontWeight: '300' }}></em>
              </h3>
              <div style={{ width: '40px', height: '2px', backgroundColor: 'var(--maroon)', margin: '14px 0' }}></div>
              <p style={{ fontSize: '1rem', lineHeight: '1.6', marginBottom: '16px', color: 'color-mix(in srgb, var(--text-color) 70%, transparent)' }}>
                Experience the pinnacle of luxury with a spacious layout for an unforgettable stay. Size: 25m²
              </p>
              <ul className="feature-list" style={{ marginBottom: '14px' }}>
                <li className="feature-item"><div className="feature-dot"></div> Free Wi-Fi</li>
                <li className="feature-item"><div className="feature-dot"></div> Smart TV</li>
                <li className="feature-item"><div className="feature-dot"></div> AC & Tea Kettle</li>
              </ul>

              {/* Meal Plan Switcher */}
              <div className="plan-switcher">
                <div className="plan-switcher-title">
                  <span>Select Meal Plan</span>
                  <span style={{ color: 'var(--maroon)' }}>{roomPlans["suite"]} Plan</span>
                </div>
                <div className="plan-tabs">
                  <button
                    type="button"
                    className={`plan-tab-btn ${roomPlans["suite"] === "EP" ? "active" : ""}`}
                    onClick={() => setRoomPlans((prev) => ({ ...prev, suite: "EP" }))}
                  >
                    <span className="plan-tab-code">EP</span>
                    <span className="plan-tab-price">₹3199</span>
                  </button>
                  <button
                    type="button"
                    className={`plan-tab-btn ${roomPlans["suite"] === "CP" ? "active" : ""}`}
                    onClick={() => setRoomPlans((prev) => ({ ...prev, suite: "CP" }))}
                  >
                    <span className="plan-tab-code">CP</span>
                    <span className="plan-tab-price">₹3499</span>
                  </button>
                  <button
                    type="button"
                    className={`plan-tab-btn ${roomPlans["suite"] === "AMP" ? "active" : ""}`}
                    onClick={() => setRoomPlans((prev) => ({ ...prev, suite: "AMP" }))}
                  >
                    <span className="plan-tab-code">AMP</span>
                    <span className="plan-tab-price">₹3799</span>
                  </button>
                </div>

                <div className="plan-inclusion-box">
                  <span className="plan-inclusion-icon">
                    {roomPlans["suite"] === "EP" && "🛏️"}
                    {roomPlans["suite"] === "CP" && "🥞"}
                    {roomPlans["suite"] === "AMP" && "🍛"}
                  </span>
                  <div>
                    {roomPlans["suite"] === "EP" && (
                      <>
                        <strong>EP (Room Only):</strong> Pure royal living with all in-room amenities, AC, Smart TV, Wi-Fi & 24/7 room service.
                      </>
                    )}
                    {roomPlans["suite"] === "CP" && (
                      <>
                        <strong>CP (Bed & Breakfast):</strong> Includes hot Stuffed Aloo Paratha with fresh curd, iconic Kota Kadhi Kachori, and Tea / Coffee.
                      </>
                    )}
                    {roomPlans["suite"] === "AMP" && (
                      <>
                        <strong>AMP (Breakfast + Super Deluxe Thali):</strong> Morning Breakfast + Grand Royal Super Deluxe Thali (Lunch or Dinner).
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '15px' }}>
                <div>
                  <div className="price-tag">
                    ₹{roomPlans["suite"] === "EP" ? "3199" : roomPlans["suite"] === "CP" ? "3499" : "3799"}
                  </div>
                  <div className="price-label">Per Night ({roomPlans["suite"]} Plan)</div>
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <Link
                    to={`/booking?type=rooms&room=suite&plan=${roomPlans["suite"]}`}
                    className="btn btn--regular"
                    style={{ backgroundColor: 'var(--heading-color)', color: '#fff', border: 'none', padding: '10px 22px', borderRadius: '30px', textDecoration: 'none', fontSize: '0.9rem' }}
                  >
                    Book Now
                  </Link>
                  <a
                    href={`https://wa.me/918302903734?text=${encodeURIComponent(`Hello Krishna Sheesh Mahal, I would like to book Suite on ${roomPlans["suite"]} Plan at ₹${roomPlans["suite"] === "EP" ? "3199" : roomPlans["suite"] === "CP" ? "3499" : "3799"}/night.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--regular"
                    style={{ backgroundColor: '#25D366', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: '30px', textDecoration: 'none', fontSize: '0.85rem' }}
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Royal Meal Plans & Tariff Schedule Section */}
      <section id="tariff-plans" className="tariff-section">
        <div className="tariff-container">
          <div className="tariff-header">
            <div className="tariff-subtitle">Royal Living & Dining Packages</div>
            <h2 className="tariff-title">Tariff Schedule & <em>Meal Plans</em></h2>
            <p className="tariff-desc">
              Transparent hospitality packages tailored to your comfort. Choose between pure room accommodation (EP), our authentic Rajasthani morning breakfast feast (CP), or all-inclusive royal dining featuring our signature Super Deluxe Thali (AMP).
            </p>
          </div>

          {/* 3 Meal Plan Feature Cards */}
          <div className="tariff-plans-grid">
            {/* EP Plan */}
            <div className="tariff-plan-card">
              <span className="tariff-plan-badge" style={{ backgroundColor: '#555' }}>Room Only</span>
              <h3 className="tariff-card-name">EP Plan</h3>
              <div className="tariff-card-tagline">European Plan • Pure Luxury Stay</div>
              
              <div className="tariff-rates-box">
                <div className="tariff-rates-title">Package Tariffs (Per Night)</div>
                <div className="tariff-rate-row"><span>Deluxe Room:</span><strong>₹1,200</strong></div>
                <div className="tariff-rate-row"><span>Super Deluxe Room:</span><strong>₹1,500</strong></div>
                <div className="tariff-rate-row"><span>Premium Room:</span><strong>₹1,800</strong></div>
                <div className="tariff-rate-row"><span>Royal Suite:</span><strong>₹3,199</strong></div>
              </div>

              <ul className="tariff-inclusions-list">
                <li className="tariff-inclusion-item"><span className="tariff-check">✓</span> Plush bedding & regal room interiors</li>
                <li className="tariff-inclusion-item"><span className="tariff-check">✓</span> High-speed complimentary Wi-Fi & Smart TV</li>
                <li className="tariff-inclusion-item"><span className="tariff-check">✓</span> Air conditioning & in-room tea/coffee kettle</li>
                <li className="tariff-inclusion-item"><span className="tariff-check">✓</span> 24/7 Room service & concierge support</li>
              </ul>

              <Link
                to="/booking?type=rooms&plan=EP"
                className="btn btn--regular"
                style={{ marginTop: 'auto', textAlign: 'center', backgroundColor: '#333', color: '#fff', borderRadius: '30px', padding: '12px 24px', textDecoration: 'none' }}
              >
                Book EP Plan
              </Link>
            </div>

            {/* CP Plan */}
            <div className="tariff-plan-card featured">
              <span className="tariff-plan-badge">Popular Choice</span>
              <h3 className="tariff-card-name">CP Plan</h3>
              <div className="tariff-card-tagline">Continental Plan • Stay + Breakfast</div>
              
              <div className="tariff-rates-box">
                <div className="tariff-rates-title">Package Tariffs (Per Night)</div>
                <div className="tariff-rate-row"><span>Deluxe Room:</span><strong>₹1,500</strong></div>
                <div className="tariff-rate-row"><span>Super Deluxe Room:</span><strong>₹1,800</strong></div>
                <div className="tariff-rate-row"><span>Premium Room:</span><strong>₹2,100</strong></div>
                <div className="tariff-rate-row"><span>Royal Suite:</span><strong>₹3,499</strong></div>
              </div>

              <ul className="tariff-inclusions-list">
                <li className="tariff-inclusion-item"><span className="tariff-check">✓</span> All EP room amenities & luxury comforts</li>
                <li className="tariff-inclusion-item"><span className="tariff-check">🥞</span> <strong>Hot Stuffed Aloo Paratha</strong> with fresh curd & pickle</li>
                <li className="tariff-inclusion-item"><span className="tariff-check">🍲</span> <strong>Famous Kota Kadhi Kachori</strong> (crisp & spicy)</li>
                <li className="tariff-inclusion-item"><span className="tariff-check">☕</span> <strong>Fresh Masala Tea & Artisanal Coffee</strong></li>
              </ul>

              <Link
                to="/booking?type=rooms&plan=CP"
                className="btn btn--regular"
                style={{ marginTop: 'auto', textAlign: 'center', backgroundColor: 'var(--maroon)', color: '#fff', borderRadius: '30px', padding: '12px 24px', textDecoration: 'none' }}
              >
                Book CP Plan
              </Link>
            </div>

            {/* AMP Plan */}
            <div className="tariff-plan-card featured" style={{ borderColor: '#b8860b' }}>
              <span className="tariff-plan-badge" style={{ backgroundColor: '#b8860b' }}>Royal Feast</span>
              <h3 className="tariff-card-name">AMP Plan</h3>
              <div className="tariff-card-tagline">Modified American Plan • Stay + Breakfast + Thali</div>
              
              <div className="tariff-rates-box">
                <div className="tariff-rates-title">Package Tariffs (Per Night)</div>
                <div className="tariff-rate-row"><span>Deluxe Room:</span><strong>₹1,800</strong></div>
                <div className="tariff-rate-row"><span>Super Deluxe Room:</span><strong>₹2,100</strong></div>
                <div className="tariff-rate-row"><span>Premium Room:</span><strong>₹2,400</strong></div>
                <div className="tariff-rate-row"><span>Royal Suite:</span><strong>₹3,799</strong></div>
              </div>

              <ul className="tariff-inclusions-list">
                <li className="tariff-inclusion-item"><span className="tariff-check">✓</span> All EP room amenities & royal accommodations</li>
                <li className="tariff-inclusion-item"><span className="tariff-check">🥞</span> <strong>Complete Morning Breakfast</strong> (Aloo Paratha, Kadhi Kachori, Tea & Coffee)</li>
                <li className="tariff-inclusion-item"><span className="tariff-check">👑</span> <strong>Grand Super Deluxe Thali</strong> (Lunch or Dinner)</li>
                <li className="tariff-inclusion-item"><span className="tariff-check">🍛</span> Paneer butter masala/shahi paneer, dal makhani, seasonal sabzi, hot butter rotis, fragrant basmati rice, raita, salad & sweet dessert</li>
              </ul>

              <Link
                to="/booking?type=rooms&plan=AMP"
                className="btn btn--regular"
                style={{ marginTop: 'auto', textAlign: 'center', backgroundColor: '#8a151b', color: '#fff', borderRadius: '30px', padding: '12px 24px', textDecoration: 'none' }}
              >
                Book AMP Plan
              </Link>
            </div>
          </div>

          {/* Master Comparison Matrix Table */}
          <div className="tariff-matrix-card">
            <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
              <div>
                <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-2)', color: 'var(--heading-color)', margin: 0 }}>
                  Complete Tariff Comparison Matrix
                </h3>
                <p style={{ margin: '4px 0 0', fontSize: '0.9rem', color: '#666' }}>
                  All rates in INR (₹) per room per night. Taxes as applicable.
                </p>
              </div>
              <a
                href="https://wa.me/918302903734?text=Hello%20Krishna%20Sheesh%20Mahal,%20I%20have%20an%20enquiry%20regarding%20room%20tariffs%20and%20meal%20plans."
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#25D366', fontWeight: 600, textDecoration: 'none', fontSize: '0.95rem' }}
              >
                Direct WhatsApp Inquiry →
              </a>
            </div>

            <table className="tariff-table">
              <thead>
                <tr>
                  <th>Room Category</th>
                  <th>EP (Room Only)</th>
                  <th>CP (With Breakfast)</th>
                  <th>AMP (Breakfast + Super Deluxe Thali)</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>Deluxe Room</strong>
                    <div style={{ fontSize: '0.8rem', color: '#888' }}>19m² • Smart TV & AC</div>
                  </td>
                  <td><span className="tariff-table-price">₹1,200</span></td>
                  <td><span className="tariff-table-price">₹1,500</span></td>
                  <td><span className="tariff-table-price">₹1,800</span></td>
                  <td>
                    <Link to="/booking?type=rooms&room=deluxe" className="btn btn--small" style={{ textDecoration: 'none', padding: '8px 18px', borderRadius: '20px', backgroundColor: 'var(--heading-color)', color: '#fff', fontSize: '0.85rem' }}>
                      Book Room
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Super Deluxe Room</strong>
                    <div style={{ fontSize: '0.8rem', color: '#888' }}>20m² • Spacious Comfort</div>
                  </td>
                  <td><span className="tariff-table-price">₹1,500</span></td>
                  <td><span className="tariff-table-price">₹1,800</span></td>
                  <td><span className="tariff-table-price">₹2,100</span></td>
                  <td>
                    <Link to="/booking?type=rooms&room=super-deluxe" className="btn btn--small" style={{ textDecoration: 'none', padding: '8px 18px', borderRadius: '20px', backgroundColor: 'var(--heading-color)', color: '#fff', fontSize: '0.85rem' }}>
                      Book Room
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Premium Room</strong>
                    <div style={{ fontSize: '0.8rem', color: '#888' }}>22m² • Elevated Luxury</div>
                  </td>
                  <td><span className="tariff-table-price">₹1,800</span></td>
                  <td><span className="tariff-table-price">₹2,100</span></td>
                  <td><span className="tariff-table-price">₹2,400</span></td>
                  <td>
                    <Link to="/booking?type=rooms&room=premium" className="btn btn--small" style={{ textDecoration: 'none', padding: '8px 18px', borderRadius: '20px', backgroundColor: 'var(--heading-color)', color: '#fff', fontSize: '0.85rem' }}>
                      Book Room
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Royal Suite</strong>
                    <div style={{ fontSize: '0.8rem', color: '#888' }}>25m² • Pinnacle Luxury</div>
                  </td>
                  <td><span className="tariff-table-price">₹3,199</span></td>
                  <td><span className="tariff-table-price">₹3,499</span></td>
                  <td><span className="tariff-table-price">₹3,799</span></td>
                  <td>
                    <Link to="/booking?type=rooms&room=suite" className="btn btn--small" style={{ textDecoration: 'none', padding: '8px 18px', borderRadius: '20px', backgroundColor: 'var(--heading-color)', color: '#fff', fontSize: '0.85rem' }}>
                      Book Room
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Services & Amenities Grid */}
      <section className="services-section">
        <div className="services-grid-wrapper">
          <div className="services-grid">
            
            {/* Block 1 (Large Intro) */}
            <button onClick={(e) => { e.preventDefault(); onBookNow?.("Room"); }} className="srv-block srv-block--large" style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
              <div className="srv-block-bg" style={{ backgroundImage: `url(${ROOM_HERO})` }}></div>
              <div className="srv-overlay"></div>
              <div className="srv-content" style={{ justifyContent: 'flex-end' }}>
                <h3 className="srv-title">Book an<br/>Experience</h3>
                <p className="srv-desc" style={{ color: 'rgba(255,255,255,0.8)' }}>With country's leading hospitality experts.</p>
                <span className="srv-link">Book Now</span>
              </div>
            </button>

            {/* Block 2 (Fine Dining) */}
            <a href="#dining" className="srv-block">
              <span className="srv-block-num">01</span>
              <div className="srv-content">
                <svg className="srv-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                <div style={{ marginTop: 'auto' }}>
                  <h4 className="srv-title">Fine Dining</h4>
                  <p className="srv-desc">Our culinary expertise delivering world-class flavors.</p>
                </div>
              </div>
            </a>

            {/* Block 3 (Concierge) */}
            <a href="#concierge" className="srv-block">
              <span className="srv-block-num">02</span>
              <div className="srv-content">
                <svg className="srv-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                <div style={{ marginTop: 'auto' }}>
                  <h4 className="srv-title">Concierge</h4>
                  <p className="srv-desc">Top experts to curate your perfect stay.</p>
                </div>
              </div>
            </a>

            {/* Block 4 (Spa) */}
            <a href="#spa" className="srv-block">
              <span className="srv-block-num">03</span>
              <div className="srv-content">
                <svg className="srv-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
                <div style={{ marginTop: 'auto' }}>
                  <h4 className="srv-title">Luxury Spa</h4>
                  <p className="srv-desc">Preventive and restorative care packages.</p>
                </div>
              </div>
            </a>

            {/* Block 5 (24/7 Service) */}
            <a href="#service" className="srv-block">
              <span className="srv-block-num">04</span>
              <div className="srv-content">
                <svg className="srv-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                <div style={{ marginTop: 'auto' }}>
                  <h4 className="srv-title">24/7 Service</h4>
                  <p className="srv-desc">Immediate support anytime you need it.</p>
                </div>
              </div>
            </a>

            {/* Block 6 (Experiences - Large Right) */}
            <a href="#experiences" className="srv-block srv-block--large">
              <div className="srv-block-bg" style={{ backgroundImage: `url(${ROOM_EXPERIENCES})` }}></div>
              <div className="srv-overlay"></div>
              <div className="srv-content" style={{ justifyContent: 'flex-end' }}>
                <h3 className="srv-title">Experiences</h3>
                <p className="srv-desc" style={{ color: 'rgba(255,255,255,0.8)' }}>Curated local tours and activities designed for you.</p>
                <span className="srv-link">View Guide</span>
              </div>
            </a>

          </div>
        </div>
      </section>

      <QuoteSlider />
    </>
  );
}
