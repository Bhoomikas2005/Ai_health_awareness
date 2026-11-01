import React, { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const FALLBACK_CONTACTS = [
  { name: "🚑 Ambulance", number: "108" },
  { name: "👮 Police", number: "100" },
  { name: "🔥 Fire", number: "101" },
  { name: "🌍 National Emergency", number: "112" },
  { name: "🧠 Mental Health (iCall)", number: "9152987821" },
  { name: "👩 Women Helpline", number: "1091" },
  { name: "☠️ Poison Control", number: "1800-11-6117" }
];

function EmergencyInfo() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/emergency`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        const remoteContacts = Array.isArray(data) ? data : (data.contacts || []);
        if (remoteContacts.length > 0) {
          setContacts(remoteContacts);
        } else {
          setContacts(FALLBACK_CONTACTS);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Emergency contacts error, using fallback:', err);
        setContacts(FALLBACK_CONTACTS);
        setLoading(false);
      });
  }, []);

  return (
    <div className="emergency-contacts-grid">
      {contacts.map((c, idx) => (
        <a key={idx} href={`tel:${c.number}`} className="contact-card">
          <div className="contact-info">
            <span className="contact-name">{c.name}</span>
            <span className="contact-number">{c.number}</span>
          </div>
          <div className="call-icon">📞</div>
        </a>
      ))}

      <style>{`
        .emergency-contacts-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 15px;
          margin-top: 20px;
        }

        .contact-card {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #fff5f5;
          padding: 15px 20px;
          border-radius: 10px;
          border: 1px solid #fed7d7;
          text-decoration: none;
          color: #c53030;
          transition: all 0.2s;
        }

        .contact-card:hover {
          background: #feb2b2;
          transform: translateY(-2px);
          box-shadow: 0 4px 10px rgba(229, 62, 62, 0.15);
        }

        .contact-info {
          display: flex;
          flex-direction: column;
        }

        .contact-name {
          font-weight: 700;
          font-size: 1.1rem;
        }

        .contact-number {
          font-size: 1.2rem;
          font-family: monospace;
          margin-top: 4px;
        }

        .call-icon {
          font-size: 1.5rem;
          opacity: 0.8;
        }
      `}</style>
    </div>
  );
}

export default EmergencyInfo;
