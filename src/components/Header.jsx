import { useState, useEffect } from 'react'
import { useLocation, NavLink, useNavigate } from 'react-router-dom'

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import MenuIcon from '@mui/icons-material/Menu'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

import { useSelector, useDispatch } from 'react-redux'
import { selectIsAuthenticated, logout } from '../redux/authSlice'

import logoImg from '../images/logo.png'

// array of objects for nav items with name and path
const navItems = [
	{ name: 'Trails', path: '/trails/page/1' },
	{ name: 'Blog', path: '/blog/page/1' },
	{ name: 'About', path: '/about' },
]

const drawerWidth = 240

const Header = (props) => {
	const isAuthenticated = useSelector(selectIsAuthenticated)
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const logoutHandler = () => {
		dispatch(logout())
		localStorage.clear()
		navigate('/')
	}

	const { window } = props
	const [mobileOpen, setMobileOpen] = useState(false)
	const location = useLocation()
	const [isBlogActive, setIsBlogActive] = useState(location.pathname.startsWith('/blog'))
	const [isTrailsActive, setIsTrailsActive] = useState(location.pathname.startsWith('/trails'))

	useEffect(() => {
		setIsBlogActive(location.pathname.startsWith('/blog'))
		setIsTrailsActive(location.pathname.startsWith('/trails'))
	}, [location.pathname])

	const handleDrawerToggle = () => {
		setMobileOpen((prevState) => !prevState)
	}

	const drawer = (
		<Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
			<IconButton
				sx={{
					marginTop: '20px',
					marginBottom: '10px',
					border: '2px solid #fff',
				}}
				component={NavLink}
				to="/"
			>
				<img width={80} src={logoImg} alt="Walker Logo" />
			</IconButton>
			<Divider />
			<List>
				{navItems.map((item) => (
					<ListItem key={item.name} disablePadding>
						<ListItemButton
							sx={{
								textAlign: 'center',
								'&.active-link': {
									color: 'grey',
								},
							}}
							component={NavLink}
							to={item.path}
							className={
								(isBlogActive && item.name === 'Blog' ? 'active-link' : '') ||
								(location.pathname === item.path ? 'active-link' : '') ||
								(isTrailsActive && item.name === 'Trails' ? 'active-link' : '')
							}
						>
							<ListItemText primary={item.name} />
						</ListItemButton>
					</ListItem>
				))}
				{isAuthenticated ? (
					<>
						<ListItem disablePadding>
							<ListItemButton
								sx={{
									textAlign: 'center',
									'&.active-link': {
										color: 'grey',
									},
								}}
								component={NavLink}
								className={location.pathname === '/profile' ? 'active-link' : ''}
								to="/profile"
							>
								<ListItemText primary="Profile" />
							</ListItemButton>
						</ListItem>
						<ListItem disablePadding>
							<ListItemButton
								onClick={logoutHandler}
								component={Button}
								sx={{
									color: 'black',
									fontFamily: 'Ysabeau Infant',
									fontStyle: 'italic',
									justifyContent: 'center',
									'&.active-link': {
										color: 'grey',
									},
									'&:hover': {},
								}}
							>
								Logout
							</ListItemButton>
						</ListItem>
					</>
				) : (
					<ListItem disablePadding>
						<ListItemButton
							sx={{
								textAlign: 'center',
								'&.active-link': {
									color: 'grey',
								},
							}}
							component={NavLink}
							to="/login"
							className={location.pathname === '/login' ? 'active-link' : ''}
						>
							<ListItemText primary="Account" />
						</ListItemButton>
					</ListItem>
				)}
			</List>
		</Box>
	)

	const container = window !== undefined ? () => window().document.body : undefined

	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			<AppBar
				component="nav"
				style={{ backgroundColor: '#e2e1e0', height: '55px', display: 'flex', justifyContent: 'center' }}
			>
				<Toolbar style={{ color: 'black' }}>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={handleDrawerToggle}
						sx={{ mr: 2, display: { sm: 'none' } }}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
						<IconButton component={NavLink} to="/">
							<img width={38} src={logoImg} alt="Walker Logo" />
						</IconButton>
					</Typography>
					<Box sx={{ display: { xs: 'none', sm: 'block' } }}>
						{navItems.map((item) => (
							<Button
								key={item.name}
								sx={{
									color: 'black',
									fontFamily: 'Ysabeau Infant',
									fontStyle: 'italic',
									'&.active-link': {
										color: 'grey',
									},
									'&:hover': {},
								}}
								component={NavLink}
								to={item.path}
								className={
									(isBlogActive && item.name === 'Blog' ? 'active-link' : '') ||
									(location.pathname === item.path ? 'active-link' : '') ||
									(isTrailsActive && item.name === 'Trails' ? 'active-link' : '')
								}
							>
								{item.name}
							</Button>
						))}
						{isAuthenticated ? (
							<>
								<Button
									sx={{
										color: 'black',
										fontFamily: 'Ysabeau Infant',
										fontStyle: 'italic',
										'&.active-link': {
											color: 'grey',
										},
										'&:hover': {},
									}}
									component={NavLink}
									to="/profile"
									className={location.pathname === '/profile' ? 'active-link' : ''}
								>
									Profile
								</Button>
								<Button
									onClick={logoutHandler}
									sx={{
										color: 'black',
										fontFamily: 'Ysabeau Infant',
										fontStyle: 'italic',
										'&.active-link': {
											color: 'grey',
										},
										'&:hover': {},
									}}
								>
									Logout
								</Button>
							</>
						) : (
							<Button
								sx={{
									color: 'black',
									fontFamily: 'Ysabeau Infant',
									fontStyle: 'italic',
									'&.active-link': {
										color: 'grey',
									},
									'&:hover': {},
								}}
								component={NavLink}
								className={location.pathname === '/login' ? 'active-link' : ''}
								to="/login"
							>
								Account
							</Button>
						)}
					</Box>
				</Toolbar>
			</AppBar>
			<nav>
				<Drawer
					container={container}
					variant="temporary"
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true, // Better open performance on mobile.
					}}
					sx={{
						display: { xs: 'block', sm: 'none' },
						'& .MuiDrawer-paper': {
							boxSizing: 'border-box',
							width: drawerWidth,
							backgroundColor: '#e2e1e0',
							color: 'black',
							fontFamily: 'Ysabeau Infant',
							fontStyle: 'italic',
							textTransform: 'uppercase',
						},
					}}
				>
					{drawer}
				</Drawer>
			</nav>
		</Box>
	)
}

export default Header
