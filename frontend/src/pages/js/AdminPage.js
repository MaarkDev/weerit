import '../css/adminpage.css'
import NoListing from '../../components/js/NoListing';
import ReportedListing from '../../components/js/ReportedListing';
import LoadingPage from './LoadingPage';
import { useEffect, useState } from 'react';

const AdminPage = () => {
    const [reportedArr, setReportedArr] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [rerender, setRerender] = useState(false);

    const getReported = async () => {
        try {
            await fetch(`${process.env.REACT_APP_API_URL}/api/listings/getreported`)
                .then((res) => res.json()).then((data) => { setReportedArr(data); setIsLoading(false) });
        } catch (e) {
            console.error(e)
        }

    }

    useEffect(() => {
        setIsLoading(true)
        getReported();
    }, [rerender])

    return (
        <div className='profile-page-outer-wrapper'>
            <div className='profile-page-wrapper-inner'>
                <h1 className='admin-page-title'>Admin Dashboard</h1>

                {reportedArr.length !== 0 ?
                    <div className='profile-page-listing-container'>
                        {reportedArr.map((item) => <ReportedListing rerender={rerender} setRerender={setRerender} isLoading={isLoading} setIsLoading={setIsLoading} title={item.nazov} price={item.cena} src={item.fotky[0]} uid={item.uid} />)}
                    </div>
                    :
                    <NoListing value="Žiadne nahlásené inzeráty" />
                }
            </div>

            {isLoading ? <LoadingPage /> : null}
        </div>
    )
}

export default AdminPage;