import '../css/productpage.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Filter from '../../components/js/Filter';
import Catalog from '../../components/js/Catalog'
import FilterContext from '../../context/FilterContext';
import AuthContext from '../../context/AuthContext';
import LoadingPage from './LoadingPage';
import QueryContext from '../../context/QueryContext';
import PageNumberContext from '../../context/PageNumberContext';
import ListingsContext from '../../context/ListingsContext';
import MoreButton from '../../components/js/MoreButton';
import decryptData from '../../files/sec';
import KeyContext from '../../context/KeyContext';
import GetKeyContext from '../../context/GetKeyContext';
import React from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useContext, useState } from 'react';
import { faStar, faUserCircle, faFlag } from '@fortawesome/free-solid-svg-icons';
import { Carousel } from 'react-responsive-carousel';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const ProductPage = () => {
    const [product, setProduct] = useState({});
    const [photoArr, setPhotoArr] = useState([])
    const [procuctId, setProductId] = useState('');
    const [userFavorites, setUserFavorites] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [pageNumber, setPageNumber] = useState(0);
    const [isFetching, setIsFetching] = useState(false);

    const { filter } = useContext(FilterContext);
    const { query } = useContext(QueryContext);
    const { setListingsContextArr, listingsContextArr } = useContext(ListingsContext);
    const { user } = useContext(AuthContext);
    const { setQPageNumber } = useContext(PageNumberContext);
    const { enKey } = useContext(KeyContext);
    const { getKey, setGetKey } = useContext(GetKeyContext);

    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const getUser = async () => {
        try {
            await fetch(`${process.env.REACT_APP_API_URL}/api/users/getuser/${user.uid}`)
                .then((userRes) => {
                    return userRes.json();
                })
                .then((userJSON) => {
                    setUserFavorites(userJSON.favorites);
                });
        } catch (e) {
            console.error(e);
        }

    };

    useEffect(() => {
        setIsLoading(true)
        const getProduct = async () => {
            try {
                const res = await fetch(`${process.env.REACT_APP_API_URL}/api/listings/getlisting?uid=${id}`);
                const productJson = await res.json();
                if (res.ok) {
                    setProduct(productJson[0])
                    setPhotoArr(productJson[0].fotky);
                    setProductId(productJson[0].uid);
                    setIsLoading(false)
                }
            } catch (e) {
                console.error(e);
            }

        }

        getProduct().then(() => getUser()).then(() => setIsLoading(false));

    }, [location.pathname])


    const addToFavorites = async () => {
        setIsLoading(true)
        try {
            await fetch(`${process.env.REACT_APP_API_URL}/api/listings/addfavorite`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${decryptData(enKey, process.env.REACT_APP_SEED)}`,
                    'userId': user.uid
                },
                body: JSON.stringify({
                    uid: user.uid,
                    newFavoriteId: procuctId
                }),
            }).then(() => getUser()).then(() => { setIsLoading(false); setGetKey(!getKey) });
        } catch (e) {
            console.error(e)
        }

    }

    const removeFromFavorites = async () => {
        setIsLoading(true)
        try {
            await fetch(`${process.env.REACT_APP_API_URL}/api/listings/removefavorite`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${decryptData(enKey, process.env.REACT_APP_SEED)}`,
                    'userId': user.uid
                },
                body: JSON.stringify({
                    uid: user.uid,
                    favoriteIdToRemove: procuctId
                }),
            }).then(() => { setIsLoading(false); setGetKey(!getKey) });
            setUserFavorites(prev => prev.filter(item => item !== id));
        } catch (e) {
            console.error(e)
        }

    }

    const redirectHandler = () => {
        navigate(`/profile/${product.autor}`)
    }

    const reportListing = async () => {
        setIsLoading(true);
        try {
            await fetch(`${process.env.REACT_APP_API_URL}/api/listings/report`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    uid: id
                }),
            }).then(() => { setIsLoading(false) });
        } catch (e) {
            console.error(e)
        }

    }

    const queryHandler = async () => {
        const nextPageNumber = pageNumber + 1;
        setPageNumber(prev => prev + 1)
        const updatedQuery = {
            searchvalue: (query.searchvalue || ''),
            kategoria: filter.kategoria,
            velkost: filter.velkost,
            velkostIna: filter.velkostIna,
            znacka: filter.znacka,
            znackaIna: filter.znackaIna,
            farba: filter.farba,
            cenaod: filter.cenaod,
            cenado: filter.cenado,
            zoradit: filter.zoradit,
            prekoho: filter.prekoho,
            vokoli: filter.vokoli,
            psc: filter.psc,
            mesto: filter.mesto,
            coords: filter.coords,
            pagenumber: nextPageNumber
        };
        const queryString = new URLSearchParams(updatedQuery).toString();

        try {
            await fetch(`${process.env.REACT_APP_API_URL}/api/listings/search?${queryString}`)
                .then(res => res.json())
                .then(data => {
                    setListingsContextArr(prev => prev.concat(data));
                    setIsFetching(false);
                })
        } catch (e) {
            console.error(e)
        }

    }

    useEffect(() => {
        if (isFetching) {
            queryHandler();
        }
    }, [isFetching])

    useEffect(() => {
        setQPageNumber(0);
        setListingsContextArr([]);
        queryHandler();
    }, [])


    return (
        <>
            <div className='product-page-container'>
                <div className='product-outer-wrapper'>
                    <div className='product-images'>
                        <Carousel width={'100%'} height={'20rem'} dynamicHeight={true}>
                            {photoArr.map((url) => (
                                <div>
                                    <img src={url} style={{ objectFit: 'cover', maxHeight: '40rem' }} />
                                </div>
                            ))}

                        </Carousel>
                    </div>
                    <div className='product-info'>
                        <p className='product-title'>{product.nazov} </p>

                        <div className='product-inline'>
                            {user ? (
                                userFavorites.find((item) => item === id) === undefined ? (
                                    <div className='product-add-to-favs' onClick={addToFavorites}>
                                        <FontAwesomeIcon icon={faStar} />
                                        <p>Pridaj do obľúbených</p>
                                    </div>
                                ) : (
                                    <div className='product-add-to-favs gold' onClick={removeFromFavorites}>
                                        <FontAwesomeIcon icon={faStar} />
                                        <p>Odstráň z obľúbených</p>
                                    </div>
                                )
                            ) : (
                                <></>
                            )}

                            <div className='product-add-to-favs profile-click' onClick={redirectHandler}>
                                <FontAwesomeIcon icon={faUserCircle} />
                                <p>Profil používateľa</p>
                            </div>
                            <div className='product-add-to-favs report-click' onClick={reportListing}>
                                <FontAwesomeIcon icon={faFlag} />
                                <p>Nahlásiť inzerát</p>
                            </div>
                        </div>

                        <p className='product-desc'>{product.popis}</p>
                        <div className='product-detail-div'>
                            <div className='product-details'>
                                <p className='product-brand'><b>Značka:</b> {product.znacka} </p>
                                <p className='product-size'><b>Veľkosť:</b> {product.velkost} </p>
                                <p className='product-loc'><b>Lokalita:</b> {
                                    product.mesto != "" ? product.mesto + " / " + product.psc : product.psc
                                } </p>
                            </div>
                            <div className='product-contact'>
                                <p className='product-contact-number'><b>Telefónne číslo:</b> {product.telefon}</p>
                                <p className='product-contact-mail'><b>Mail:</b> {product.mail}</p>
                                <p className='product-contact-facebook'><b>FB/IG:</b> {product.igfb}</p>
                            </div>
                        </div>
                        <p className='product-price'>{product.cena}€</p>
                    </div>
                </div>
                <Filter />
                <Catalog />
            </div>
            
            {
                listingsContextArr.length > 18 ? <MoreButton setIsFetching={setIsFetching} /> : null
            }
            
            {isLoading ? <LoadingPage /> : <></>}
            {isFetching ? <LoadingPage /> : <></>}

        </>
    )
}

export default ProductPage;