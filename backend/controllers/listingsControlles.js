const Listing = require('../models/listingModel');
const User = require('../models/userModel');
const Reported = require('../models/reportedModel');
const sec = require('../sec')

const router = require('express').Router();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});


const createListing = async (req, res) => {
    const { autor, uid, nazov, popis, kategoria, znacka, velkost,
        farba, prekoho, psc, telefon, mail, igfb, cena, fotky, mesto, lat, lng } = req.body;

    let url_array = [];

    if(!sec.checkKey(req, res)){
        return res.status(400).json({ message: 'Forbidden' });
    }

    try {
        for (let i = 0; i < fotky.length; i++) {
            const result = await cloudinary.uploader.upload(fotky[i]);
            url_array.push(result.url);
        }

        const listing = await Listing.create({
            autor: autor,
            uid: uid,
            nazov: nazov,
            popis: popis,
            kategoria: kategoria,
            znacka: znacka,
            velkost: velkost,
            farba: farba,
            prekoho: prekoho,
            psc: psc,
            telefon: telefon,
            mail: mail,
            igfb: igfb,
            cena: cena,
            fotky: url_array,
            mesto: mesto,
            location: {
                type: 'Point',
                coordinates: [lng, lat]
            }
        })
        return res.status(200).json(listing);
    } catch (e) {
        console.log(e)
    }

};

const getListings = async (req, res) => {
    const query = req.query
    const pageNumber = req.query.pagenumber;
    const pageSize = 20;
    console.log("PAGENUMBER: " + query.pagenumber)
    const listings = await Listing.find({}).sort({ createdAt: -1 }).skip((pageNumber - 1) * pageSize).limit(pageSize).exec();
    return res.status(200).json(listings);
};

const getListing = async (req, res) => {
    const listing = await Listing.find({ uid: req.query.uid });
    return res.status(200).json(listing);
}

const getMyListings = async (req, res) => {
    const listings = await Listing.find({ autor: req.query.uid }).sort({ createdAt: -1 });
    return res.status(200).json(listings);
};

const deleteListing = async (req, res) => {
    const fotky = req.body.fotky;

    if(!sec.checkKey(req, res)){
        return res.status(400).json({ message: 'Forbidden' });
    }

    for(let i = 0; i < fotky.length; i++){
        const urlParts = fotky[i].split('/');
        const last_part = urlParts.pop();
        const dotIndex = last_part.indexOf('.');
        const public_id = last_part.substring(0, dotIndex);
        //console.log(public_id)
        await cloudinary.uploader.destroy(public_id, function(result) { console.log("image deleted") });
    }
    const deletedListing = await Listing.findOneAndDelete({ uid: req.body.uid });
    return res.status(200).json(deletedListing); 
}

const searchListings = async (req, res) => {
    const query = req.query;
    //console.log(req.query)
    let kategoriaArr = query.kategoria.split(',');
    let velkostArr = query.velkost.split(',');
    velkostArr.push(query.velkostIna);
    let znackaArr = query.znacka.split(',');
    znackaArr.push(query.znackaIna);
    let farbaArr = query.farba.split(',');
    let prekohoArr = query.prekoho.split(',');
    let coordsArr = query.coords.split(',');

    const pageNumber = query?.pagenumber || 1;
    const pageSize = 20;
    

    kategoriaArr = kategoriaArr.filter(item => item !== '');
    velkostArr = velkostArr.filter(item => item !== '');
    znackaArr = znackaArr.filter(item => item !== '');
    farbaArr = farbaArr.filter(item => item !== '');
    prekohoArr = prekohoArr.filter(item => item !== '');


    const filter = {
        //kategoria: kategoriaArr[0] !== '' ? { $in: kategoriaArr } :,
        ...(kategoriaArr.length > 0 ? { kategoria: { $in: kategoriaArr.map(item => new RegExp(item, 'i')) } } : {}),
        //velkost: (velkostArr[0] !== '' ? { $in: velkostArr } : {}),
        ...(velkostArr.length > 0 ? { velkost: { $in: velkostArr.map(item => new RegExp(item, 'i')) } } : {}),
        //znacka: znackaArr[0] !== '' ? { $in: znackaArr } : {},
        ...(znackaArr.length > 0 ? { znacka: { $in: znackaArr.map(item => new RegExp(item, 'i')) } } : {}),
        //farba: farbaArr[0] !== '' ? { $in: farbaArr } : {},
        ...(farbaArr.length > 0 ? { farba: { $in: farbaArr.map(item => new RegExp(item, 'i')) } } : {}),
        //prekoho: prekohoArr[0] !== '' ? { $in: prekohoArr } : {},
        ...(prekohoArr.length > 0 ? { prekoho: { $in: prekohoArr.map(item => new RegExp(item, 'i')) } } : {})
    };

    let cenaod = 0;
    let cenado = 0;
    query.cenado == '' ? cenado = 999999 : cenado = parseInt(query.cenado);
    query.cenaod == '' ? cenaod = 0 : cenaod = parseInt(query.cenaod);

    const queryFilter = {
        ...filter,
        ...(query.searchvalue != "" ? { $text: { $search: query.searchvalue } } : {}),
        cena: { $gte: cenaod, $lte: cenado },

        ...(query.vokoli != '' ? {
            location: {
                $geoWithin: {
                    $centerSphere: [[parseFloat(coordsArr[1]), parseFloat(coordsArr[0])], parseInt(query.vokoli) / 6378.1]
                }
            }
        } : {
            location: {
                $geoWithin: {
                    $centerSphere: [[parseFloat(coordsArr[1]), parseFloat(coordsArr[0])], 10000 / 6378.1]
                }
            }
        })
    }

    try {
        await Listing.createIndexes({ nazov: "text" });
        console.log("PAGENUMBERQUERY: " + pageNumber)

        if(query.zoradit == 'odnajnovsieho' || query.zoradit == ''){
            const listings = await Listing.find(queryFilter).sort({ createdAt: -1 }).skip((pageNumber - 1) * pageSize).limit(pageSize).exec();
            res.status(200).json(listings);
        }
        if(query.zoradit == 'odnajstarsieho'){
            const listings = await Listing.find(queryFilter).sort({ createdAt: 1 }).skip((pageNumber - 1) * pageSize).limit(pageSize).exec();
            res.status(200).json(listings);
        }
        if(query.zoradit == 'odnajlacnejsieho'){
            const listings = await Listing.find(queryFilter).sort({ cena: 1 }).skip((pageNumber - 1) * pageSize).limit(pageSize).exec();
            res.status(200).json(listings);
        }
        if(query.zoradit == 'odnajdrahsieho'){
            const listings = await Listing.find(queryFilter).sort({ cena: -1 }).skip((pageNumber - 1) * pageSize).limit(pageSize).exec();
            res.status(200).json(listings);
        }

       
        
    } catch (e) {
        res.status(500).json({ error: "Internal server error" })
    }
}


