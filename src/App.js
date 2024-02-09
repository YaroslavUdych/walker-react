import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'

import Header from './components/Header'
import Main from './components/Main'
import About from './components/About'
import LogIn from './components/form-components/LogIn'
import SignUp from './components/form-components/SignUp'
import ScrollToTopButton from './components/ScrollToTopButton'
import ArticlesList from './components/Articles/ArticlesList'
import SingleArticle from './components/Articles/SingleArticle'
import PageNotFound from './components/PageNotFound'
import TrailsList from './components/Trails/TrailsList'
import SingleTrail from './components/Trails/SingleTrail'
import Profile from './components/Profile'

import { useDispatch, useSelector } from 'react-redux'
import { login, selectIsAuthenticated } from './redux/authSlice'

function App() {
	const dispatch = useDispatch()
	useEffect(() => {
		if (localStorage.length > 0) {
			dispatch(login())
		}
	}, [dispatch])
	const isAuthenticated = useSelector(selectIsAuthenticated)

	return (
		<div className="app-wrapper">
			<Header />
			<Routes>
				<Route path="/" element={<Main />} />
				<Route path="/about" element={<About />} />
				<Route path="/blog/page/:pageNumber" element={<ArticlesList />} />
				<Route path="/blog/article/:id" element={<SingleArticle />} />
				<Route path="/trails/page/:pageNumber" element={<TrailsList />} />
				<Route path="/trails/trail/:id" element={<SingleTrail />} />
				{!isAuthenticated ? (
					<>
						<Route path="/login" element={<LogIn />} />
						<Route path="/signup" element={<SignUp />} />
					</>
				) : (
					<Route path="/profile" element={<Profile />} />
				)}
				<Route path="*" element={<PageNotFound />} />
			</Routes>
			<ScrollToTopButton />
		</div>
	)
}

export default App
