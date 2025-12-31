import '../css/catalog.css';
import Listing from './Listing';
import ListingsContext from '../../context/ListingsContext';
import { useContext } from 'react';

const Catalog = () => {
    const { listingsContextArr } = useContext(ListingsContext)

    return (
        <div className='catalog-container'>
            <div className='catalog-grid'>
                {listingsContextArr.map((item) => {
                    return (<Listing uid={item.uid} 
                        title={item.nazov} source={item.fotky[0]} 
                        place={item.mesto} price={item.cena} />)
                })}
            </div>
        </div>
    )
}

export default Catalog;