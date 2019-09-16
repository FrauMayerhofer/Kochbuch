import {AsyncStorage} from 'react-native'
import { createStore, combineReducers,  } from 'redux';
import {persistStore, persistReducer, } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

//import {backwarenReducer, gerichteReducer, dessertsReducer,vorspeisenReducer, reducer } from './reducers/index'

import backwarenReducer from './reducers/backwaren';
import gerichteReducer from './reducers/gerichte';
import dessertsReducer from './reducers/desserts';
import vorspeisenReducer from './reducers/vorspeisen'
import reducer from './reducers/user';
import einkaufslistenReducer from './reducers/einkaufsliste'

/*
const rootReducer = combineReducers({
    backwaren: backwarenReducer,
    gerichte: gerichteReducer,
    desserts: dessertsReducer,
    vorspeisen: vorspeisenReducer,
    user: reducer
});

export const store = createStore(rootReducer);
*/


const rootPersistConfig = {
    key: 'Root',
    storage: AsyncStorage
}

const rootReducer = combineReducers({
    backwaren: backwarenReducer,
    gerichte: gerichteReducer,
    desserts: dessertsReducer,
    vorspeisen: vorspeisenReducer,
    user: reducer,
    einkaufsliste: einkaufslistenReducer
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer)

export const store = createStore(persistedReducer);

export const persistor = persistStore(store)