const categorySearch = async (req, res) => {
    const query = req.query
    const pageNumber = req.query.pagenumber;
    const pageSize = 20;
    console.log(pageNumber)
    try {
        const category = req.query.kategoria;
        const listings = await Listing.find({ kategoria: category }).skip((pageNumber - 1) * pageSize).limit(pageSize).exec();
        res.status(200).json(listings);
    } catch (e) {
        res.status(500).json({ error: "Internal server error" });
    }
};

const addFavorite = async (req, res) => {
    if(!sec.checkKey(req, res)){
        return res.status(400).json({ message: 'Forbidden' });
    }
    
    const uid = req.body.uid;
    const newFavoriteId = req.body.newFavoriteId;
    try {
        const user = await User.findOneAndUpdate(
            { uid: uid },
            { $push: { favorites: newFavoriteId } },
            { new: true }
        );
        res.json(user);
    } catch (error) {
        res.json(error);
    }
}

const removeFavorite = async (req, res) => {
    const uid = req.body.uid;
    const favoriteIdToRemove = req.body.favoriteIdToRemove;

    if(!sec.checkKey(req, res)){
        return res.status(400).json({ message: 'Forbidden' });
    }

    try {
        const user = await User.findOneAndUpdate(
            { uid: uid },
            { $pull: { favorites: favoriteIdToRemove } },
            { new: true }
        );
        res.json(user);
    } catch (error) {
        res.json(error);
    }
};

const getFavorites = async (req, res) => {
    const favArr = req.query.favorites;
    
    const favListings = await Listing.find({ uid: { $in: favArr } });
    res.json(favListings);
}

const reportListing = async (req, res) => {
    const listingToReport = await Listing.findOne({ uid: req.body.uid });
    //console.log(listingToReport)
    const reported = await Reported.create({
        autor: listingToReport.autor,
        uid: listingToReport.uid,
        nazov: listingToReport.nazov,
        popis: listingToReport.popis,
        kategoria: listingToReport.kategoria,
        znacka: listingToReport.znacka,
        velkost: listingToReport.velkost,
        farba: listingToReport.farba,
        prekoho: listingToReport.prekoho,
        psc: listingToReport.psc,
        telefon: listingToReport.telefon,
        mail: listingToReport.mail,
        igfb: listingToReport.igfb,
        cena: listingToReport.cena,
        fotky: listingToReport.fotky,
        mesto: listingToReport.mesto,
        location: {
            type: 'Point',
            coordinates: [listingToReport.lng, listingToReport.lat]
        }
    });
    res.json(reported);
}

const deleteReported = async (req, res) => {
    if(!sec.checkKey(req, res)){
        return res.status(400).json({ message: 'Forbidden' });
    }
    const removedFromCollection = await Reported.findOneAndDelete({ uid: req.body.uid });
    const deleted = await Listing.findOneAndDelete({ uid: req.body.uid });
    res.json(deleted)
}

const removeReportedFromCollection = async (req, res) => {
    if(!sec.checkKey(req, res)){
        return res.status(400).json({ message: 'Forbidden' });
    }
    const removedFromCollection = await Reported.findOneAndDelete({ uid: req.body.uid });
    res.json(removedFromCollection)
}

const getReported = async (req, res) => {
    const reported = await Reported.find();
    res.json(reported)
}

module.exports = {
    router,
    createListing,
    getListing,
    getListings,
    getMyListings,
    deleteListing,
    searchListings,
    categorySearch,
    addFavorite,
    removeFavorite,
    getFavorites,
    reportListing,
    deleteReported,
    removeReportedFromCollection,
    getReported
}