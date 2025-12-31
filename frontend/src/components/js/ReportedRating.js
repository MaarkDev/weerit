import '../css/reporteduser.css';
import '../css/reportedlisting.css';
import decryptData from '../../files/sec';
import GetKeyContext from '../../context/GetKeyContext';
import KeyContext from '../../context/KeyContext';
import AuthContext from '../../context/AuthContext';
import { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const ReportedRating = ({ name, autor, usersUid, text, setIsLoading, stars, itemId, setRerender, rerender }) => {
    const { getKey, setGetKey } = useContext(GetKeyContext);
    const { enKey } = useContext(KeyContext);
    const { user } = useContext(AuthContext);

    const deleteRating = async () => {
        try {
            setIsLoading(true)
            await fetch(`${process.env.REACT_APP_API_URL}/api/users/deletereportedrating`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${decryptData(enKey, process.env.REACT_APP_SEED)}`,
                    'userId': user.uid
                },
                body: JSON.stringify({
                    uid: itemId,
                    user: usersUid,
                    autor: autor
                })
            }).then(() => { setIsLoading(false); setGetKey(!getKey); setRerender(!rerender) })
        } catch (e) {
            console.log(e);
        }
    }

    const keepRating = async () => {
        try {
            setIsLoading(true)
            await fetch(`${process.env.REACT_APP_API_URL}/api/users/keepreportedrating`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${decryptData(enKey, process.env.REACT_APP_SEED)}`,
                    'userId': user.uid
                },
                body: JSON.stringify({
                    uid: itemId
                })
            }).then(() => { setIsLoading(false); setGetKey(!getKey); setRerender(!rerender) })
        } catch (e) {
            console.log(e);
        }
    }

    const renderStars = () => {
        const starsArray = Array.from({ length: 5 }, (_, index) => index < stars);
        return starsArray.map((isGold, index) => (
            <FontAwesomeIcon
                key={index}
                icon={faStar}
                className={isGold ? 'gold' : ''}
            />
        ));
    };

    return (
        <div className="rep-user-outer">
            <div className="rep-user-content">
                <p className="rep-user-name">{name}</p>
                <div className='rating-card-stars'>
                    {renderStars()}
                </div>
                <p className="rep-user-reason">{text}</p>
            </div>
            <div className='rep-user-buttons'>
                <div className='profile-listing-delete-button' onClick={() => deleteRating()}>
                    <p className='profile-listing-delete-button-text'>Vymaž</p>
                </div>
                <div className='profile-listing-delete-button' onClick={() => keepRating()}>
                    <p className='profile-listing-delete-button-text'>Nechaj</p>
                </div>

            </div>
        </div>
    )
}

export default ReportedRating;