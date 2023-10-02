const router = require('express').Router();
const passport = require('passport');

router.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }))

router.get('/google/callback', passport.authenticate('google', {
    successRedirect: `${process.env.FRONTEND_URL}`,
    failureRedirect: `/login/failed`
}))

router.get('/login/success', (req, res) => {
    if (req.user) {
        res.status(200).json({
            success: true,
            message: "success",
            user: req.user,
            cookies: req.cookies
        })
    } else {
        res.status(403).json({ message: "Auth has Failed" })
    }
})

router.get('/login/failed', (req, res) => {
    res.status(401).json({
        success: false,
        message: "failure"
    })
})

router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect(process.env.FRONTEND_URL);
})

module.exports = router;