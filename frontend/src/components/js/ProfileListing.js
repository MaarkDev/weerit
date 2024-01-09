import '../css/profilelisting.css';
import decryptData from '../../files/sec';
import KeyContext from '../../context/KeyContext';
import GetKeyContext from '../../context/GetKeyContext';
import AuthContext from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';

const ProfileListing = ({ title, price, src, uid, setIsLoading, getMyListings, fotky }) => {
    const { getKey, setGetKey } = useContext(GetKeyContext);
    const { enKey } = useContext(KeyContext);
    const { user } = useContext(AuthContext);

    const navigate = useNavigate()

    const clickHandler = () => {
        navigate(`/browse/product/${uid}`)
    }

    const deleteHandler = async () => {
        setIsLoading(true)
        try {
            await fetch(`${process.env.REACT_APP_API_URL}/api/listings/deletelisting`, {
                method: "DELETE",
                body: JSON.stringify({ uid: uid, fotky: fotky }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${decryptData(enKey, process.env.REACT_APP_SEED)}`,
                    'userId': user.uid
                }
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
                <div className='profile-listing-delete-button' onClick={deleteHandler}>
                    <p className='profile-listing-delete-button-text'>Vymaž</p>
                </div>
                <div className='profile-listing-delete-button bg-black' onClick={() => { navigate(`/editlisting/${uid}`)}}>
                    <p className='profile-listing-delete-button-text'>Uprav</p>
                </div>
            </div>

        </div>
    )
}

export default ProfileListing;