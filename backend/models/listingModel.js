const { Timestamp } = require('mongodb');
const mongoose = require('mongoose'); 
const Schema = mongoose.Schema 

const listingSchema = new Schema({ 
    autor: {
        type: String
    },
    uid: {
        type: String, 
    },
    nazov: {
        type: String, 
    },
    popis: {
        type: String, 
    },
    kategoria: {
        type: String, 
    },
    znacka: {
        type: String, 
    },
    velkost: {
        type: String, 
    },
    farba: {
        type: String, 
    },
    prekoho: {
        type: String, 
    },
    psc: {
        type: String, 
    },
    telefon: {
        type: String, 
    },
    mail: {
        type: String, 
    },
    igfb: {
        type: String, 
    },
    cena: {
        type: Number, 
    },
    fotky: {
        type: Array,
        default: []
    },
    mesto: {
        type: String
    },
    location: {
        type: Object
    }
 }, { timestamps: true }) 

 module.exports = mongoose.model('Listing', listingSchema);

