# Diff Details

Date : 2023-06-02 14:26:31

Directory c:\\Users\\komar\\Desktop\\weerit\\frontend

Total : 67 files,  28006 codes, 37 comments, 350 blanks, all 28393 lines

[Summary](results.md) / [Details](details.md) / [Diff Summary](diff.md) / Diff Details

## Files
| filename | language | code | comment | blank | total |
| :--- | :--- | ---: | ---: | ---: | ---: |
| [backend/.env](/backend/.env) | Properties | -8 | 0 | 0 | -8 |
| [backend/cloudinary.js](/backend/cloudinary.js) | JavaScript | -8 | -1 | -2 | -11 |
| [backend/controllers/listingsControlles.js](/backend/controllers/listingsControlles.js) | JavaScript | -67 | 0 | -12 | -79 |
| [backend/controllers/usersController.js](/backend/controllers/usersController.js) | JavaScript | -17 | 0 | -4 | -21 |
| [backend/index.js](/backend/index.js) | JavaScript | -40 | -1 | -6 | -47 |
| [backend/models/listingModel.js](/backend/models/listingModel.js) | JavaScript | -61 | 0 | -4 | -65 |
| [backend/models/userModel.js](/backend/models/userModel.js) | JavaScript | -17 | 0 | -4 | -21 |
| [backend/package-lock.json](/backend/package-lock.json) | JSON | -4,322 | 0 | -1 | -4,323 |
| [backend/package.json](/backend/package.json) | JSON | -27 | 0 | -1 | -28 |
| [backend/passport.js](/backend/passport.js) | JavaScript | -36 | 0 | -5 | -41 |
| [backend/routes/auth.js](/backend/routes/auth.js) | JavaScript | -34 | 0 | -7 | -41 |
| [backend/routes/listingRoutes.js](/backend/routes/listingRoutes.js) | JavaScript | -8 | 0 | -3 | -11 |
| [backend/routes/userRoutes.js](/backend/routes/userRoutes.js) | JavaScript | -5 | 0 | -4 | -9 |
| [frontend/README.md](/frontend/README.md) | Markdown | 38 | 0 | 33 | 71 |
| [frontend/package-lock.json](/frontend/package-lock.json) | JSON | 30,015 | 0 | 1 | 30,016 |
| [frontend/package.json](/frontend/package.json) | JSON | 48 | 0 | 1 | 49 |
| [frontend/public/build/asset-manifest.json](/frontend/public/build/asset-manifest.json) | JSON | 20 | 0 | 0 | 20 |
| [frontend/public/build/index.html](/frontend/public/build/index.html) | HTML | 1 | 0 | 0 | 1 |
| [frontend/public/build/static/css/main.2b2861f4.css](/frontend/public/build/static/css/main.2b2861f4.css) | CSS | 1 | 1 | 0 | 2 |
| [frontend/public/build/static/js/main.c9dadade.js](/frontend/public/build/static/js/main.c9dadade.js) | JavaScript | 1 | 2 | 0 | 3 |
| [frontend/public/index.html](/frontend/public/index.html) | HTML | 18 | 23 | 1 | 42 |
| [frontend/src/App.css](/frontend/src/App.css) | CSS | 0 | 0 | 1 | 1 |
| [frontend/src/App.js](/frontend/src/App.js) | JavaScript | 74 | 0 | 10 | 84 |
| [frontend/src/components/css/catalog.css](/frontend/src/components/css/catalog.css) | CSS | 33 | 0 | 6 | 39 |
| [frontend/src/components/css/dropdownli.css](/frontend/src/components/css/dropdownli.css) | CSS | 9 | 0 | 1 | 10 |
| [frontend/src/components/css/filter.css](/frontend/src/components/css/filter.css) | CSS | 32 | 0 | 4 | 36 |
| [frontend/src/components/css/filteractive.css](/frontend/src/components/css/filteractive.css) | CSS | 25 | 0 | 4 | 29 |
| [frontend/src/components/css/filterbutton.css](/frontend/src/components/css/filterbutton.css) | CSS | 25 | 0 | 3 | 28 |
| [frontend/src/components/css/filterel.css](/frontend/src/components/css/filterel.css) | CSS | 72 | 0 | 9 | 81 |
| [frontend/src/components/css/listing.css](/frontend/src/components/css/listing.css) | CSS | 59 | 0 | 9 | 68 |
| [frontend/src/components/css/loginwidget.css](/frontend/src/components/css/loginwidget.css) | CSS | 63 | 0 | 9 | 72 |
| [frontend/src/components/css/navbar.css](/frontend/src/components/css/navbar.css) | CSS | 314 | 0 | 47 | 361 |
| [frontend/src/components/css/nolisting.css](/frontend/src/components/css/nolisting.css) | CSS | 17 | 0 | 1 | 18 |
| [frontend/src/components/css/profilelisting.css](/frontend/src/components/css/profilelisting.css) | CSS | 46 | 0 | 9 | 55 |
| [frontend/src/components/css/slider.css](/frontend/src/components/css/slider.css) | CSS | 9 | 0 | 2 | 11 |
| [frontend/src/components/css/space.css](/frontend/src/components/css/space.css) | CSS | 4 | 0 | 0 | 4 |
| [frontend/src/components/js/Catalog.js](/frontend/src/components/js/Catalog.js) | JavaScript | 50 | 0 | 9 | 59 |
| [frontend/src/components/js/CustomFilterEl.js](/frontend/src/components/js/CustomFilterEl.js) | JavaScript | 109 | 0 | 15 | 124 |
| [frontend/src/components/js/DropdownLi.js](/frontend/src/components/js/DropdownLi.js) | JavaScript | 9 | 0 | 2 | 11 |
| [frontend/src/components/js/Filter.js](/frontend/src/components/js/Filter.js) | JavaScript | 190 | 0 | 31 | 221 |
| [frontend/src/components/js/FilterActive.js](/frontend/src/components/js/FilterActive.js) | JavaScript | 16 | 0 | 2 | 18 |
| [frontend/src/components/js/FilterButton.js](/frontend/src/components/js/FilterButton.js) | JavaScript | 9 | 0 | 2 | 11 |
| [frontend/src/components/js/FilterEl.js](/frontend/src/components/js/FilterEl.js) | JavaScript | 122 | 1 | 11 | 134 |
| [frontend/src/components/js/Listing.js](/frontend/src/components/js/Listing.js) | JavaScript | 23 | 0 | 5 | 28 |
| [frontend/src/components/js/LoginWidget.js](/frontend/src/components/js/LoginWidget.js) | JavaScript | 31 | 0 | 6 | 37 |
| [frontend/src/components/js/Navbar.js](/frontend/src/components/js/Navbar.js) | JavaScript | 167 | 4 | 21 | 192 |
| [frontend/src/components/js/NoListing.js](/frontend/src/components/js/NoListing.js) | JavaScript | 9 | 0 | 2 | 11 |
| [frontend/src/components/js/ProfileListing.js](/frontend/src/components/js/ProfileListing.js) | JavaScript | 38 | 0 | 6 | 44 |
| [frontend/src/components/js/ProtectedRoute.js](/frontend/src/components/js/ProtectedRoute.js) | JavaScript | 11 | 0 | 3 | 14 |
| [frontend/src/components/js/Slider.js](/frontend/src/components/js/Slider.js) | JavaScript | 9 | 0 | 2 | 11 |
| [frontend/src/components/js/Space.js](/frontend/src/components/js/Space.js) | JavaScript | 8 | 0 | 3 | 11 |
| [frontend/src/context/AuthContext.js](/frontend/src/context/AuthContext.js) | JavaScript | 5 | 0 | 2 | 7 |
| [frontend/src/context/FilterContext.js](/frontend/src/context/FilterContext.js) | JavaScript | 18 | 0 | 2 | 20 |
| [frontend/src/index.css](/frontend/src/index.css) | CSS | 19 | 0 | 3 | 22 |
| [frontend/src/index.js](/frontend/src/index.js) | JavaScript | 13 | 0 | 3 | 16 |
| [frontend/src/pages/css/browsepage.css](/frontend/src/pages/css/browsepage.css) | CSS | 7 | 0 | 0 | 7 |
| [frontend/src/pages/css/createlistingpage.css](/frontend/src/pages/css/createlistingpage.css) | CSS | 188 | 0 | 30 | 218 |
| [frontend/src/pages/css/home.css](/frontend/src/pages/css/home.css) | CSS | 55 | 4 | 5 | 64 |
| [frontend/src/pages/css/loadingpage.css](/frontend/src/pages/css/loadingpage.css) | CSS | 39 | 0 | 3 | 42 |
| [frontend/src/pages/css/productpage.css](/frontend/src/pages/css/productpage.css) | CSS | 90 | 0 | 19 | 109 |
| [frontend/src/pages/css/profilepage.css](/frontend/src/pages/css/profilepage.css) | CSS | 48 | 0 | 8 | 56 |
| [frontend/src/pages/js/BrowsePage.js](/frontend/src/pages/js/BrowsePage.js) | JavaScript | 27 | 0 | 4 | 31 |
| [frontend/src/pages/js/CreateListingPage.js](/frontend/src/pages/js/CreateListingPage.js) | JavaScript | 227 | 4 | 21 | 252 |
| [frontend/src/pages/js/Home.js](/frontend/src/pages/js/Home.js) | JavaScript | 65 | 0 | 14 | 79 |
| [frontend/src/pages/js/LoadingPage.js](/frontend/src/pages/js/LoadingPage.js) | JavaScript | 12 | 0 | 2 | 14 |
| [frontend/src/pages/js/ProductPage.js](/frontend/src/pages/js/ProductPage.js) | JavaScript | 69 | 0 | 9 | 78 |
| [frontend/src/pages/js/ProfilePage.js](/frontend/src/pages/js/ProfilePage.js) | JavaScript | 49 | 0 | 7 | 56 |

[Summary](results.md) / [Details](details.md) / [Diff Summary](diff.md) / Diff Details