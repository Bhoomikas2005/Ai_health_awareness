export const validateRequestBody = (req, res, next) => {
  if (req.method === 'POST' || req.method === 'PUT') {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "Request body is missing or empty." });
    }

    for (const key in req.body) {
      if (req.body[key] === null || req.body[key] === undefined) {
        return res.status(400).json({ error: `Field '${key}' cannot be null or undefined.` });
      }
      // Basics: ensure strings are strings if we expect them to be
      // This is a simple generic check, can be more specific per route
    }
  }
  next();
};

export const validateChatbotMessage = (req, res, next) => {
  const { message } = req.body;
  if (!message || typeof message !== 'string' || message.trim() === '') {
    return res.status(400).json({ error: "Message field is required and must be a non-empty string." });
  }
  next();
};

export const validateSymptom = (req, res, next) => {
  const { symptom } = req.body;
  if (!symptom || typeof symptom !== 'string' || symptom.trim() === '') {
    return res.status(400).json({ error: "Symptom field is required and must be a non-empty string." });
  }
  next();
};
