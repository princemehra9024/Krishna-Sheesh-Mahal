import { useState } from "react";
import { generateWhatsAppLink } from "../data";
import { useSEO } from "../hooks/useSEO";

const TEAM_MEMBERS = [
  {
    name: "RAJESH",
    role: "General Manager",
    desc: "With over 15 years in luxury hospitality, Rajesh ensures every guest at Krishna Sheesh Mahal receives a royal experience.",
    img: "/images/hotel_receptionist.jpg",
  },
  {
    name: "ANITA",
    role: "Executive Chef",
    desc: "Anita brings traditional Rajasthani flavors to life with modern culinary techniques, crafting unforgettable dining experiences.",
    img: "/images/cafe/cafe_hero.jpg",
  },
  {
    name: "VIKRAM",
    role: "Head of Operations",
    desc: "Vikram coordinates seamlessly behind the scenes to maintain the impeccable standards of our heritage property.",
    img: "/images/restaurant-img.jpeg",
  },
  {
    name: "SNEHA",
    role: "Guest Relations",
    desc: "Sneha's warm hospitality and attention to detail make every visitor feel like family during their stay.",
    img: "/images/quote-cooking.jpg",
  },
];

const FAQS = [
  {
    q: "How do I book a room?",
    a: "You can book a room directly through our website by clicking the 'Book Now' button, or reach out to us via WhatsApp for personalized assistance.",
  },
  {
    q: "What are the check-in and check-out timings?",
    a: "Our standard check-in time is 2:00 PM and check-out is at 11:00 AM. Early check-in or late check-out can be arranged based on availability.",
  },
  {
    q: "Is parking available at the property?",
    a: "Yes, we offer complimentary secure parking for all our guests during their stay at Krishna Sheesh Mahal.",
  },
];

