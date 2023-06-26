import '../css/profilelisting.css';
import { useNavigate } from 'react-router-dom';

const ProfileListing = ({ title, price, src, uid, isLoading, setIsLoading, getMyListings, fotky }) => {
    const navigate = useNavigate()

    const clickHandler = () => {
        navigate(`/browse/product/${uid}`)
    }

    const deleteHandler = async () => {
        setIsLoading(true)
        //console.log("to delete: " + uid)
        await fetch(`${process.env.REACT_APP_API_URL}/api/listings/deletelisting`, {
            method: "DELETE",
            body: JSON.stringify({ uid: uid, fotky: fotky }),
            headers: {
                'Content-Type': 'application/json'
            }
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
                <div className='profile-listing-delete-button' onClick={deleteHandler}>
                    <p className='profile-listing-delete-button-text'>Vymaž</p>
                </div>
            </div>

        </div>
    )
}

export default ProfileListing;