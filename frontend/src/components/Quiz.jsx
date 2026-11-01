import React, { useState } from "react";

function Quiz() {
  const questions = [
    { 
      q: "How often do you wash your hands with soap?", 
      options: ["Frequently", "Occasionally", "Rarely", "Almost never"],
      points: [10, 5, 2, 0]
    },
    { 
      q: "How many minutes of moderate exercise do you get per week?", 
      options: ["150+ minutes", "60-149 minutes", "Under 60 minutes", "None"],
      points: [10, 7, 3, 0]
    },
    { 
      q: "How many hours of sleep do you get on average per night?", 
      options: ["7-9 hours", "6 hours", "Less than 5 hours", "10+ hours"],
      points: [10, 5, 2, 5]
    },
    { 
      q: "How many glasses of water do you drink daily?", 
      options: ["8 or more", "5-7 glasses", "2-4 glasses", "Rarely drink water"],
      points: [10, 8, 4, 0]
    },
    { 
      q: "How would you describe your daily diet?", 
      options: ["Balanced & Healthy", "Mostly healthy with occasional treats", "A lot of processed foods", "Mainly fast food"],
      points: [10, 8, 3, 0]
    },
    { 
      q: "Do you use tobacco products (smoking, vaping, chewing)?", 
      options: ["Never", "Quit years ago", "Occasionally", "Regularly"],
      points: [10, 8, 2, 0]
    },
    { 
      q: "How often do you practice stress management (meditation, hobby, exercise)?", 
      options: ["Daily", "Weekly", "Monthly", "Never"],
      points: [10, 7, 3, 0]
    },
    { 
      q: "When was your last general health check-up?", 
      options: ["Within the last year", "1-2 years ago", "Over 2 years ago", "Never had one"],
      points: [10, 7, 2, 0]
    }
  ];

  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (index) => {
    const pointsEarned = questions[current].points[index];
    setScore(score + pointsEarned);
    
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setShowResult(true);
    }
  };

  const restartQuiz = () => {
    setCurrent(0);
    setScore(0);
    setShowResult(false);
  };

  const getFeedback = (totalScore) => {
    const maxScore = questions.length * 10;
    const percentage = (totalScore / maxScore) * 100;

    if (percentage >= 90) return { title: "Excellent!", message: "You have fantastic health habits! Keep up the great work.", color: "#48bb78" };
    if (percentage >= 70) return { title: "Good job!", message: "You're doing well, but there's always room for small improvements.", color: "#4299e1" };
    if (percentage >= 50) return { title: "On the Right Track!", message: "You have some healthy habits, but let's try to focus more on consistency.", color: "#ecc94b" };
    return { title: "Let's work on healthy habits!", message: "Consider making small changes like drinking more water or walking daily.", color: "#f56565" };
  };

  const feedback = getFeedback(score);

  return (
    <div className="quiz-container">
      {!showResult ? (
        <div className="quiz-card">
          <div className="quiz-progress">
            <div 
              className="progress-bar" 
              style={{ width: `${((current + 1) / questions.length) * 100}%` }}
            ></div>
            <span className="question-count">Question {current + 1} of {questions.length}</span>
          </div>
          
          <h3 className="question-text">{questions[current].q}</h3>
          <div className="options-grid">
            {questions[current].options.map((ans, i) => (
              <button 
                key={i} 
                className="option-btn" 
                onClick={() => handleAnswer(i)}
              >
                {ans}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="quiz-result-card" style={{ borderTop: `6px solid ${feedback.color}` }}>
          <div className="result-icon" style={{ color: feedback.color }}>
            {score >= 60 ? "🏆" : "💪"}
          </div>
          <h2 style={{ color: feedback.color }}>{feedback.title}</h2>
          <div className="score-display">
            <span className="final-score">{score}</span>
            <span className="max-score">/ {questions.length * 10}</span>
          </div>
          <p className="feedback-message">{feedback.message}</p>
          <button className="btn-restart" onClick={restartQuiz}>Restart Quiz</button>
        </div>
      )}

      <style>{`
        .quiz-container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }

        .quiz-card {
          background: white;
          padding: 40px;
          border-radius: 15px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
          animation: fadeIn 0.4s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .quiz-progress {
          margin-bottom: 30px;
          position: relative;
        }

        .progress-bar {
          height: 6px;
          background: #667eea;
          border-radius: 10px;
          transition: width 0.3s ease;
        }

        .question-count {
          display: block;
          margin-top: 10px;
          font-size: 0.85rem;
          color: #718096;
          text-align: center;
        }

        .question-text {
          font-size: 1.4rem;
          color: #2d3748;
          margin-bottom: 30px;
          line-height: 1.4;
          text-align: center;
        }

        .options-grid {
          display: grid;
          gap: 12px;
        }

        .option-btn {
          padding: 15px 20px;
          border: 2px solid #edf2f7;
          border-radius: 10px;
          background: white;
          color: #4a5568;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          text-align: left;
        }

        .option-btn:hover {
          border-color: #667eea;
          background: #f7fafc;
          transform: translateX(5px);
        }

        .quiz-result-card {
          background: white;
          padding: 40px;
          border-radius: 15px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
          text-align: center;
          animation: scaleUp 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        @keyframes scaleUp {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }

        .result-icon {
          font-size: 4rem;
          margin-bottom: 20px;
        }

        .score-display {
          margin: 20px 0;
        }

        .final-score {
          font-size: 3rem;
          font-weight: 800;
          color: #2d3748;
        }

        .max-score {
          font-size: 1.2rem;
          color: #718096;
        }

        .feedback-message {
          font-size: 1.1rem;
          color: #4a5568;
          line-height: 1.6;
          margin-bottom: 30px;
        }

        .btn-restart {
          padding: 12px 40px;
          background: #667eea;
          color: white;
          border: none;
          border-radius: 30px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-restart:hover {
          background: #764ba2;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
        }
      `}</style>
    </div>
  );
}

export default Quiz;
