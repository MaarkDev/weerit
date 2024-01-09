import { useSearchParams } from 'react-router-dom';
import '../css/nolisting.css';
import { useEffect, useState } from 'react';

const NoListing = ({ value }) => {
    const [noListingClass, setNoListingClass] = useState('no-listing transparent')

    useEffect(() => {
        setNoListingClass('no-listing transparent')
        setTimeout(() => {
            setNoListingClass('no-listing');
        }, 160)
    }, [window.location.pathname])

    return (
        <div className={noListingClass}>
            <p className='no-listing-text'>{value}</p>
        </div>
    )
}

export default NoListing;