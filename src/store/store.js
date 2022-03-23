import { configureStore } from '@reduxjs/toolkit';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import rootReducer from '../redux/reducers';

const persistConfig = {
  key: 'root',
  storage,
}


const store = configureStore({
  reducer: 
    rootReducer,
  devTools: true
});


export default store;
