require('dotenv').config();
const cookieSession = require('cookie-session');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const listingRoutes = require('./routes/listingRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT;
const passport = require('passport')
const passportCfg = require('./passport')

app.use(cors({
  origin: [process.env.FRONTEND_URL, process.env.FRONTEND_URL_NOWWW],
  methods: 'GET,POST,PUT,DELETE,PATCH',
  credentials: true
}));


app.set('trust proxy', 1)
app.use(
    cookieSession({
      name: "__session",
      keys: ["weerit"],
      maxAge: 24 * 60 * 60 * 100,
      secure: true, // COMMENT IN DEV
      httpOnly: true,
      sameSite: 'none' // COMMENT IN DEV
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json({ limit: '100mb' }));

// Routes
app.use('/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/listings', listingRoutes);

mongoose.connect(process.env.MONGO_URI_DEV)
  .then(() => {
    // Listen for requests
    app.listen(PORT, () => {
      console.log(`Connected to db, listening on port ${PORT}`); 
    });
  })
  .catch((err) => {
    console.log(err);
  });
