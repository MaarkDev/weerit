import '../css/reportedlisting.css'
import decryptData from '../../files/sec';
import KeyContext from '../../context/KeyContext';
import AuthContext from '../../context/AuthContext';
import GetKeyContext from '../../context/GetKeyContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom'

const ReportedListing = ({ src, title, price, uid, setIsLoading, rerender, setRerender }) => {
    const { getKey, setGetKey } = useContext(GetKeyContext);
    const { enKey } = useContext(KeyContext);
    const { user } = useContext(AuthContext);

    const navigate = useNavigate();

    const deleteListing = async () => {
        setIsLoading(true);
        try {
            await fetch(`${process.env.REACT_APP_API_URL}/api/listings/deletereported`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${decryptData(enKey, process.env.REACT_APP_SEED)}`,
                    'userId': user.uid
                },
                body: JSON.stringify({
                    uid: uid
                })
            }).then(() => { setIsLoading(false); setRerender(!rerender); setGetKey(!getKey) })
        } catch (e) {
            console.error(e)
        }

    }

    const keepListing = async () => {
        setIsLoading(true);
        try {
            await fetch(`${process.env.REACT_APP_API_URL}/api/listings/reportedok`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${decryptData(enKey, process.env.REACT_APP_SEED)}`,
                    'userId': user.uid
                },
                body: JSON.stringify({
                    uid: uid
                })
            }).then(() => { setIsLoading(false); setRerender(!rerender); setGetKey(!getKey) })
        } catch (e) {
            console.error(e)
        }
    }

    const redirect = () => {
        navigate(`/browse/product/${uid}`);
    }

    return(
        <div className='profile-listing-wrapper'>
            <div className='profile-listing-container'>
                <div className='profile-listing-photo' onClick={redirect}>
                    <img src={src} />
                </div>
                <div className='profile-listing-text' onClick={redirect}>
                    <p><b>{title}</b></p>
                    <span className='profile-listing-text-right'>{price}€</span>
                </div>
                <div className='profile-listing-delete-button' onClick={deleteListing}>
                    <p className='profile-listing-delete-button-text'>Vymaž</p>
                </div>
                <div className='profile-listing-delete-button' onClick={keepListing}>
                    <p className='profile-listing-delete-button-text'>Nechaj</p>
                </div>
            </div>

        </div>
    )
}

export default ReportedListing