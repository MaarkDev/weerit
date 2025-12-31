import '../css/profilelisting.css';
import decryptData from '../../files/sec';
import KeyContext from '../../context/KeyContext';
import GetKeyContext from '../../context/GetKeyContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const FavoriteListing = ({ title, price, src, uid, setIsLoading, getMyListings, user }) => {
    const { enKey } = useContext(KeyContext);
    const { getKey, setGetKey } = useContext(GetKeyContext);

    const navigate = useNavigate()

    const clickHandler = () => {
        navigate(`/browse/product/${uid}`)
    }

    const removeFromFavorites = async () => {
        setIsLoading(true)
        try {
            await fetch(`${process.env.REACT_APP_API_URL}/api/listings/removefavorite`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${decryptData(enKey, process.env.REACT_APP_SEED)}`,
                    'userId': user.uid
                },
                body: JSON.stringify({
                    uid: user.uid,
                    favoriteIdToRemove: uid
                }),
            }).then(() => {
                getMyListings().then(() => { setIsLoading(false); setGetKey(!getKey) });
            })
        } catch (e) {
            console.error(e)
        }

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