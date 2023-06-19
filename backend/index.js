require('dotenv').config();
const cookieSession = require('cookie-session');
const cors = require('cors');
const express = require('express');
const passport = require('passport');
const passportSetup = require('./passport');
const authRoute = require('./routes/auth')
const bodyParser = require("body-parser"); 
const mongoose = require('mongoose');
const listingRoutes = require('./routes/listingRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT;

app.use(cookieSession(
  {
    name: "session",
    keys:['weerit'],
    maxAge: 24*60*60*1000
  }
))

app.use(passport.initialize());
app.use(passport.session());

app.use(cors());

app.use(bodyParser.json({ limit: '100mb' }));

app.use('/auth', authRoute);
app.use('/api/users', userRoutes);
app.use('/api/listings', listingRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
        console.log(`connnected to db, listening on port ${process.env.PORT}`); 
    })
    })
    .catch((err) => {
        console.log(err);
    })
