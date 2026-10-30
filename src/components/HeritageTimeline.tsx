import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Flame, Sparkles, Award, Crown, CheckCircle2 } from "lucide-react";

export default function HeritageTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 80%"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001
  });

  const milestones = [
    {
      chapter: "01",
      badge: "The Genesis",
      title: "Krishna Namkeen",
      period: "The Foundation",
      subtitle: "A Legacy Born of Authentic Flavor & Trust",
      desc: "Our story began with Krishna Namkeen in Kota—celebrated for secret family spice formulations, freshly fried golden namkeens, and an uncompromising commitment to purity. The honest taste quickly won the heartfelt trust of thousands of families across Rajasthan.",
      img: "/images/krishna-namkeen-heritage.jpg",
      highlight: "Handcrafted Kota Delicacies",
      icon: Flame,
      color: "#C51D24"
    },
    {
      chapter: "02",
      badge: "Culinary Craft",
      title: "The Soul of Hospitality",
      period: "Taste & Tradition",
      subtitle: "From Savory Delights to Grand Feasts",
      desc: "Patrons came not just for namkeens, but for the warm embrace of Rajasthani 'Atithi Devo Bhava'. Driven by this connection, our culinary passion expanded into signature dining, pure vegetarian banquets, and celebration feasts that brought communities together.",
      img: "/images/restaurant-dining-2.png",
      highlight: "Atithi Devo Bhava",
      icon: Sparkles,
      color: "#D4AF37"
    },
    {
      chapter: "03",
      badge: "The Vision",
      title: "Conceiving Sheesh Mahal",
      period: "The Architectural Dream",
      subtitle: "The Royal Mirror Palace Reimagined",
      desc: "Inspired by Rajasthan's historic mirror-work palaces (Sheesh Mahal), we envisioned a sanctuary of palatial splendor right in Shrinath Puram, Kota—combining classical Rajputana opulence with state-of-the-art modern comforts.",
      img: "/images/hotel-ceiling.png",
      highlight: "Royal Mirror Work Heritage",
      icon: Award,
      color: "#9A7B38"
    },
    {
      chapter: "04",
      badge: "The Pinnacle",
      title: "Krishna Sheesh Mahal",
      period: "15 Feb 2025 • Present",
      subtitle: "Kota's Premier Luxury Heritage Landmark",
      desc: "The golden lineage of Krishna Namkeen proudly culminates in Krishna Sheesh Mahal. Featuring 40+ palatial suites, majestic wedding banquet halls, exquisite restaurants, and Rama's Sky Lounge—where every guest is welcomed as royalty.",
      img: "/images/hotel-exterior.png",
      emblem: "/Krishna Sheesh Mahal Emblem.png",
      highlight: "The Crown of Royal Comfort",
      icon: Crown,
      color: "#C51D24"
    }
  ];

  return (
    <section className="heritage-timeline-section" ref={containerRef}>
      <style>{`
        .heritage-timeline-section {
          padding: 120px 5% 150px;
          background: #FAF7F2;
          position: relative;
          z-index: 5;
          overflow: hidden;
          font-family: var(--font-1, sans-serif);
        }

        .heritage-header {
          text-align: center;
          max-width: 900px;
          margin: 0 auto 90px;
        }

        .heritage-pill-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, rgba(197, 29, 36, 0.08) 0%, rgba(212, 175, 55, 0.15) 100%);
          border: 1px solid rgba(212, 175, 55, 0.45);
          color: #C51D24;
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.25em;
          padding: 8px 22px;
          border-radius: 40px;
          margin-bottom: 20px;
          box-shadow: 0 4px 15px rgba(212, 175, 55, 0.12);
        }

        .heritage-title {
          font-family: var(--font-2, serif);
          font-size: clamp(2.4rem, 5vw, 4.2rem);
          line-height: 1.15;
          color: #111111;
          margin: 0 0 20px;
          letter-spacing: -0.01em;
        }

        .heritage-title em {
          font-style: italic;
          background: linear-gradient(135deg, #C51D24 0%, #D4AF37 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .heritage-desc {
          font-size: 1.15rem;
          line-height: 1.7;
          color: #555555;
          max-width: 720px;
          margin: 0 auto;
        }

        .timeline-wrapper {
          position: relative;
          max-width: 1240px;
          margin: 0 auto;
          padding: 80px 0 70px;
        }

        /* Continuous aesthetic central animation line */
        .timeline-track {
          position: absolute;
          top: 35px;
          bottom: 50px;
          left: 50%;
          transform: translateX(-50%);
          width: 4px;
          background: rgba(197, 160, 89, 0.22);
          border-radius: 6px;
          z-index: 1;
        }

        .timeline-fill {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(180deg, #D4AF37 0%, #C51D24 45%, #D4AF37 80%, #C51D24 100%);
          box-shadow: 0 0 15px rgba(212, 175, 55, 0.8), 0 0 25px rgba(197, 29, 36, 0.4);
          border-radius: 6px;
          transform-origin: top;
        }

        /* Pulsing light beam traveling down line */
        .timeline-light-beam {
          position: absolute;
          top: 0;
          left: -2px;
          width: 8px;
          height: 140px;
          background: linear-gradient(180deg, transparent, #FFFFFF, #D4AF37, transparent);
          filter: blur(2px);
          animation: timelineLightMove 3.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          border-radius: 8px;
        }

        @keyframes timelineLightMove {
          0% { transform: translateY(-140px); opacity: 0; }
          25% { opacity: 1; }
          75% { opacity: 1; }
          100% { transform: translateY(120vh); opacity: 0; }
        }

        .timeline-start-badge {
          position: absolute;
          top: -30px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 3;
          background: linear-gradient(135deg, #1A1311 0%, #2A1C18 100%);
          border: 2px solid #D4AF37;
          padding: 10px 26px;
          border-radius: 50px;
          box-shadow: 0 0 30px rgba(212, 175, 55, 0.45), 0 8px 20px rgba(0,0,0,0.25);
          display: flex;
          align-items: center;
          gap: 12px;
          white-space: nowrap;
        }

        .timeline-start-badge span {
          color: #FFF2DF;
          font-family: var(--font-2, serif);
          font-weight: 700;
          font-size: 1.05rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .timeline-end-badge {
          position: absolute;
          bottom: -45px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 3;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }

        .timeline-end-emblem {
          width: 82px;
          height: 82px;
          border-radius: 50%;
          object-fit: cover;
          border: 2.5px solid #D4AF37;
          box-shadow: 0 0 35px rgba(212, 175, 55, 0.7), 0 10px 25px rgba(0,0,0,0.3);
          background: #1A1311;
          transition: transform 0.4s ease;
        }

        .timeline-end-emblem:hover {
          transform: scale(1.1) rotate(5deg);
        }

        .timeline-row {
          position: relative;
          display: flex;
          align-items: center;
          margin-bottom: 110px;
          z-index: 2;
        }

        .timeline-row:last-child {
          margin-bottom: 90px;
        }

        .timeline-row:nth-child(even) {
          flex-direction: row-reverse;
        }

        .timeline-card-col {
          width: calc(50% - 60px);
        }

        .timeline-node-col {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 4;
        }

        .timeline-node-beacon {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: #FAF7F2;
          border: 3px solid #D4AF37;
          box-shadow: 0 0 20px rgba(212, 175, 55, 0.5), inset 0 0 10px rgba(212, 175, 55, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #C51D24;
          transition: all 0.4s ease;
          cursor: default;
        }

        .timeline-node-beacon:hover {
          transform: scale(1.18);
          box-shadow: 0 0 30px rgba(212, 175, 55, 0.85);
          border-color: #C51D24;
        }

        .timeline-empty-col {
          width: calc(50% - 60px);
        }

        .heritage-card {
          background: #FFFFFF;
          border: 1px solid rgba(197, 160, 89, 0.35);
          border-radius: 20px;
          padding: 35px;
          box-shadow: 0 15px 45px rgba(0,0,0,0.04);
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          overflow: hidden;
        }

        .heritage-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #C51D24, #D4AF37);
        }

        .heritage-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 30px 60px rgba(0,0,0,0.08), 0 0 25px rgba(212, 175, 55, 0.2);
          border-color: rgba(212, 175, 55, 0.65);
        }

        .heritage-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 18px;
          gap: 12px;
        }

        .heritage-card-chapter {
          font-size: 0.75rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: #C51D24;
          background: rgba(197, 29, 36, 0.08);
          padding: 5px 14px;
          border-radius: 30px;
        }

        .heritage-card-period {
          font-size: 0.85rem;
          font-weight: 700;
          color: #888888;
        }

        .heritage-card-title {
          font-family: var(--font-2, serif);
          font-size: clamp(1.8rem, 2.5vw, 2.4rem);
          margin: 0 0 8px;
          color: #111111;
          line-height: 1.2;
        }

        .heritage-card-sub {
          font-size: 0.95rem;
          font-weight: 600;
          color: #C5A059;
          margin: 0 0 16px;
          letter-spacing: 0.02em;
        }

        .heritage-card-img-wrap {
          position: relative;
          width: 100%;
          height: 220px;
          border-radius: 12px;
          overflow: hidden;
          margin-bottom: 20px;
          border: 1px solid rgba(197, 160, 89, 0.2);
          box-shadow: 0 8px 20px rgba(0,0,0,0.06);
        }

        .heritage-card-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .heritage-card:hover .heritage-card-img-wrap img {
          transform: scale(1.06);
        }

        .heritage-card-desc {
          font-size: 1.05rem;
          line-height: 1.7;
          color: #555555;
          margin: 0 0 20px;
        }

        .heritage-card-footer {
          display: flex;
          align-items: center;
          gap: 10px;
          padding-top: 15px;
          border-top: 1px dashed rgba(0,0,0,0.1);
        }

        .heritage-card-highlight {
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          color: #C51D24;
          text-transform: uppercase;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        /* Responsive Breakpoints */
        @media (max-width: 900px) {
          .timeline-track {
            left: 28px;
            transform: none;
          }
          .timeline-start-badge {
            left: 28px;
            transform: translateX(-20px);
          }
          .timeline-end-badge {
            left: 28px;
            transform: translateX(-20px);
          }
          .timeline-row {
            flex-direction: column !important;
            align-items: flex-start;
            padding-left: 70px;
            margin-bottom: 60px;
          }
          .timeline-node-col {
            left: 28px;
            transform: translateX(-50%);
            top: 0;
          }
          .timeline-card-col {
            width: 100%;
          }
          .timeline-empty-col {
            display: none;
          }
          .heritage-card {
            padding: 24px;
          }
        }
      `}</style>

      {/* Header */}
      <div className="heritage-header">
        <motion.div
          className="heritage-pill-badge"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Flame size={14} className="text-[#C51D24]" />
          <span>Our Heritage Journey</span>
        </motion.div>

        <motion.h2
          className="heritage-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          From <em>Krishna Namkeen</em> to Krishna Sheesh Mahal
        </motion.h2>

        <motion.p
          className="heritage-desc"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          A timeless timeline tracing our roots from Kota’s most loved traditional namkeen brand to the crowning luxury of our royal palace hotel.
        </motion.p>
      </div>

      {/* Timeline Wrapper with aesthetic animated line */}
      <div className="timeline-wrapper">
        {/* The Central Aesthetic Animation Line */}
        <div className="timeline-track">
          <motion.div
            className="timeline-fill"
            style={{ scaleY: smoothProgress }}
          />
          <div className="timeline-light-beam" />
        </div>

        {/* Start Badge: Krishna Namkeen */}
        <motion.div
          className="timeline-start-badge"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Flame size={18} color="#D4AF37" />
          <span>Krishna Namkeen</span>
        </motion.div>

        {/* Milestone Rows */}
        {milestones.map((item, index) => {
          const Icon = item.icon;
          const isEven = index % 2 === 1;

          return (
            <div className="timeline-row" key={item.chapter}>
              {/* Card Col */}
              <motion.div
                className="timeline-card-col"
                initial={{ opacity: 0, x: isEven ? 60 : -60, y: 30 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="heritage-card">
                  <div className="heritage-card-top">
                    <span className="heritage-card-chapter">Chapter {item.chapter}</span>
                    <span className="heritage-card-period">{item.period}</span>
                  </div>

                  <h3 className="heritage-card-title">{item.title}</h3>
                  <div className="heritage-card-sub">{item.subtitle}</div>

                  <div className="heritage-card-img-wrap">
                    <img src={item.img} alt={item.title} loading="lazy" />
                  </div>

                  <p className="heritage-card-desc">{item.desc}</p>

                  <div className="heritage-card-footer">
                    <span className="heritage-card-highlight">
                      <CheckCircle2 size={15} color="#D4AF37" />
                      {item.highlight}
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Node Col */}
              <div className="timeline-node-col">
                <motion.div
                  className="timeline-node-beacon"
                  initial={{ scale: 0, rotate: -45 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Icon size={20} />
                </motion.div>
              </div>

              {/* Empty Opposite Col */}
              <div className="timeline-empty-col" />
            </div>
          );
        })}

        {/* End Badge: Krishna Sheesh Mahal Emblem */}
        <motion.div
          className="timeline-end-badge"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <img
            src="/Krishna Sheesh Mahal Emblem.png"
            alt="Krishna Sheesh Mahal Emblem"
            className="timeline-end-emblem"
          />
          <div
            style={{
              background: "linear-gradient(135deg, #1A1311 0%, #2A1C18 100%)",
              border: "1.5px solid #D4AF37",
              padding: "6px 20px",
              borderRadius: "30px",
              color: "#FFF2DF",
              fontFamily: "var(--font-2, serif)",
              fontSize: "0.9rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              boxShadow: "0 0 20px rgba(212, 175, 55, 0.4)",
              whiteSpace: "nowrap"
            }}
          >
            Krishna Sheesh Mahal
          </div>
        </motion.div>
      </div>
    </section>
  );
}
