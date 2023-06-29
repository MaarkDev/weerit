import '../css/createlistingpage.css';
import { useState, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import AuthContext from '../../context/AuthContext'
import LoadingPage from './LoadingPage';
import { useNavigate } from 'react-router-dom';

const CreateListingPage = () => {
    const [selectedImages, setSelectedImages] = useState([])
    const [selectedImages64, setSelectedImages64] = useState([])
    const [mesto, setMesto] = useState('')
    const [psc, setPsc] = useState('')
    const [lat, setLat] = useState(0)
    const [lng, setLng] = useState(0)
    const [isFetching, setIsFetching] = useState(false);
    const navigate = useNavigate()

    const { user, setUser } = useContext(AuthContext);

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
                    //console.log(base64String)
                    //const base64URI = `data:${file.type};base64,${base64String}`;
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
        //console.log('Selected Place:', place.city);
        setMesto(place.city);
        setLat(place.lat);
        setLng(place.lng);
        // Handle the selected place, such as retrieving the city or postal code
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
        //console.log(psc)
    };


    const submitHandler = async (e) => {
        e.preventDefault();
        setIsFetching(true);
        const uniqueId = uuidv4();
        const nazov = e.target[0].value;
        const popis = e.target[1].value;
        const kategoria = e.target[2].value;
        const znacka = e.target[3].value;
        const velkost = e.target[4].value;
        const farba = e.target[5].value;
        const prekoho = e.target[6].value;
        const psc = e.target[7].value;
        const telefon = e.target[8].value;
        const mail = e.target[9].value;
        const igfb = e.target[10].value || user.name;
        const cena = e.target[11].value;
        const autor = user.uid;
        //console.log(user.uid)
        //console.log(mesto)

        try {
            //console.log(selectedImages64)
            await fetch(`${process.env.REACT_APP_API_URL}/api/listings/newlisting`, {
                method: 'POST',
                body: JSON.stringify({
                    autor: autor,
                    uid: uniqueId,
                    nazov: nazov,
                    popis: popis,
                    kategoria: kategoria,
                    znacka: znacka,
                    velkost: velkost,
                    farba: farba,
                    prekoho: prekoho,
                    psc: psc,
                    telefon: telefon,
                    mail: mail,
                    igfb: igfb,
                    cena: cena,
                    fotky: selectedImages64,
                    mesto: mesto,
                    lat: lat,
                    lng: lng
                }),
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then((res) => res.json())
                .then((data) => {setIsFetching(false); navigate('/myprofile')})
                .catch((error) => console.log(error));
        } catch (e) {
            console.error(e)
        }

    }

    return (
        <div className='listing-page-wrapper-outer'>
            <div className='listing-page-wrapper-inner'>
                <p className='new-listing-page-title'>Pridanie Inzerátu</p>
                <p className='new-listing-page-info normalise'><span className='red'><b>*</b></span> Povinné</p>
                <form className='new-listing-form' onSubmit={submitHandler}>
                    <div className='new-listing-form-inputs'>
                        <div className='new-listing-form-inputs-left'>
                            <p className='new-listing-input-label'>Názov:<span className='red'>*</span></p>
                            <input className='new-listing-input-field' type='text' placeholder='' required maxLength="60"/>
                            <p className='new-listing-input-label'>Popis:<span className='red'>*</span></p>
                            <textarea className='new-listing-input-field-textarea' placeholder='' rows="4" cols="20" required maxLength="600"/>
                            <p className='new-listing-input-label'>Kategória:<span className='red'>*</span></p>
                            <select name='Vyberte kategóriu' className='new-listing-input-select' required>
                                <option value='tricka'>Tričká</option>
                                <option value='mikiny'>Mikiny</option>
                                <option value='topanky'>Topánky</option>
                                <option value='nohavice'>Nohavice</option>
                                <option value='doplnky'>Doplnky</option>
                                <option value='spodnepradlo'>Spodné Prádlo</option>
                                <option value='plavky'>Plavky</option>
                            </select>
                            <p className='new-listing-input-label'>Značka:<span className='red'>*</span></p>
                            <input className='new-listing-input-field' type='text' placeholder='' required maxLength="20"/>
                            <p className='new-listing-input-label'>Veľkosť:<span className='red'>*</span></p>
                            <input className='new-listing-input-field' type='text' placeholder='' required maxLength="20"/>
                        </div>
                        <div className='divider'></div>
                        <div className='new-listing-form-inputs-right'>
                            <p className='new-listing-input-label'>Farba:</p>
                            <input className='new-listing-input-field' type='text' placeholder='' maxLength="20"/>
                            <p className='new-listing-input-label'>Pre koho:</p>
                            <select name='Pre koho' className='new-listing-input-select'>
                                <option value='muza'>Muža</option>
                                <option value='zenu'>Ženu</option>
                                <option value='dieta'>Dieťa</option>
                                <option value='unisex'>Unisex</option>
                            </select>
                            <p className='new-listing-input-label' >PSČ:<span className='red'>*</span></p>
                            <input className='new-listing-input-field' maxLength="20" onChange={(e) => {handlePscChange(e.target.value); handlePlaceSelect()}} type='text' placeholder='' required />
                            <p className='new-listing-input-label'>Telefón:<span className='red'>*</span></p>
                            <input className='new-listing-input-field' type='text' placeholder='' required maxLength="20"/>
                            <p className='new-listing-input-label'>Mail:</p>
                            <input className='new-listing-input-field' type='email' placeholder='' maxLength="40"/>
                            <p className='new-listing-input-label'>IG/FB:</p>
                            <input className='new-listing-input-field' maxLength="40" type='text' placeholder='Tvoje meno bude automaticky vyplnené ak necháš túto kolonku prázdnu' />
                            <p className='new-listing-input-label'>Cena:<span className='red'>*</span></p>
                            <input className='new-listing-input-field' maxLength="20" type='text' placeholder='' required />
                        </div>
                    </div>
                    <div className='new-listing-selected-images-container'>
                        {selectedImages && selectedImages.map((image, index) => {
                            return (
                                <div key={image} className='new-listing-selected-image'>
                                    <img src={image} alt='' />
                                    <button onClick={() => {
                                        setSelectedImages(selectedImages.filter((e) => e !== image));

                                        // Filter the selectedImages64 state array based on the filtered photo index
                                        setSelectedImages64((prevImages) =>
                                            prevImages.filter((_, index) => index !== selectedImages.indexOf(image))
                                        );
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
                            <input
                                type='file'
                                name='images'
                                onChange={onSelectFile}
                                multiple
                                accept='image/png , image/jpeg , image/jpg, image/webp'
                                className='new-listing-image-input'
                                required
                            />
                        </label>
                    </div>
                    <input type='submit' className='new-listing-submit' value='Pridaj Inzerát' />
                </form>
            </div>
            { isFetching ? <LoadingPage /> : <></> }
        </div>
    )
}

export default CreateListingPage;