console.log("🚀 Testing Health Awareness Backend API...\n");

const baseUrl = "http://localhost:5000";
const testDelay = 500;

const tests = [
  { name: "Root Endpoint", method: "GET", url: "/" },
  { name: "Register", method: "POST", url: "/api/auth/register", body: { email: "test@example.com", password: "password123", fullName: "John Doe" } },
  { name: "Login", method: "POST", url: "/api/auth/login", body: { email: "test@example.com", password: "password123" } },
  { name: "Disease Prediction", method: "POST", url: "/api/disease/predict", body: { symptoms: ["fever", "cough", "headache"] } },
  { name: "Symptom Suggestions", method: "GET", url: "/api/disease/symptoms" },
  { name: "Get Doctors", method: "GET", url: "/api/appointment/doctors" },
  { name: "Food Recommendations", method: "POST", url: "/api/food/recommendations", body: { symptoms: ["fever"] } },
  { name: "Healthy Recipes", method: "GET", url: "/api/food/recipes" },
  { name: "Add Health Record", method: "POST", url: "/api/health/add", body: { email: "test@example.com", recordType: "blood-pressure", data: { systolic: 120, diastolic: 80 } } },
  { name: "Chatbot", method: "POST", url: "/api/chatbot/chat", body: { message: "hello" } },
  { name: "Symptom Check", method: "POST", url: "/api/symptom", body: { symptom: "fever" } }
];

async function runTests() {
  for (let i = 0; i < tests.length; i++) {
    setTimeout(async () => {
      const test = tests[i];
      try {
        const options = {
          method: test.method,
          headers: { "Content-Type": "application/json" }
        };
        if (test.body) {
          options.body = JSON.stringify(test.body);
        }
        
        const res = await fetch(baseUrl + test.url, options);
        const data = await res.json();
        
        console.log(`✅ ${test.name}`);
        console.log(`   Status: ${res.status}`);
        console.log(`   Response: ${JSON.stringify(data).substring(0, 100)}...\n`);
      } catch (error) {
        console.log(`❌ ${test.name}`);
        console.log(`   Error: ${error.message}\n`);
      }
    }, testDelay * (i + 1));
  }
  
  setTimeout(() => process.exit(0), testDelay * (tests.length + 1));
}

runTests();
