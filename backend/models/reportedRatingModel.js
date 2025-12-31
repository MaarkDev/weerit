const mongoose = require('mongoose'); 
const Schema = mongoose.Schema 

const reportedRatingSchema = new Schema({ 
    user: {
        type: String, 
        required: true
    },
    autor: {
        type: String, 
        required: true
    },
    stars: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    uid: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    }
 }) 

 module.exports = mongoose.model('reportedRating', reportedRatingSchema);

