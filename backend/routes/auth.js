const router = require('express').Router();
const passport = require('passport');

router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}))

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('http://localhost:3000/')
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
    successRedirect: 'http://localhost:3000/',
    failureRedirect: '/login/failed'
}))

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('http://localhost:3000')
})

module.exports = router;