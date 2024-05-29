const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('../models/User');
// const { hashPassword , comparePasswords } = require('../utils/passwordHandler'); 


exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // const hashedPassword = await hashPassword(password); 
    
    const user = new User({ name: name, email: email, password: password });
  
      const savedUser = await user.save();
      res.status(200).json({ message: 'User created successfully', data: savedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    const isMatch =  await bcrypt.compare(password, user.password); 
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const payload = { user: { id: user._id , email: user.email} };
    const token = jwt.sign(payload, process.env.TOKEN_KEY, { expiresIn: '30d' }); 

    res.status(200).json({ message: 'User loggedin successfully', token: token, data: user.toJSON() });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
