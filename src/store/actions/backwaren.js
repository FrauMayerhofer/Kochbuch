import { BACKWARE} from './actionTypes';

export const addBackware = (objekt) => {
    return {
        type: BACKWARE.ADD,
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

export const deleteBackware = () => {
    return {
        type: BACKWARE.DELETE
    };
};

export const deleteZutat = (key) => {
    return {
        type: BACKWARE.DELETE_ZUTAT
    };
};

export const selectBackware = (key) => {
    return {
        type: BACKWARE.SELECT,
        key: key
    };
};

export const updateBackware = (objekt) => {
    return {
        type: BACKWARE.UPDATE,
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

export const deselectBackware = () => {
    return {
        type: BACKWARE.DESELECT
    };
};

export const loadBackwaren = (objekt) => {
    return {
        type: BACKWARE.LOAD,
        objekt: objekt
    };
};

export const reset = () => {
    return {
        type: BACKWARE.RESET
    };
};