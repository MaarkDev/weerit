import '../css/filter.css';
import FilterEl from './FilterEl';
import FilterActive from './FilterActive';
import { useContext, useEffect, useState } from 'react';
import FilterContext from '../../context/FilterContext';
import QueryContext from '../../context/QueryContext';
import ListingsContext from '../../context/ListingsContext';
import FilterButton from './FilterButton';
import { PriceFilterEl, LocationFilterEl, SizeFilterEl, BrandFilterEl, PscFilterEl, RadiusFilterEl } from './CustomFilterEl';
import { useNavigate } from 'react-router-dom';
import PageNumberContext from '../../context/PageNumberContext';

const Filter = () => {
    const categoryValues = ['Tričká', 'Mikiny', 'Topánky', 'Nohavice', 'Doplnky', 'Spodné prádlo', 'Plavky'];
    const sizeValues = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
    const brandValuse = ['Nike', 'Adidas', 'Converse', 'Vans', 'Rebook', 'Champion', 'OffWhite', 'Puma'];
    const colorValues = ['Čierna', 'Biela', 'Červená', 'Oranžová', 'Žltá', 'Zelená', 'Modrá', 'Fialová'];
    const sortValues = ['Od najdrahšieho', 'Od najlacnejšieho', 'Od najnovšieho', 'Od najstaršieho'];
    const forValues = ['Muža', 'Ženu', 'Dieťa', 'Unisex']

    const { filter, setFilter } = useContext(FilterContext);
    const { query, setQuery } = useContext(QueryContext);
    const { listingsContextArr ,setListingsContextArr } = useContext(ListingsContext)
    const [indexes, setIndexes] = useState([]);
    const [filterElements, setFitlerElements] = useState([]);

    const { qPageNumber, setQPageNumber } = useContext(PageNumberContext);

    const navigate = useNavigate();

    const helperArray = [
        ...categoryValues,
        ...sizeValues,
        ...brandValuse,
        ...colorValues,
        ...sortValues,
        ...forValues
    ];

    const normalisedArray = [
        ...categoryValues,
        ...sizeValues,
        ...brandValuse,
        ...colorValues,
        ...sortValues,
        ...forValues
    ].map(value =>
        value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '').toLowerCase()
    );

    const removeValueFromFilter = (valueToRemove) => {
        const newValue = valueToRemove
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/\s+/g, '')
            .toLowerCase();

        setFilter(prevFilter => {
            const updatedFilter = { ...prevFilter };

            Object.keys(updatedFilter).forEach(key => {
                let values = updatedFilter[key];

                if (Array.isArray(values)) {
                    const index = values.indexOf(newValue);
                    if (index !== -1) {
                        values = [...values.slice(0, index), ...values.slice(index + 1)];
                    }
                } 

                if(newValue == 'odnajlacnejsieho' 
                || newValue == 'odnajdrahsieho' 
                || newValue == 'odnajnovsieho'
                || newValue == 'odnajstarsieho'){
                    updatedFilter.zoradit = '';
                }
                

                updatedFilter[key] = values;
            });
            return updatedFilter;
            
        });
    };



    useEffect(() => {
        const filtersInObj = Object.values(filter);
        const flattenedArray = filtersInObj.flat();
        const activeFilterIndexes = [];
        for (let i = 0; i < flattenedArray.length; i++) {
            for (let j = 0; j < normalisedArray.length; j++) {
                if (flattenedArray[i] === normalisedArray[j]) {
                    activeFilterIndexes.push(j);
                }
            }
        }
        const elements = activeFilterIndexes.map(index => helperArray[index]);
        setIndexes(activeFilterIndexes);
        setFitlerElements(elements);
        console.log(filter)

    }, [filter]);


    const addFilter = (ftype, value) => {
        const newValue = value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '').toLowerCase();
        const newType = ftype.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '').toLowerCase();
        switch (newType) {
            case 'kategoria':
                if (!filter.kategoria.includes(newValue)) {
                    setFilter({ ...filter, kategoria: [...filter.kategoria, newValue] });
                }
                break;
            case 'velkost':
                if (!filter.velkost.includes(newValue)) {
                    setFilter({ ...filter, velkost: [...filter.velkost, newValue] });
                }
                break;
            case 'znacka':
                if (!filter.znacka.includes(newValue)) {
                    setFilter({ ...filter, znacka: [...filter.znacka, newValue] });
                }
                break;
            case 'farba':
                if (!filter.farba.includes(newValue)) {
                    setFilter({ ...filter, farba: [...filter.farba, newValue] });
                }
                break;
            case 'cena':
                if (!filter.cena.includes(newValue)) {
                    setFilter({ ...filter, cena: [...filter.cena, newValue] });
                }
                break;
            case 'zoradit':
                setFilter((prevFilter) => ({
                    ...prevFilter,
                    zoradit: newValue
                }));
                break;
            case 'prekoho':
                if (!filter.prekoho.includes(newValue)) {
                    setFilter({ ...filter, prekoho: [...filter.prekoho, newValue] });
                }
                break;
            default: break;

        }
    }

    const setVelkostIna = (e) => {
        const newValue = e.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '').toLowerCase();
        setFilter((prevFilter) => ({
            ...prevFilter,
            velkostIna: newValue
        }));
    }

    const setZnackaIna = (e) => {
        const newValue = e.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '').toLowerCase();
        setFilter((prevFilter) => ({
            ...prevFilter,
            znackaIna: newValue
        }));
    }

    const setCenaOd = (e) => {
        const newValue = e.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '').toLowerCase();
        setFilter((prevFilter) => ({
            ...prevFilter,
            cenaod: newValue
        }));
    }

    const setCenaDo = (e) => {
        const newValue = e.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '').toLowerCase();
        setFilter((prevFilter) => ({
            ...prevFilter,
            cenado: newValue
        }));
    };


    const setPSC = (e) => {
        const newValue = e.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '').toLowerCase();
        setFilter((prevFilter) => ({
            ...prevFilter,
            psc: newValue
        }));
    }

    const setRadius = (e) => {
        const newValue = e.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '').toLowerCase();
        setFilter((prevFilter) => ({
            ...prevFilter,
            vokoli: newValue
        }));
    }
    
    const setCoords = (e) => {
        setFilter((prevFilter) => ({
            ...prevFilter,
            mesto: e,
            coords: [e]
        }));
    }

    const submitHandler = async () => {
        const updatedQuery = {
            searchvalue: (query.searchvalue || ''),
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
        const queryString = new URLSearchParams(updatedQuery).toString();

        await fetch(`${process.env.REACT_APP_API_URL}/api/listings/search?${queryString}`)
            .then(res => res.json())
            .then(data => { setListingsContextArr(data); console.log(data); setQPageNumber(1) })
            .then(navigate(`/browse/${queryString}`));
    }

    return (
        <>
            <div className='filter-container'>
                <FilterEl cardTitle='Kategória' valuesArr={categoryValues} addFilter={addFilter} />
                <FilterEl cardTitle='Veľkosť' valuesArr={sizeValues} unique='size' addFilter={addFilter} setVelkostIna={setVelkostIna} />
                <FilterEl cardTitle='Značka' valuesArr={brandValuse} unique='brand' addFilter={addFilter} setZnackaIna={setZnackaIna} />
                <FilterEl cardTitle='Farba' valuesArr={colorValues} addFilter={addFilter} />
                <FilterEl cardTitle='Cena' unique='price' addFilter={addFilter} setCenaOd={setCenaOd} setCenaDo={setCenaDo} />
                <FilterEl cardTitle='Zoradiť' valuesArr={sortValues} addFilter={addFilter} />
                <FilterEl cardTitle='Pre koho' valuesArr={forValues} addFilter={addFilter} />
                <FilterEl cardTitle='V okolí' unique='radius' addFilter={addFilter} setPSC={setPSC} setRadius={setRadius} setCoords={setCoords}/>
            </div>
            <div className='active-filters-container'>
                {filter.cenaod !== '' || filter.cenado !== '' ? <PriceFilterEl /> : <></>}
                {filter.psc !== '' ? <PscFilterEl /> : <></>}
                {filter.vokoli !== '' && filter.psc !== '' ? <RadiusFilterEl /> : <></>}
                {filter.velkostIna !== '' ? <SizeFilterEl /> : <></>}
                {filter.znackaIna !== '' ? <BrandFilterEl /> : <></>}
                {filterElements.map((item) => <FilterActive value={item} removeValueFromFilter={removeValueFromFilter} />)}
                {indexes.length !== 0 
                || filter.cenaod !== ''
                || filter.cenado !== ''
                || filter.psc !== ''
                || filter.vokoli !== ''
                || filter.velkostIna !== ''
                || filter.znackaIna !== ''
                ? <FilterButton submitHandler={submitHandler}/> : <></>}
            </div>
            
        </>
    )
}

export default Filter;