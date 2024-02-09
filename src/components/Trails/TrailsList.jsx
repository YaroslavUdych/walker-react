import { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import TrailsListItem from './TrailsListItem'
import useGetData from '../useGetData'
import PageNotFound from '../PageNotFound'
import { Pagination } from '@mui/material'

import './Trails.css'
import gsap from 'gsap'

const TrailsList = () => {
	// for animation
	const trailsListElement = useRef(null)
	useEffect(() => {
		if (trailsListElement.current) {
			gsap.to(trailsListElement.current, {
				opacity: 1,
				duration: 1,
				ease: 'power2.inOut',
				transform: 'translateY(0)',
				delay: 0.1,
			})
		}
	}, [])

	// for pagination
	const { pageNumber } = useParams()
	const navigate = useNavigate()
	const [page, setPage] = useState(Number(pageNumber))
	useEffect(() => {
		setPage(Number(pageNumber))
	}, [pageNumber])

	// for fetching data
	const [trails, setTrails] = useState([])
	const [error, setError] = useState(null)
	const apiToken = process.env.REACT_APP_API_TOKEN
	useGetData(
		`https://do-strapi-walker-rn98u.ondigitalocean.app/api/trails?sort=createdAt:desc&pagination[page]=${page}&pagination[pageSize]=3&populate=*`,
		apiToken,
		setTrails,
		setError
	)

	return (
		<div className="articles-wrap" ref={trailsListElement}>
			{error || (trails.data && page > trails.meta.pagination.pageCount) ? (
				<PageNotFound />
			) : (
				<>
					{trails.data && (
						<>
							{trails.data.map((trail) => {
								return (
									<TrailsListItem
										key={trail.id}
										id={trail.id}
										title={trail.attributes.title}
										text={trail.attributes.text}
										length={trail.attributes.length}
										est={trail.attributes.est}
										img={trail.attributes.images.data}
									/>
								)
							})}
							<Pagination
								size="large"
								shape="rounded"
								color="primary"
								count={trails.meta.pagination.pageCount}
								page={page}
								onChange={(event, value) => {
									setPage(value)
									if (trails.data.length > 0) {
										setPage(value)
										navigate(`/trails/page/${value}`)
									}
								}}
							/>
						</>
					)}
				</>
			)}
		</div>
	)
}

export default TrailsList
