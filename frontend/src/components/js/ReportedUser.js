import '../css/reporteduser.css';
import '../css/reportedlisting.css';
import decryptData from '../../files/sec';
import GetKeyContext from '../../context/GetKeyContext';
import KeyContext from '../../context/KeyContext';
import AuthContext from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';

const ReportedUser = ({ name, uid, reason, setIsLoading, setRerender, rerender }) => {
    const { getKey, setGetKey } = useContext(GetKeyContext);
    const { enKey } = useContext(KeyContext);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate(); 

    const delelteReportedUser = async () => {
        setIsLoading(true);
        try {
            await fetch(`${process.env.REACT_APP_API_URL}/api/users/deleteuser`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${decryptData(enKey, process.env.REACT_APP_SEED)}`,
                    'userId': user.uid
                },
                body: JSON.stringify({
                    uid: uid
                })
            }).then(() => { setIsLoading(false); setGetKey(!getKey); setRerender(!rerender) })
        } catch (e) {
            console.error(e)
        }
    }

    const keepReportedUser = async () => {
        setIsLoading(true);
        try {
            await fetch(`${process.env.REACT_APP_API_URL}/api/users/keepuser`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${decryptData(enKey, process.env.REACT_APP_SEED)}`,
                    'userId': user.uid
                },
                body: JSON.stringify({
                    uid: uid
                })
            }).then(() => { setIsLoading(false); setGetKey(!getKey); setRerender(!rerender) })
        } catch (e) {
            console.error(e)
        }
    }

    return(
        <div className='rep-user-outer'>
            <div className='rep-user-content'>
                <p className='rep-user-name'>{ name }</p>
                <p className='rep-user-reason'>{ reason }</p>
            </div>
            <div className='rep-user-buttons'>
                <div className='profile-listing-delete-button' onClick={() => navigate(`/profile/${uid}`)}>
                    <p className='profile-listing-delete-button-text'>Prejsť na profil</p>
                </div>
                <div className='profile-listing-delete-button' onClick={() => delelteReportedUser()}>
                    <p className='profile-listing-delete-button-text'>Vymaž</p>
                </div>
                <div className='profile-listing-delete-button' onClick={() => keepReportedUser()}>
                    <p className='profile-listing-delete-button-text'>Nechaj</p>
                </div>
            </div>
            
        </div>
    )
}

export default ReportedUser;