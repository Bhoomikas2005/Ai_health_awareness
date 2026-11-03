import React, { useState, useRef, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function Chatbot() {
  const [messages, setMessages] = useState([
    { text: "Hello! I'm your HealthAI assistant. How can I help you today?", user: false }
  ]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { text: userMessage, user: true }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/chatbot/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!res.ok) {
        throw new Error("Failed to get response");
      }

      const data = await res.json();
      setMessages(prev => [...prev, { text: data.reply, user: false }]);
    } catch (err) {
      setMessages(prev => [...prev, { 
        text: "I'm sorry, I'm having trouble connecting to the medical database. Please try again later.", 
        user: false 
      }]);
      console.error("Chatbot error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button 
        className={`chatbot-toggle ${isOpen ? 'active' : ''}`} 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Chatbot"
      >
        {isOpen ? "✕" : "💬"}
      </button>

      {isOpen && (
        <div className="chatbot-widget">
          <div className="chatbot-header">
            <h4>🏥 HealthAI Assistant</h4>
            <p>Always seek professional medical advice for emergencies.</p>
          </div>
          
          <div className="chat-window">
            {messages.map((msg, i) => (
              <div key={i} className={`message-container ${msg.user ? "user" : "ai"}`}>
                <div className="message-bubble">
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="message-container ai">
                <div className="message-bubble loading">
                  <span>.</span><span>.</span><span>.</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input-area">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask about symptoms, diet, health tips..."
              onKeyDown={e => e.key === "Enter" && handleSend()}
              disabled={loading}
            />
            <button 
              onClick={handleSend} 
              disabled={loading || !input.trim()}
              className="send-btn"
            >
              ➤
            </button>
          </div>
        </div>
      )}

      <style>{`
        .chatbot-toggle {
          position: fixed;
          bottom: 30px;
          right: 30px;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          font-size: 24px;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(0,0,0,0.2);
          z-index: 1000;
          transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .chatbot-toggle.active {
          transform: rotate(90deg);
        }

        .chatbot-widget {
          position: fixed;
          bottom: 100px;
          right: 30px;
          width: 350px;
          height: 500px;
          background: white;
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.15);
          display: flex;
          flex-direction: column;
          z-index: 1000;
          overflow: hidden;
          animation: slideIn 0.3s ease-out;
        }

        @keyframes slideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .chatbot-header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 15px;
        }

        .chatbot-header h4 {
          margin: 0;
          font-size: 1.1rem;
        }

        .chatbot-header p {
          margin: 5px 0 0 0;
          font-size: 0.75rem;
          opacity: 0.8;
        }

        .chat-window {
          flex: 1;
          padding: 15px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 12px;
          background: #f8fafc;
        }

        .message-container {
          display: flex;
          width: 100%;
        }

        .message-container.user {
          justify-content: flex-end;
        }

        .message-container.ai {
          justify-content: flex-start;
        }

        .message-bubble {
          max-width: 80%;
          padding: 10px 15px;
          border-radius: 18px;
          font-size: 0.95rem;
          line-height: 1.4;
          word-wrap: break-word;
        }

        .user .message-bubble {
          background: #667eea;
          color: white;
          border-bottom-right-radius: 4px;
        }

        .ai .message-bubble {
          background: white;
          color: #333;
          border-bottom-left-radius: 4px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.05);
        }

        .loading span {
          animation: blink 1.4s infinite both;
          font-weight: bold;
          font-size: 1.2rem;
        }

        .loading span:nth-child(2) { animation-delay: 0.2s; }
        .loading span:nth-child(3) { animation-delay: 0.4s; }

        @keyframes blink {
          0% { opacity: 0.2; }
          20% { opacity: 1; }
          100% { opacity: 0.2; }
        }

        .chat-input-area {
          padding: 12px;
          background: white;
          border-top: 1px solid #edf2f7;
          display: flex;
          gap: 8px;
        }

        .chat-input-area input {
          flex: 1;
          padding: 10px 15px;
          border: 1px solid #e2e8f0;
          border-radius: 20px;
          outline: none;
          font-size: 0.9rem;
        }

        .send-btn {
          background: #667eea;
          color: white;
          border: none;
          width: 35px;
          height: 35px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s;
        }

        .send-btn:hover:not(:disabled) {
          background: #764ba2;
        }

        .send-btn:disabled {
          background: #cbd5e0;
          cursor: not-allowed;
        }

        @media (max-width: 480px) {
          .chatbot-widget {
            right: 15px;
            left: 15px;
            width: calc(100% - 30px);
            bottom: 90px;
            height: calc(100% - 120px);
          }
        }
      `}</style>
    </>
  );
}

export default Chatbot;
