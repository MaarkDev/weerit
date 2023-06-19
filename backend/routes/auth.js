const router = require('express').Router();
const passport = require('passport');

router.get('/google', (req, res, next) => {
    console.log('Google authentication route triggered');
    next();
  }, passport.authenticate('google', {scope: ['profile', 'email']}));

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect(process.env.FRONTEND_URL)
})

router.get('/login/success', (req, res) => {
    if(req.user){
        res.status(200).json({
            success: true,
            message: 'success',
            user: req.user,
            cookies: req.cookies
        });
    }else{
        res.status(403).json({error: true, message: 'Not Authorized'})
    }
})

router.get('/login/failed', (req, res) => {
    res.status(401).json({
        success: false,
        message: 'failure'
    })
})

router.get('/google/callback', passport.authenticate('google', {
    successRedirect: 'https://weerit.onrender.com/',
    failureRedirect: '/login/failed'
}))


module.exports = router;