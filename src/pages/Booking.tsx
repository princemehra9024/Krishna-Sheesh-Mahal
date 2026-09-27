import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Booking() {
  const location = useLocation();
  const [type, setType] = useState("rooms");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get("type");
    if (category) {
      setType(category);
    }
  }, [location]);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    guests: "",
    details: "",
    subType: "", // Room type, Event type, etc.
  });

  // Reset subType when main type changes
  useEffect(() => {
    setFormData(prev => ({ ...prev, subType: "" }));
  }, [type]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleWhatsApp = () => {
    const { name, phone, date, guests, details, subType } = formData;
    let categoryName = "Rooms & Suites";
    if (type === "banquet") categoryName = "Banquet & Events";
    if (type === "dining") categoryName = "Fine Dining";
    if (type === "cafe") categoryName = "Cafe";

    let text = `Hello Krishna Sheesh Mahal,\nI would like to enquire about ${categoryName}.\n\n`;
    if (name) text += `Name: ${name}\n`;
    if (phone) text += `Phone: ${phone}\n`;
    
    // Add specific fields based on category
    if (type === "rooms" && subType) text += `Room Type: ${subType}\n`;
    if (type === "banquet" && subType) text += `Event Type: ${subType}\n`;
    
    if (date) text += (type === 'rooms' ? `Check-in Date: ${date}\n` : `Date & Time: ${date}\n`);
    if (guests) text += (type === 'rooms' ? `Guests: ${guests}\n` : `Pax: ${guests}\n`);
    if (details) text += `Details: ${details}\n`;

    const url = `https://wa.me/919024546041?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '16px 20px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontSize: '16px',
    backgroundColor: '#fff',
    outline: 'none',
    boxShadow: '0 2px 5px rgba(0,0,0,0.02) inset',
    fontFamily: 'inherit',
    marginBottom: '20px',
    transition: 'border-color 0.3s'
  };

  return (
    <main className="main" style={{ paddingTop: '150px', paddingBottom: '100px', backgroundColor: '#fafafa', minHeight: '100vh' }}>
      <div className="container" style={{ maxWidth: '700px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 className="txt-script" style={{ fontSize: '48px', color: '#333', marginBottom: '10px' }}>Book Your Experience</h1>
          <p style={{ color: '#666', fontSize: '18px' }}>Fill in the details below and we will connect with you on WhatsApp instantly.</p>
        </div>

        <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '16px', boxShadow: '0 10px 40px rgba(0,0,0,0.06)' }}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#444' }}>Category</label>
            <select 
              name="type" 
              value={type} 
              onChange={(e) => setType(e.target.value)} 
              style={{ ...inputStyle, border: '1px solid #maroon' }}
            >
              <option value="rooms">Rooms & Suites</option>
              <option value="banquet">Banquet & Events</option>
              <option value="dining">Fine Dining</option>
              <option value="cafe">Cafe</option>
            </select>
          </div>
          
          {/* Dynamic Field based on Category */}
          {type === "rooms" && (
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#444' }}>Room Preference</label>
              <select name="subType" value={formData.subType} onChange={handleInputChange} style={inputStyle}>
                <option value="">Select Room Type (Optional)</option>
                <option value="Deluxe Room">Deluxe Room</option>
                <option value="Super Deluxe Room">Super Deluxe Room</option>
                <option value="Premium Room">Premium Room</option>
              </select>
            </div>
          )}

          {type === "banquet" && (
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#444' }}>Event Type</label>
              <select name="subType" value={formData.subType} onChange={handleInputChange} style={inputStyle}>
                <option value="">Select Event Type (Optional)</option>
                <option value="Corporate Event">Corporate Event</option>
                <option value="Wedding / Reception">Wedding / Reception</option>
                <option value="Birthday / Anniversary">Birthday / Anniversary</option>
                <option value="Other">Other</option>
              </select>
            </div>
          )}

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#444' }}>Full Name</label>
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
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#444' }}>Phone Number</label>
            <input 
              type="tel" 
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="+91 98765 43210" 
              style={inputStyle} 
            />
          </div>

          <div style={{ display: 'flex', gap: '20px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#444' }}>
                {type === 'rooms' ? 'Check-in Date' : 'Date & Time'}
              </label>
              <input 
                type={type === 'rooms' ? 'date' : 'datetime-local'}
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                style={inputStyle} 
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#444' }}>
                {type === 'rooms' ? 'Guests' : 'Pax'}
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
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#444' }}>
              Additional Details
            </label>
            <textarea 
              name="details"
              value={formData.details}
              onChange={handleInputChange}
              placeholder={type === 'rooms' ? "Any specific preferences like extra bed, early check-in?" : "Tell us more about your requirements..."} 
              rows={4}
              style={{ ...inputStyle, resize: 'none' }} 
            />
          </div>

          <button 
            onClick={handleWhatsApp}
            style={{
              width: '100%',
              padding: '18px',
              backgroundColor: '#25D366',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              fontSize: '18px',
              letterSpacing: '0.5px',
              boxShadow: '0 8px 20px rgba(37, 211, 102, 0.3)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 12px 24px rgba(37, 211, 102, 0.4)';
              e.currentTarget.style.backgroundColor = '#20bd5a';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(37, 211, 102, 0.3)';
              e.currentTarget.style.backgroundColor = '#25D366';
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
