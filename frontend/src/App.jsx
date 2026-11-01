import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Chatbot from "./components/Chatbot.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Resources from "./pages/Resources.jsx";
import Auth from "./pages/Auth.jsx";
import DiseasePrediction from "./pages/DiseasePrediction.jsx";
import RiskDashboard from "./pages/RiskDashboard.jsx";
import Appointments from "./pages/Appointments.jsx";
import MedicationTracker from "./pages/MedicationTracker.jsx";
import HealthRecords from "./pages/HealthRecords.jsx";
import FoodRecommendations from "./pages/FoodRecommendations.jsx";

function App() {
  return (
    <Router>
      <div style={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
        <Navbar />
        <main className="content" style={{flex: 1}}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/disease-prediction" element={<DiseasePrediction />} />
            <Route path="/risk-dashboard" element={<RiskDashboard />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/medications" element={<MedicationTracker />} />
            <Route path="/health-records" element={<HealthRecords />} />
            <Route path="/food-recommendations" element={<FoodRecommendations />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/resources" element={<Resources />} />
          </Routes>
        </main>
        <Footer />
        <Chatbot />
      </div>
    </Router>
  );
}

export default App;
