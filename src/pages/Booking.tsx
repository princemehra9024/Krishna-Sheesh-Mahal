import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { MEAL_PLANS, ROOMS_TARIFF_DATA, MealPlanCode } from "../data";
import { useSEO } from "../hooks/useSEO";
import { getBreadcrumbSchema } from "../utils/seoSchemas";
import { sanitizeName, sanitizePhone, sanitizeGuests, sanitizeText, buildWhatsAppUrl } from "../utils/security";

export default function Booking() {
  useSEO({
    title: "Book Hotel Rooms & Events in Kota | Krishna Sheesh Mahal",
    description:
      "Book your stay or event directly with Krishna Sheesh Mahal Kota. Best guaranteed rates for deluxe rooms, suites, banquet hall & rooftop dining in Rajasthan.",
    canonicalPath: "/booking",
    keywords:
      "Hotel booking in Kota, Book room Krishna Sheesh Mahal, Reserve hotel Kota Rajasthan, Hotel booking Shrinath Puram Kota, Online hotel reservation Kota",
    ogImage: "/images/rooms/room-hero-page-img.png",
    ogImageAlt: "Book Rooms and Events at Krishna Sheesh Mahal Kota",
    schema: getBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Book Now", path: "/booking" },
    ]),
  });
  const location = useLocation();
  const [type, setType] = useState("rooms");


  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    guests: "",
    details: "",
    subType: "Deluxe Room", // Default room type
    mealPlan: "EP" as MealPlanCode, // EP, CP, or AMP
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get("type");
    const roomParam = params.get("room")?.toLowerCase();
    const planParam = params.get("plan")?.toUpperCase();

    if (category) {
      if (category === "rooftop") {
        setType("cafe");
      } else {
        setType(category);
      }
    }

    if (roomParam) {
      const match = ROOMS_TARIFF_DATA.find((r) => r.id === roomParam);
      if (match) {
        setFormData((prev) => ({
          ...prev,
          subType: `${match.name} ${match.nameEm}`.trim(),
        }));
      }
    }

    if (planParam && (planParam === "EP" || planParam === "CP" || planParam === "AMP")) {
      setFormData((prev) => ({
        ...prev,
        mealPlan: planParam as MealPlanCode,
      }));
    }
  }, [location]);

  // Reset subType when main type changes if switching away from rooms
  useEffect(() => {
    if (type !== "rooms") {
      setFormData((prev) => ({ ...prev, subType: "" }));
    } else if (!formData.subType) {
      setFormData((prev) => ({ ...prev, subType: "Deluxe Room" }));
    }
  }, [type]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    // Sanitize per-field to prevent injection into WhatsApp message
    let sanitized = value;
    if (name === "name") sanitized = sanitizeName(value);
    else if (name === "phone") sanitized = sanitizePhone(value);
    else if (name === "guests") sanitized = sanitizeGuests(value);
    else if (name === "details") sanitized = sanitizeText(value);
    setFormData((prev) => ({ ...prev, [name]: sanitized }));
  };

  // Find selected room and tariff
  const selectedRoomObj = ROOMS_TARIFF_DATA.find(
    (r) => `${r.name} ${r.nameEm}`.trim().toLowerCase() === formData.subType.toLowerCase()
  ) || ROOMS_TARIFF_DATA[0];

  const currentPlan = MEAL_PLANS[formData.mealPlan] || MEAL_PLANS.EP;
  const currentPrice = selectedRoomObj ? selectedRoomObj.prices[formData.mealPlan] : 1200;

  const handleWhatsApp = () => {
    const { name, phone, date, guests, details, subType, mealPlan } = formData;
    let categoryName = "Rooms & Suites";
    let targetPhone = "918302903734";

    if (type === "banquet") {
      categoryName = "Banquet & Events";
      targetPhone = "918690393739";
    } else if (type === "dining" || type === "restaurant") {
      categoryName = "Fine Dining Restaurant";
      targetPhone = "918690393739";
    } else if (type === "cafe" || type === "rooftop") {
      categoryName = "Rooftop Lounge (Rama's Sky Lounge)";
      targetPhone = "918690393739";
    } else {
      categoryName = "Rooms & Suites";
      targetPhone = "918302903734";
    }

    let text = `Hello Krishna Sheesh Mahal,\nI would like to enquire about ${categoryName}.\n\n`;
    if (name) text += `*Name:* ${name}\n`;
    if (phone) text += `*Phone:* ${phone}\n`;

    // Add specific fields based on category
    if (type === "rooms") {
      text += `*Room Type:* ${subType || selectedRoomObj.name}\n`;
      text += `*Meal Plan:* ${currentPlan.code} - ${currentPlan.fullName}\n`;
      text += `*Inclusions:* ${currentPlan.foodHighlights.join(", ")}\n`;
      text += `*Tariff Rate:* ₹${currentPrice} / night\n`;
    }
    if (type === "banquet" && subType) text += `*Event Type:* ${subType}\n`;

    if (date) text += (type === "rooms" ? `*Check-in Date:* ${date}\n` : `*Date & Time:* ${date}\n`);
    if (guests) text += (type === "rooms" ? `*Number of Guests:* ${guests}\n` : `*Pax:* ${guests}\n`);
    if (details) text += `*Special Requests:* ${details}\n`;

    const url = buildWhatsAppUrl(targetPhone, text);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "16px 20px",
    borderRadius: "8px",
    border: "1px solid rgba(197, 160, 89, 0.35)",
    fontSize: "16px",
    backgroundColor: "#FDFBF7",
    outline: "none",
    boxShadow: "0 2px 5px rgba(0,0,0,0.02) inset",
    fontFamily: "inherit",
    marginBottom: "20px",
    transition: "border-color 0.3s",
  };

  return (
    <main
      className="main"
      style={{
        paddingTop: "150px",
        paddingBottom: "100px",
        backgroundColor: "#FAF7F2",
        minHeight: "100vh",
      }}
    >
      <div className="container" style={{ maxWidth: "720px", margin: "0 auto", padding: "0 20px" }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h1 className="txt-script" style={{ fontSize: "48px", color: "var(--charcoal, #251C19)", marginBottom: "10px" }}>
            Book Your Experience
          </h1>
          <p style={{ color: "#666", fontSize: "18px" }}>
            Select your preferred package below and connect directly with our royal reception.
          </p>
        </div>

        <div
          style={{
            backgroundColor: "#FAF7F2",
            padding: "40px",
            borderRadius: "16px",
            boxShadow: "0 10px 40px rgba(0,0,0,0.06)",
            border: "1px solid rgba(197, 160, 89, 0.25)",
          }}
        >
          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#444" }}>
              Category
            </label>
            <select
              name="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              style={{ ...inputStyle, border: "1px solid var(--red, #C51D24)" }}
            >
              <option value="rooms">Rooms & Suites (+91 83029 03734)</option>
              <option value="banquet">Banquet & Events (+91 86903 93739)</option>
              <option value="dining">Fine Dining Restaurant (+91 86903 93739)</option>
              <option value="cafe">Rooftop Lounge · Rama's Sky Lounge (+91 86903 93739)</option>
            </select>
          </div>

          {/* Dynamic Field based on Category */}
          {type === "rooms" && (
            <div>
              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#444" }}>
                  Room Preference
                </label>
                <select
                  name="subType"
                  value={formData.subType}
                  onChange={handleInputChange}
                  style={inputStyle}
                >
                  <option value="Deluxe Room">Deluxe Room (19m² • Smart TV & AC)</option>
                  <option value="Super Deluxe Room">Super Deluxe Room (20m² • Spacious)</option>
                  <option value="Premium Room">Premium Room (22m² • Elevated Luxury)</option>
                  <option value="Suite">Royal Suite (25m² • Pinnacle Comfort)</option>
                </select>
              </div>

              {/* Meal Plan Selector */}
              <div style={{ marginBottom: "24px" }}>
                <label style={{ display: "block", marginBottom: "10px", fontWeight: "600", color: "#444" }}>
                  Choose Meal Plan (Tariff Package)
                </label>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px" }}>
                  {(["EP", "CP", "AMP"] as MealPlanCode[]).map((pCode) => {
                    const plan = MEAL_PLANS[pCode];
                    const isSelected = formData.mealPlan === pCode;
                    const price = selectedRoomObj ? selectedRoomObj.prices[pCode] : 0;
                    return (
                      <div
                        key={pCode}
                        onClick={() => setFormData((prev) => ({ ...prev, mealPlan: pCode }))}
                        style={{
                          border: isSelected ? "2px solid #C51D24" : "1px solid rgba(197, 160, 89, 0.3)",
                          backgroundColor: isSelected ? "#FDF2F2" : "#FAF7F2",
                          borderRadius: "10px",
                          padding: "16px",
                          cursor: "pointer",
                          transition: "all 0.25s ease",
                          boxShadow: isSelected ? "0 4px 14px rgba(197, 29, 36, 0.18)" : "none",
                          position: "relative",
                        }}
                      >
                        {plan.badge && (
                          <span
                            style={{
                              position: "absolute",
                              top: "-10px",
                              right: "10px",
                              backgroundColor: isSelected ? "#C51D24" : "#666",
                              color: "#FAF7F2",
                              fontSize: "10px",
                              padding: "2px 8px",
                              borderRadius: "12px",
                              textTransform: "uppercase",
                              fontWeight: "700",
                              letterSpacing: "0.5px",
                            }}
                          >
                            {plan.badge}
                          </span>
                        )}
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                          <span style={{ fontWeight: "700", color: isSelected ? "#7b1113" : "#222", fontSize: "16px" }}>
                            {plan.name}
                          </span>
                          <span style={{ fontWeight: "800", color: "#7b1113", fontSize: "17px" }}>
                            ₹{price}
                          </span>
                        </div>
                        <div style={{ fontSize: "12px", color: "#666", marginBottom: "8px" }}>
                          {pCode === "EP" && "Room Only"}
                          {pCode === "CP" && "Room + Breakfast"}
                          {pCode === "AMP" && "Breakfast + Super Deluxe Thali"}
                        </div>
                        <div style={{ fontSize: "11px", color: isSelected ? "#444" : "#888", lineHeight: "1.4" }}>
                          {pCode === "EP" && "Stay in royal comfort with Smart TV, AC & Wi-Fi."}
                          {pCode === "CP" && "Includes hot Aloo Paratha, Kadhi Kachori, Tea & Coffee."}
                          {pCode === "AMP" && "Includes Breakfast + Royal Super Deluxe Thali (Lunch/Dinner)."}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Highlight summary card */}
              <div
                style={{
                  backgroundColor: "#fcf8f6",
                  borderLeft: "4px solid #7b1113",
                  padding: "16px 20px",
                  borderRadius: "0 8px 8px 0",
                  marginBottom: "24px",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
                  <div>
                    <div style={{ fontSize: "13px", color: "#888", textTransform: "uppercase", letterSpacing: "1px", fontWeight: "600" }}>
                      Selected Package
                    </div>
                    <div style={{ fontSize: "17px", fontWeight: "700", color: "#222" }}>
                      {formData.subType} • {currentPlan.fullName}
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <span style={{ fontSize: "24px", fontWeight: "800", color: "#7b1113" }}>₹{currentPrice}</span>
                    <span style={{ fontSize: "13px", color: "#666", marginLeft: "4px" }}>/ night</span>
                  </div>
                </div>
                <div style={{ marginTop: "10px", fontSize: "13px", color: "#555", display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                  <span style={{ fontWeight: "600", color: "#7b1113" }}>Package Inclusions:</span>
                  {currentPlan.foodHighlights.map((f, i) => (
                    <span
                      key={i}
                      style={{
                        backgroundColor: "#fff",
                        padding: "3px 10px",
                        borderRadius: "15px",
                        fontSize: "12px",
                        border: "1px solid #ebd4cb",
                        color: "#444",
                      }}
                    >
                      ✓ {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {type === "banquet" && (
            <div>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#444" }}>
                Event Type
              </label>
              <select name="subType" value={formData.subType} onChange={handleInputChange} style={inputStyle}>
                <option value="">Select Event Type (Optional)</option>
                <option value="Kitty Party">Kitty Party (₹299 / ₹330 / ₹350)</option>
                <option value="Party & Banquet Feast">Party & Banquet Feast (Unlimited: ₹350 / ₹450 / ₹600)</option>
                <option value="Birthday / Anniversary">Birthday / Anniversary</option>
                <option value="Corporate Event">Corporate Event</option>
                <option value="Wedding / Reception">Wedding / Reception</option>
                <option value="Other">Other Private Celebration</option>
              </select>
            </div>
          )}

          <div>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#444" }}>
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Your Full Name"
              style={inputStyle}
            />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#444" }}>
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="+91 98765 43210"
              style={inputStyle}
            />
          </div>

          <div style={{ display: "flex", gap: "20px" }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#444" }}>
                {type === "rooms" ? "Check-in Date" : "Date & Time"}
              </label>
              <input
                type={type === "rooms" ? "date" : "datetime-local"}
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                style={inputStyle}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#444" }}>
                {type === "rooms" ? "Guests" : "Pax"}
              </label>
              <input
                type="number"
                name="guests"
                value={formData.guests}
                onChange={handleInputChange}
                placeholder="2"
                style={inputStyle}
              />
            </div>
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#444" }}>
              Additional Details
            </label>
            <textarea
              name="details"
              value={formData.details}
              onChange={handleInputChange}
              placeholder={
                type === "rooms"
                  ? "Any specific preferences like extra bed, early check-in, or meal timing?"
                  : "Tell us more about your requirements..."
              }
              rows={4}
              style={{ ...inputStyle, resize: "none" }}
            />
          </div>

          <div style={{ textAlign: "center", marginBottom: "14px", fontSize: "14px", color: "#666" }}>
            Booking Desk:{" "}
            <strong style={{ color: "#7b1113" }}>
              {type === "rooms"
                ? "Rooms Reservation Desk (+91 83029 03734)"
                : "Banquet / Rooftop / Restaurant Desk (+91 86903 93739)"}
            </strong>
          </div>

          <button
            onClick={handleWhatsApp}
            style={{
              width: "100%",
              padding: "18px",
              backgroundColor: "#25D366",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
              fontSize: "18px",
              letterSpacing: "0.5px",
              boxShadow: "0 8px 20px rgba(37, 211, 102, 0.3)",
              transition: "transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 12px 24px rgba(37, 211, 102, 0.4)";
              e.currentTarget.style.backgroundColor = "#20bd5a";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 8px 20px rgba(37, 211, 102, 0.3)";
              e.currentTarget.style.backgroundColor = "#25D366";
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Send on WhatsApp
          </button>
        </div>
      </div>
    </main>
  );
}
