const mongoose = require('mongoose');
const User = require('../models/userModel'); 

const createUser = async (req, res) => {
    const { uid, mail, name } = req.body;
    try{
        const user = await User.create({ uid, mail, name });
        return res.status(200).json(user);
    }catch(err){
        return res.status(400).json({error: err.message});
    }
}

const getUser = async (req, res) => {
    const uid = req.params.id;
    try{
        const user = await User.findOne({ uid: uid })
        //console.log(user)
        res.json(user)
    } catch (e) {
        res.json({message: "nefunguje"})
    }
    
}

const createNewUserRating = async (req, res) => {
    const { text, stars, name, autor, user, uid } = req.body;
    const currentDate = new Date();
    const newRatingObj = { text, stars, name, autor, user, date: currentDate, uid }
    
    try{
        const foundUser = await User.findOne({ uid: user });
        const me = await User.findOne({ uid: autor });

        foundUser.ratings.push(newRatingObj);
        me.createdRatings.push(newRatingObj);

        await foundUser.save();
        await me.save();
    
        res.json(newRatingObj)
            
    }catch(e){
        res.status(500).json({ message: "Internal server error" })
    }

}

const deleteRating = async (req, res) => {
    const { uid, user, autor } = req.body;

    try {
        const updatedUser = await User.findOneAndUpdate(
            { uid: user },
            { $pull: { ratings: { uid: uid } } },
            { new: true }
        );

        const updatedMe = await User.findOneAndUpdate(
            { uid: autor },
            { $pull: { createdRatings: { uid: uid } } },
            { new: true }
        );

        return res.json({ message: 'Rating deleted successfully' });
    } catch (error) {
        console.error('Error deleting rating:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const getMyRatings = async (req, res) => {

}

module.exports = {
    createUser,
    getUser,
    createNewUserRating,
    deleteRating,
    getMyRatings
}