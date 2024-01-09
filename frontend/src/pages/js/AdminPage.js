import '../css/adminpage.css'
import NoListing from '../../components/js/NoListing';
import ReportedListing from '../../components/js/ReportedListing';
import LoadingPage from './LoadingPage';
import { useEffect, useState } from 'react';
import ReportedUser from '../../components/js/ReportedUser';
import ReportedRating from '../../components/js/ReportedRating';

const AdminPage = () => {
    const [reportedListingsArr, setReportedListingsArr] = useState([]);
    const [reportedUsersArr, setReportedUsersArr] = useState([]);
    const [reportedRatingsArr, setReportedRatingsArr] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const [rerender, setRerender] = useState(false);

    const [listingsClass, setListingsClass] = useState('admin-page-title2');
    const [usersClass, setUsersClass] = useState('admin-page-title2 unselected');
    const [ratingsClass, setRatingsClass] = useState('admin-page-title2 unselected');

    const [listingsSelected, setListingsSelected] = useState(true);
    const [usersSelected, setUsersSelected] = useState(false);
    const [ratingsSelected, setRatingsSelected] = useState(false);

    const getReportedListings = async () => {
        console.log("GET REP LISTINGS")
        try {
            setIsLoading(true);
            await fetch(`${process.env.REACT_APP_API_URL}/api/listings/getreported`)
                .then((res) => res.json()).then((data) => { setReportedListingsArr(data); setIsLoading(false) });
        } catch (e) {
            console.error(e)
        }
    }

    const getReportedUsers = async () => {
        console.log("GET REP USERS")
        try {
            setIsLoading(true);
            await fetch(`${process.env.REACT_APP_API_URL}/api/users/getreportedusers`)
                .then((res) => res.json()).then((data) => { setReportedUsersArr(data); setIsLoading(false) })
        } catch (e) {
            console.error(e);
        }
    }

    const getReportedRatings = async () => {
        console.log("GET REP RATINGS")
        try {
            setIsLoading(true);
            await fetch(`${process.env.REACT_APP_API_URL}/api/users/getreportedratings`)
                .then((res) => res.json()).then((data) => { setReportedRatingsArr(data); setIsLoading(false) })
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        getReportedListings();
    }, [])

    useEffect(() => {
        if(listingsSelected){
            getReportedListings();
        }
        if(usersSelected){
            getReportedUsers();
        }
        if(ratingsSelected){
            getReportedRatings();
        }
    }, [rerender])

    const selectListings = async () => {
        setListingsSelected(true);
        setUsersSelected(false);
        setRatingsSelected(false);
        setListingsClass('admin-page-title2');
        setUsersClass('admin-page-title2 unselected');
        setRatingsClass('admin-page-title2 unselected');

        getReportedListings();
    }

    const selectUsers = async () => {
        setListingsSelected(false);
        setUsersSelected(true);
        setRatingsSelected(false);
        setListingsClass('admin-page-title2 unselected');
        setUsersClass('admin-page-title2');
        setRatingsClass('admin-page-title2 unselected');

        getReportedUsers();
    }

    const selectRatings = async () => {
        setListingsSelected(false);
        setUsersSelected(false);
        setRatingsSelected(true);
        setListingsClass('admin-page-title2 unselected');
        setUsersClass('admin-page-title2 unselected');
        setRatingsClass('admin-page-title2');

        getReportedRatings();
    }

    return (
        <div className='profile-page-outer-wrapper'>
            <div className='profile-page-wrapper-inner'>
                <h1 className='admin-page-title'>Admin Dashboard</h1>
                <div className='admin-page-reported-selection'>
                    <h2 className={listingsClass} onClick={selectListings}>Inzeráty</h2>
                    <h2 className={usersClass} onClick={selectUsers}>Používatelia</h2>
                    <h2 className={ratingsClass} onClick={selectRatings}>Hodnotenia</h2>
                </div>

                {
                    listingsSelected 
                    ?
                        reportedListingsArr.length !== 0 
                            ?
                            <div className='profile-page-listing-container'>
                                {reportedListingsArr.map((item) => <ReportedListing rerender={rerender} setRerender={setRerender} isLoading={isLoading} setIsLoading={setIsLoading} title={item.nazov} price={item.cena} src={item.fotky[0]} uid={item.uid} />)}
                            </div>
                            :
                            <NoListing value="Žiadne nahlásené inzeráty" />
                    :
                    null
                }

                {               
                    usersSelected 
                    ?
                        reportedUsersArr.length !== 0 
                            ?
                            <div className='rep-users-grid'>
                                {reportedUsersArr.map((item) => <ReportedUser rerender={rerender} setRerender={setRerender} isLoading={isLoading} setIsLoading={setIsLoading} name={item.name} reason={item.reason} uid={item.uid} />)}
                            </div>
                            :
                            <NoListing value="Žiadny nahlásený používateľ" />
                    :
                    null
                }

                {               
                    ratingsSelected 
                    ?
                        reportedRatingsArr.length !== 0 
                            ?
                            <div className='rep-users-grid'>
                                {reportedRatingsArr.map((item) => <ReportedRating isLoading={isLoading} setIsLoading={setIsLoading} name={item.name} autor={item.autor} usersUid={item.user} text={item.text} stars={item.stars} itemId={item.uid} setRerender={setRerender} rerender={rerender}/>)}
                            </div>
                            :
                            <NoListing value="Žiadne nahlásené hodnotenie" />
                    :
                    null
                }

            </div>

            {isLoading ? <LoadingPage /> : null}
        </div>
    )
}

export default AdminPage;