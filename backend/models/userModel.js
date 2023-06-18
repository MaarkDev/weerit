const mongoose = require('mongoose'); 
const Schema = mongoose.Schema 

const userSchema = new Schema({ 
    uid: {
        type: String, 
        required: true
    },
    mail: {
        type: String, 
        required: true
    },
    name: {
        type: String, 
        required: true
    },
    favorites: {
        type: Array
    },
    ratings: {
        type: Array
    },
    createdRatings: {
        type: Array
    }
 }) 

 module.exports = mongoose.model('User', userSchema);

