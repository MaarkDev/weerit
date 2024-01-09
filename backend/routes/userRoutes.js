const router = require('express').Router();
const { createUser, getUser, createNewUserRating, deleteRating, getMyRatings, reportUser, deleteUser, keepUser, 
    getReportedUsers, getReportedRatings, deleteReportedRating, keepReportedRating, reportRating } = require('../controllers/usersController')

router.post('/newuser', createUser);
router.get('/getuser/:id', getUser);
router.post('/newuserrating', createNewUserRating)
router.delete('/deleterating', deleteRating)
router.delete('/getmyratings', getMyRatings)

router.post('/reportuser', reportUser)
router.delete('/deleteuser', deleteUser)
router.delete('/keepuser', keepUser)
router.get('/getreportedusers', getReportedUsers)

router.post('/reportrating', reportRating);
router.delete('/deletereportedrating', deleteReportedRating);
router.delete('/keepreportedrating', keepReportedRating);
router.get('/getreportedratings', getReportedRatings);

module.exports = router;
