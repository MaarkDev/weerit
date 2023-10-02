import '../css/browsepage.css';
import Filter from "../../components/js/Filter";
import Catalog from "../../components/js/Catalog";
import FilterContext from "../../context/FilterContext";
import ListingsContext from "../../context/ListingsContext";
import QueryContext from "../../context/QueryContext";
import NoListing from "../../components/js/NoListing";
import LoadingPage from "./LoadingPage";
import PageNumberContext from "../../context/PageNumberContext";
import MoreButton from "../../components/js/MoreButton";
import { useEffect, useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const BrowsePage = () => {
    const [currentQ, setCurrentQ] = useState('');
    const [currentCat, setCurrentCat] = useState('');
    const [pageNumber, setPageNumber] = useState(0);
    const [isFetching, setIsFetching] = useState(false);

    const { filter, setFilter } = useContext(FilterContext);
    const { query } = useContext(QueryContext);
    const { qPageNumber, setQPageNumber } = useContext(PageNumberContext);
    const { listingsContextArr, setListingsContextArr } = useContext(ListingsContext);

    const location = useLocation();
    const navigate = useNavigate();

    const navLinkRoutes = ['/browse/hoodies', '/browse/shoes', '/browse/pants', '/browse/accessories', '/browse/underwear'];

    const getMoreInCat = async () => {
        const nextPageNumber = pageNumber + 1;
        setPageNumber(prev => prev + 1)
        const qureyObj = {
            pagenumber: nextPageNumber,
            kategoria: currentCat
        }
        const queryString = new URLSearchParams(qureyObj).toString();
        try {
            await fetch(`${process.env.REACT_APP_API_URL}/api/listings/categorysearch?${queryString}`)
                .then(res => res.json())
                .then(data => setListingsContextArr(prev => prev.concat(data))).then(() => setIsFetching(false));
        } catch (e) {
            console.error(e)
        }

    }

    const queryHandler = async () => {
        const nextPageNumber = qPageNumber + 1;
        setQPageNumber(prev => prev + 1)
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
        if (navLinkRoutes.includes(location.pathname)) {
            if (isFetching) {
                getMoreInCat();
            }
            console.log(isFetching)
        } else {
            if (isFetching) {
                queryHandler();
            }
        }

    }, [isFetching])



    useEffect(() => {
        let currentKategoria = '';
        switch (location.pathname) {
            case '/browse/hoodies': setFilter((prevFilter) => ({ ...prevFilter, kategoria: ['mikiny'] }));
                currentKategoria = 'mikiny';
                setCurrentCat('mikiny')
                navigate(`/browse/hoodies`); break;
            case '/browse/shoes': setFilter((prevFilter) => ({ ...prevFilter, kategoria: ['topanky'] }));
                currentKategoria = 'topanky';
                setCurrentCat('topanky')
                navigate(`/browse/shoes`); break;
            case '/browse/pants': setFilter((prevFilter) => ({ ...prevFilter, kategoria: ['nohavice'] }));
                currentKategoria = 'nohavice';
                setCurrentCat('nohavice')
                navigate(`/browse/pants`); break;
            case '/browse/accessories': setFilter((prevFilter) => ({ ...prevFilter, kategoria: ['doplnky'] }));
                currentKategoria = 'doplnky';
                setCurrentCat('doplnky')
                navigate(`/browse/accessories`); break;
            case '/browse/underwear': setFilter((prevFilter) => ({ ...prevFilter, kategoria: ['spodnepradlo'] }));
                currentKategoria = 'spodnepradlo';
                setCurrentCat('spodnepradlo')
                navigate(`/browse/underwear`); break;
            default: break;
        }

        const redirectHandler = async () => {
            setPageNumber(1)
            const updatedQuery = {
                kategoria: [currentKategoria],
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
                coords: [0, 0],
                pagenumber: 1
            };

            setFilter({
                kategoria: [currentKategoria],
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
                coords: [0, 0],
            })

            const queryString = new URLSearchParams(updatedQuery).toString();

            try {
                await fetch(`${process.env.REACT_APP_API_URL}/api/listings/categorysearch?${queryString}`)
                    .then(res => res.json())
                    .then(data => setListingsContextArr(data))
            } catch (e) {
                console.error(e)
            }

        }

        const redirectHandlerQ = async () => {
            setQPageNumber(1)
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
                pagenumber: 1
            };
            const queryString = new URLSearchParams(updatedQuery).toString();

            try {
                await fetch(`${process.env.REACT_APP_API_URL}/api/listings/search?${queryString}`)
                    .then(res => res.json())
                    .then(data => {
                        setListingsContextArr(data);
                        setIsFetching(false);
                    })
            } catch (e) {
                console.error(e)
            }

        }

        if (currentKategoria !== '') {
            redirectHandler();
        } else {
            setListingsContextArr([]);
            redirectHandlerQ();
        }

        setCurrentQ(query.searchvalue);

    }, [location.pathname])



    return (
        <div className="browser-page">
            <Filter />
            {typeof currentQ === 'string' && currentQ != '' ? <h2 className="browse-page-res-text">{`Výsledky pre hľadaný výraz: "${currentQ}"`}</h2> : <></>}

            {
                listingsContextArr.length != 0 ? <><Catalog /><MoreButton setIsFetching={setIsFetching} /></> :
                    <div className="browse-page-no-search">
                        <NoListing value="Pre hľadaný výraz sa nenašli žiadne inzeráty" />
                    </div>
            }
            {isFetching ? <LoadingPage /> : null}
        </div>
    )
}

export default BrowsePage;