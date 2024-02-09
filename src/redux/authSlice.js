import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
	name: 'auth',
	initialState: {
		isAuthenticated: false,
		token: '',
		email: '',
		username: '',
		userImage: '',
		joined: '',
		openModal: false,
	},
	reducers: {
		login: (state) => {
			state.isAuthenticated = true
		},
		logout: (state) => {
			state.isAuthenticated = false
			state.token = ''
			state.username = ''
			state.email = ''
		},
		setUser: (state, action) => {
			const { username, email, userImage, createdAt } = action.payload
			state.username = username
			state.email = email
			state.userImage = userImage
			state.joined = createdAt
		},
		setToken: (state, action) => {
			const { jwt } = action.payload
			state.token = jwt
		},
		setOpenModal: (state, action) => {
			state.openModal = action.payload
		},
	},
})

export const { login, logout, setUser, setToken, setOpenModal } = authSlice.actions
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated
export const selectToken = (state) => state.auth.token
export const selectOpenModal = (state) => state.auth.openModal
export const selectUsername = (state) => state.auth.username
export const selectEmail = (state) => state.auth.email
export const selectUserImage = (state) => state.auth.userImage
export const selectJoined = (state) => state.auth.joined
export default authSlice.reducer
