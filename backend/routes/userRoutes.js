const router = require('express').Router();
const { createUser, getUser, createNewUserRating, deleteRating, getMyRatings } = require('../controllers/usersController')

router.post('/newuser', createUser);
router.get('/getuser/:id', getUser);
router.post('/newuserrating', createNewUserRating)
router.delete('/deleterating', deleteRating)
router.delete('/getmyratings', getMyRatings)

module.exports = router;
