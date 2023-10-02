import '../css/createlistingpage.css';
import AuthContext from '../../context/AuthContext'
import LoadingPage from './LoadingPage';
import decryptData from '../../files/sec';
import KeyContext from '../../context/KeyContext';
import GetKeyContext from '../../context/GetKeyContext';
import { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const CreateListingPage = () => {
    const [selectedImages, setSelectedImages] = useState([])
    const [selectedImages64, setSelectedImages64] = useState([])
    const [mesto, setMesto] = useState('')
    const [isFetching, setIsFetching] = useState(false);
    const [listingObject, setListingObject] = useState();
    const [imageUrls, setImageUrls] = useState();
    const [psc, setPsc] = useState('')
    const [lat, setLat] = useState(0)
    const [lng, setLng] = useState(0)

    const { user } = useContext(AuthContext);
    const { enKey } = useContext(KeyContext);
    const { getKey, setGetKey } = useContext(GetKeyContext);

    const { id } = useParams();
    const navigate = useNavigate()

    const getAutocomplete = async () => {
        setIsFetching(true)
        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/api/listings/getlisting?uid=${id}`);
            const resData = await res.json();
            setIsFetching(false);
            setImageUrls(resData[0].fotky);
            setListingObject(resData[0]);
        } catch (e) {
            console.error(e)
        }

    }

    useEffect(() => {
        getAutocomplete();
    }, [])

    const onSelectFile = (e) => {
        const selectedFiles = e.target.files;
        const selectedFilesArray = Array.from(selectedFiles);

        const imagesArray = selectedFilesArray.map((file) => {
            return URL.createObjectURL(file);
        });

        setSelectedImages(imagesArray);

        const filePromises = Array.from(selectedFiles).map((file) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const base64URI = reader.result;
                    resolve(base64URI);
                };
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        });


        Promise.all(filePromises)
            .then((results) => {
                setSelectedImages64(results);
            })
            .catch((error) => {
                console.error(error);
            });

    };

    const onPlaceSelected = (place, lat, lng) => {
        setMesto(place.city);
        setLat(place.lat);
        setLng(place.lng);
    };

    function getCityName(addressComponents) {
        for (const component of addressComponents) {
            if (component.types.includes('locality')) {
                return component.long_name;
            }
        }
        return '';
    }

    const handlePlaceSelect = () => {
        const autocompleteService = new window.google.maps.places.AutocompleteService();
        autocompleteService.getPlacePredictions(
            { input: psc, types: ['postal_code'], componentRestrictions: { country: 'sk' } },
            (predictions, status) => {
                if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions) {
                    const placeId = predictions[0]?.place_id; // Assuming the first prediction is the selected one
                    if (placeId) {
                        const geocoder = new window.google.maps.Geocoder();
                        geocoder.geocode({ placeId }, (results, status) => {
                            if (status === window.google.maps.GeocoderStatus.OK && results[0]) {
                                const place = {
                                    postalCode: predictions[0]?.structured_formatting?.main_text,
                                    lat: results[0].geometry.location.lat(),
                                    lng: results[0].geometry.location.lng(),
                                    city: getCityName(results[0].address_components),
                                };
                                onPlaceSelected(place);
                            }
                        });
                    }
                }
            }
        );
    };

    const handlePscChange = (event) => {
        setPsc(event);
    };


    const submitHandler = async (e) => {
        e.preventDefault();
        setIsFetching(true);

        let fotky = [];
        if (selectedImages64.length == 0) {
            fotky = [...imageUrls];
        } else {
            fotky = [...selectedImages64];
        }

        try {
            await fetch(`${process.env.REACT_APP_API_URL}/api/listings/updatelisting`, {
                method: 'PUT',
                body: JSON.stringify({
                    autor: listingObject.autor,
                    uid: listingObject.uid,
                    nazov: listingObject.nazov,
                    popis: listingObject.popis,
                    kategoria: listingObject.kategoria,
                    znacka: listingObject.znacka,
                    velkost: listingObject.velkost,
                    farba: listingObject.farba,
                    prekoho: listingObject.prekoho,
                    psc: psc,
                    telefon: listingObject.telefon,
                    mail: listingObject.mail,
                    igfb: listingObject.igfb,
                    cena: listingObject.cena,
                    fotky: fotky,
                    mesto: mesto,
                    lat: lat,
                    lng: lng
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${decryptData(enKey, process.env.REACT_APP_SEED)}`,
                    'userId': user.uid
                }
            }).then((res) => res.json())
                .then((data) => { setIsFetching(false); navigate('/myprofile'); setGetKey(!getKey) })
                .catch((error) => console.log(error));
        } catch (e) {
            console.error(e)
        }

    }

    return (
        <div className='listing-page-wrapper-outer'>
            <div className='listing-page-wrapper-inner'>
                <p className='new-listing-page-title'>Úprava Inzerátu</p>
                <p className='new-listing-page-info normalise'><span className='red'><b>*</b></span> Povinné</p>
                <form className='new-listing-form' onSubmit={submitHandler}>
                    <div className='new-listing-form-inputs'>
                        <div className='new-listing-form-inputs-left'>
                            <p className='new-listing-input-label'>Názov:<span className='red'>*</span></p>
                            <input className='new-listing-input-field' type='text' placeholder='' required maxLength="60" value={listingObject?.nazov} onChange={(e) => setListingObject({ ...listingObject, nazov: e.target.value })} />
                            <p className='new-listing-input-label'>Popis:<span className='red'>*</span></p>
                            <textarea className='new-listing-input-field-textarea' placeholder='' rows="4" cols="20" required maxLength="600" value={listingObject?.popis} onChange={(e) => setListingObject({ ...listingObject, popis: e.target.value })} />
                            <p className='new-listing-input-label'>Kategória:<span className='red'>*</span></p>
                            <select name='Vyberte kategóriu' className='new-listing-input-select' required value={listingObject?.kategoria} onChange={(e) => setListingObject({ ...listingObject, kategoria: e.target.value })}>
                                <option value='tricka'>Tričká</option>
                                <option value='mikiny'>Mikiny</option>
                                <option value='topanky'>Topánky</option>
                                <option value='nohavice'>Nohavice</option>
                                <option value='doplnky'>Doplnky</option>
                                <option value='spodnepradlo'>Spodné Prádlo</option>
                                <option value='plavky'>Plavky</option>
                            </select>
                            <p className='new-listing-input-label'>Značka:<span className='red'>*</span></p>
                            <input className='new-listing-input-field' type='text' placeholder='' required maxLength="20" value={listingObject?.znacka} onChange={(e) => setListingObject({ ...listingObject, znacka: e.target.value })} />
                            <p className='new-listing-input-label'>Veľkosť:<span className='red'>*</span></p>
                            <input className='new-listing-input-field' type='text' placeholder='' required maxLength="20" value={listingObject?.velkost} onChange={(e) => setListingObject({ ...listingObject, velkost: e.target.value })} />
                        </div>
                        <div className='divider'></div>
                        <div className='new-listing-form-inputs-right'>
                            <p className='new-listing-input-label'>Farba:</p>
                            <input className='new-listing-input-field' type='text' placeholder='' maxLength="20" value={listingObject?.farba} onChange={(e) => setListingObject({ ...listingObject, farba: e.target.value })} />
                            <p className='new-listing-input-label'>Pre koho:</p>
                            <select name='Pre koho' className='new-listing-input-select' value={listingObject?.prekoho} onChange={(e) => setListingObject({ ...listingObject, prekoho: e.target.value })}>
                                <option value='muza'>Muža</option>
                                <option value='zenu'>Ženu</option>
                                <option value='dieta'>Dieťa</option>
                                <option value='unisex'>Unisex</option>
                            </select>
                            <p className='new-listing-input-label' >PSČ:<span className='red'>*</span></p>
                            <input className='new-listing-input-field' maxLength="20" onChange={(e) => { handlePscChange(e.target.value); handlePlaceSelect() }} type='text' placeholder='' required />
                            <p className='new-listing-input-label'>Telefón:<span className='red'>*</span></p>
                            <input className='new-listing-input-field' type='text' placeholder='' required maxLength="20" value={listingObject?.telefon} onChange={(e) => setListingObject({ ...listingObject, telefon: e.target.value })} />
                            <p className='new-listing-input-label'>Mail:</p>
                            <input className='new-listing-input-field' type='email' placeholder='' maxLength="40" value={listingObject?.mail} onChange={(e) => setListingObject({ ...listingObject, mail: e.target.value })} />
                            <p className='new-listing-input-label'>IG/FB:</p>
                            <input className='new-listing-input-field' maxLength="40" type='text' value={listingObject?.igfb} placeholder='Tvoje meno bude automaticky vyplnené ak necháš túto kolonku prázdnu' onChange={(e) => setListingObject({ ...listingObject, igfb: e.target.value })} />
                            <p className='new-listing-input-label'>Cena:<span className='red'>*</span></p>
                            <input className='new-listing-input-field' maxLength="20" type='text' placeholder='' value={listingObject?.cena} required onChange={(e) => setListingObject({ ...listingObject, cena: e.target.value })} />
                        </div>
                    </div>
                    <div className='new-listing-selected-images-container'>
                        {selectedImages.length !== 0 ? selectedImages.map((image, index) => {
                            return (
                                <div key={image} className='new-listing-selected-image'>
                                    <img src={image} alt='' />
                                    <button onClick={() => {
                                        setSelectedImages(selectedImages.filter((e) => e !== image));

                                        // Filter the selectedImages64 state array based on the filtered photo index
                                        setSelectedImages64((prevImages) =>
                                            prevImages.filter((_, index) => index !== selectedImages.indexOf(image))
                                        );
                                        setImageUrls([]);
                                    }}>Vymaž</button>

                                </div>
                            )
                        }) : imageUrls?.map((url) => {
                            return (
                                <div key={url} className='new-listing-selected-image'>
                                    <img src={url} alt='' />
                                    <button onClick={() => {
                                        setImageUrls((prev) => prev.filter(item => item !== url))
                                    }}>Vymaž</button>

                                </div>
                            )
                        })}
                    </div>
                    <div className='new-listing-photo-upload'>
                        <label className='new-listing-image-label'>
                            <p className='new-listing-image-info'>+ Pridaj fotky <span className='red'><strong>*</strong></span></p>
                            <br />
                            <span>Pridaj fotky pre tvoj inzerát</span>
                            {imageUrls?.length == 0 ? <input
                                type='file'
                                name='images'
                                onChange={onSelectFile}
                                multiple
                                accept='image/png , image/jpeg , image/jpg, image/webp'
                                className='new-listing-image-input'
                                required
                            /> : <input
                                type='file'
                                name='images'
                                onChange={onSelectFile}
                                multiple
                                accept='image/png , image/jpeg , image/jpg, image/webp'
                                className='new-listing-image-input'
                            />}

                        </label>
                    </div>
                    <input type='submit' className='new-listing-submit' value='Uprav Inzerát' />
                </form>
            </div>
            {isFetching ? <LoadingPage /> : <></>}
        </div>
    )
}

export default CreateListingPage;