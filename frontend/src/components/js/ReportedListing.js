import '../css/reportedlisting.css'
import { useNavigate } from 'react-router-dom'

const ReportedListing = ({ src, title, price, uid, isLoading, setIsLoading, rerender, setRerender }) => {
    const navigate = useNavigate();

    const deleteListing = async () => {
        setIsLoading(true);
        fetch(`${process.env.REACT_APP_API_URL}/api/listings/deletereported`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                uid: uid
            })
        }).then(() => {setIsLoading(false); setRerender(!rerender)})
    }

    const keepListing = async () => {
        setIsLoading(true);
        fetch(`${process.env.REACT_APP_API_URL}/api/listings/reportedok`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                uid: uid
            })
        }).then(() => {setIsLoading(false); setRerender(!rerender)})
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