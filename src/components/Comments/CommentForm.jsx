import { useState } from 'react'
import { TextField, Button } from '@mui/material'
import { useParams } from 'react-router-dom'

import { selectToken, selectUsername, selectUserImage } from '../../redux/authSlice'
import { useSelector } from 'react-redux'
import checkInput from '../form-components/checkInput'
import validate from '../form-components/validate'

const CommentForm = ({ handleCommentSubmit }) => {
	const { id } = useParams()
	const [comment, setComment] = useState({
		value: '',
		message: '',
		ok: false,
	})
	const jwt = useSelector(selectToken)
	const username = useSelector(selectUsername)
	const userImage = useSelector(selectUserImage)

	const handleSubmit = async (e) => {
		e.preventDefault()
		checkInput(comment.value, validate.isEmpty, setComment)

		if (comment.ok && comment.value.trim() !== '') {
			try {
				const response = await fetch(`https://do-strapi-walker-rn98u.ondigitalocean.app/api/comments`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${
							localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')).jwt : jwt
						}`,
					},
					body: JSON.stringify({
						data: {
							articleID: id,
							userComment: comment.value,
							userName: localStorage.getItem('userData')
								? JSON.parse(localStorage.getItem('userData')).username
								: username,
							userImage: localStorage.getItem('userData')
								? JSON.parse(localStorage.getItem('userData')).userimage
								: userImage,
						},
					}),
				})

				if (!response.ok) {
					throw new Error('Failed to add comment')
				}
				setComment({ value: '', message: '', ok: false })
				handleCommentSubmit()
			} catch (error) {
				console.error('Error adding comment:', error)
			}
		}
	}

	return (
		<div className="comment-form">
			<form onSubmit={handleSubmit}>
				<TextField
					id="comment"
					label="Write your comment"
					helperText={comment.message ? comment.message : ' '}
					variant="outlined"
					size="small"
					fullWidth
					multiline
					rows={4}
					margin="none"
					value={comment.value}
					onChange={(e) => {
						setComment({ value: e.target.value, message: '', ok: true })
					}}
				/>
				<Button type="submit" variant="contained" color="primary" sx={{ marginTop: '10px' }}>
					Send Comment
				</Button>
			</form>
		</div>
	)
}

export default CommentForm
