const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// REGISTER — Only works if NO admin exists yet OR secret key is correct
router.post('/register', async (req, res) => {
  const { username, password, secretKey } = req.body;
  try {
    const adminCount = await Admin.countDocuments();
    
    // If admin already exists, require secret key
    if (adminCount > 0) {
      if (secretKey !== process.env.ADMIN_SECRET_KEY) {
        return res.status(403).json({ 
          message: '🔒 Registration is locked. Invalid secret key.' 
        });
      }
    }

    const exists = await Admin.findOne({ username });
    if (exists) {
      return res.status(400).json({ message: 'Username already taken.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const admin = await Admin.create({ username, password: hashedPassword });

    res.status(201).json({
      _id: admin._id,
      username: admin.username,
      token: generateToken(admin._id)
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    res.json({
      _id: admin._id,
      username: admin.username,
      token: generateToken(admin._id)
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// GET /api/auth/check — Check if any admin exists
router.get('/check', async (req, res) => {
  const count = await Admin.countDocuments();
  res.json({ exists: count > 0 });
});

module.exports = router;