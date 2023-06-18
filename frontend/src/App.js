import React, { useContext, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Catalog from './components/js/Catalog';
import BrowsePage from './pages/js/BrowsePage';
import Navbar from './components/js/Navbar';
import HomePage from './pages/js/Home.js';
import ProductPage from './pages/js/ProductPage';
import Space from './components/js/Space';
import FilterContext from './context/FilterContext';
import CreateListingPage from './pages/js/CreateListingPage';
import AuthContext from './context/AuthContext';
import ListingsContext from './context/ListingsContext';
import ProfilePage from './pages/js/ProfilePage';
import ProtectedRoutes from './components/js/ProtectedRoute';
import QueryContext from './context/QueryContext';
import PageNumberContext from './context/PageNumberContext';
import UserPage from './pages/js/UserPage';
import Footer from './components/js/Footer';
import AdminPage from './pages/js/AdminPage';

function App() {
  const [user, setUser] = useState(null);
  const [filter, setFilter] = useState({
    kategoria: [],
    velkost: [],
    velkostIna: '',
    znacka: [],
    znackaIna: '',
    farba: [],
    cenaod: '0',
    cenado: '',
    zoradit: '',
    prekoho: [],
    vokoli: '',
    psc: '',
    mesto: '',
    coords: [0, 0]
  });

  const [listingsContextArr, setListingsContextArr] = useState([]);
  const [query, setQuery] = useState({});
  const [qPageNumber, setQPageNumber] = useState(1)

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/login/success`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 200) {
          const resObj = await response.json();
          console.log('resobj:', resObj);
          setUser(resObj.user);
        } else {
          throw new Error('Authentication has failed');
        }
      } catch (err) {
        console.log(err);
      }
    };

    getUser();
  }, []);


  //useEffect(() => {
   // console.log("FILTER:", filter)
  //}, [filter])

  return (
    <PageNumberContext.Provider value={{ qPageNumber, setQPageNumber }}>
      <QueryContext.Provider value={{ query, setQuery }}>
        <ListingsContext.Provider value={{ listingsContextArr, setListingsContextArr }}>
          <AuthContext.Provider value={{ user, setUser }}>
            <FilterContext.Provider value={{ filter, setFilter }}>
              <Navbar />
              <Routes>

                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<HomePage />} />
                <Route path="/browse/:category" element={<BrowsePage />} />
                <Route path="/browse/:query" element={<BrowsePage />} />
                <Route path="/browse/product/:id" element={<ProductPage />} />
                <Route path='/profile/:id' element={<UserPage />} />

                <Route element={<ProtectedRoutes user={user}/>}>
                  <Route path="/newlisting" element={<CreateListingPage />} />
                  <Route path="/myprofile" element={<ProfilePage />} />  
                  <Route path="/secret/adminuser" element={<AdminPage />} />
                </Route>

                <Route path='*' element={<h1 style={{ textAlign: 'center', marginTop: '64px' }}><b>404</b> <br /> Zdá sa, že táto stránka neexistuje</h1>} />

              </Routes>
              <Space />
              <Footer />
            </FilterContext.Provider>
          </AuthContext.Provider>
        </ListingsContext.Provider>
      </QueryContext.Provider>
    </PageNumberContext.Provider>
  );
}

export default App;
