import { combineReducers, configureStore } from '@reduxjs/toolkit'
import counterReducer from './features/counter-slice'
import authReducer from './features/auth-slice'
import favoritesReducer from './features/favorites-slice'

const rootReducer = combineReducers({
  counter: counterReducer,
  auth: authReducer,
  favorites: favoritesReducer
})

export const store = preloadedState => {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  })
}