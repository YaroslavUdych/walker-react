import { useState, useRef, useEffect } from 'react'

import FormSide from './FormSide'
import validate from './validate'
import checkInput from './checkInput'

import TextField from '@mui/material/TextField'
import Checkbox from '@mui/material/Checkbox'
import { FormControlLabel } from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import EmailIcon from '@mui/icons-material/Email'
import LockIcon from '@mui/icons-material/Lock'
import LoadingButton from '@mui/lab/LoadingButton'

import { NavLink, useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'

import { useDispatch } from 'react-redux'
import { login, setUser, setToken } from '../../redux/authSlice'

const LogIn = () => {
	const navigate = useNavigate()

	const [email, setEmail] = useState({
		value: '',
		message: '',
		ok: false,
	})
	const [password, setPassword] = useState({
		value: '',
		message: '',
		ok: false,
	})
	const [rememberMe, setRememberMe] = useState(false)

	// for loading button
	const [loading, setLoading] = useState(false)

	// for show/hide password
	const [showPassword, setShowPassword] = useState(false)
	const handleClickShowPassword = () => setShowPassword((show) => !show)
	const handleMouseDownPassword = (event) => {
		event.preventDefault()
	}

	// for animation
	const LogInElement = useRef(null)
	const formSide = useRef(null)
	useEffect(() => {
		gsap.from(LogInElement.current, { x: 70, opacity: 0, duration: 1, ease: 'power2.inOut' })
		gsap.to(LogInElement.current, { x: 0, opacity: 1, duration: 1, ease: 'power2.inOut' })
		gsap.from(formSide.current, { x: -70, opacity: 0, duration: 1, ease: 'power2.inOut' })
		gsap.to(formSide.current, { x: 0, opacity: 1, duration: 1, ease: 'power2.inOut' })
	}, [])

	const dispatch = useDispatch()

	// for submit form
	const loginFormHendler = (e) => {
		e.preventDefault()
		checkInput(email.value, validate.email, setEmail)
		checkInput(password.value, validate.isEmpty, setPassword)

		if (email.ok && password.ok) {
			setLoading(true)

			fetch('https://do-strapi-walker-rn98u.ondigitalocean.app/api/auth/local', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ identifier: email.value, password: password.value }),
			})
				.then((response) => response.json())
				.then((data) => {
					setLoading(false)
					// if email or password is incorrect
					if (data.error) {
						setEmail((prev) => ({ ...prev, message: 'Email or password is incorrect', ok: false }))
						setPassword((prev) => ({ ...prev, message: 'Email or password is incorrect', ok: false }))
						// if varification is ok
					} else {
						dispatch(login())
						navigate('/profile')
						// write token to localStorage or to redux store
						if (rememberMe) {
							localStorage.setItem(
								'userData',
								JSON.stringify({
									username: data.user.username,
									jwt: data.jwt,
									email: data.user.email,
									userimage: data.user.userImage,
									userid: data.user.id,
									joined: data.user.createdAt,
								})
							)
						} else {
							dispatch(setToken(data))
							dispatch(setUser(data.user))
						}
					}
				})
		}
	}

	return (
		<div className="form-wrapper">
			<FormSide ref={formSide} />
			<div className="form-item-wrapper" ref={LogInElement}>
				<div className="form-item-text">
					<h2>Welcome back!</h2>
					<p>
						Don't have an account? <NavLink to="/signup">Sign Up</NavLink>
					</p>
				</div>
				<form id="login-form" action="#" className="form-item" onSubmit={loginFormHendler}>
					<TextField
						type="email"
						id="log-in-email"
						label="Email"
						helperText={email.message ? email.message : ''}
						variant="outlined"
						size="small"
						color={email.ok ? 'success' : 'secondary'}
						fullWidth
						margin="none"
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<EmailIcon />
								</InputAdornment>
							),
							endAdornment: (
								<InputAdornment position="start">
									{email.ok ? (
										<CheckCircleOutlineOutlinedIcon sx={{ color: 'green', marginRight: '-8px' }} />
									) : null}
									{email.message ? <CancelOutlinedIcon sx={{ color: 'red', marginRight: '-8px' }} /> : null}
								</InputAdornment>
							),
						}}
						onInput={(e) => {
							checkInput(e.target.value, validate.email, setEmail)
						}}
					/>

					<TextField
						type={showPassword ? 'text' : 'password'}
						id="log-in-password"
						label="Password"
						helperText={password.message ? password.message : ''}
						variant="outlined"
						size="small"
						color={password.ok ? 'success' : 'secondary'}
						fullWidth
						margin="none"
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<LockIcon />
								</InputAdornment>
							),
							endAdornment: (
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle password visibility"
										onClick={handleClickShowPassword}
										onMouseDown={handleMouseDownPassword}
										edge="end"
										style={{ marginRight: '5px' }}
									>
										{showPassword ? <VisibilityOff color="secondary" /> : <Visibility color="secondary" />}
									</IconButton>
									{password.ok ? <CheckCircleOutlineOutlinedIcon sx={{ color: 'green' }} /> : null}
									{password.message ? <CancelOutlinedIcon sx={{ color: 'red' }} /> : null}
								</InputAdornment>
							),
						}}
						onInput={(e) => {
							checkInput(e.target.value, validate.isEmpty, setPassword)
						}}
					/>

					<FormControlLabel
						className="login-form__checkbox"
						control={<Checkbox onChange={(e) => setRememberMe(e.target.checked)} id="login-checkbox" />}
						label="Remember me"
					/>
					<LoadingButton
						id="login-submit"
						type="submit"
						variant="contained"
						size="normal"
						fullWidth
						color="primary"
						loading={loading}
						loadingIndicator="Sending..."
					>
						Log In
					</LoadingButton>
				</form>
			</div>
		</div>
	)
}

export default LogIn
