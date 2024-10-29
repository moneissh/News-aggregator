// // server.js
// const express = require('express');
// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const cors = require('cors');
// const axios = require('axios'); // Import Axios
// const User = require('./models/User');

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/auth-db', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// // Signup route
// app.post('/signup', async (req, res) => {
//   const { email, password } = req.body;

//   // Check if the user already exists
//   const existingUser = await User.findOne({ email });
//   if (existingUser) {
//     return res.status(400).json({ message: 'User already exists. Please log in.' });
//   }

//   // Hash the password and create a new user
//   const hashedPassword = await bcrypt.hash(password, 10);
//   const user = new User({ email, password: hashedPassword });

//   try {
//     await user.save();
//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (error) {
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // Login route
// app.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   // Check if the user exists
//   const user = await User.findOne({ email });
//   if (!user) {
//     return res.status(404).json({ message: 'User not found. Please register.' });
//   }

//   // Compare the password
//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) {
//     return res.status(401).json({ message: 'Invalid credentials. Please try again.' });
//   }

//   // Generate a JWT token
//   const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', {
//     expiresIn: '1h',
//   });

//   res.json({ token, message: 'Login successful' });
// });

// // GET endpoint to fetch news articles from News API
// app.get('/api/news', async (req, res) => {
//   const apiKey = '3ab53a4e5310424dbe67f46551b27c21'; // Replace with your News API key
//   const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

//   try {
//     const response = await axios.get(url);
//     const articles = response.data.articles.map(article => ({
//       id: article.source.id || article.url, // Use source ID or URL as a unique identifier
//       title: article.title,
//       imageUrl: article.urlToImage || 'https://via.placeholder.com/150', // Fallback image if none is provided
//       date: article.publishedAt,
//       description: article.description,
//     }));
//     res.json(articles);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch news articles' });
//   }
// });

// // Start server
// app.listen(5000, () => console.log('Server running on http://localhost:5000'));



  
// const express = require('express');
// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const cors = require('cors');
// const nodemailer = require('nodemailer');
// const User = require('./models/User'); // Your User model

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/auth-db', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// // Other routes for signup, login, etc...

// // Forgot password route (already exists in your code)
// app.post('/forgot-password', async (req, res) => {
//   const { email } = req.body;

//   // Check if the user exists
//   const user = await User.findOne({ email });
//   if (!user) {
//     return res.status(404).json({ message: 'No account found with that email' });
//   }

//   // Create a password reset token
//   const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });

//   // Set up Nodemailer
//   const transporter = nodemailer.createTransport({
//     host: 'smtp.gmail.com',
//     port: 587, // Use port 587 for TLS
//     secure: false, // Set to false for port 587
//     auth: {
//       user: 'kanmanipriyas.22cse@kongu.edu', // Your Gmail address
//       pass: 'rncd cmmp ixyg plif', // Your App Password
//     },
//     tls: {
//       rejectUnauthorized: false,
//     },
//   });

//   const mailOptions = {
//     from: 'kanmanipriyas.22cse@kongu.edu',
//     to: email,
//     subject: 'Password Reset Link',
//     text: `You requested a password reset. Click the link to reset your password: http://localhost:5000/reset-password/${token}`,
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     res.json({ message: 'Password reset link sent to your email' });
//   } catch (error) {
//     console.error('Error sending reset link:', error);
//     res.status(500).json({ message: 'Error sending reset link' });
//   }
// });

// // GET route to serve the reset password page
// app.get('/reset-password/:token', (req, res) => {
//   const { token } = req.params;

//   // Render a simple form for entering new password
//   res.send(`
//     <form action="/reset-password/${token}" method="POST">
//       <input type="password" name="newPassword" placeholder="Enter your new password" required />
//       <button type="submit">Reset Password</button>
//     </form>
//   `);
// });

// // POST route to handle password reset
// app.post('/reset-password/:token', async (req, res) => {
//   const { token } = req.params;
//   const { newPassword } = req.body;

//   try {
//     const decoded = jwt.verify(token, 'your_jwt_secret');
//     const userId = decoded.userId;

//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     const hashedPassword = await bcrypt.hash(newPassword, 10);
//     user.password = hashedPassword;
//     await user.save();

//     res.json({ message: 'Password reset successful' });
//   } catch (error) {
//     res.status(400).json({ message: 'Invalid or expired token' });
//   }
// });

// // Start the server
// app.listen(5000, () => {
//   console.log('Server running on http://localhost:5000');
// });
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const axios = require('axios'); // Import Axios for News API requests
const nodemailer = require('nodemailer'); // Import Nodemailer for email handling
const User = require('./models/User'); // Import the User model

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB (replace this with your actual MongoDB connection string)
mongoose.connect('mongodb://localhost:27017/auth-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Signup route
app.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  // Check if the user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists. Please log in.' });
  }

  // Hash the password and create a new user
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hashedPassword });

  try {
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Check if the user exists
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: 'User not found. Please register.' });
  }

  // Compare the password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid credentials. Please try again.' });
  }

  // Generate a JWT token
  const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', {
    expiresIn: '1h',
  });

  res.json({ token, message: 'Login successful' });
});

// Forgot password route
app.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  // Check if the user exists
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: 'No account found with that email' });
  }

  // Create a password reset token
  const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });

  // Set up Nodemailer
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587, // Use port 587 for TLS
    secure: false, // Set to false for port 587
    auth: {
      user: 'kanmanipriyas.22cse@kongu.edu', // Your Gmail address
      pass: 'rncd cmmp ixyg plif', // Your App Password
    },
    tls: {
      rejectUnauthorized: false, // Optional: may help with connection issues
    },
  });

  const mailOptions = {
    from: 'kanmanipriyas.22cse@kongu.edu',
    to: email,
    subject: 'Password Reset Link',
    text: `You requested a password reset. Click the link to reset your password: `, // Add your reset link here
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.json({ message: 'Password reset link sent to your email' });
  } catch (error) {
    console.error('Error sending reset link:', error); // Log error details for troubleshooting
    return res.status(500).json({ message: 'Error sending reset link' });
  }
});

// GET endpoint to fetch news articles from News API
app.get('/api/news', async (req, res) => {
  const apiKey = '3ab53a4e5310424dbe67f46551b27c21'; // Replace with your News API key
  const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

  try {
    const response = await axios.get(url);
    const articles = response.data.articles.map(article => ({
      id: article.source.id || article.url, // Use source ID or URL as a unique identifier
      title: article.title,
      imageUrl: article.urlToImage || 'https://via.placeholder.com/150', // Fallback image if none is provided
      date: article.publishedAt,
      description: article.description,
    }));
    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch news articles' });
  }
});

// Start the server
app.listen(5000, () => console.log('Server running on http://localhost:5000'));
