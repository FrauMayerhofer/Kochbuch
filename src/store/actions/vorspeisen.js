import { VORSPEISE} from './actionTypes';

export const addVorspeise = (objekt) => {
    return {
        type: VORSPEISE.ADD,
        name: objekt.name,
        key: objekt.key,
        beschreibung: objekt.beschreibung,
        portionen: objekt.portionen,
        zutaten: objekt.zutaten,
        image: objekt.image,
        keywords: objekt.keywords,
        starCount: objekt.starCount
    };
};

export const deleteVorspeise = () => {
    return {
        type: VORSPEISE.DELETE
    };
};

export const selectVorspeise = (key) => {
    return {
        type: VORSPEISE.SELECT,
        key: key
    };
};

export const updateVorspeise = (objekt) => {
    return {
        type: VORSPEISE.UPDATE,
        name: objekt.name,
        key: objekt.key,
        beschreibung: objekt.beschreibung,
        portionen: objekt.portionen,
        zutaten: objekt.zutaten,
        image: objekt.image,
        zubereitungszeit: objekt.zubereitungszeit,
        keywords: objekt.keywords,
        starCount: objekt.starCount
    };
};

export const deselectVorspeise = () => {
    return {
        type: VORSPEISE.DESELECT
    };
};

export const loadVorspeisen = (objekt) => {
    return {
        type: VORSPEISE.LOAD,
        objekt: objekt
    };
};

export const reset = () => {
    return {
        type: VORSPEISE.RESET
    };
};