const mongoose = require('mongoose'); 
const Schema = mongoose.Schema 

const reportedUserSchema = new Schema({ 
    uid: {
        type: String, 
        required: true
    },
    name: {
        type: String, 
        required: true
    },
    reason: {
        type: String,
        required: true
    }
 }) 

 module.exports = mongoose.model('reportedUser', reportedUserSchema);

