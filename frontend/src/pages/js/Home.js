import { useState, useEffect, useRef, useContext } from "react";
import photo1 from '../../photos/homebg1.jpg';
import photo2 from '../../photos/homebg2.jpg';
import photo3 from '../../photos/homebg3.jpg';
import photo4 from '../../photos/homebg4.jpg';
import photo5 from '../../photos/homebg5.jpg';
import photo6 from '../../photos/homebg6.jpg';
import photo7 from '../../photos/homebg7.jpg';
import '../css/home.css';
import Catalog from "../../components/js/Catalog";
import Filter from "../../components/js/Filter";
import FilterContext from "../../context/FilterContext";
import ListingsContext from "../../context/ListingsContext";
import QueryContext from "../../context/QueryContext";
import LoadingPage from "./LoadingPage";
import AuthContext from "../../context/AuthContext";

const HomePage = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const imgArray = [photo1, photo2, photo3, photo4, photo5, photo6, photo7];
    const [currentPhoto, setCurrentPhoto] = useState(imgArray[currentIndex]);
    const [isFetching, setIsFetching] = useState(false);

    const { filter, setFilter } = useContext(FilterContext);
    const { listingsContextArr, setListingsContextArr } = useContext(ListingsContext);
    const { query, setQuery } = useContext(QueryContext);
    const [pageNumber, setPageNumber] = useState(0);

    const { user, setUser } = useContext(AuthContext)

    const fetchAll = async () => {
        const nextPageNumber = pageNumber + 1;
        setPageNumber(prev => prev + 1)
        const qureyObj = {
            pagenumber: nextPageNumber
        }
        const queryString = new URLSearchParams(qureyObj).toString();
        await fetch(`http://localhost:4000/api/listings/getlistings?${queryString}`)
        .then(res => res.json())
        .then(data => setListingsContextArr(prev => prev.concat(data))).then(() => setIsFetching(false))
    }

    let previousScrollPosition = 0;
    const pageBottomHandler = async () => {
        const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
        const currentScroll = scrollTop + clientHeight;

        const isScrollingDown = currentScroll > previousScrollPosition;
        previousScrollPosition = currentScroll;

        if (isScrollingDown && currentScroll >= scrollHeight - 20) {
            setIsFetching(true);
        }
    };



    useEffect(() => {
        if(isFetching){
            fetchAll();
            console.log('2')
        }
        console.log(isFetching)
    }, [isFetching])

    useEffect(() => {
        window.addEventListener('scroll', pageBottomHandler);
        return () => {
            window.removeEventListener('scroll', pageBottomHandler);
        };
    }, [])

    useEffect(() => {
        setListingsContextArr([]);

        setFilter({
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
            coords: [0, 0],
        })

        setQuery({...query, searchvalue: ''})

        fetchAll();
        console.log('1')

        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => {
                if (prevIndex < 6) {
                    return prevIndex + 1;
                } else {
                    return 0;
                }
            });

        }, 3000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        setCurrentPhoto(imgArray[currentIndex]);
    }, [currentIndex]);


    const handleMouseEnter = () => {
        setIsHovered(true);
    }

    const handleMouseLeave = () => {
        setIsHovered(false);
    }

    const imageHover = () => {
        if (isHovered) {
            return { transform: "scale(1.025)" }
        }
    }

    const textHover = () => {
        if (isHovered) {
            return { fontSize: "52px", transform: "200ms" }
        }
    }

    return (
        <div className="page-home-container">
            <div className="image-slideshow-container">
                <img src={currentPhoto} className="slider-img"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    style={imageHover()}
                ></img>
                <p className="image-text" style={textHover()}>Kúp, predaj, vymeň!</p>
            </div>

            <Filter />
            <Catalog />
            {isFetching ? <LoadingPage /> : null}
        </div>
    )
}

export default HomePage;