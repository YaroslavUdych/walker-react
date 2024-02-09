import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'

const ArticlesListItem = (props) => {
	//for responsive
	const [sliceValue, setSliceValue] = useState(400)
	useEffect(() => {
		if (window.innerWidth < 768) {
			setSliceValue(150)
		}
	}, [])

	return (
		<div className="article-list-item-wrap">
			<div className="article-list-item-img">
				<img src={props.img} alt={props.alt} />
			</div>
			<div className="article-list-item-content">
				<h3 className="article-list-item-title">{props.title}</h3>
				<p>{props.content.substring(0, sliceValue) + '...'}</p>
				<Link to={`/blog/article/${props.id}`}>
					<Button variant="contained">Read more</Button>
				</Link>
				<div className="article-list-item-created-date">
					<p>
						created: {new Date(props.createdAt).getDate()}.{new Date(props.createdAt).getMonth() + 1}.
						{new Date(props.createdAt).getFullYear()}
					</p>
				</div>
			</div>
		</div>
	)
}
export default ArticlesListItem
