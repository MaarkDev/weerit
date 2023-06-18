import { useEffect, useState, useContext } from 'react';
import '../css/catalog.css';
import Listing from './Listing';
import ListingsContext from '../../context/ListingsContext';
import LoadingPage from '../../pages/js/LoadingPage';


const Catalog = () => {
    const [isFetching, setIsFetching] = useState(false);
    const { listingsContextArr, setListingsContextArr } = useContext(ListingsContext)

    let previousScrollPosition = 0;

    const pageBottomHandler = async () => {
        const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
        const currentScroll = scrollTop + clientHeight;

        const isScrollingDown = currentScroll > previousScrollPosition;
        previousScrollPosition = currentScroll;

        if (isScrollingDown && currentScroll >= scrollHeight - 20) {
            //setIsFetching(true); // Start fetching data
        }
    };


    useEffect(() => {
        window.addEventListener('scroll', pageBottomHandler);
        return () => {
            window.removeEventListener('scroll', pageBottomHandler);
        };
    }, [])

    return (
        <div className='catalog-container'>
            <div className='catalog-grid'>
                {listingsContextArr.map((item) => {
                    return (<Listing uid={item.uid} title={item.nazov} source={item.fotky[0]} place={item.mesto} price={item.cena} />)
                })}
            </div>
            {isFetching ? <LoadingPage /> : null}
        </div>
    )
}

export default Catalog;