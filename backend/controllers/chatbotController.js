export const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;

    // Input Validation
    if (!message || typeof message !== 'string' || message.trim() === '') {
      return res.status(400).json({ 
        reply: "Message is missing or empty. Please type something so I can help you!" 
      });
    }

    const input = message.toLowerCase();

    // Expanded array of response objects
    const responses = [
      {
        keywords: ["hello", "hi", "hey", "greetings"],
        reply: "Hi there! I'm your HealthAI assistant. How can I help you today?"
      },
      {
        keywords: ["fever", "temperature", "hot"],
        reply: "If you have a fever, rest, stay hydrated, and monitor your temperature. If it's over 103°F (39.4°C) or lasts more than 3 days, please see a doctor."
      },
      {
        keywords: ["headache", "migraine", "head pain"],
        reply: "For headaches, try resting in a quiet, dark room and stay hydrated. If you experience sudden, severe head pain or vision changes, seek immediate medical care."
      },
      {
        keywords: ["cough", "cold", "flu", "sneezing"],
        reply: "For a cough or cold, get plenty of rest, drink warm fluids, and use a humidifier. If you have difficulty breathing, consult a healthcare provider."
      },
      {
        keywords: ["stomach", "nausea", "vomit", "digestion", "belly"],
        reply: "For stomach issues or nausea, try small sips of clear liquids and the BRAT diet (Bananas, Rice, Applesauce, Toast). Avoid spicy or fatty foods."
      },
      {
        keywords: ["chest pain", "heart", "shortness of breath"],
        reply: "⚠️ EMERGENCY: Chest pain can be a sign of a serious condition. If you're experiencing chest pain, pressure, or shortness of breath, please call emergency services (112 or 108) immediately."
      },
      {
        keywords: ["skin", "rash", "itch", "redness"],
        reply: "Skin rashes can be caused by allergies, infections, or irritants. Keep the area clean and dry. See a dermatologist if the rash spreads or becomes painful."
      },
      {
        keywords: ["dizziness", "faint", "lightheaded"],
        reply: "Dizziness can be caused by dehydration, low blood sugar, or inner ear issues. Sit or lie down immediately. If it's accompanied by numbness or speech changes, call emergency services."
      },
      {
        keywords: ["sleep", "fatigue", "tired", "insomnia"],
        reply: "To improve sleep, maintain a regular schedule, limit caffeine, and avoid screens before bed. Chronic fatigue should be discussed with a doctor."
      },
      {
        keywords: ["diabetes", "sugar", "insulin", "glucose"],
        reply: "Managing diabetes involves monitoring blood sugar, following a healthy diet, and regular exercise. Always take prescribed medications as directed by your doctor."
      },
      {
        keywords: ["blood pressure", "hypertension", "bp"],
        reply: "High blood pressure often has no symptoms. Reduce salt intake, exercise regularly, and monitor your BP at home. Consult your doctor for a management plan."
      },
      {
        keywords: ["covid", "coronavirus", "pandemic"],
        reply: "For COVID-19, follow local health guidelines. If you have symptoms, isolate and get tested. Seek emergency care if you have trouble breathing or persistent chest pain."
      },
      {
        keywords: ["mental health", "anxiety", "depression", "stress", "sad"],
        reply: "Your mental health is important. If you're feeling overwhelmed, anxious, or depressed, consider speaking with a professional. In India, you can call the iCall helpline at 9152987821."
      },
      {
        keywords: ["exercise", "fitness", "workout", "active"],
        reply: "Regular exercise (at least 150 minutes of moderate activity per week) improves heart health, mood, and sleep. Start slow and stay consistent!"
      },
      {
        keywords: ["diet", "nutrition", "food", "healthy eating"],
        reply: "Focus on a balanced diet with plenty of fruits, vegetables, lean proteins, and whole grains. Stay hydrated by drinking 8-10 glasses of water daily."
      },
      {
        keywords: ["vaccine", "immunization", "shot"],
        reply: "Vaccines are a safe and effective way to prevent serious diseases. Stay up-to-date with your immunizations as recommended by healthcare authorities."
      },
      {
        keywords: ["pregnancy", "pregnant", "baby"],
        reply: "Prenatal care is essential for a healthy pregnancy. Take folic acid, avoid alcohol and smoking, and schedule regular check-ups with your OB-GYN."
      },
      {
        keywords: ["thank you", "thanks", "bye", "goodbye"],
        reply: "You're welcome! Stay healthy and feel free to ask if you have more questions. Goodbye!"
      }
    ];

    // Find a matching response
    const matchedResponse = responses.find(resObj => 
      resObj.keywords.some(kw => input.includes(kw))
    );

    const reply = matchedResponse 
      ? matchedResponse.reply 
      : "I'm not sure about that specific topic. I can help with information about fever, headaches, coughs, nutrition, mental health, and more. What else would you like to know?";

    res.json({ reply });
  } catch (error) {
    console.error("Chatbot Error:", error);
    res.status(500).json({ reply: "I'm having trouble connecting right now. Please try again later." });
  }
};
