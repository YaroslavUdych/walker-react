const SingleComment = ({ comment }) => {
	return (
		<div className="single-comment">
			<div className="single-comment-image">
				<img src={comment.attributes.userImage} width={80} alt={comment.attributes.userName} />
			</div>
			<div className="single-comment-content">
				<div className="single-comment-user">{comment.attributes.userName}</div>
				<div className="single-comment-text">
					<q> {comment.attributes.userComment} </q>
				</div>
				<div className="single-comment-date">
					added on: {new Date(comment.attributes.createdAt).toLocaleString()}
				</div>
			</div>
		</div>
	)
}

export default SingleComment
