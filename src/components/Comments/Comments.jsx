import { useState, useEffect } from 'react'
import { useParams, NavLink } from 'react-router-dom'

import './Comments.css'

import useGetData from '../useGetData'
import SingleComment from './SingleComment'
import CommentForm from './CommentForm'

import { useSelector } from 'react-redux'
import { selectIsAuthenticated } from '../../redux/authSlice'

const Comments = () => {
	const { id } = useParams()
	const [comments, setComments] = useState(null)
	const [error, setError] = useState(null)
	const apiToken = process.env.REACT_APP_API_TOKEN
	const isAuthenticated = useSelector(selectIsAuthenticated)
	// state to trigger a refresh of the comments when a new comment is added
	const [shouldRefresh, setShouldRefresh] = useState(false)
	const handleCommentSubmit = () => {
		setShouldRefresh((prevState) => !prevState)
	}
	useEffect(() => {
		if (shouldRefresh) {
			setShouldRefresh(false) // Reset shouldRefresh state
		}
	}, [shouldRefresh])
	// get comments for the article
	useGetData(
		`https://do-strapi-walker-rn98u.ondigitalocean.app/api/comments?filters[articleID][$eq]=${id}&sort=createdAt:desc`,
		apiToken,
		setComments,
		setError,
		shouldRefresh
	)

	return (
		<div className="comments-wrap">
			{error && <div>oops...something went wrong loading the comments </div>}
			{comments && comments.data.length === 0 && <div>There are no comments yet</div>}
			{comments && comments.data.length > 0 && (
				<>
					<h3>Comments</h3>
					{comments.data.map((comment) => (
						<SingleComment key={comment.id} comment={comment} />
					))}
				</>
			)}
			{isAuthenticated ? (
				<CommentForm handleCommentSubmit={handleCommentSubmit} />
			) : (
				<div>
					Only authenticated users can add comments. Please <NavLink to="/login">login</NavLink> or{' '}
					<NavLink to="/signup">register</NavLink>
				</div>
			)}
		</div>
	)
}

export default Comments
