import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Contact() {
  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", message: "" });
  const [step, setStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

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
            background-color: #fff;
            color: var(--text-color);
            min-height: 100vh;
            display: flex;
            flex-direction: column;
          }
          
          /* Header Section */
          .contact-header {
            background-color: #f9f9f9;
            padding: 80px 0 60px;
            text-align: left;
            border-bottom: 1px solid #eee;
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
            background-color: #f5f2ef;
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

          /* Right Side: Typeform Style Container */
          .contact-form-side {
            flex: 1 1 500px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            background-color: #fafafa;
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
            background-color: #eee;
          }
          .form-progress-bar {
            height: 100%;
            background-color: var(--neon);
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
            background-color: var(--neon);
            color: var(--heading-color);
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(16, 233, 142, 0.2);
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
            background-color: var(--neon);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 2rem;
            color: var(--heading-color);
          }

          @media (max-width: 768px) {
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
                <a href="tel:+919876543210" className="contact-item-detail">+91 98765 43210</a>
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
                <a href="mailto:hello@krishnasheeshmahal.com" className="contact-item-detail">hello@krishnasheeshmahal.com</a>
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
                <span className="contact-item-detail">RK Puram, Kota,<br/>Rajasthan 324009</span>
              </div>
            </div>

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
    </div>
  );
}
