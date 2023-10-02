import '../css/nolisting.css';

const NoListing = ({ value }) => {
    return (
        <div className='no-listing'>
            <p className='no-listing-text'>{value}</p>
        </div>
    )
}

export default NoListing;