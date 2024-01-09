import { createContext } from "react";

const FilterContext = createContext({
    kategoria: [],
    velkost: [],
    velkostIna: '',
    znacka: [],
    znackaIna: '',
    farba: [],
    cenaod: '',
    cenado: '',
    zoradit: '',
    prekoho: [],
    vokoli: '',
    psc: '',
    mesto: '',
    coords: [0, 0]
});

export default FilterContext;