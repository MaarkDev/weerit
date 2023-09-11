import '../css/profilelisting.css';
import { useNavigate } from 'react-router-dom';
import encryptData from '../../files/sec';

const FavoriteListing = ({ title, price, src, uid, isLoading, setIsLoading, getMyListings, user }) => {
    const navigate = useNavigate()

    const clickHandler = () => {
        navigate(`/browse/product/${uid}`)
    }

    const removeFromFavorites = async () => {
        setIsLoading(true)
        await fetch(`${process.env.REACT_APP_API_URL}/api/listings/removefavorite`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${encryptData(process.env.REACT_APP_KEY, process.env.REACT_APP_SEED)}` 
            },
            body: JSON.stringify({
                uid: user.uid,
                favoriteIdToRemove: uid
            }),
        }).then(() => {
            getMyListings().then(() => setIsLoading(false));
        })
    }

    return (
        <div className='profile-listing-wrapper'>
            <div className='profile-listing-container'>
                <div className='profile-listing-photo' onClick={clickHandler}>
                    <img src={src} />
                </div>
                <div className='profile-listing-text' onClick={clickHandler}>
                    <p><b>{title}</b></p>
                    <span className='profile-listing-text-right'>{price}€</span>
                </div>
                <div className='profile-listing-delete-button' onClick={removeFromFavorites}>
                    <p className='profile-listing-delete-button-text'>Odstráň</p>
                </div>
            </div>

        </div>
    )
}

export default FavoriteListing;