import './App.css';
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
import CookieConsent from 'react-cookie-consent';
import KeyContext from './context/KeyContext';
import GetKeyContext from './context/GetKeyContext';
import UpdateListingPage from './pages/js/UpdateListingPage';
import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

function App() {
  const [user, setUser] = useState(null);
  const [filter, setFilter] = useState({
    kategoria: [],
    velkost: [],
    velkostIna: '',
    znacka: [],
    znackaIna: '',
    farba: [],
    cenaod: '',
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
  const [qPageNumber, setQPageNumber] = useState(1);
  const [enKey, setEnKey] = useState('');
  const [getKey, setGetKey] = useState(false);

  const getNewKey = async (userId) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/api/users/getuser/${userId}`)
        .then((res) => res.json())
        .then((jsonRes) => { setEnKey(jsonRes.apiToken); console.log("New EnKey: \n" + jsonRes.apiToken) })
    } catch (e) {
      console.error(e)
    }

  }

  useEffect(() => {
    if (user) {
      getNewKey(user.uid);
    }
  }, [getKey, user])

  useEffect(() => {
    const getUser = async () => {
      try {
        await fetch(`${process.env.REACT_APP_API_URL}/auth/login/success`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }
        }).then(res => {
          if (res.status === 200) {
            return res.json();
          }
          throw new Error('auth has failed')
        }).then(resObj => {
          delete resObj.user.apiToken
          setUser(resObj.user)
        });
      } catch (e) {
        console.error(e)
      }
    }

    getUser();
  }, []);




  return (
    <GetKeyContext.Provider value={{ getKey, setGetKey }}>
      <KeyContext.Provider value={{ enKey, setEnKey }}>
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

                    <Route element={<ProtectedRoutes user={user} />}>
                      <Route path="/newlisting" element={<CreateListingPage />} />
                      <Route path="/myprofile" element={<ProfilePage />} />
                      <Route path="/secret/adminuser" element={<AdminPage />} />
                      <Route path='/editlisting/:id' element={<UpdateListingPage />} />
                    </Route>

                    <Route path='*' element={<h1 style={{ textAlign: 'center', marginTop: '64px' }}><b>404</b> <br /> Zdá sa, že táto stránka neexistuje</h1>} />

                  </Routes>
                  <Space />
                  <CookieConsent
                    style={{ background: 'black', color: 'white', textAlign: 'left', borderTop: '1px dashed grey' }}
                    buttonText='Rozumiem'
                    expires={365}
                  >
                    Táto stránka pouŽíva cookies, používaním tejto stránky súhlasím so spracovaním osobných údajov. <a style={{ textDecoration: 'none', color: 'grey' }} href='https://www.privacypolicygenerator.info/live.php?token=HO0mSN7I3pVDCx5TwzlBTEgYI9OTuKCc'>Cookie policy</a>
                  </CookieConsent>
                  <Footer />
                </FilterContext.Provider>
              </AuthContext.Provider>
            </ListingsContext.Provider>
          </QueryContext.Provider>
        </PageNumberContext.Provider>
      </KeyContext.Provider>
    </GetKeyContext.Provider>
  );
}

export default App;
