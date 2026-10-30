import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSEO } from "../hooks/useSEO";
import { getBreadcrumbSchema } from "../utils/seoSchemas";

export default function PrivacyPolicy() {
  useSEO({
    title: "Privacy Policy | Krishna Sheesh Mahal Kota",
    description:
      "Read the Privacy Policy of Krishna Sheesh Mahal Kota. Learn how we collect, use, and protect your personal information when using our website and services.",
    canonicalPath: "/privacy-policy",
    schema: getBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Privacy Policy", path: "/privacy-policy" },
    ]),
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="page-wrap" style={{ backgroundColor: "var(--cream)", minHeight: "100vh" }}>
      <style>{`
        .legal-page {
          padding: clamp(120px, 15vw, 160px) 20px clamp(60px, 10vw, 100px);
          max-width: 800px;
          margin: 0 auto;
        }
        .legal-page__breadcrumb {
          font-family: var(--font-1, sans-serif);
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          margin-bottom: 40px;
          color: var(--text-color, #251C19);
          opacity: 0.5;
        }
        .legal-page__breadcrumb a {
          color: inherit;
          text-decoration: none;
          transition: opacity 0.3s;
        }
        .legal-page__breadcrumb a:hover {
          opacity: 1;
        }
        .legal-page__title {
          font-family: var(--font-2, serif);
          font-size: clamp(2rem, 5vw, 3rem);
          color: var(--heading-color, #251C19);
          margin-bottom: 12px;
          line-height: 1.2;
        }
        .legal-page__updated {
          font-family: var(--font-1, sans-serif);
          font-size: 0.85rem;
          color: var(--text-color, #251C19);
          opacity: 0.5;
          margin-bottom: 48px;
          padding-bottom: 32px;
          border-bottom: 1px solid rgba(37, 28, 25, 0.1);
        }
        .legal-page h2 {
          font-family: var(--font-2, serif);
          font-size: 1.4rem;
          color: var(--heading-color, #251C19);
          margin-top: 40px;
          margin-bottom: 16px;
        }
        .legal-page p, .legal-page li {
          font-family: var(--font-1, sans-serif);
          font-size: 0.95rem;
          line-height: 1.8;
          color: var(--text-color, #251C19);
          opacity: 0.8;
        }
        .legal-page ul {
          padding-left: 24px;
          margin: 12px 0;
        }
        .legal-page li {
          margin-bottom: 8px;
        }
        .legal-page a {
          color: var(--maroon, #5E202D);
          text-decoration: underline;
          text-decoration-color: rgba(94, 32, 45, 0.3);
          text-underline-offset: 3px;
          transition: text-decoration-color 0.3s;
        }
        .legal-page a:hover {
          text-decoration-color: var(--maroon, #5E202D);
        }
      `}</style>

      <div className="legal-page">
        <div className="legal-page__breadcrumb">
          <Link to="/">Home</Link> / Privacy Policy
        </div>

        <h1 className="legal-page__title">Privacy Policy</h1>
        <p className="legal-page__updated">Last updated: October 2026</p>

        <p>
          Krishna Sheesh Mahal ("we", "our", or "us") is committed to protecting
          your privacy. This Privacy Policy explains how we collect, use,
          disclose, and safeguard your information when you visit our website or
          use our services.
        </p>

        <h2>1. Information We Collect</h2>
        <p>We may collect the following types of personal information:</p>
        <ul>
          <li>
            <strong>Personal Details:</strong> Name, email address, phone number,
            and other contact details provided through booking forms, contact
            forms, or WhatsApp inquiries.
          </li>
          <li>
            <strong>Booking Information:</strong> Check-in/check-out dates, room
            preferences, meal plan selections, number of guests, and special
            requests.
          </li>
          <li>
            <strong>Usage Data:</strong> Browser type, IP address, pages visited,
            time spent on the site, and other analytical data collected via
            cookies and similar technologies.
          </li>
        </ul>

        <h2>2. How We Use Your Information</h2>
        <p>Your information is used to:</p>
        <ul>
          <li>Process and manage room bookings and event inquiries</li>
          <li>Respond to your questions and provide customer support</li>
          <li>Send booking confirmations and relevant updates</li>
          <li>
            Send promotional offers and newsletters (only with your consent)
          </li>
          <li>Improve our website, services, and overall guest experience</li>
        </ul>

        <h2>3. Information Sharing</h2>
        <p>
          We do not sell, trade, or rent your personal information to third
          parties. We may share your data with trusted service providers who
          assist us in operating our website and conducting business, subject to
          confidentiality agreements.
        </p>

        <h2>4. Data Security</h2>
        <p>
          We implement appropriate technical and organizational measures to
          protect your personal information. However, no electronic transmission
          or storage method is 100% secure, and we cannot guarantee absolute
          security.
        </p>

        <h2>5. Cookies</h2>
        <p>
          Our website may use cookies and similar tracking technologies to
          enhance your browsing experience. You can manage cookie preferences
          through your browser settings.
        </p>

        <h2>6. Third-Party Links</h2>
        <p>
          Our website may contain links to third-party websites (e.g., WhatsApp,
          Google Maps, Instagram). We are not responsible for the privacy
          practices of these external sites.
        </p>

        <h2>7. Your Rights</h2>
        <p>You have the right to:</p>
        <ul>
          <li>Access, correct, or delete your personal information</li>
          <li>Opt out of marketing communications at any time</li>
          <li>Request a copy of the data we hold about you</li>
        </ul>

        <h2>8. Contact Us</h2>
        <p>
          If you have questions about this Privacy Policy, please contact us:
        </p>
        <ul>
          <li>
            <strong>Phone:</strong>{" "}
            <a href="tel:+918302903734">+91 83029 03734</a>
          </li>
          <li>
            <strong>Email:</strong>{" "}
            <a href="mailto:krishnasheeshmahal73@gmail.com">
              krishnasheeshmahal73@gmail.com
            </a>
          </li>
          <li>
            <strong>Address:</strong> 33-D, Sector B, Shrinath Puram, Kota,
            Rajasthan, India
          </li>
        </ul>
      </div>
    </div>
  );
}
