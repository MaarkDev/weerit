require('dotenv').config();
const cookieSession = require('cookie-session');
const cors = require('cors');
const express = require('express');
const passport = require('passport');
const passportSetup = require('./passport');
const authRoute = require('./routes/auth');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const listingRoutes = require('./routes/listingRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(cors({
  origin: [process.env.FRONTEND_URL, process.env.BACKEND_URL],
  methods: 'GET,POST,PUT,DELETE,PATCH',
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

app.use(bodyParser.json({ limit: '100mb' }));

app.use(cookieSession({
  name: 'session',
  keys: ['weerit'],
  maxAge: 24 * 60 * 60 * 1000,
  cookie: {
    secure: true,
    sameSite: 'none'
  }
}));


app.use(passport.initialize());
app.use(passport.session());



// Routes
app.use('/auth', authRoute);
app.use('/api/users', userRoutes);
app.use('/api/listings', listingRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // Listen for requests
    app.listen(PORT, () => {
      console.log(`Connected to db, listening on port ${PORT}`); 
    });
  })
  .catch((err) => {
    console.log(err);
  });
