export const getHealthAwareness = async (req, res) => {
  try {
    const { prompt } = req.body;

    // Input Validation
    if (!prompt || typeof prompt !== 'string' || prompt.trim() === '') {
      return res.status(400).json({ 
        generatedText: "Please provide a health topic so I can share some tips with you!" 
      });
    }

    const input = prompt.toLowerCase().trim();

    // Map keywords to specific tips
    const keywordTips = [
      {
        keywords: ["diet", "nutrition", "food", "eat", "weight"],
        tips: [
          "Focus on eating a rainbow of fruits and vegetables to get various vitamins.",
          "Limit processed sugars and refined grains to maintain stable energy levels.",
          "Watch your portion sizes and eat slowly to prevent overeating.",
          "Incorporate lean protein sources like beans, lentils, and lean meats."
        ]
      },
      {
        keywords: ["exercise", "fitness", "workout", "active", "move"],
        tips: [
          "Aim for at least 150 minutes of moderate aerobic activity every week.",
          "Incorporate strength training at least twice a week for muscle health.",
          "Even small amounts of movement, like taking the stairs, add up over time.",
          "Stay consistent with activities you enjoy to make fitness a habit."
        ]
      },
      {
        keywords: ["mental", "stress", "anxiety", "sleep", "rest"],
        tips: [
          "Practice daily mindfulness or meditation to lower cortisol levels.",
          "Ensure you get 7-9 hours of consistent sleep for cognitive health.",
          "Set healthy boundaries between work and personal life to reduce burnout.",
          "Reach out to friends or professionals when feeling overwhelmed."
        ]
      },
      {
        keywords: ["hygiene", "clean", "wash", "germs", "infection"],
        tips: [
          "Wash hands with soap for at least 20 seconds, especially before eating.",
          "Clean frequently touched surfaces like phones and keyboards regularly.",
          "Avoid touching your face, especially eyes and mouth, with unwashed hands.",
          "Maintain good oral hygiene by brushing and flossing twice daily."
        ]
      }
    ];

    // Find a matching tip category
    const matchedCategory = keywordTips.find(category => 
      category.keywords.some(kw => input.includes(kw))
    );

    let generatedText = "";
    if (matchedCategory) {
      generatedText = "Based on your interest, here are some helpful health tips:\n\n" + 
                     matchedCategory.tips.map((tip, idx) => `${idx + 1}. ${tip}`).join("\n\n");
    } else {
      // General fallback tips
      const generalTips = [
        "Drink at least 8 glasses of water daily for hydration.",
        "Take a short walk every hour if you have a desk job.",
        "Schedule regular health check-ups with your physician.",
        "Prioritize sleep as it is vital for physical and mental recovery."
      ];
      generatedText = "Here are some general health awareness tips for you:\n\n" + 
                     generalTips.map((tip, idx) => `${idx + 1}. ${tip}`).join("\n\n");
    }

    res.json({ generatedText });
  } catch (error) {
    console.error("Error generating health awareness:", error);
    res.status(500).json({ generatedText: "Sorry, I couldn't generate health tips right now. Please try again." });
  }
};
