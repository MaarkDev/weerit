import '../css/filteractive.css'
import FilterContext from '../../context/FilterContext';
import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

export const PriceFilterEl = () => {
    const { filter, setFilter } = useContext(FilterContext);

    const deletePrice = () => {
        setFilter((prevFilter) => ({
            ...prevFilter,
            cenaod: '',
            cenado: ''
        }));
    }

    return (
        <div className='filter-active-el' onClick={deletePrice}>
            <div className="filter-active-text">
                <p>{`Od ${filter.cenaod}€ Do ${filter.cenado}€`}</p>
            </div>
            <div className="filter-active-x">
                <FontAwesomeIcon icon={faX} />
            </div>
        </div>
    )
}

export const PscFilterEl = () => {
    const { filter, setFilter } = useContext(FilterContext);

    const deleteLocation = () => {
        setFilter((prevFilter) => ({
            ...prevFilter,
            psc: '',
            vokoli: '',
            coords: [0, 0],
            mesto: ''
        }));
    }

    return (
        <div className='filter-active-el' onClick={deleteLocation}>
            <div className="filter-active-text">
                <p>{`PSČ: ${filter.mesto}`}</p>
            </div>
            <div className="filter-active-x">
                <FontAwesomeIcon icon={faX} />
            </div>
        </div>
    )
}

export const RadiusFilterEl = () => {
    const { filter, setFilter } = useContext(FilterContext);

    const deleteLocation = () => {
        setFilter((prevFilter) => ({
            ...prevFilter,
            vokoli: '10'
        }));
    }

    return (
        <div className='filter-active-el' onClick={deleteLocation}>
            <div className="filter-active-text">
                <p>{`V okolí ${filter.vokoli}km`}</p>
            </div>
            <div className="filter-active-x">
                <FontAwesomeIcon icon={faX} />
            </div>
        </div>
    )
}

export const SizeFilterEl = () => {
    const { filter, setFilter } = useContext(FilterContext);

    const deleteSize = () => {
        setFilter((prevFilter) => ({
            ...prevFilter,
            velkostIna: ''
        }));
    }

    return (
        <div className='filter-active-el' onClick={deleteSize}>
            <div className="filter-active-text">
                <p>{`${filter.velkostIna}`}</p>
            </div>
            <div className="filter-active-x">
                <FontAwesomeIcon icon={faX} />
            </div>
        </div>
    )
}

export const BrandFilterEl = () => {
    const { filter, setFilter } = useContext(FilterContext);

    const deleteBrand = () => {
        setFilter((prevFilter) => ({
            ...prevFilter,
            znackaIna: ''
        }));
    }

    return (
        <div className='filter-active-el' onClick={deleteBrand}>
            <div className="filter-active-text">
                <p>{`${filter.znackaIna}`}</p>
            </div>
            <div className="filter-active-x">
                <FontAwesomeIcon icon={faX} />
            </div>
        </div>
    )
}