import '../css/listing.css'
import { useNavigate } from "react-router-dom";

const Listing = ({ title, source, place, price, uid }) => {
    let navigate = useNavigate();

    return (
        <div className='listing-container' onClick={() => navigate(`/browse/product/${uid}`)}>
            <div className='listing-photo'>
                <img src={source} desc='listing photo' loading="lazy" />
            </div>
            <div className='listing-text'>
                <div className='listing-title'>
                    <p>{title}</p>
                </div>

                <div className='listing-price'>
                    <p>{price}€</p>
                    <p>{place}</p>
                </div>
            </div>

        </div>
    )
}

export default Listing;