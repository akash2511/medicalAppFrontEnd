import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';

//Middleware
import thunk from 'redux-thunk'

//reducer
import { RootReducer } from '../redux/reducers/index'

const persistConfig = {
  key: 'state',
  storage: AsyncStorage
}

const persistedReducer = persistReducer(persistConfig, RootReducer)

export default () => {
  let store = createStore(
    persistedReducer,
    {},
    applyMiddleware(thunk)
  )
  let persistor = persistStore(store)
  return { store, persistor }
}
