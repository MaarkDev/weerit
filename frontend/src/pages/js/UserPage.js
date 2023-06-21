import '../css/profilepage.css'
import ProfileListing from '../../components/js/ProfileListing'
import NoListing from '../../components/js/NoListing'
import AuthContext from '../../context/AuthContext';
import { useContext, useEffect, useState } from 'react'
import LoadingPage from './LoadingPage';
import FavoriteListing from '../../components/js/FavoriteListing';
import { useParams } from 'react-router-dom';
import UserListing from '../../components/js/UserListing';
import AddRating from '../../components/js/AddRating';
import { useNavigate } from 'react-router-dom';
import RatingCard from '../../components/js/RatingCard';

const UserPage = () => {
    const [listings, setListings] = useState([]);
    const { user } = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(false)
    const [showRatings, setShowRatings] = useState(false);
    const [favListingsId, setFavListingsId] = useState([]);
    const [ratingsList, setRatingList] = useState([]);

    const [showAddRating, setShowAddRating] = useState(false);

    const { id } = useParams();
    const [visitedUser, setVisitedUser] = useState({})
    const [visitedUserListings, setVisitedUserListings] = useState([])

    const [rerender, setRerender] = useState(false);
      
    const navigate = useNavigate();

    useEffect(() => {
        //setIsLoading(true);
        const uid = user?.uid || '';
        if(id == uid){
            navigate('/myprofile');
        }
    }, [])

    const [myProfileClass, setMyProfileClass] = useState('new-listing-page-title cursor-pointer');
    const [favHeadingClass, setFavHeadingClass] = useState('new-listing-page-title cursor-pointer favheadingtitle unselected');


    const showRatingsHandler = () => {
        setShowRatings(true);
        setMyProfileClass('new-listing-page-title cursor-pointer unselected')
        setFavHeadingClass('new-listing-page-title cursor-pointer favheadingtitle')
    }

    const showProfileHandler = () => {
        setShowRatings(false);
        setMyProfileClass('new-listing-page-title cursor-pointer');
        setFavHeadingClass('new-listing-page-title cursor-pointer favheadingtitle unselected');
    }

    useEffect(() => {
        Promise.all([
            fetch(`${process.env.REACT_APP_API_URL}/api/users/getuser/${id}`).then(data => data.json()).then((data) => {setVisitedUser(data); setRatingList(data.ratings)}),
            fetch(`${process.env.REACT_APP_API_URL}/api/listings/mylistings?uid=${id}`).then(data => data.json()).then((data) => setVisitedUserListings(data))
        ])

        //console.log(visitedUser.ratings)
        
    }, [rerender])

    return (
        <div className='profile-page-outer-wrapper'>
            <div className='profile-page-wrapper-inner'>
                <div className='new-listing-page-title-wrapper'>
                    <p className={myProfileClass} onClick={showProfileHandler}>{visitedUser.name}</p>
                    <p className={favHeadingClass} onClick={showRatingsHandler}>Hodnotenia</p>
                </div>
                
                    {
                        user ?<div className='logout-button rating-button' onClick={() => setShowAddRating(true)}>
                                <p className='logout-button-text'>Ohodnotiť používatela</p>
                            </div>
                        : <></>
                    }
                    
                
                {!showRatings ?
                    visitedUserListings.length !== 0 ?
                        <div className='profile-page-listing-container'>
                            {visitedUserListings.map((item) => {
                                return (<UserListing isLoading={isLoading} setIsLoading={setIsLoading} title={item.nazov} price={item.cena} src={item.fotky[0]} uid={item.uid}/>)
                            })}
                        </div>
                        :
                        <NoListing value='Tento používateľ nemá žiadne inzeráty' />
                    :
                    ratingsList.length !== 0 ?
                        <div className='profile-page-listing-container profile-rating'>
                            {ratingsList.map((item) => {
                                return (<RatingCard setIsLoading={setIsLoading} setRerender={setRerender} rerender={rerender} text={item.text} stars={item.stars} name={item.name} autor={item.autor} date={item.date} ratedUser={item.user} uid={item.uid} />)
                            })}
                        </div>
                        :
                        <NoListing value='Tento používateľ nemá žiadne hodnotenia' />

                }

            </div>
            {isLoading ? <LoadingPage /> : null}
            {showAddRating ? <AddRating rerender={rerender} setRerender={setRerender} showRatingsHandler={showRatingsHandler} setIsLoading={setIsLoading} setShowAddRating={setShowAddRating} showAddRating={showAddRating} user={user} /> : null}
        </div>
    )
}

export default UserPage;