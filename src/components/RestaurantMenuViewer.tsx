import { RESTAURANT_MENU } from "../data/restaurantMenu";

export default function RestaurantMenuViewer() {
  return (
    <section className="pdf-menu-section" aria-label="Full Restaurant Menu">
      <style>{`
        .pdf-menu-section {
          padding: 80px 20px;
          background-color: #251c19;
          position: relative;
        }

        .pdf-menu-wrapper {
          max-width: 800px;
          margin: 0 auto;
          background-color: #f7f3e8; /* Creamy PDF background */
          border: 12px solid #8c2633; /* Maroon border */
          border-radius: 8px;
          padding: 40px;
          box-shadow: 0 40px 80px rgba(0,0,0,0.5);
          position: relative;
          background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2.5L22.5 16 25 13.5V0h2v13.5L29.5 16 32 18.5V20h8v2h-8v1.5L29.5 26 27 28.5V40h-2V28.5L22.5 26 20 23.5V20.5zM20 20v-2h-2v2h2z' fill='%23e6ddc5' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E");
        }
        
        .pdf-menu-header {
          text-align: center;
          margin-bottom: 50px;
          position: relative;
        }
        
        .pdf-menu-header-logo {
          background-color: #8c2633;
          display: inline-block;
          padding: 20px 40px;
          border-radius: 120px 120px 20px 20px;
          box-shadow: 0 10px 30px rgba(140, 38, 51, 0.3);
          border: 4px solid #fff;
          outline: 2px solid #8c2633;
          outline-offset: -8px;
        }

        .pdf-menu-header-logo h2 {
          color: #fff;
          font-family: var(--font-2);
          font-size: clamp(1.8rem, 8vw, 2.5rem);
          margin: 0;
          line-height: 1.1;
          word-break: break-word;
          hyphens: auto;
        }

        .pdf-menu-header-logo p {
          color: #f7f3e8;
          font-family: "Georgia", serif;
          font-style: italic;
          margin-top: 5px;
          font-size: 1rem;
          letter-spacing: 2px;
        }

        .pdf-menu-grid {
          display: flex;
          flex-direction: column;
          gap: 30px;
        }

        @media (max-width: 900px) {
          .pdf-menu-wrapper {
            padding: 20px;
            border-width: 8px;
          }
          .pdf-menu-header-logo {
            padding: 15px 20px;
            border-radius: 60px 60px 10px 10px;
          }
          .pdf-menu-item-name {
            font-size: 0.95rem;
            max-width: 75%;
          }
          .pdf-menu-item-price {
            font-size: 0.95rem;
          }
          .pdf-menu-footer-terms {
            padding: 20px;
          }
        }

        .pdf-menu-category {
          margin-bottom: 35px;
        }

        .pdf-menu-cat-title {
          background-color: #8c2633;
          color: #fff;
          display: inline-block;
          padding: 6px 20px;
          font-size: 1.2rem;
          font-family: "Inter", sans-serif;
          font-weight: 800;
          letter-spacing: 1px;
          margin-bottom: 15px;
          border-radius: 4px;
          position: relative;
          box-shadow: 2px 4px 10px rgba(140, 38, 51, 0.2);
        }

        .pdf-menu-cat-title::after {
          content: "";
          position: absolute;
          right: -10px;
          top: 0;
          width: 0;
          height: 0;
          border-top: 18px solid transparent;
          border-bottom: 18px solid transparent;
          border-left: 10px solid #8c2633;
        }

        .pdf-menu-item {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 8px;
          position: relative;
        }
        
        .pdf-menu-item.is-block {
          background-color: #8c2633;
          color: #fff;
          padding: 8px 12px;
          border-radius: 4px;
          margin-bottom: 4px;
        }

        .pdf-menu-item.is-block .pdf-menu-item-name {
          font-weight: 600;
        }

        .pdf-menu-item-name {
          font-family: "Inter", sans-serif;
          font-size: 1.05rem;
          color: #333;
          padding-right: 15px;
          background-color: #f7f3e8; /* Matches wrapper to hide dots behind text */
          position: relative;
          z-index: 2;
          font-weight: 500;
        }
        
        .pdf-menu-item.is-sub .pdf-menu-item-name {
          font-size: 0.95rem;
          color: #555;
        }

        .pdf-menu-item-price {
          font-family: "Inter", sans-serif;
          font-size: 1.05rem;
          color: #111;
          font-weight: 700;
          padding-left: 15px;
          background-color: #f7f3e8;
          position: relative;
          z-index: 2;
        }

        .pdf-menu-item.is-block .pdf-menu-item-name,
        .pdf-menu-item.is-block .pdf-menu-item-price {
          background: transparent;
          color: #fff;
        }

        .pdf-menu-dots {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 6px;
          height: 1px;
          border-bottom: 2px dotted #ccc;
          z-index: 1;
        }
        
        .pdf-menu-item.is-block .pdf-menu-dots {
          display: none;
        }
        
        .pdf-menu-footer-terms {
          background-color: #8c2633;
          color: #fff;
          border-radius: 20px;
          padding: 30px;
          margin-top: 50px;
          font-family: "Inter", sans-serif;
          font-size: 0.9rem;
          line-height: 1.6;
        }
        
        .pdf-menu-footer-terms h3 {
          background-color: #f7f3e8;
          color: #8c2633;
          display: inline-block;
          padding: 8px 25px;
          border-radius: 20px;
          font-size: 1.3rem;
          margin-top: -50px;
          margin-bottom: 20px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        }
        
        .pdf-menu-footer-terms ul {
          list-style: none;
          padding: 0;
        }
        
        .pdf-menu-footer-terms li {
          margin-bottom: 10px;
          position: relative;
          padding-left: 20px;
          color: #ffffff;
        }
        
        .pdf-menu-footer-terms li::before {
          content: "■";
          position: absolute;
          left: 0;
          top: 2px;
          font-size: 0.7rem;
        }
      `}</style>

      <div className="pdf-menu-wrapper" data-scroll data-scroll-speed="0.05">
        <div className="pdf-menu-header">
          <div className="pdf-menu-header-logo">
            <h2>Krishna<br/>Sheeshmahal</h2>
            <p>Hotel & Restaurant</p>
          </div>
        </div>

        <div className="pdf-menu-grid">
          {RESTAURANT_MENU.map((cat, idx) => (
            <div key={idx} className="pdf-menu-category">
              <div className="pdf-menu-cat-title">{cat.category}</div>
              <div>
                {cat.items.map((item, i) => (
                  <div key={i} className={`pdf-menu-item ${cat.isBlock ? 'is-block' : ''} ${item.isSub ? 'is-sub' : ''}`}>
                    <div className="pdf-menu-item-name">{item.name}</div>
                    <div className="pdf-menu-dots"></div>
                    <div className="pdf-menu-item-price">{item.price}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          
          <div className="pdf-menu-footer-terms">
            <h3>Terms & Conditions</h3>
            <ul>
              <li>Timing from 11:00 am to 11:30 pm.</li>
              <li>GST & Service Tax as applicable.</li>
              <li>All Eatable are prepared in Desi Ghee/Refined Oil.</li>
              <li>All Premium Brand are used (Amul/Sona Sikka/etc.).</li>
              <li><strong>Order onced placed cannot be cancelled.</strong></li>
              <li><strong>Outside Food/Eatable/Alcohol are not permited.</strong></li>
              <li>Please Help the Management to keep Hotel Clean.</li>
              <li>Please allow us 20 to 30 mins to serve you the best.</li>
              <li>Credit Card accepted (minimum bill of 500/-).</li>
              <li>Hotel/Management is not responisble for your belongings.</li>
              <li>No Smoking/No Alcohol.</li>
              <li>Order will cancelled if not available.</li>
              <li>Order will cancelled if misbehaved with any of our hotel staff.</li>
              <li>Free Home Delivery within 1.5 kms. on Minimum order value Rs. 300/-.</li>
              <li>Birthday Parties Welcome. Customize your event with decorations and cakes tailored to your preferences additional charges may apply.</li>
              <li>Any Damage to Hotel Assets will be charged.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
