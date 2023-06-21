import '../css/morebutton.css';

const MoreButton = ({ setIsFetching }) => {
    return(
        <div className='more-button-container'>
            <div className='more-button-outer' onClick={() => setIsFetching(true)}>
                <p className='more-button-text'>Zobraziť viac</p>
            </div>
        </div>
    )
}

export default MoreButton;