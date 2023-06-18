const router = require('express').Router();
const { createListing, getListing, getListings, getMyListings, deleteListing,
     searchListings, categorySearch, addFavorite, removeFavorite, getFavorites, reportListing,
     removeReportedFromCollection, deleteReported, getReported
} = require('../controllers/listingsControlles');

router.post('/newlisting', createListing);
router.get('/getlisting', getListing);
router.get('/getlistings', getListings);
router.get('/mylistings', getMyListings);
router.delete('/deletelisting', deleteListing);
router.get('/search', searchListings);
router.get('/categorysearch', categorySearch);
router.patch('/addfavorite', addFavorite);
router.patch('/removefavorite', removeFavorite);
router.get('/getfavorites', getFavorites);
router.post('/report', reportListing);
router.delete('/deletereported', deleteReported);
router.delete('/reportedok', removeReportedFromCollection);
router.get('/getreported', getReported);

module.exports = router;
