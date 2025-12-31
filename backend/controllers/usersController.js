const mongoose = require('mongoose');
const User = require('../models/userModel'); 
const Listing = require('../models/listingModel');
const ReportedUser = require('../models/reportedUserModel'); 
const ReportedListing = require('../models/reportedModel'); 
const ReportedRating = require('../models/reportedRatingModel');

const sec = require('../sec');
const crypto = require('crypto-js');

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
        const userObj = user.toObject();

        userObj.apiToken = crypto.AES.encrypt(userObj.apiToken, process.env.SEED).toString();
        //console.log(userObj)
        res.json(userObj)
    } catch (e) {
        res.json({message: "Error trying to get user"})
    }
    
}

const createNewUserRating = async (req, res) => {
    const { text, stars, name, autor, user, uid } = req.body;
    const currentDate = new Date();
    const newRatingObj = { text, stars, name, autor, user, date: currentDate, uid }
    
    const keyOk = await sec.checkKey(req, res);
    if(!keyOk){
        return res.status(400).json({ message: 'Forbidden' });
    }

    try{
        const foundUser = await User.findOne({ uid: user });
        const me = await User.findOne({ uid: autor });

        foundUser.ratings.push(newRatingObj);
        me.createdRatings.push(newRatingObj);

        await foundUser.save();
        await me.save();
    
        await sec.createNewToken(req, res, keyOk);
        res.json(newRatingObj)
            
    }catch(e){
        res.status(500).json({ message: "Internal server error" })
    }

}

const deleteRating = async (req, res) => {
    const { uid, user, autor } = req.body;

    const keyOk = await sec.checkKey(req, res);
    if(!keyOk){
        return res.status(400).json({ message: 'Forbidden' });
    }

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

        await sec.createNewToken(req, res, keyOk);
        return res.json({ message: 'Rating deleted successfully' });
    } catch (error) {
        console.error('Error deleting rating:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const getMyRatings = async (req, res) => {

}

const reportUser = async (req, res) => {
    try{
        const { uid, name, reason } = req.body;
        await ReportedUser.create({
            uid: uid,
            name: name,
            reason: reason
        })
        return res.status(200).json({ message: "User reported" });
    }catch(e){
        return res.status(400).json({ message: "Couldnt report user" });
    }
}

const deleteUser = async (req, res) => {
    const keyOk = await sec.checkKey(req, res);
    if(!keyOk){
        return res.status(400).json({ message: 'Forbidden' });
    }

    const { uid } = req.body;

    try {
        await ReportedUser.deleteMany({ uid: uid });
        await User.findOneAndDelete({ uid: uid });
        await ReportedListing.deleteMany({ autor: uid });
        await Listing.deleteMany({ autor: uid });
        res.status(200).json({ message: "Success" });
    } catch (e) {
        res.status(400).json({ message: "Fail" });
    }
}

const keepUser = async (req, res) => {
    const keyOk = await sec.checkKey(req, res);
    if(!keyOk){
        return res.status(400).json({ message: 'Forbidden' });
    }

    const { uid } = req.body;

    try {
        await ReportedUser.deleteMany({ uid: uid });
        res.status(200).json({ message: "Success" });
    } catch (e) {
        res.status(400).json({ message: "Fail" });
    }
}

const getReportedUsers = async (req, res) => {
    try {
        const reportedUsers = await ReportedUser.find();
        return res.status(200).json(reportedUsers);
    } catch (e) {
        return res.status(400).json({ message: "Error getting users" });
    }
}

const reportRating = async (req, res) => {
    try{
        const { user, autor, stars, name, uid, text } = req.body;
        await ReportedRating.create({
            user: user, autor: autor, stars: stars, name: name, uid: uid, text: text
        })
        return res.status(200).json({ message: "Rating reported" });
    }catch(e){
        return res.status(400).json({ message: "Couldnt report rating" });
    }
}

const getReportedRatings = async (req, res) => {
    try {
        const reportedRatings = await ReportedRating.find();
        return res.status(200).json(reportedRatings);
    } catch (e) {
        console.log(e);
    }
}

const deleteReportedRating = async (req, res) => {
    const { uid, user, autor } = req.body;

    const keyOk = await sec.checkKey(req, res);
    if(!keyOk){
        return res.status(400).json({ message: 'Forbidden' });
    }

    console.log(uid)
    console.log(user)
    console.log(autor)

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

        await ReportedRating.deleteMany({
            uid: uid
        })

        await sec.createNewToken(req, res, keyOk);
        return res.json({ message: 'Rating deleted successfully' });
    } catch (error) {
        console.error('Error deleting rating:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const keepReportedRating = async (req, res) => {
    const keyOk = await sec.checkKey(req, res);
    if(!keyOk){
        return res.status(400).json({ message: 'Forbidden' });
    }

    try {
        await ReportedRating.deleteMany({ uid: req.body.uid })
        res.status(200).json({ message: "Success" });
    } catch (e) {
        return res.status(400).json({ message: "Fail" });
    }
}

module.exports = {
    createUser,
    getUser,
    createNewUserRating,
    deleteRating,
    getMyRatings,
    reportUser,
    deleteUser,
    keepUser,
    getReportedUsers,
    reportRating,
    getReportedRatings,
    deleteReportedRating,
    keepReportedRating
}