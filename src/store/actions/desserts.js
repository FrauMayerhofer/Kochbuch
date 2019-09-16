import { DESSERT} from './actionTypes';

export const addDessert = (objekt) => {
    return {
        type: DESSERT.ADD,
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

export const deleteDessert = () => {
    return {
        type: DESSERT.DELETE
    };
};

export const deleteZutat = (key) => {
    return {
        type: DESSERT.DELETE_ZUTAT
    };
};

export const selectDessert = (key) => {
    return {
        type: DESSERT.SELECT,
        key: key
    };
};

export const updateDessert = (objekt) => {
    return {
        type: DESSERT.UPDATE,
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

export const deselectDessert = () => {
    return {
        type: DESSERT.DESELECT
    };
};

export const loadDesserts = (objekt) => {
    return {
        type: DESSERT.LOAD,
        objekt: objekt
    };
};

export const reset = () => {
    return {
        type: DESSERT.RESET
    };
};