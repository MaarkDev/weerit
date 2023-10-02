import '../css/profilelisting.css';
import { useNavigate } from 'react-router-dom';

const UserListing = ({ title, price, src, uid }) => {
    const navigate = useNavigate()

    const clickHandler = () => {
        navigate(`/browse/product/${uid}`)
    }

    return (
        <div className='profile-listing-wrapper'>
            <div className='profile-listing-container'>
                <div className='profile-listing-photo' onClick={clickHandler}>
                    <img src={src} />
                </div>
                <div className='profile-listing-text user-visit-listing' onClick={clickHandler}>
                    <p><b>{title}</b></p>
                    <span className='profile-listing-text-right'>{price}€</span>
                </div>
            </div>

        </div>
    )
}

export default UserListing;