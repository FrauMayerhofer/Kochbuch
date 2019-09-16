import { GERICHT} from './actionTypes';

export const addGericht = (objekt) => {
    return {
        type: GERICHT.ADD,
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

export const deleteGericht = () => {
    return {
        type: GERICHT.DELETE
    };
};

export const selectGericht = (key) => {
    return {
        type: GERICHT.SELECT,
        key: key
    };
};

export const updateGericht = (objekt) => {
    return {
        type: GERICHT.UPDATE,
        key: objekt.key,
        name: objekt.name,
        beschreibung: objekt.beschreibung,
        portionen: objekt.portionen,
        zutaten: objekt.zutaten,
        image: objekt.image,
        zubereitungszeit: objekt.zubereitungszeit,
        keywords: objekt.keywords,
        starCount: objekt.starCount
    };
};

export const deselectGericht = () => {
    return {
        type: GERICHT.DESELECT
    };
};

export const loadGerichte = (objekt) => {
    return {
        type: GERICHT.LOAD,
        objekt: objekt
    };
};

export const reset = () => {
    return {
        type: GERICHT.RESET
    };
};