import '../css/profilepage.css'
import ProfileListing from '../../components/js/ProfileListing'
import NoListing from '../../components/js/NoListing'
import AuthContext from '../../context/AuthContext';
import { useContext, useEffect, useState } from 'react'
import LoadingPage from './LoadingPage';
import FavoriteListing from '../../components/js/FavoriteListing';
import RatingCard from '../../components/js/RatingCard';

const ProfilePage = () => {
    const [listings, setListings] = useState([]);
    const { user } = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(false)
    const [showProfile, setShowProfile] = useState(true)
    const [showFav, setShowFav] = useState(false);
    const [showRating, setShowRating] = useState(false);
    const [favListingsId, setFavListingsId] = useState([]);
    const [favListings, setFavListings] = useState([]);
    const [rerender, setRerender] = useState(false);

    const [ratingsList, setRatingList] = useState([]);
    const [ratingsByMe, setRatingsByMe] = useState([])
    

    const logout = () => {
        window.open(`${process.env.REACT_APP_API_URL}/auth/logout`, '_self');
    }

    // tu je zahrnute aj fav
    const getMyListings = async () => {
        try {
          const user_id = user.uid;
      
          const listingsResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/listings/mylistings?uid=${user_id}`);
          const listingsJson = await listingsResponse.json();
          if (listingsResponse.ok) {
            console.log(listingsJson);
            setListings(listingsJson);
            setIsLoading(false);
          }
      
          const userResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/users/getuser/${user_id}`);
          
          const userJson = await userResponse.json();
          setRatingList(userJson.ratings)
          setRatingsByMe(userJson.createdRatings)
          if (userResponse.ok) {
            setFavListingsId(userJson.favorites);
            const queryString = userJson.favorites.map((item) => `favorites=${encodeURIComponent(item)}`).join('&');
            
            const favoritesResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/listings/getfavorites?${queryString}`);
            const favoritesJson = await favoritesResponse.json();
            setFavListings(favoritesJson);
          }
        } catch (error) {
          console.error(error);
        }
      };
      

    useEffect(() => {
        setIsLoading(true);
        getMyListings();
    }, [rerender])

    const [myProfileClass, setMyProfileClass] = useState('new-listing-page-title cursor-pointer');
    const [favHeadingClass, setFavHeadingClass] = useState('new-listing-page-title cursor-pointer favheadingtitle unselected');
    const [ratingClass, setRatingClass] = useState('new-listing-page-title cursor-pointer unselected');


    const showFavHandler = () => {
        setShowFav(true);
        setShowRating(false);
        setShowProfile(false);
        setMyProfileClass('new-listing-page-title cursor-pointer unselected')
        setFavHeadingClass('new-listing-page-title cursor-pointer favheadingtitle')
        setRatingClass('new-listing-page-title cursor-pointer unselected')
    }

    const showProfileHandler = () => {
        setShowFav(false);
        setShowProfile(true);
        setShowRating(false);
        setMyProfileClass('new-listing-page-title cursor-pointer');
        setFavHeadingClass('new-listing-page-title cursor-pointer favheadingtitle unselected');
        setRatingClass('new-listing-page-title cursor-pointer unselected')
    }

    const showRatingHandler = () => {
        setShowFav(false);
        setShowRating(true);
        setShowProfile(false);
        setMyProfileClass('new-listing-page-title cursor-pointer unselected')
        setFavHeadingClass('new-listing-page-title cursor-pointer favheadingtitle unselected')
        setRatingClass('new-listing-page-title cursor-pointer')
    }

    return (
        <div className='profile-page-outer-wrapper'>
            <div className='profile-page-wrapper-inner'>
                <div className='new-listing-page-title-wrapper'>
                    <p className={myProfileClass} onClick={showProfileHandler}>Môj profil</p>
                    <p className={favHeadingClass} onClick={showFavHandler}>Obľúbené</p>
                    <p className={ratingClass} onClick={showRatingHandler}>Hodnotenia</p>
                </div>
                <div className='logout-button' onClick={logout}>
                    <p className='logout-button-text'>Odhlásiť sa</p>
                </div>
                

                {showProfile && (listings.length !== 0 ?
                        <div className='profile-page-listing-container'>
                            {listings.map((item) => {
                                return (<ProfileListing getMyListings={getMyListings} isLoading={isLoading} setIsLoading={setIsLoading} title={item.nazov} price={item.cena} src={item.fotky[0]} uid={item.uid} />)
                            })}
                        </div>
                        :
                        <NoListing value='Zatiaľ ešte nemáš žiadne inzeráty' />)}

                {showFav && (favListings.length !== 0 ?
                        <div className='profile-page-listing-container'>
                            {favListings.map((item) => {
                                return (<FavoriteListing getMyListings={getMyListings} setUserFavorites={setFavListings} user={user} title={item.nazov} src={item.fotky[0]} price={item.cena} uid={item.uid} isLoading={isLoading} setIsLoading={setIsLoading}/>)
                            })}
                        </div>
                        :
                        <NoListing value='Žiadne inzeráty v obľúbených' />)}

                {showRating && (
                    ratingsList.length != 0 ?
                        <div className='profile-rating'>
                            {ratingsList.map((item) => {
                                return (<RatingCard setIsLoading={setIsLoading} text={item.text} stars={item.stars} name={item.name} autor={item.autor} date={item.date} ratedUser={item.user} uid={item.uid} />)
                            })}
                        </div>
                    :
                        <NoListing value='Žiadne hodnotenia od ostatných používateľov' />)
                }

                {showRating && <h2 className='profile-rating-mine'>Mnou vytvorené hodnotenia</h2>}
                {showRating && (
                    ratingsByMe.length != 0 ?
                        <div className='profile-rating'>
                            {ratingsByMe.map((item) => {
                                return (<RatingCard rerender={rerender} setRerender={setRerender} setIsLoading={setIsLoading} text={item.text} stars={item.stars} name={item.name} autor={item.autor} date={item.date} ratedUser={item.user} uid={item.uid} />)
                            })}
                        </div>
                    :
                        <NoListing value='Zatiaľ si nepridal hodnotenie žiadnemu inému používateľovi' />)
                }


            </div>
            {isLoading ? <LoadingPage /> : null}
        </div>
    )
}

export default ProfilePage;