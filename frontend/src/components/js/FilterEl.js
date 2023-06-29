import React, { useState, useRef, useContext } from 'react';
import '../css/filterel.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import DropdownLi from './DropdownLi';
import { isMobile } from 'react-device-detect';
import FilterContext from '../../context/FilterContext';

const FilterEl = ({
    cardTitle,
    valuesArr = [],
    unique,
    addFilter,
    setVelkostIna,
    setZnackaIna,
    setCenaOd,
    setCenaDo,
    setPSC,
    setRadius,
    setCoords
}) => {
    const [title, setTitle] = useState(cardTitle);
    const [ddShown, setDdShown] = useState(false);
    const parentRef = useRef(null);
    const [query, setQuery] = useState('');
    const { filter, setFilter } = useContext(FilterContext);

    const dropdownClass = () => {
        if (ddShown) {
            return 'filter-el-dropdown dd-shown';
        } else {
            return 'filter-el-dropdown';
        }
    };

    const handleClick = () => {
        setDdShown(!ddShown);
    };

    const mouseEnterHandler = () => {
        if (!isMobile) {
            setDdShown(true);
        }
    };

    const mouseLeaverHandler = () => {
        setDdShown(false);
    };

    const onPlaceSelected = (place) => {
        //console.log('Selected Place:', place);
        setFilter((prevFilter) => ({
            ...prevFilter,
            coords: [place.lat, place.lng],
            mesto: place.description
        }));
        // Handle the selected place, such as retrieving the city or postal code
    };

    const handlePlaceSelect = () => {
        const autocompleteService = new window.google.maps.places.AutocompleteService();
        autocompleteService.getPlacePredictions(
            { input: query, types: ['postal_code'], componentRestrictions: { country: 'sk' } },
            (predictions, status) => {
                if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions) {
                    const placeId = predictions[0]?.place_id; // Assuming the first prediction is the selected one
                    if (placeId) {
                        const geocoder = new window.google.maps.Geocoder();
                        geocoder.geocode({ placeId }, (results, status) => {
                            if (status === window.google.maps.GeocoderStatus.OK && results[0]) {
                                const place = {
                                    description: predictions[0]?.description,
                                    postalCode: predictions[0]?.structured_formatting?.main_text,
                                    lat: results[0].geometry.location.lat(),
                                    lng: results[0].geometry.location.lng(),
                                };
                                onPlaceSelected(place);
                            }
                        });
                    }
                }
            }
        );
    };

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };

    return (
        <div className='filter-el-wrapper' onMouseEnter={mouseEnterHandler} onMouseLeave={mouseLeaverHandler} ref={parentRef}>
            <div className='filter-el' onClick={handleClick}>
                <p className='filter-el-title'>{title}</p>
                <FontAwesomeIcon icon={faChevronDown} className='faChevronDown'/>
            </div>
            <div className={dropdownClass()}>
                <div className='dropdown-content'>
                    {valuesArr.map((value, index) => (
                        <DropdownLi key={index} value={value} addFilter={addFilter} filterType={cardTitle} setDdShown={setDdShown} />
                    ))}
                    {unique === 'radius' ? (
                        <>
                            <input type='text' className='radius-km' placeholder='PSČ' onChange={(e) => { setPSC(e.target.value); setRadius('10'); handleInputChange(e); handlePlaceSelect() }} value={query} />
                            <input type='text' className='radius-km' placeholder='V okolí (km)' onChange={(e) => setRadius(e.target.value)} />
                        </>
                    ) : null}
                    {unique === 'price' ? (
                        <div className='price-range-container'>
                            <input type='text' placeholder='Od (€)' onChange={(e) => setCenaOd(e.target.value)} /> <p> - </p> <input type='text' placeholder='Do (€)' onChange={(e) => setCenaDo(e.target.value)} />
                        </div>
                    ) : null}
                    {unique === 'other' ? (
                        <div className='price-range-container'>
                            <input type='text' className='radius-km' placeholder='Iná' />
                        </div>
                    ) : null}
                    {unique === 'size' ? (
                        <div className='price-range-container'>
                            <input type='text' className='radius-km' placeholder='Iná' onChange={(e) => setVelkostIna(e.target.value)} />
                        </div>
                    ) : null}
                    {unique === 'brand' ? (
                        <div className='price-range-container'>
                            <input type='text' className='radius-km' placeholder='Iná' onChange={(e) => setZnackaIna(e.target.value)} />
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default FilterEl;
