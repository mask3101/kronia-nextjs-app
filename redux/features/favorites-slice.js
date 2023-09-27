import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: []
}

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    add: (state, action) => {
      
      state.value.push(action.payload)
    },
    remove: (state, action) => {
        const idx = state.value.findIndex((coinName) => { 
            return coinName === action.payload 
        })
        state.value.splice(idx,1)
    },
  },
})

// Action creators are generated for each case reducer function
export const { add, remove } = favoritesSlice.actions

export default favoritesSlice.reducer