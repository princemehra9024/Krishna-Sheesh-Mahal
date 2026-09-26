import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Contact() {
  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", message: "" });
  const [step, setStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const faqs = [
    {
      question: "Check-in & Check-out Times",
      answer: "Check-in time is 12:00 PM and check-out time is 11:00 AM. Early check-in or late check-out is subject to availability and may incur additional charges.",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      question: "Parking Facilities",
      answer: "Yes, we offer complimentary parking for all our guests safely within the hotel premises.",
      image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      question: "Breakfast Inclusions",
      answer: "This depends on the package you choose. We offer both room-only rates and rates inclusive of a complimentary buffet breakfast.",
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      question: "Events & Weddings",
      answer: "Absolutely. We have extensive banquet facilities perfect for weddings, corporate events, and private parties. Please contact our event management team for details.",
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    }
  ];

  // Total steps before submission (0: Name, 1: Email, 2: Message)
  const totalSteps = 3;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => {
    if (step < totalSteps && !isAnimating) {
      // Basic validation before moving
      if (step === 0 && (!formData.firstName.trim() || !formData.lastName.trim())) return;
      if (step === 1 && !formData.email.trim()) return;
      if (step === 2 && !formData.message.trim()) {
         // handle submit
         setStep(3); // Success step
         return;
      }

      setIsAnimating(true);
      setTimeout(() => {
        setStep((s) => s + 1);
        setIsAnimating(false);
      }, 400); // matches CSS transition
    }
  };

  const prevStep = () => {
    if (step > 0 && !isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setStep((s) => s - 1);
        setIsAnimating(false);
      }, 400);
    }
  };

  // Allow 'Enter' to go to next step
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && step < 2) {
        e.preventDefault();
        nextStep();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  return (
    <div className="contact-page-wrapper">
      <style>
        {`
          .contact-page-wrapper {
            background-color: var(--cream);
            color: var(--text-color);
            min-height: 100vh;
            display: flex;
            flex-direction: column;
          }
          
          /* Header Section */
          .contact-header {
            background-color: var(--cream);
            padding: 80px 0 60px;
            text-align: left;
            border-bottom: 1px solid rgba(0,0,0,0.05);
          }
          .breadcrumb {
            font-size: var(--text-mini);
            color: color-mix(in srgb, var(--text-color) 60%, transparent);
            margin-bottom: 1rem;
            text-transform: uppercase;
            letter-spacing: 0.1em;
          }
          .breadcrumb a {
            color: inherit;
            transition: color 0.25s ease;
          }
          .breadcrumb a:hover {
            color: var(--heading-color);
          }
          .contact-title {
            font-family: var(--font-2);
            font-size: var(--h2);
            color: var(--heading-color);
            line-height: 1.1;
          }

          /* Main Content Layout */
          .contact-main {
            padding: var(--spacing-large) 0;
            display: flex;
            flex-wrap: wrap;
            gap: var(--spacing-large);
            align-items: stretch;
            flex-grow: 1;
          }
          
          /* Left Side: Info */
          .contact-info-side {
            flex: 1 1 400px;
            max-width: 500px;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }
          .info-heading {
            font-family: var(--font-2);
            font-size: var(--h4);
            color: var(--heading-color);
            margin-bottom: 1rem;
            line-height: 1.2;
          }
          .info-subtext {
            color: color-mix(in srgb, var(--text-color) 70%, transparent);
            font-size: var(--text-small);
            margin-bottom: 3.5rem;
            line-height: 1.6;
          }

          .contact-list {
            display: flex;
            flex-direction: column;
            gap: 2.5rem;
          }
          .contact-list-item {
            display: flex;
            align-items: center;
            gap: 1.5rem;
            cursor: default;
          }
          .contact-icon-wrapper {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background-color: rgba(255,255,255,0.7);
            border: 1px solid rgba(0,0,0,0.05);
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            position: relative;
            overflow: hidden;
          }
          .contact-icon-wrapper::before {
            content: '';
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: var(--heading-color);
            transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            border-radius: 50%;
            z-index: 0;
          }
          .contact-list-item:hover .contact-icon-wrapper {
            transform: scale(1.1);
            box-shadow: 0 10px 20px rgba(0,0,0,0.1);
          }
          .contact-list-item:hover .contact-icon-wrapper::before {
            transform: translateY(-100%);
          }
          .contact-icon-wrapper svg {
            width: 24px;
            height: 24px;
            stroke: var(--heading-color);
            transition: stroke 0.4s ease;
            position: relative;
            z-index: 1;
          }
          .contact-list-item:hover .contact-icon-wrapper svg {
            stroke: #fff;
          }
          .contact-item-text {
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
          }
          .contact-item-title {
            font-family: var(--font-1);
            font-weight: var(--weight-bold);
            font-size: var(--text-small);
            color: var(--heading-color);
          }
          .contact-item-detail {
            color: color-mix(in srgb, var(--text-color) 70%, transparent);
            font-size: var(--text-small);
            transition: color 0.3s ease;
          }
          .contact-list-item:hover .contact-item-detail {
            color: var(--heading-color);
          }

          /* WhatsApp Specific Style */
          .whatsapp-item {
            margin-top: 1.5rem;
            padding: 1.5rem 2rem;
            background: linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.5) 100%);
            border-radius: 20px;
            border: 1px solid rgba(37, 211, 102, 0.3);
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            position: relative;
            overflow: hidden;
            box-shadow: 0 8px 25px rgba(37, 211, 102, 0.1);
          }
          .whatsapp-item::after {
            content: '';
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            background: linear-gradient(135deg, rgba(37, 211, 102, 0.1) 0%, rgba(37, 211, 102, 0.03) 100%);
            opacity: 0;
            transition: opacity 0.4s ease;
            z-index: 0;
          }
          .whatsapp-item:hover {
            transform: translateY(-8px);
            border-color: rgba(37, 211, 102, 0.5);
            box-shadow: 0 20px 40px rgba(37, 211, 102, 0.2);
          }
          .whatsapp-item:hover::after {
            opacity: 1;
          }
          .whatsapp-item .contact-icon-wrapper,
          .whatsapp-item .contact-item-text {
            position: relative;
            z-index: 1;
          }
          .whatsapp-item .contact-icon-wrapper {
            width: 75px;
            height: 75px;
            background-color: rgba(37, 211, 102, 0.1);
            border-color: rgba(37, 211, 102, 0.2);
          }
          .whatsapp-item .contact-icon-wrapper svg {
            width: 32px;
            height: 32px;
            stroke: #25D366;
          }
          .whatsapp-item .contact-icon-wrapper::before {
            background-color: #25D366;
          }
          .whatsapp-item:hover .contact-icon-wrapper {
            transform: scale(1.15) rotate(15deg);
          }
          .whatsapp-item:hover .contact-icon-wrapper svg {
            stroke: #fff;
          }
          .whatsapp-item .contact-item-title {
            font-size: var(--h6, 1.25rem);
            color: #1DA851;
          }
          .whatsapp-item .contact-item-detail {
            font-size: var(--text-regular, 1.1rem);
            color: color-mix(in srgb, var(--text-color) 80%, transparent);
          }
          .whatsapp-item:hover .contact-item-detail {
            color: #1DA851;
            font-weight: var(--weight-bold);
          }

          /* Right Side: Typeform Style Container */
          .contact-form-side {
            flex: 1 1 500px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            background-color: rgba(255,255,255,0.7);
            border: 1px solid rgba(0,0,0,0.05);
            border-radius: 20px;
            padding: 40px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.02);
            position: relative;
            overflow: hidden;
          }

          /* Progress Bar */
          .form-progress-bg {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 6px;
            background-color: rgba(0,0,0,0.05);
          }
          .form-progress-bar {
            height: 100%;
            background-color: var(--gold);
            transition: width 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          }

          /* Question Container */
          .question-container {
            transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          }
          .question-container.animating-out {
            opacity: 0;
            transform: translateY(-20px);
          }
          .question-container.animating-in {
            opacity: 0;
            transform: translateY(20px);
            animation: slideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
          @keyframes slideIn {
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .step-number {
            font-family: var(--font-1);
            color: var(--heading-color);
            font-weight: var(--weight-bold);
            font-size: var(--text-mini);
            text-transform: uppercase;
            letter-spacing: 0.1em;
            margin-bottom: 1rem;
            display: inline-flex;
            align-items: center;
            gap: 10px;
          }
          .step-number::before {
            content: '';
            display: block;
            width: 24px;
            height: 1px;
            background-color: var(--heading-color);
          }

          .question-title {
            font-family: var(--font-2);
            font-size: var(--h3);
            color: var(--heading-color);
            margin-bottom: 2rem;
            line-height: 1.1;
          }
          
          /* Typeform Inputs */
          .tf-input-group {
            display: flex;
            flex-direction: column;
            gap: 2rem;
            margin-bottom: 3rem;
          }
          .tf-row {
            display: flex;
            gap: 2rem;
          }
          .tf-input-wrapper {
            flex: 1;
            position: relative;
          }
          .tf-input {
            width: 100%;
            font-size: var(--h5);
            font-family: var(--font-1);
            color: var(--heading-color);
            background: transparent;
            border: none;
            border-bottom: 2px solid color-mix(in srgb, var(--border-color) 20%, transparent);
            padding: 10px 0;
            outline: none;
            transition: border-color 0.3s ease;
          }
          .tf-input::placeholder {
            color: color-mix(in srgb, var(--text-color) 30%, transparent);
          }
          .tf-input:focus {
            border-bottom-color: var(--heading-color);
          }
          .tf-textarea {
            resize: none;
            min-height: 100px;
          }

          /* Buttons */
          .tf-actions {
            display: flex;
            align-items: center;
            gap: 1.5rem;
          }
          .tf-btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 1rem 2.5rem;
            background-color: var(--heading-color);
            color: #fff;
            font-family: var(--font-1);
            font-weight: var(--weight-bold);
            font-size: var(--text-small);
            text-transform: uppercase;
            letter-spacing: 0.1em;
            border-radius: 50px;
            border: none;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          }
          .tf-btn:hover {
            background-color: var(--gold);
            color: #fff;
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(197, 157, 58, 0.2);
          }
          .tf-btn:disabled {
            background-color: color-mix(in srgb, var(--border-color) 20%, transparent);
            color: #fff;
            cursor: not-allowed;
            transform: none;
            box-shadow: none;
          }
          .tf-prev {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            border: 1px solid color-mix(in srgb, var(--border-color) 20%, transparent);
            background: transparent;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s ease;
          }
          .tf-prev:hover {
            border-color: var(--heading-color);
            background-color: var(--heading-color);
          }
          .tf-prev svg {
            width: 20px;
            height: 20px;
            stroke: var(--heading-color);
            transition: stroke 0.3s ease;
          }
          .tf-prev:hover svg {
            stroke: #fff;
          }
          .enter-hint {
            font-size: var(--text-mini);
            color: color-mix(in srgb, var(--text-color) 50%, transparent);
            font-weight: var(--weight-bold);
          }
          .enter-hint span {
            display: inline-block;
            padding: 2px 6px;
            background-color: #eee;
            border-radius: 4px;
            color: var(--text-color);
          }

          /* Success Step */
          .success-container {
            text-align: center;
            animation: slideIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
          .success-icon {
            width: 80px;
            height: 80px;
            background-color: var(--gold);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 2rem;
            color: #fff;
          }

          /* Map Section */
          .map-section {
            padding: var(--spacing-large) 0;
            background-color: var(--cream);
            border-top: 1px solid rgba(0,0,0,0.05);
          }
          .map-container {
            width: 100%;
            height: 450px;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0,0,0,0.05);
            margin-top: 3rem;
            margin-bottom: 2rem;
            position: relative;
          }
          .map-container iframe {
            width: 100%;
            height: 100%;
            border: 0;
          }
          .directions-btn {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            padding: 1rem 2.5rem;
            background-color: var(--heading-color);
            color: #fff;
            font-family: var(--font-1);
            font-weight: var(--weight-bold);
            font-size: var(--text-small);
            text-transform: uppercase;
            letter-spacing: 0.1em;
            border-radius: 50px;
            text-decoration: none;
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          }
          .directions-btn:hover {
            background-color: var(--gold);
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(197, 157, 58, 0.2);
          }

          /* Policies Section (Light & Staggered) */
          .policies-section-light {
            padding: var(--spacing-large) 0;
            background-color: var(--cream); /* Light background */
            color: var(--text-color);
          }
          .policy-row {
            display: flex;
            align-items: stretch;
            padding: 4rem 0 2rem;
            border-bottom: 1px solid rgba(0,0,0,0.1);
            gap: 2rem;
          }
          .policy-row:last-child {
            border-bottom: none;
          }
          .policy-left {
            flex: 0 0 35%;
            display: flex;
            flex-direction: column;
            position: relative;
            overflow: hidden; /* To cut off the bottom of the roman numeral */
          }
          .policy-category {
            font-family: var(--font-2);
            font-size: var(--h3);
            color: var(--heading-color);
            margin-bottom: 1rem;
            position: relative;
            z-index: 2;
          }
          .policy-roman {
            font-family: "Times New Roman", Times, serif; /* Guaranteed Serif for Roman look */
            font-size: 280px;
            font-weight: normal; 
            line-height: 0.75;
            margin-top: -10px;
            /* Outer dark and inner color light effect */
            background: linear-gradient(180deg, #fff 0%, rgba(255,255,255,0) 80%); /* Light inner */
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            -webkit-text-stroke: 2px var(--heading-color); /* Dark outer */
            z-index: 1;
            transform: translateY(15px); 
          }
          .policy-right {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            gap: 3rem;
            padding-bottom: 2rem;
            padding-top: 1rem;
          }
          .policy-item {
            display: flex;
            gap: 1.5rem;
            align-items: flex-start;
          }
          .policy-item.item-right {
            margin-left: 20%; /* Stagger effect */
          }
          .policy-item-num {
            font-family: var(--font-1);
            font-size: var(--text-large);
            font-weight: var(--weight-bold);
            color: var(--gold);
          }
          .policy-item-content {
            flex: 1;
          }
          .policy-item-title {
            font-family: var(--font-1);
            font-size: var(--h5);
            color: var(--heading-color);
            margin-bottom: 0.5rem;
            font-weight: var(--weight-bold);
          }
          .policy-item-text {
            color: color-mix(in srgb, var(--text-color) 80%, transparent);
            font-size: var(--text-regular);
            line-height: 1.6;
          }

          /* Custom Aesthetic Animations */
          .reveal-slide-left {
            opacity: 0;
            transform: translateX(-150px) scale(0.95);
            transition: all 1.2s cubic-bezier(0.16, 1, 0.3, 1);
          }
          .reveal-slide-right {
            opacity: 0;
            transform: translateX(150px) scale(0.95);
            transition: all 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.2s; /* slight delay for staggering */
          }
          .reveal.is-revealed.reveal-slide-left,
          .reveal.is-revealed.reveal-slide-right {
            opacity: 1;
            transform: translateX(0) scale(1);
          }

          /* FAQ Section */
          .faq-section {
            padding: var(--spacing-large) 0;
            background-color: var(--cream);
          }
          .faq-zig-zag {
            display: flex;
            flex-direction: column;
            gap: 0;
            max-width: 1000px;
            margin: 4rem auto 0;
          }
          .faq-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 4rem 0;
            border-bottom: 1px solid rgba(0,0,0,0.05);
            gap: 4rem;
          }
          .faq-row:last-child {
            border-bottom: none;
          }
          .faq-row:nth-child(even) {
            flex-direction: row-reverse;
          }
          .faq-text-content {
            flex: 1;
            padding-right: 2rem;
          }
          .faq-row:nth-child(even) .faq-text-content {
            padding-right: 0;
            padding-left: 2rem;
          }
          .faq-question {
            font-family: var(--font-2);
            font-size: var(--h3);
            color: var(--heading-color);
            margin-bottom: 1rem;
            line-height: 1.2;
            position: relative;
            padding-bottom: 1rem;
          }
          .faq-question::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 50px;
            height: 2px;
            background-color: var(--gold);
          }
          .faq-answer {
            color: color-mix(in srgb, var(--text-color) 70%, transparent);
            font-size: var(--text-regular);
            line-height: 1.6;
          }
          .faq-number-wrapper {
            flex: 0 0 auto;
            font-family: var(--font-1);
            font-size: 220px;
            font-weight: 900;
            line-height: 1;
            letter-spacing: -10px;
            background-size: cover;
            background-position: center;
            background-clip: text;
            -webkit-background-clip: text;
            color: transparent;
            text-shadow: 0px 10px 30px rgba(0,0,0,0.05);
          }

          /* CTA Section (Unique Aesthetic) */
          .cta-wrapper {
            padding: 100px 20px;
            background-color: var(--cream);
          }
          .cta-box-unique {
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            align-items: stretch;
            background-color: var(--heading-color);
            border-radius: 0 120px 0 120px; /* Asymmetrical modern shape */
            overflow: hidden;
            box-shadow: 0 30px 60px rgba(0,0,0,0.15);
            transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          }
          .cta-box-unique:hover {
            transform: translateY(-10px);
          }
          .cta-unique-img {
            flex: 0 0 45%;
            min-height: 450px;
            background: url('https://images.unsplash.com/photo-1542314831-c6a4d14d8c85?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80') center/cover no-repeat;
            position: relative;
          }
          .cta-unique-img::after {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(to right, rgba(26,28,35,0) 50%, var(--heading-color) 100%);
          }
          .cta-unique-content {
            flex: 1;
            padding: 80px 80px 80px 40px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            position: relative;
          }
          .cta-unique-content::before {
            content: '✦';
            position: absolute;
            top: 40px;
            right: 60px;
            font-size: 80px;
            color: rgba(197, 157, 58, 0.1);
            font-family: var(--font-2);
          }
          .cta-title {
            font-family: var(--font-2);
            font-size: clamp(2.5rem, 4vw, 4rem);
            margin-bottom: 1.5rem;
            color: #fff;
            line-height: 1.1;
          }
          .cta-title i {
            color: var(--gold);
            font-style: italic;
            font-weight: 400;
          }
          .cta-text {
            font-family: var(--font-1);
            font-size: var(--text-regular);
            color: rgba(255, 255, 255, 0.7);
            margin-bottom: 3rem;
            max-width: 500px;
            line-height: 1.6;
          }
          .cta-btn-unique {
            display: inline-flex;
            align-items: center;
            gap: 15px;
            padding: 1.2rem 3rem;
            background-color: var(--gold);
            color: #fff;
            font-family: var(--font-1);
            font-weight: var(--weight-bold);
            font-size: var(--text-small);
            text-transform: uppercase;
            letter-spacing: 0.15em;
            border-radius: 50px;
            text-decoration: none;
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            box-shadow: 0 10px 20px rgba(197, 157, 58, 0.2);
          }
          .cta-btn-unique svg {
            width: 20px;
            height: 20px;
            transition: transform 0.3s ease;
          }
          .cta-btn-unique:hover {
            background-color: #fff;
            color: var(--heading-color);
            transform: translateY(-3px);
            box-shadow: 0 15px 30px rgba(197, 157, 58, 0.4);
          }
          .cta-btn-unique:hover svg {
            transform: translateX(5px);
          }

          @media (max-width: 992px) {
            .cta-box-unique {
              flex-direction: column;
              border-radius: 40px;
            }
            .cta-unique-img {
              min-height: 300px;
            }
            .cta-unique-img::after {
              background: linear-gradient(to bottom, rgba(26,28,35,0) 50%, var(--heading-color) 100%);
            }
            .cta-unique-content {
              padding: 40px 30px 60px;
              align-items: center;
              text-align: center;
            }
            .cta-text {
              margin-inline: auto;
            }
          }

          @media (max-width: 768px) {
            .faq-row, .faq-row:nth-child(even) {
              flex-direction: column-reverse;
              text-align: center;
              gap: 2rem;
              padding: 3rem 0;
            }
            .faq-text-content, .faq-row:nth-child(even) .faq-text-content {
              padding: 0;
            }
            .faq-question::after {
              left: 50%;
              transform: translateX(-50%);
            }
            .faq-number-wrapper {
              font-size: 140px;
            }
            .faq-question {
              font-size: var(--h4);
            }
            .policy-row {
              flex-direction: column;
              gap: 3rem;
              padding: 3rem 0;
            }
            .policy-roman {
              font-size: 180px;
            }
            .policy-item.item-right {
              margin-left: 0;
            }
            .contact-main {
              gap: 3rem;
            }
            .tf-row {
              flex-direction: column;
              gap: 2rem;
            }
            .contact-form-side {
              padding: 40px 20px;
            }
            .question-title {
              font-size: var(--h4);
            }
            .tf-input {
              font-size: var(--text-large);
            }
          }
        `}
      </style>

      {/* Header Area */}
      <section className="contact-header">
        <div className="section section--large">
          <div className="breadcrumb">
            <Link to="/">Home</Link> &nbsp;/&nbsp; Contact Us
          </div>
          <h1 className="contact-title">Contact Us</h1>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="section section--large contact-main">
        
        {/* Left Side: Info */}
        <div className="contact-info-side">
          <h2 className="info-heading">Need more information?<br/>Get in touch with us</h2>
          <p className="info-subtext">A connected set of services designed to turn strategy into scale</p>

          <div className="contact-list">
            
            <div className="contact-list-item">
              <div className="contact-icon-wrapper">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </div>
              <div className="contact-item-text">
                <span className="contact-item-title">Phone Number</span>
                <a href="tel:+919024546041" className="contact-item-detail">+91 90245 46041</a>
              </div>
            </div>

            <div className="contact-list-item">
              <div className="contact-icon-wrapper">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <div className="contact-item-text">
                <span className="contact-item-title">Email</span>
                <a href="mailto:krishnasheeshmahal73@gmail.com" className="contact-item-detail">krishnasheeshmahal73@gmail.com</a>
              </div>
            </div>

            <div className="contact-list-item">
              <div className="contact-icon-wrapper">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
              <div className="contact-item-text">
                <span className="contact-item-title">Address</span>
                <span className="contact-item-detail">Krishna Sheesh Mahal, 33-D,<br/>Sector - B, Shrinath Puram, Kota</span>
              </div>
            </div>

            <a href="https://wa.me/919024546041" target="_blank" rel="noopener noreferrer" style={{textDecoration: 'none'}}>
              <div className="contact-list-item whatsapp-item">
                <div className="contact-icon-wrapper">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                  </svg>
                </div>
                <div className="contact-item-text">
                  <span className="contact-item-title">WhatsApp</span>
                  <span className="contact-item-detail">Chat with us on WhatsApp</span>
                </div>
              </div>
            </a>

          </div>
        </div>

        {/* Right Side: Typeform Style Container */}
        <div className="contact-form-side">
          
          {step < 3 && (
            <div className="form-progress-bg">
              <div className="form-progress-bar" style={{ width: `${(step / totalSteps) * 100}%` }}></div>
            </div>
          )}

          <div className={`question-container ${isAnimating ? 'animating-out' : 'animating-in'}`}>
            
            {/* STEP 0: NAME */}
            {step === 0 && (
              <>
                <div className="step-number">Step 1 of 3</div>
                <h2 className="question-title">First, what's your name?</h2>
                
                <div className="tf-input-group">
                  <div className="tf-row">
                    <div className="tf-input-wrapper">
                      <input 
                        type="text" 
                        name="firstName"
                        className="tf-input"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleChange}
                        autoFocus
                      />
                    </div>
                    <div className="tf-input-wrapper">
                      <input 
                        type="text" 
                        name="lastName"
                        className="tf-input"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="tf-actions">
                  <button 
                    className="tf-btn" 
                    onClick={nextStep}
                    disabled={!formData.firstName.trim() || !formData.lastName.trim()}
                  >
                    OK
                  </button>
                  <span className="enter-hint">press <span>Enter ↵</span></span>
                </div>
              </>
            )}

            {/* STEP 1: EMAIL */}
            {step === 1 && (
              <>
                <div className="step-number">Step 2 of 3</div>
                <h2 className="question-title">Great to meet you, {formData.firstName}. <br/>How can we reach you?</h2>
                
                <div className="tf-input-group">
                  <div className="tf-input-wrapper">
                    <input 
                      type="email" 
                      name="email"
                      className="tf-input"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleChange}
                      autoFocus
                    />
                  </div>
                </div>

                <div className="tf-actions">
                  <button className="tf-prev" onClick={prevStep} aria-label="Previous step">
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                  </button>
                  <button 
                    className="tf-btn" 
                    onClick={nextStep}
                    disabled={!formData.email.trim()}
                  >
                    OK
                  </button>
                  <span className="enter-hint">press <span>Enter ↵</span></span>
                </div>
              </>
            )}

            {/* STEP 2: MESSAGE */}
            {step === 2 && (
              <>
                <div className="step-number">Step 3 of 3</div>
                <h2 className="question-title">What would you like to discuss?</h2>
                
                <div className="tf-input-group">
                  <div className="tf-input-wrapper">
                    <textarea 
                      name="message"
                      className="tf-input tf-textarea"
                      placeholder="Type your message here..."
                      value={formData.message}
                      onChange={handleChange}
                      autoFocus
                    />
                  </div>
                </div>

                <div className="tf-actions">
                  <button className="tf-prev" onClick={prevStep} aria-label="Previous step">
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                  </button>
                  <button 
                    className="tf-btn" 
                    onClick={() => setStep(3)}
                    disabled={!formData.message.trim()}
                  >
                    Submit
                  </button>
                </div>
              </>
            )}

            {/* STEP 3: SUCCESS */}
            {step === 3 && (
              <div className="success-container">
                <div className="success-icon">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <h2 className="question-title" style={{ marginBottom: '1rem' }}>Message Sent!</h2>
                <p className="info-subtext" style={{ fontSize: 'var(--text-regular)' }}>
                  Thanks for reaching out, {formData.firstName}. We'll get back to you shortly.
                </p>
                <button 
                  className="tf-btn" 
                  onClick={() => {
                    setFormData({ firstName: "", lastName: "", email: "", message: "" });
                    setStep(0);
                  }}
                  style={{ backgroundColor: 'var(--text-color)' }}
                >
                  Send another message
                </button>
              </div>
            )}

          </div>

        </div>

      </section>

      {/* 03. Google Maps + Directions */}
      <section className="map-section">
        <div className="section section--large">
          <h2 className="info-heading" style={{ textAlign: 'center' }}>Find Us</h2>
          <p className="info-subtext" style={{ textAlign: 'center', margin: '0 auto', maxWidth: '600px' }}>
            Conveniently located in Kota, we are easily accessible and provide ample parking for our guests.
          </p>
          
          <div className="map-container">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3612.359676646738!2d75.8309489!3d25.1235338!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396f851eb325f617%3A0x6b1db972e3995cb4!2sKrishna%20Sheesh%20Mahal!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
              allowFullScreen={false} 
              loading="lazy" 
              title="Google Maps Location of Krishna Sheesh Mahal"
              referrerPolicy="no-referrer-when-downgrade">
            </iframe>
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <a 
              href="https://maps.google.com/?q=Krishna+Sheesh+Mahal+Kota" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="directions-btn"
            >
              Get Directions
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* 04. Stay Information + Hotel Policies */}
      <section className="policies-section-light">
        <div className="section section--large">
          <h2 className="info-heading" style={{ textAlign: 'center' }}>Hotel Policies</h2>
          <p className="info-subtext" style={{ textAlign: 'center', margin: '0 auto 4rem', maxWidth: '600px' }}>
            Please review our stay information to ensure a comfortable and seamless experience.
          </p>

          <div className="policy-row">
            <div className="policy-left reveal reveal-slide-left">
              <h3 className="policy-category">Arrival &<br/>Departure</h3>
              <div className="policy-roman">I</div>
            </div>
            <div className="policy-right reveal reveal-slide-right">
              <div className="policy-item item-left">
                <span className="policy-item-num">1.</span>
                <div className="policy-item-content">
                  <h4 className="policy-item-title">Check-in Time</h4>
                  <p className="policy-item-text">12:00 PM. Guests must present a valid photo ID upon check-in. Early check-in is subject to availability.</p>
                </div>
              </div>
              <div className="policy-item item-right">
                <span className="policy-item-num">2.</span>
                <div className="policy-item-content">
                  <h4 className="policy-item-title">Check-out Time</h4>
                  <p className="policy-item-text">11:00 AM. Late check-out requests should be made at the reception and may incur additional charges.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="policy-row">
            <div className="policy-left reveal reveal-slide-left">
              <h3 className="policy-category">Booking<br/>Conditions</h3>
              <div className="policy-roman">II</div>
            </div>
            <div className="policy-right reveal reveal-slide-right">
              <div className="policy-item item-left">
                <span className="policy-item-num">3.</span>
                <div className="policy-item-content">
                  <h4 className="policy-item-title">Cancellation Policy</h4>
                  <p className="policy-item-text">Cancellations made 48 hours prior to the arrival date will incur no charges.</p>
                </div>
              </div>
              <div className="policy-item item-right">
                <span className="policy-item-num">4.</span>
                <div className="policy-item-content">
                  <h4 className="policy-item-title">No-Show Policy</h4>
                  <p className="policy-item-text">Cancellations made within 48 hours of arrival, or in case of a no-show, will be charged for the first night's stay.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="policy-row">
            <div className="policy-left reveal reveal-slide-left">
              <h3 className="policy-category">Guest<br/>Guidelines</h3>
              <div className="policy-roman">III</div>
            </div>
            <div className="policy-right reveal reveal-slide-right">
              <div className="policy-item item-left">
                <span className="policy-item-num">5.</span>
                <div className="policy-item-content">
                  <h4 className="policy-item-title">Child Policy</h4>
                  <p className="policy-item-text">Children up to 5 years stay free using existing bedding in the room.</p>
                </div>
              </div>
              <div className="policy-item item-right">
                <span className="policy-item-num">6.</span>
                <div className="policy-item-content">
                  <h4 className="policy-item-title">Extra Bed Policy</h4>
                  <p className="policy-item-text">For older children or extra adults, an additional rollaway bed can be provided for an extra charge per night.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 05. FAQs */}
      <section className="faq-section">
        <div className="section section--large">
          <h2 className="info-heading" style={{ textAlign: 'center' }}>Frequently Asked Questions</h2>
          <p className="info-subtext" style={{ textAlign: 'center', margin: '0 auto', maxWidth: '600px' }}>
            Find answers to common questions about your stay at Krishna Sheesh Mahal.
          </p>

          <div className="faq-zig-zag">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-row">
                <div className="faq-text-content">
                  <h3 className="faq-question">{faq.question}</h3>
                  <p className="faq-answer">{faq.answer}</p>
                </div>
                <div 
                  className="faq-number-wrapper"
                  style={{ backgroundImage: `url(${faq.image})` }}
                >
                  {String(index + 1).padStart(2, '0')}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Booking CTA */}
      <section className="cta-wrapper">
        <div className="cta-box-unique reveal">
          <div className="cta-unique-img"></div>
          <div className="cta-unique-content">
            <h2 className="cta-title">Ready to Experience <br/><i>Luxury?</i></h2>
            <p className="cta-text">
              Book your stay directly with us to enjoy the best rates, exclusive offers, and an unforgettable experience at Krishna Sheesh Mahal.
            </p>
            <Link to="/rooms" className="cta-btn-unique">
              <span>Book Your Stay Now</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
