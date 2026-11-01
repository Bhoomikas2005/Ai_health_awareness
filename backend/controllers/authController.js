// Simple in-memory user storage (in production, use a database)
const users = {};
const userHealthHistory = {};

export const register = async (req, res) => {
  try {
    const { email, password, fullName } = req.body;
    
    if (!email || !password || !fullName) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    
    if (users[email]) {
      return res.status(400).json({ error: "User already exists" });
    }
    
    users[email] = { password, fullName, createdAt: new Date() };
    userHealthHistory[email] = [];
    
    res.json({ 
      message: "Registration successful",
      user: { email, fullName }
    });
  } catch (error) {
    res.status(500).json({ error: "Registration failed" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: "Missing email or password" });
    }
    
    const user = users[email];
    if (!user || user.password !== password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    
    res.json({ 
      message: "Login successful",
      user: { email, fullName: user.fullName },
      token: `token_${email}_${Date.now()}`
    });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const { email } = req.query;
    
    const user = users[email];
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    res.json({
      user: {
        email,
        fullName: user.fullName,
        createdAt: user.createdAt
      },
      healthHistory: userHealthHistory[email] || []
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch profile" });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const { email, fullName, age, gender, bloodType } = req.body;
    
    if (!users[email]) {
      return res.status(404).json({ error: "User not found" });
    }
    
    users[email] = {
      ...users[email],
      fullName: fullName || users[email].fullName,
      age,
      gender,
      bloodType
    };
    
    res.json({ 
      message: "Profile updated successfully",
      user: users[email]
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to update profile" });
  }
};
