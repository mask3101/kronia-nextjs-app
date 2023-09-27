import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth-slice'
import favoritesReducer from './features/favorites-slice'

const rootReducer = combineReducers({
  auth: authReducer,
  favorites: favoritesReducer
})

export const store = preloadedState => {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  })
}