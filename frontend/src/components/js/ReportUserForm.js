import '../css/addrating.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const ReportUserForm = ({ setShowReport, setIsLoading, id, visitedUser, user }) => {
    const [reason, setReason] = useState("");

    const reportUser = async (reason) => {
        setShowReport(false);
        setIsLoading(true);
        try{
            await fetch(`${process.env.REACT_APP_API_URL}/api/users/reportuser`, {
                method: 'POST',
                    body: JSON.stringify({
                        uid: id,
                        name: visitedUser.name,
                        reason: reason
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                        'userId': user.uid
                    }
            }).then(() => setIsLoading(false))
        }catch(e){
            console.log(e);
        }
    }

    return(
        <div className='new-rating-page' onClick={() => { setShowReport(false) }}>
            <div className='new-rating-container' onClick={(e) => e.stopPropagation()}>
                <form className='new-rating-form' onSubmit={() => reportUser(reason)}>
                    <span className='inline-rating-form'><p className='new-rating-form-text'>Nahlásiť používateľa</p><FontAwesomeIcon className='new-rating-x' icon={faClose}  onClick={() => setShowReport(false)} /></span>
                    <p className='new-rating-form-input-label'>Dôvod<span className='red'>*</span></p>
                    <textarea className='new-rating-form-input' onChange={(e) => setReason(e.target.value)} required />
                    <button type='submit' className='new-rating-add-button'><p>Nahlás</p></button>
                </form>
            </div>
        </div>
    )
}

export default ReportUserForm;