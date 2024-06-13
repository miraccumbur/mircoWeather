// Burada store oluşturuyoruz.
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import reducers from './index';
// import storage from 'redux-persist/lib/storage';

// const persistConfig = {
//   key: 'root',
//   storage: AsyncStorage,
// };

// const persistedReducer = persistReducer(persistConfig, reducers);
// const store = createStore(persistedReducer, applyMiddleware(thunk));
// const persistor = persistStore(store);
// export default store;
// export {persistor};

export const store = createStore(reducers, applyMiddleware(thunk));
export const persistor = persistStore(store);
