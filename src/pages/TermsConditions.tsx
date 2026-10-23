import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSEO } from "../hooks/useSEO";

export default function TermsConditions() {
  useSEO(
    "Terms & Conditions | Krishna Sheesh Mahal Kota",
    "Read the Terms & Conditions for booking and staying at Krishna Sheesh Mahal. Understand our policies on check-in, cancellation, refunds, and property rules."
  );

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
          <Link to="/">Home</Link> / Terms & Conditions
        </div>

        <h1 className="legal-page__title">Terms & Conditions</h1>
        <p className="legal-page__updated">Last updated: October 2026</p>

        <p>
          Welcome to Krishna Sheesh Mahal. By accessing our website and using
          our services, you agree to be bound by the following terms and
          conditions. Please read them carefully.
        </p>

        <h2>1. Reservations & Bookings</h2>
        <ul>
          <li>
            All bookings are subject to availability and confirmation by our
            team.
          </li>
          <li>
            Booking requests made via WhatsApp or the website are considered
            inquiries until confirmed by the hotel.
          </li>
          <li>
            Valid government-issued photo identification is required at
            check-in for all guests.
          </li>
        </ul>

        <h2>2. Check-in & Check-out</h2>
        <ul>
          <li>
            <strong>Check-in:</strong> 11:00 AM
          </li>
          <li>
            <strong>Check-out:</strong> 11:00 AM
          </li>
          <li>
            Early check-in and late check-out are subject to availability
            and may incur additional charges.
          </li>
        </ul>

        <h2>3. Tariffs & Payment</h2>
        <ul>
          <li>
            Room tariffs are listed on our website and include applicable
            taxes unless stated otherwise.
          </li>
          <li>
            We offer three meal plans: EP (Room Only), CP (Bed &
            Breakfast), and AMP (Modified American Plan). Details are
            available on the Rooms page.
          </li>
          <li>
            Payment is expected at the time of check-in or as agreed upon
            during the booking process.
          </li>
          <li>We accept cash, UPI, and major bank transfers.</li>
        </ul>

        <h2>4. Cancellation & Refund</h2>
        <ul>
          <li>
            Cancellations made 48 hours or more before the check-in date
            are eligible for a full refund of any advance payment.
          </li>
          <li>
            Cancellations within 48 hours of check-in may be subject to a
            one-night charge.
          </li>
          <li>No-shows will be charged the full booking amount.</li>
          <li>
            Refund processing times depend on the original payment method.
          </li>
        </ul>

        <h2>5. Property Rules</h2>
        <ul>
          <li>
            Guests are expected to maintain decorum and respect fellow
            guests and staff.
          </li>
          <li>
            Smoking is permitted only in designated areas. The hotel is not
            responsible for any health issues arising from smoking.
          </li>
          <li>
            The hotel is not responsible for loss or damage to personal
            belongings. A safe is available at the reception.
          </li>
          <li>
            Any damage to hotel property by guests will be charged
            accordingly.
          </li>
          <li>
            Outside food and beverages are not permitted in the hotel
            restaurant and banquet areas.
          </li>
        </ul>

        <h2>6. Banquet & Event Bookings</h2>
        <ul>
          <li>
            Event bookings require advance confirmation and a deposit as
            determined by the hotel.
          </li>
          <li>
            Menu selections and guest counts must be finalized at least 7
            days prior to the event.
          </li>
          <li>
            The hotel reserves the right to adjust arrangements based on
            unforeseen circumstances, with prior notice to the client.
          </li>
        </ul>

        <h2>7. Website Use</h2>
        <ul>
          <li>
            All content on this website, including text, images, and
            design, is the property of Krishna Sheesh Mahal and may not be
            reproduced without permission.
          </li>
          <li>
            We strive to ensure accuracy of information on our website but
            reserve the right to make changes without prior notice.
          </li>
        </ul>

        <h2>8. Liability</h2>
        <p>
          Krishna Sheesh Mahal shall not be held liable for any indirect,
          incidental, or consequential damages arising from the use of our
          services or website. Our total liability shall not exceed the
          amount paid by the guest for the specific service in question.
        </p>

        <h2>9. Governing Law</h2>
        <p>
          These terms are governed by the laws of India. Any disputes shall
          be subject to the exclusive jurisdiction of the courts of Kota,
          Rajasthan.
        </p>

        <h2>10. Contact</h2>
        <p>
          For questions regarding these terms, please reach out to us:
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
