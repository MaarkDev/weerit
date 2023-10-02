import '../css/ratingcard.css';
import AuthContext from '../../context/AuthContext';
import decryptData from '../../files/sec';
import KeyContext from '../../context/KeyContext';
import GetKeyContext from '../../context/GetKeyContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';

const RatingCard = ({ text, ratedUser, date, stars, name, autor, uid, rerender, setIsLoading, setRerender }) => {
    const { enKey } = useContext(KeyContext);
    const { getKey, setGetKey } = useContext(GetKeyContext);
    const { user } = useContext(AuthContext);
    const userId = user?.uid || '';

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

    const deleteRating = async () => {
        setIsLoading(true);
        try {
            await fetch(`${process.env.REACT_APP_API_URL}/api/users/deleterating`, {
                method: 'DELETE',
                body: JSON.stringify({
                    uid: uid,
                    user: ratedUser,
                    autor: userId
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${decryptData(enKey, process.env.REACT_APP_SEED)}`,
                    'userId': user.uid
                }
            }).then((res) => res.json()).then((data) => { setIsLoading(false); setRerender(!rerender); setGetKey(!getKey) })
        } catch (e) {
            console.error(e);
        }

    }

    const formatDate = () => {
        const newdate = new Date(date);
        const day = newdate.getDate();
        const month = newdate.getMonth() + 1;
        const year = newdate.getFullYear();
        return (`${day}/${month}/${year}`)
    }

    return (
        <div className='rating-card-wrapper'>
            <div className='rating-card-inline'>
                <div className='rating-card-name'>{name}</div>
                <div className='rating-card-stars'>
                    {renderStars()}
                </div>
            </div>
            <div className='rating-card-desc'>
                <p>{text}</p>
            </div>

            <div className='rating-card-date inline-rating'>
                <p>{formatDate()}</p>{userId == autor ? <p className='rating-card-delete' onClick={deleteRating}>Vymazať</p> : null}
            </div>
        </div>
    )
}

export default RatingCard;