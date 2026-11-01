export const checkSymptom = async (req, res) => {
  try {
    const { symptom } = req.body;

    // Input Validation
    if (!symptom || typeof symptom !== 'string' || symptom.trim() === '') {
      return res.status(400).json({ 
        error: "Please provide a symptom to check." 
      });
    }

    const input = symptom.toLowerCase().trim();

    // Expanded symptom advice (15+ entries)
    const symptomAdvice = [
      {
        keywords: ["fever", "high temperature", "chills"],
        advice: "Rest and drink plenty of fluids. Monitor your temperature regularly. If it exceeds 103°F (39.4°C) or lasts over 3 days, see a doctor."
      },
      {
        keywords: ["cough", "sneezing", "dry cough"],
        advice: "Stay hydrated and use a humidifier. Honey can help a dry cough. If you have fever or difficulty breathing, seek medical help."
      },
      {
        keywords: ["headache", "migraine", "head pain"],
        advice: "Rest in a quiet, dark room and stay hydrated. Over-the-counter pain relief may help. If sudden/severe, seek immediate care."
      },
      {
        keywords: ["nausea", "vomiting", "sick to stomach"],
        advice: "Small sips of clear liquids are best. Try the BRAT diet (Bananas, Rice, Applesauce, Toast). Avoid solid food until vomiting stops."
      },
      {
        keywords: ["diarrhea", "loose stools", "upset stomach"],
        advice: "Stay hydrated with water, broth, or electrolyte drinks. Probiotics can help. See a doctor if it's bloody or lasts more than 2 days."
      },
      {
        keywords: ["chest pain", "heart pain", "pressure"],
        advice: "⚠️ URGENT: Chest pain requires immediate medical attention. Call 112 or 108 immediately. Do not wait."
      },
      {
        keywords: ["dizziness", "lightheaded", "vertigo"],
        advice: "Sit or lie down immediately to avoid falling. Drink water. Sudden dizziness can be serious, consult a doctor if it persists."
      },
      {
        keywords: ["fatigue", "tiredness", "exhaustion"],
        advice: "Prioritize sleep and ensure you're eating a balanced diet. If exhaustion is chronic, it could indicate anemia or other issues."
      },
      {
        keywords: ["rash", "itchy skin", "hives"],
        advice: "Avoid scratching. Apply a cool compress. If accompanied by fever or swelling of the face/throat, call emergency services."
      },
      {
        keywords: ["sore throat", "pain swallowing", "throat"],
        advice: "Gargle with warm salt water and drink warm liquids. Lozenges may help. See a doctor if it's severe or lasts over a week."
      },
      {
        keywords: ["back pain", "lower back", "spine pain"],
        advice: "Apply heat or ice. Stay active with gentle stretches. Avoid heavy lifting. Consult a doctor if pain radiates down legs."
      },
      {
        keywords: ["shortness of breath", "breathless", "difficulty breathing"],
        advice: "⚠️ URGENT: Deep breathing can help, but if persistent or severe, seek emergency medical care immediately."
      },
      {
        keywords: ["joint pain", "stiffness", "arthritis"],
        advice: "Gentle movement and warm baths can help. Use ice for inflammation. Chronic joint pain should be evaluated for arthritis."
      },
      {
        keywords: ["eye irritation", "red eyes", "itchy eyes"],
        advice: "Rinse with clean water or saline. Avoid rubbing. Could be allergies or conjunctivitis (pink eye). See an optometrist."
      },
      {
        keywords: ["cold", "runny nose", "congestion"],
        advice: "Rest, fluids, and saline nasal sprays can provide relief. Symptoms usually resolve within 7-10 days."
      }
    ];

    // Find a matching symptom
    const matchedSymptom = symptomAdvice.find(sObj => 
      sObj.keywords.some(kw => input.includes(kw))
    );

    const advice = matchedSymptom 
      ? matchedSymptom.advice 
      : "I don't have specific advice for that symptom. Please consult a qualified medical professional for a proper diagnosis.";

    res.json({ symptom: input, advice });
  } catch (error) {
    console.error("Error checking symptom:", error);
    res.status(500).json({ error: "Sorry, I couldn't process your request. Please try again later." });
  }
};
