import '../css/navbar.css';
import LoginWidget from './LoginWidget';
import AuthContext from '../../context/AuthContext';
import QueryContext from '../../context/QueryContext';
import ListingsContext from '../../context/ListingsContext';
import FilterContext from '../../context/FilterContext';
import PageNumberContext from '../../context/PageNumberContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faUserCircle, faSearch, faPlusCircle, faCog } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState, useRef, useContext } from 'react';
import { isMobile } from 'react-device-detect';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

export default function Navbar() {
    const [dbUser, setDbUser] = useState({});
    const [menuShown, setMenuShown] = useState(false);
    const [burgerIconClass, setBurgerIconClass] = useState('nav-hamburger-container');
    const [dropdownClass, setDropdownClass] = useState('nav-inner-categories hamburger-menu');
    const [infoClass, setInfoClass] = useState('nav-inner-info');
    const [isScrolled, setIsScrolled] = useState(false);
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [mainClass, setMainClass] = useState('nav-inner-main');
    const [isAnimating, setIsAnimating] = useState(false);
    const [showLoginWidget, setShowLoginWidget] = useState(false);

    const { query, setQuery } = useContext(QueryContext);
    const { filter } = useContext(FilterContext);
    const { setListingsContextArr } = useContext(ListingsContext);
    const { setQPageNumber } = useContext(PageNumberContext);
    const { user } = useContext(AuthContext)

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        resetPage();
    }, [location.pathname]);

    const handleShowMenu = () => {
        setMenuShown(!menuShown);
        if (!menuShown) {
            setBurgerIconClass('nav-hamburger-container shown');
            setDropdownClass('nav-inner-categories hamburger-menu shown');
            document.body.style.overflow = 'hidden';
        } else {
            setBurgerIconClass('nav-hamburger-container hidden');
            setDropdownClass('nav-inner-categories hamburger-menu hidden');
            document.body.style.overflow = '';
        }
    }

    const loginWidgetHandler = () => {
        setShowLoginWidget(true);
        setTimeout(() => {
            setShowLoginWidget(false);
        }, 5000)
    }

    const handleScroll = () => {
        const currentScrollPos = window.pageYOffset || document.documentElement.scrollTop;
        setIsScrolled(currentScrollPos > 0);

        if (currentScrollPos > prevScrollPos && !isAnimating) {
            setIsScrolled(true);
            if (currentScrollPos) { //TU PRIDAJ ISMOBILE && AK SA NIECO POKAZILA
                setMainClass('nav-inner-main shrink');
                setIsAnimating(true);
                setTimeout(() => {
                    setIsAnimating(false);
                }, 300);
            }
        }

        if (currentScrollPos < prevScrollPos && !isAnimating) {
            setIsScrolled(false);
            if (currentScrollPos) { //TU PRIDAJ ISMOBILE && AK SA NIECO POKAZILA
                setMainClass('nav-inner-main expand');
                setIsAnimating(true);
                setTimeout(() => {
                    setIsAnimating(false);
                }, 300);
            }
        }

        setPrevScrollPos(currentScrollPos);
    };

    useEffect(() => {
        handleScroll();
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [prevScrollPos]);

    const resetPage = () => {
        setMenuShown(false);
        setBurgerIconClass('nav-hamburger-container')
        setMainClass('nav-inner-main');
        setDropdownClass('nav-inner-categories hamburger-menu');
        document.body.style.overflow = '';
        window.scrollTo(0, 0);
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        setQuery(e.target[0].value)

        const updatedQuery = {
            searchvalue: e.target[0].value,
            kategoria: filter.kategoria,
            velkost: filter.velkost,
            velkostIna: filter.velkostIna,
            znacka: filter.znacka,
            znackaIna: filter.znackaIna,
            farba: filter.farba,
            cenaod: filter.cenaod,
            cenado: filter.cenado,
            zoradit: filter.zoradit,
            prekoho: filter.prekoho,
            vokoli: filter.vokoli,
            psc: filter.psc,
            mesto: filter.mesto,
            coords: filter.coords,
            pagenumber: 1
        };

        setQuery(updatedQuery)
        const queryString = new URLSearchParams(updatedQuery).toString();

        try {
            await fetch(`${process.env.REACT_APP_API_URL}/api/listings/search?${queryString}`)
                .then(res => res.json())
                .then(data => { setListingsContextArr(data); setQPageNumber(1) })
                .then(() => navigate(`/browse/${queryString}`));
        } catch (e) {
            console.error(e)
        }
    }

    const getDbUser = async () => {
        try {
            await fetch(`${process.env.REACT_APP_API_URL}/api/users/getuser/${user.uid}`)
                .then((data) => data.json())
                .then((user) => { setDbUser(user) })
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        getDbUser();
    }, [user])

    const clearListings = (path) => {
        if(path != window.location.pathname){
            setListingsContextArr([]);
        }
    } 

    return (
        <div className="nav-outer">
            {showLoginWidget ? <LoginWidget /> : <></>}
            <div className='nav-inner'>

                {!user
                    ?
                    <div className='nav-hamburger-section'>
                        <NavLink><div className='nav-add-listing nav-mobile-icon' onClick={loginWidgetHandler}><FontAwesomeIcon icon={faPlusCircle} /></div></NavLink>
                        <div className={burgerIconClass} onClick={handleShowMenu}>
                            <div className='nav-hamburger-line'></div>
                            <div className='nav-hamburger-line'></div>
                            <div className='nav-hamburger-line'></div>
                        </div>
                        <NavLink><div className='nav-user-profile nav-mobile-icon' onClick={loginWidgetHandler}><FontAwesomeIcon icon={faUserCircle} /></div></NavLink>
                    </div>
                    :
                    <div className='nav-hamburger-section'>
                        <NavLink to='/newlisting'><div className='nav-add-listing nav-mobile-icon'><FontAwesomeIcon icon={faPlusCircle} /></div></NavLink>
                        <div className={burgerIconClass} onClick={handleShowMenu}>
                            <div className='nav-hamburger-line'></div>
                            <div className='nav-hamburger-line'></div>
                            <div className='nav-hamburger-line'></div>
                        </div>
                        <NavLink to='/myprofile'><div className='nav-user-profile nav-mobile-icon'><FontAwesomeIcon icon={faUserCircle} /></div></NavLink>
                    </div>
                }


                <div className={infoClass}>
                    <div className='nav-inner-info-left'>

                        <div className='nav-inner-info-left mail-icon'>
                            <FontAwesomeIcon icon={faEnvelope} />
                            <a href='mailto:weerit@gmail.com'>weeritinfo@gmail.com</a>
                        </div>

                        <div className='nav-inner-info-left mail-icon'>
                            <FontAwesomeIcon icon={faPhone} />
                            <a href='href="tel:+4733378901"'>+421 944 738 259</a>
                        </div>

                    </div>
                    <div className='nav-inner-info-right'>
                        {!user ?
                            <>
                                <div className='nav-inner-info-right mail-icon' onClick={loginWidgetHandler}>
                                    <FontAwesomeIcon icon={faPlusCircle} /><NavLink className='nav-add-btn'>Pridaj inzerát</NavLink>
                                </div>
                                <div className='nav-inner-info-right mail-icon' onClick={loginWidgetHandler}>
                                    <FontAwesomeIcon icon={faUserCircle} /><p>Prihlásiť sa</p>
                                </div>
                            </>
                            :
                            <>
                                <div className='nav-inner-info-right mail-icon'>
                                    <FontAwesomeIcon icon={faPlusCircle} /><NavLink to='/newlisting' className='nav-add-btn'>Pridaj inzerát</NavLink>
                                </div>
                                <div className='nav-inner-info-right mail-icon nav-add-btn2' >
                                    <FontAwesomeIcon icon={faUserCircle} /><p><NavLink to='/myprofile' className=''>Môj profil</NavLink></p>
                                </div>
                                {
                                    dbUser.admin === true ?
                                        <div className='nav-inner-info-right mail-icon nav-add-btn2 dashboard' >
                                            <FontAwesomeIcon icon={faCog} /><p><NavLink to='/secret/adminuser' className=''>Dashboard</NavLink></p>
                                        </div>
                                        :
                                        null
                                }
                            </>
                        }

                    </div>
                </div>
                <div className={mainClass}>
                    <div className='nav-inner-main-logo'>
                        <h1><NavLink to='/'>weerit.sk</NavLink></h1>
                    </div>
                    <div className='nav-inner-main-search'>
                        <form className='nav-inner-main-search-form' onSubmit={submitHandler}>
                            <input type='text' placeholder='Sem napíšte, čo hľadáte...' value={query.searchvalue} onChange={(e) => {
                                setQuery({ ...query, searchvalue: e.target.value });
                            }}></input>

                            <button type='submit' className='nav-inner-main-search-form-submit'>
                                <FontAwesomeIcon icon={faSearch} className='nav-inner-main-search-form-submit-icon' />
                            </button>
                        </form>
                    </div>
                </div>
                <div className={dropdownClass}>
                    <NavLink to='/' onClick={() => clearListings('/')}>Domov</NavLink>
                    <NavLink to='/browse/shoes' onClick={() => clearListings('/browse/shoes')}>Topánky</NavLink>
                    <NavLink to='/browse/hoodies' onClick={() => clearListings('/browse/hoodies')}>Mikiny</NavLink>
                    <NavLink to='/browse/pants' onClick={() => clearListings('/browse/pants')}>Nohavice</NavLink>
                    <NavLink to='/browse/accessories' onClick={() => clearListings('/browse/accessories')}>Doplnky</NavLink>
                    <NavLink to='/browse/underwear' onClick={() => clearListings('/browse/underwear')}>Prádlo</NavLink>
                </div>
            </div>
        </div>
    )
}