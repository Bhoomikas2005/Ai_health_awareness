export const getFoodRecommendations = async (req, res) => {
  try {
    const { symptoms, dietaryPreferences } = req.body;
    
    const foodDatabase = {
      fever: {
        recommended: [
          "Warm liquids (water, herbal tea, warm milk)",
          "Chicken broth or vegetable soup",
          "Fruits rich in Vitamin C (oranges, strawberries, kiwis)",
          "Honey and ginger tea",
          "Light rice or oatmeal"
        ],
        avoid: [
          "Heavy, greasy foods",
          "Spicy foods",
          "Dairy products (initially)",
          "High-caffeine drinks",
          "Alcohol"
        ]
      },
      cough: {
        recommended: [
          "Honey-lemon water",
          "Ginger tea",
          "Turmeric milk (golden milk)",
          "Warm soups",
          "Vitamin C rich fruits",
          "Garlic and onion",
          "Almonds or walnuts"
        ],
        avoid: [
          "Cold drinks",
          "Spicy food",
          "Smoking and secondhand smoke",
          "Dairy (if mucus-producing)"
        ]
      },
      headache: {
        recommended: [
          "Magnesium-rich foods (almonds, spinach, seeds)",
          "Water and hydrating beverages",
          "Ginger tea",
          "Dark chocolate (mild headaches)",
          "Salmon and fish (omega-3s)",
          "Leafy greens"
        ],
        avoid: [
          "Caffeine (in excess)",
          "Alcohol",
          "Processed foods with MSG",
          "Skipping meals"
        ]
      },
      diarrhea: {
        recommended: [
          "Oral rehydration solution (ORS)",
          "Bananas",
          "Plain rice",
          "Boiled potatoes",
          "Applesauce",
          "Chicken broth",
          "White toast"
        ],
        avoid: [
          "Dairy products",
          "High-fiber foods initially",
          "Spicy foods",
          "Fatty foods",
          "Alcohol and caffeine"
        ]
      },
      fatigue: {
        recommended: [
          "Iron-rich foods (red meat, lentils, spinach)",
          "Energy-rich foods (nuts, seeds, dried fruits)",
          "Whole grains",
          "Protein-rich foods (eggs, fish, legumes)",
          "Fruits rich in natural sugars",
          "Green tea"
        ],
        avoid: [
          "Excessive sugar",
          "Refined carbohydrates",
          "Alcohol",
          "Heavy meals"
        ]
      },
      default: {
        recommended: [
          "Fresh fruits and vegetables",
          "Whole grains",
          "Lean proteins",
          "Adequate water intake",
          "Balanced meals"
        ],
        avoid: [
          "Processed foods",
          "Excess sugar",
          "Excess salt"
        ]
      }
    };
    
    let recommendations = {};
    
    if (!symptoms || symptoms.length === 0) {
      recommendations = foodDatabase.default;
    } else {
      recommendations = { recommended: [], avoid: [] };
      
      for (const symptom of symptoms) {
        const food = foodDatabase[symptom.toLowerCase()] || foodDatabase.default;
        recommendations.recommended = [...new Set([...recommendations.recommended, ...food.recommended])];
        recommendations.avoid = [...new Set([...recommendations.avoid, ...food.avoid])];
      }
    }
    
    res.json({
      symptoms: symptoms || ["General"],
      recommendations,
      tips: [
        "Eat small, frequent meals",
        "Stay well hydrated",
        "Consult a nutritionist for personalized advice",
        "Avoid self-medication alongside foods"
      ]
    });
  } catch (error) {
    console.error("Food recommendation error:", error);
    res.status(500).json({ error: "Failed to get food recommendations" });
  }
};

export const getHealthyRecipes = async (req, res) => {
  try {
    const recipes = [
      {
        id: 1,
        name: "Turmeric Ginger Tea",
        duration: "10 mins",
        difficulty: "Easy",
        ingredients: ["Turmeric", "Fresh ginger", "Honey", "Lemon juice", "Hot water"],
        benefits: "Anti-inflammatory, supports immunity"
      },
      {
        id: 2,
        name: "Green Smoothie Bowl",
        duration: "15 mins",
        difficulty: "Easy",
        ingredients: ["Spinach", "Banana", "Apple", "Almond milk", "Granola", "Berries"],
        benefits: "Rich in vitamins, detoxifying"
      },
      {
        id: 3,
        name: "Lentil Soup",
        duration: "40 mins",
        difficulty: "Medium",
        ingredients: ["Red lentils", "Vegetable broth", "Carrots", "Onion", "Garlic", "Turmeric"],
        benefits: "High protein, iron-rich"
      },
      {
        id: 4,
        name: "Quinoa Buddha Bowl",
        duration: "30 mins",
        difficulty: "Easy",
        ingredients: ["Quinoa", "Chickpeas", "Vegetables", "Tahini", "Olive oil"],
        benefits: "Complete protein, balanced nutrients"
      },
      {
        id: 5,
        name: "Garlic Ginger Chicken",
        duration: "45 mins",
        difficulty: "Medium",
        ingredients: ["Chicken breast", "Garlic", "Ginger", "Soy sauce", "Honey", "Vegetables"],
        benefits: "Lean protein, immunity boost"
      }
    ];
    
    res.json({ recipes });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch recipes" });
  }
};