export default function Team() {
  useSEO("Our Team | Krishna Sheesh Mahal Kota", "Meet the dedicated experts behind the magic at Krishna Sheesh Mahal. Discover our management, chefs, and operations team delivering royal hospitality.");
  const [openFaq, setOpenFaq] = useState<number | null>(1);
  const [phone, setPhone] = useState("");

  const handleSend = (e: React.MouseEvent) => {
    e.preventDefault();
    if (phone.trim()) {
      const link = generateWhatsAppLink({
        type: "Room",
        name: "Guest",
        date: "Upcoming",
        guests: "1",
        requests: `Contact number: ${phone}`,
      });
      window.open(link, "_blank");
    }
  };

  return (
    <div className="page-wrap" style={{ backgroundColor: "var(--cream)", color: "var(--charcoal)", paddingTop: "var(--header-height)", minHeight: "100vh" }}>
      <div className="section section--large" style={{ padding: "60px 20px" }}>
        
        <style>{`
          .team-card { 
            transition: all 0.5s cubic-bezier(0.2, 1, 0.3, 1); 
            border-radius: 16px; 
            padding: 24px; 
            background: #fff; 
            cursor: pointer; 
            box-shadow: 0 10px 30px rgba(0,0,0,0.03);
            border: 1px solid rgba(0,0,0,0.02);
            position: relative;
            overflow: hidden;
          }
          .team-card::before {
            content: '';
            position: absolute;
            top: 0; left: 0; right: 0; height: 4px;
            background: var(--terracotta);
            transform: scaleX(0);
            transform-origin: left;
            transition: transform 0.5s ease;
          }
          .team-card:hover { 
            box-shadow: 0 20px 50px rgba(0,0,0,0.08); 
            transform: translateY(-8px); 
          }
          .team-card:hover::before {
            transform: scaleX(1);
          }
          .team-card-img-wrap { 
            overflow: hidden; 
            border-radius: 10px; 
            transition: transform 0.5s ease; 
          }
          .team-card:hover .team-card-img-wrap img { 
            transform: scale(1.08); 
          }
          .team-card-link {
            transition: all 0.3s ease;
            background: var(--cream);
            padding: 8px 16px;
            border-radius: 30px;
          }
          .team-card:hover .team-card-link { 
            background: var(--terracotta);
            color: #fff !important;
          }
          .team-card-link-arrow { transition: transform 0.3s ease; }
          .team-card:hover .team-card-link-arrow { transform: translate(3px, -3px); }
          
          .hero-img-container:hover .hero-outline {
            transform: translate(-10px, -10px);
          }
          .hero-img-container:hover .hero-img-inner {
            transform: scale(1.05);
          }
        `}</style>

        {/* HERO SECTION */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "50px", marginBottom: "120px", alignItems: "center" }}>
          {/* Left Side Image */}
          <div className="reveal" style={{ flex: "1.5 1 55%", minWidth: "300px", padding: "20px" }}>
            <div className="hero-img-container" style={{ position: "relative", width: "100%", aspectRatio: "16/9" }}>
              {/* Custom Outline */}
              <div className="hero-outline" style={{
                position: "absolute",
                top: "20px",
                left: "-20px",
                width: "100%",
                height: "100%",
                border: "2px solid var(--terracotta)",
                borderRadius: "80px 0 80px 0",
                zIndex: 0,
                transition: "transform 0.5s ease"
              }}></div>
              {/* Image Container */}
              <div style={{ 
                position: "relative", 
                width: "100%", 
                height: "100%",
                overflow: "hidden", 
                borderRadius: "80px 0 80px 0", 
                boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                zIndex: 1
              }}>
                <img className="hero-img-inner" src="/images/hotel_receptionist.jpg" alt="Krishna Sheesh Mahal Team" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.7s ease" }} />
              </div>
            </div>
          </div>
          
          {/* Right Side Custom Font Text */}
          <div className="reveal" style={{ flex: "1 1 35%", minWidth: "300px", paddingRight: "20px", transitionDelay: "0.2s" }}>
            <h1 style={{ fontFamily: "var(--font-2)", fontSize: "clamp(3rem, 5vw, 4.5rem)", lineHeight: 1.1, color: "var(--charcoal)", marginBottom: "15px" }}>
              The <em style={{ fontFamily: "var(--font-3)", color: "var(--maroon)", fontStyle: "italic" }}>People</em> <br /> Behind the <br /> Magic
            </h1>
            <div className="txt-script" style={{ fontSize: "3rem", color: "var(--terracotta)", marginBottom: "30px", transform: "rotate(-3deg) translateY(-10px)" }}>
              Service with a smile
            </div>
            <p style={{ fontSize: "1.1rem", lineHeight: 1.7, color: "var(--body-gray)", maxWidth: "450px" }}>
              At Krishna Sheesh Mahal, our dedicated team of professionals goes above and beyond to curate an unforgettable, royal experience for every guest.
            </p>
          </div>
        </div>

        {/* TEAM SECTION */}
        <div style={{ marginBottom: "120px" }}>
          <h2 className="reveal" style={{ fontSize: "2.5rem", marginBottom: "50px", textTransform: "uppercase", letterSpacing: "0.05em", fontFamily: "var(--font-2)", color: "var(--charcoal)" }}>Meet The Experts</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "30px" }}>
            {TEAM_MEMBERS.map((member, i) => (
              <div key={i} className="team-card reveal" style={{ display: "flex", flexDirection: "column", transitionDelay: `${i * 0.1}s` }}>
                <div className="team-card-img-wrap" style={{ width: "100%", aspectRatio: "1", marginBottom: "25px", backgroundColor: "#e0d8cc" }}>
                  <img src={member.img} alt={member.name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.8s cubic-bezier(0.2, 1, 0.3, 1)" }} />
                </div>
                <h3 style={{ fontSize: "1.6rem", marginBottom: "8px", textTransform: "uppercase", fontFamily: "var(--font-2)", color: "var(--charcoal)" }}>{member.name}</h3>
                <strong style={{ display: "inline-block", marginBottom: "15px", color: "var(--terracotta)", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700 }}>{member.role}</strong>
                <p style={{ fontSize: "0.9rem", color: "var(--body-gray)", marginBottom: "25px", lineHeight: 1.6, flexGrow: 1 }}>
                  {member.desc}
                </p>
                <div style={{ marginTop: "auto" }}>
                  <div className="team-card-link" style={{ color: "var(--terracotta)", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.1em", display: "inline-flex", alignItems: "center", gap: "8px", fontWeight: "bold" }}>
                    View Profile
                    <svg className="team-card-link-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="19" x2="19" y2="5"></line>
                      <polyline points="9 5 19 5 19 15"></polyline>
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* READY TO BOOK SECTION */}
        <div className="reveal" style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", marginBottom: "120px", gap: "40px", padding: "60px", background: "#fff", borderRadius: "16px", border: "1px solid rgba(0,0,0,0.05)", boxShadow: "0 10px 40px rgba(0,0,0,0.03)" }}>
          <div style={{ flex: "1 1 400px" }}>
            <h2 style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 1.1, textTransform: "uppercase", display: "flex", alignItems: "flex-start", gap: "20px", fontFamily: "var(--font-2)", color: "var(--charcoal)" }}>
              Ready to <br /> Experience Royalty?
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: "10px", color: "var(--maroon)" }}>
                <line x1="5" y1="5" x2="19" y2="19"></line>
                <polyline points="19 9 19 19 9 19"></polyline>
              </svg>
            </h2>
          </div>
          <div style={{ flex: "1 1 300px", maxWidth: "400px" }}>
            <form style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <input
                type="tel"
                placeholder="Phone number"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                style={{ width: "100%", background: "transparent", border: "none", borderBottom: "1px solid rgba(0,0,0,0.3)", color: "var(--charcoal)", padding: "10px 0", fontSize: "1rem", outline: "none", transition: "border-color 0.3s" }}
                onFocus={e => e.target.style.borderBottomColor = "var(--terracotta)"}
                onBlur={e => e.target.style.borderBottomColor = "rgba(0,0,0,0.3)"}
              />
              <p style={{ fontSize: "0.7rem", opacity: 0.6, marginTop: "5px" }}>
                By sending your number, you are agreeing to our Data Protection Statement.
              </p>
              <button onClick={handleSend} className="team-card" style={{ alignSelf: "flex-start", color: "var(--terracotta)", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.1em", display: "inline-flex", alignItems: "center", gap: "5px", marginTop: "15px", padding: "10px 20px", fontWeight: "bold", border: "1px solid var(--terracotta)" }}>
                Send
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="19" x2="19" y2="5"></line>
                  <polyline points="9 5 19 5 19 15"></polyline>
                </svg>
              </button>
            </form>
          </div>
        </div>

        {/* FAQ SECTION */}
        <div className="reveal" style={{ display: "flex", flexWrap: "wrap", gap: "60px", marginBottom: "80px", alignItems: "flex-start" }}>
          {/* Left Column: Title (Sticky) */}
          <div style={{ flex: "1 1 300px", position: "sticky", top: "120px" }}>
            <h2 style={{ fontSize: "clamp(3rem, 5vw, 4rem)", lineHeight: 1.1, marginBottom: "20px", textTransform: "uppercase", fontFamily: "var(--font-2)", color: "var(--charcoal)" }}>
              Got <em style={{ fontFamily: "var(--font-3)", color: "var(--maroon)", fontStyle: "italic", textTransform: "lowercase" }}>Questions?</em>
            </h2>
            <p style={{ fontSize: "1.1rem", color: "var(--body-gray)", lineHeight: 1.6, marginBottom: "30px" }}>
              Find answers to the most common questions about staying with us. If you need more help, feel free to reach out directly.
            </p>
            <a href="/contact" className="team-card" style={{ display: "inline-flex", alignItems: "center", gap: "10px", color: "var(--terracotta)", textDecoration: "none", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.1em", fontSize: "0.85rem", padding: "12px 24px", border: "1px solid rgba(0,0,0,0.1)", borderRadius: "30px" }}>
              Contact Us
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          </div>

          {/* Right Column: Accordion Cards */}
          <div style={{ flex: "2 1 500px", display: "flex", flexDirection: "column", gap: "20px" }}>
            {FAQS.map((faq, i) => (
              <div 
                key={i} 
                style={{ 
                  background: openFaq === i ? "#fff" : "transparent",
                  border: openFaq === i ? "1px solid rgba(0,0,0,0.05)" : "1px solid rgba(0,0,0,0.15)",
                  borderRadius: "16px",
                  padding: "10px 30px",
                  boxShadow: openFaq === i ? "0 20px 40px rgba(0,0,0,0.05)" : "none",
                  transition: "all 0.4s ease",
                  overflow: "hidden"
                }}
              >
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 0", background: "none", border: "none", color: "var(--charcoal)", fontSize: "1.15rem", cursor: "pointer", textAlign: "left", fontWeight: "600", transition: "color 0.3s" }}
                  onMouseEnter={e => e.currentTarget.style.color = "var(--terracotta)"}
                  onMouseLeave={e => e.currentTarget.style.color = "var(--charcoal)"}
                >
                  <span style={{ display: "flex", gap: "20px", alignItems: "center" }}>
                    <span style={{ color: "var(--terracotta)", opacity: 0.5, fontSize: "0.9rem", fontFamily: "var(--font-2)" }}>0{i + 1}</span>
                    {faq.q}
                  </span>
                  <span style={{ 
                    display: "flex", justifyContent: "center", alignItems: "center",
                    width: "36px", height: "36px", borderRadius: "50%", 
                    background: openFaq === i ? "var(--terracotta)" : "rgba(0,0,0,0.05)",
                    color: openFaq === i ? "#fff" : "var(--charcoal)",
                    fontSize: "1.2rem", fontWeight: 300, 
                    transition: "all 0.4s ease",
                    transform: openFaq === i ? "rotate(135deg)" : "rotate(0)" 
                  }}>
                    +
                  </span>
                </button>
                <div style={{ height: openFaq === i ? "auto" : "0", overflow: "hidden", transition: "all 0.4s ease", opacity: openFaq === i ? 1 : 0 }}>
                  <p style={{ paddingBottom: "25px", fontSize: "1rem", color: "var(--body-gray)", lineHeight: 1.7, paddingLeft: "42px", paddingRight: "40px" }}>
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
