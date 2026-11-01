import React from "react";

function Resources() {
  const categories = [
    {
      title: "🧠 Mental Health",
      resources: [
        { name: "NIMHANS India", url: "https://nimhans.ac.in/" },
        { name: "iCall Helpline", url: "https://icallhelpline.org/" },
        { name: "Psychology Today", url: "https://www.psychologytoday.com/" },
        { name: "MHA (Mental Health America)", url: "https://mhanational.org/" }
      ]
    },
    {
      title: "👩 Women's Health",
      resources: [
        { name: "National Women's Health Network", url: "https://nwhn.org/" },
        { name: "WHO Women's Health Room", url: "https://www.who.int/news-room/fact-sheets/detail/women-s-health" },
        { name: "Office on Women's Health (OWH)", url: "https://www.womenshealth.gov/" },
        { name: "NHS Women's Health Guide", url: "https://www.nhs.uk/common-health-questions/womens-health/" }
      ]
    },
    {
      title: "👶 Child Health",
      resources: [
        { name: "Indian Academy of Pediatrics", url: "https://www.iapindia.org/" },
        { name: "HealthyChildren.org (AAP)", url: "https://www.healthychildren.org/" },
        { name: "UNICEF Child Health", url: "https://www.unicef.org/health" },
        { name: "KidsHealth (Nemours)", url: "https://kidshealth.org/" }
      ]
    },
    {
      title: "🥗 Nutrition",
      resources: [
        { name: "ChooseMyPlate (USDA)", url: "https://www.myplate.gov/" },
        { name: "EatRight.org (AND)", url: "https://www.eatright.org/" },
        { name: "Nutrition.org India", url: "https://www.nutrition.gov/" },
        { name: "Harvard Nutrition Source", url: "https://www.hsph.harvard.edu/nutritionsource/" }
      ]
    },
    {
      title: "🚨 Emergency Care",
      resources: [
        { name: "Emergency Services India (112)", url: "https://112.gov.in" },
        { name: "Red Cross First Aid Guide", url: "https://www.redcross.org/get-help/how-to-prepare-for-emergencies/types-of-emergencies/first-aid.html" },
        { name: "IFRC First Aid Resources", url: "https://www.ifrc.org/first-aid" },
        { name: "Poison Control (National)", url: "https://www.poison.org/" }
      ]
    }
  ];

  return (
    <div className="resources-page">
      <div className="resources-header">
        <h1>📚 Medical Resources & External Links</h1>
        <p>Verified resources from leading health organizations across the globe.</p>
      </div>

      <div className="categories-grid">
        {categories.map((category, index) => (
          <div key={index} className="resource-category-card">
            <h3>{category.title}</h3>
            <div className="links-list">
              {category.resources.map((link, i) => (
                <a 
                  key={i} 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="resource-link"
                >
                  <span className="link-text">{link.name}</span>
                  <span className="external-icon">↗</span>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="resource-disclaimer">
        <p>
          <strong>⚠️ Disclaimer:</strong> These external links are provided for informational 
          purposes only. HealthAI does not endorse or take responsibility for the content of 
          any external websites. Always verify health information with multiple 
          qualified sources.
        </p>
      </div>

      <style>{`
        .resources-page {
          max-width: 1100px;
          margin: 0 auto;
          padding: 60px 20px;
          font-family: 'Segoe UI', system-ui, sans-serif;
        }

        .resources-header {
          text-align: center;
          margin-bottom: 50px;
        }

        .resources-header h1 {
          font-size: 2.3rem;
          color: #2d3748;
          margin-bottom: 10px;
        }

        .resources-header p {
          color: #718096;
          font-size: 1.1rem;
        }

        .categories-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 30px;
          margin-bottom: 50px;
        }

        .resource-category-card {
          background: white;
          padding: 30px;
          border-radius: 20px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.05);
          border: 1px solid #edf2f7;
          transition: transform 0.2s;
        }

        .resource-category-card:hover { transform: translateY(-3px); border-color: #667eea; }

        .resource-category-card h3 {
          margin: 0 0 20px 0;
          color: #1a202c;
          border-bottom: 2px solid #edf2f7;
          padding-bottom: 10px;
          font-size: 1.3rem;
        }

        .links-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .resource-link {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 15px;
          background: #f8fafc;
          border-radius: 8px;
          text-decoration: none;
          color: #4a5568;
          font-weight: 500;
          transition: all 0.2s;
        }

        .resource-link:hover {
          background: #ebf4ff;
          color: #667eea;
          transform: translateX(5px);
        }

        .external-icon { font-size: 0.8rem; opacity: 0.5; }

        .resource-disclaimer {
          background: #f7fafc;
          padding: 25px;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          color: #718096;
          text-align: center;
          font-size: 0.95rem;
          line-height: 1.6;
        }

        @media (max-width: 480px) {
          .categories-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}

export default Resources;
