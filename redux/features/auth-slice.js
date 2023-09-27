import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: {
    name: '',
    email: ''
  },
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
        state.value = action.payload
    },
    logout: (state) => {
      state.value = {
        name: '',
        email: ''
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const { login, logout } = authSlice.actions

export default authSlice.reducer