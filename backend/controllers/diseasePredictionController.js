export const predictDisease = async (req, res) => {
  try {
    const { symptoms } = req.body;
    
    if (
      !Array.isArray(symptoms) ||
      symptoms.length === 0 ||
      symptoms.some((symptom) => typeof symptom !== "string" || !symptom.trim())
    ) {
      return res.status(400).json({ error: "Please provide at least one symptom" });
    }
    
    // Disease prediction database based on symptoms
    const diseaseDatabase = {
      "fever,cough,headache": {
        disease: "Common Cold/Flu",
        confidence: "85%",
        description: "Viral infection affecting upper respiratory tract",
        severity: "Mild to Moderate",
        recommendation: "Rest, fluids, and over-the-counter medications. See doctor if symptoms persist beyond 7 days."
      },
      "fever,fatigue": {
        disease: "Viral Infection",
        confidence: "70%",
        description: "General viral infection",
        severity: "Mild",
        recommendation: "Stay hydrated, rest, and monitor temperature. Use fever-reducing medication if needed."
      },
      "cough,chest pain,shortness of breath": {
        disease: "Bronchitis/Pneumonia",
        confidence: "75%",
        description: "Lower respiratory tract infection",
        severity: "Moderate",
        recommendation: "Consult a doctor immediately. May require antibiotics and chest X-ray."
      },
      "headache,neck pain,fever": {
        disease: "Meningitis (Possible)",
        confidence: "60%",
        description: "Inflammation of meninges (requires urgent attention)",
        severity: "Severe",
        recommendation: "CONSULT DOCTOR IMMEDIATELY. This requires urgent medical evaluation."
      },
      "nausea,vomiting,diarrhea": {
        disease: "Gastroenteritis",
        confidence: "80%",
        description: "Stomach/intestinal infection",
        severity: "Mild to Moderate",
        recommendation: "Stay hydrated with oral rehydration solution. Avoid solid foods initially. See doctor if symptoms persist."
      },
      "joint pain,swelling,fever": {
        disease: "Arthritis/Rheumatic Condition",
        confidence: "65%",
        description: "Inflammatory joint condition",
        severity: "Moderate",
        recommendation: "Rest affected joints, apply ice/heat. Consult doctor for proper diagnosis and treatment."
      }
    };
    
    const normalize = (symptom) => symptom.trim().toLowerCase();
    const selectedSymptoms = [...new Set(symptoms.map(normalize))];
    const selectedSet = new Set(selectedSymptoms);
    const exactMatch = Object.entries(diseaseDatabase).find(([key]) => {
      const databaseSymptoms = key.split(",").map(normalize);
      return databaseSymptoms.length === selectedSet.size &&
        databaseSymptoms.every((symptom) => selectedSet.has(symptom));
    });

    let prediction = exactMatch?.[1] ?? null;

    if (!prediction) {
      const partialMatches = Object.entries(diseaseDatabase)
        .map(([key, value]) => {
          const databaseSymptoms = key.split(",").map(normalize);
          const matchedSymptoms = databaseSymptoms.filter((symptom) =>
            selectedSet.has(symptom)
          );
          const unionSize = new Set([...selectedSymptoms, ...databaseSymptoms]).size;

          return {
            value,
            matchedSymptoms,
            similarity: matchedSymptoms.length / unionSize,
          };
        })
        .filter(({ matchedSymptoms, similarity }) =>
          matchedSymptoms.length >= 2 && similarity >= 0.5
        )
        .sort((a, b) => b.similarity - a.similarity);

      const bestMatch = partialMatches[0];
      if (bestMatch) {
        prediction = {
          ...bestMatch.value,
          confidence: "45-55%",
          matchedSymptoms: bestMatch.matchedSymptoms,
        };
      }
    }
    
    if (!prediction) {
      prediction = {
        disease: "Unknown Condition",
        confidence: "Low",
        description: "Symptoms do not match common conditions in database",
        severity: "Unknown",
        recommendation: "Please consult a healthcare professional for accurate diagnosis."
      };
    }
    
    res.json({
      symptoms,
      prediction,
      disclaimer: "This symptom-based result is informational, not a medical diagnosis. Please consult a qualified healthcare professional for advice.",
      timestamp: new Date()
    });
  } catch (error) {
    console.error("Disease prediction error:", error);
    res.status(500).json({ error: "Failed to predict disease" });
  }
};

export const getSymptomSuggestions = async (req, res) => {
  try {
    const symptoms = [
      "fever",
      "cough",
      "headache",
      "fatigue",
      "chest pain",
      "shortness of breath",
      "sore throat",
      "nausea",
      "vomiting",
      "diarrhea",
      "joint pain",
      "muscle pain",
      "rash",
      "itching",
      "dizziness",
      "abdominal pain",
      "back pain",
      "ear pain",
      "eye pain",
      "insomnia"
    ];
    
    res.json({ symptoms });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch symptoms" });
  }
};
