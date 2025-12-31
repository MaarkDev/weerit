import '../css/addrating.css'
import decryptData from '../../files/sec';
import KeyContext from '../../context/KeyContext';
import GetKeyContext from '../../context/GetKeyContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faStar } from '@fortawesome/free-solid-svg-icons';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const AddRating = ({ setShowAddRating, showAddRating, user, setIsLoading, showRatingsHandler, rerender, setRerender }) => {
    const [stars, setStars] = useState(3);
    const [starsArr, setStarsArr] = useState([])

    const { id } = useParams();
    const { enKey } = useContext(KeyContext);
    const { getKey, setGetKey } = useContext(GetKeyContext);

    useEffect(() => {
        setStarsArr(Array.from({ length: 5 }, (_, index) => index < stars));
    }, [stars])

    const submitHandler = async (e) => {
        e.preventDefault();
        setShowAddRating(false);
        setIsLoading(true);
        const reviewObj = {
            text: e.target[0].value,
            stars: e.target[1].value,
            name: user.name,
            autor: user.uid,
            user: id,
            uid: uuidv4(),
        }

        try {
            await fetch(`${process.env.REACT_APP_API_URL}/api/users/newuserrating`, {
                method: 'POST',
                body: JSON.stringify(reviewObj),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${decryptData(enKey, process.env.REACT_APP_SEED)}`,
                    'userId': user.uid
                }
            })
                .then(res => res.json()).then(() => { setIsLoading(false); showRatingsHandler(); setRerender(!rerender); setGetKey(!getKey) })
        } catch (e) {
            console.error(e)
        }

    }

    return (
        <div className='new-rating-page' onClick={() => { setShowAddRating(!showAddRating) }}>
            <div className='new-rating-container' onClick={(e) => e.stopPropagation()}>
                <form className='new-rating-form' onSubmit={submitHandler}>
                    <span className='inline-rating-form'><p className='new-rating-form-text'>Pridaj hodnotenie</p><FontAwesomeIcon className='new-rating-x' icon={faClose} onClick={() => setShowAddRating(!showAddRating)} /></span>
                    <p className='new-rating-form-input-label'>Hodnotenie<span className='red'>*</span></p>
                    <textarea className='new-rating-form-input' required />
                    <p className='new-rating-form-input-label'>Počet hviezd<span className='red'>*</span></p>
                    <input type='range' defaultValue="3" className='new-rating-form-number' min="1" max="5" required onChange={(e) => { setStars(e.target.value) }} />
                    <div className='new-rating-form-stars'>
                        {starsArr.map((isGold, index) => (
                            <FontAwesomeIcon
                                key={index}
                                icon={faStar}
                                className={`${isGold ? 'gold' : ''}`}
                            />
                        ))}
                    </div>
                    <button type='submit' className='new-rating-add-button'><p>Pridaj</p></button>
                </form>
            </div>
        </div>

    )
}

export default AddRating;