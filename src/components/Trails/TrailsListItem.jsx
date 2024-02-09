import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation } from 'swiper/modules'
import 'swiper/scss'
import 'swiper/scss/navigation'
import 'swiper/scss/pagination'

import Button from '@mui/material/Button'

const TrailsListItem = (trail) => {
	const { title, length, text, est, img } = trail

	//for responsive
	const [sliceValue, setSliceValue] = useState(400)
	useEffect(() => {
		if (window.innerWidth < 768) {
			setSliceValue(150)
		}
	}, [])

	return (
		<div className="trails-list-item article-list-item-wrap">
			<div className="trails-list-item-slider">
				<Swiper
					modules={[Pagination, Navigation]}
					navigation={true}
					pagination={{ clickable: false }}
					spaceBetween={15}
					slidesPerView={1}
					style={{
						borderRadius: '5px',
						position: 'relative',
						width: window.innerWidth < 515 ? '100vw' : '240px',
						'--swiper-pagination-color': '#72A0C1',
						'--swiper-pagination-bullet-inactive-color': '#f1f2f3',
						'--swiper-pagination-bullet-inactive-opacity': '1',
						'--swiper-pagination-bullet-size': '5px',
						'--swiper-pagination-bullet-horizontal-gap': '5px',
						'--swiper-navigation-color': '#fff',
						'--swiper-navigation-size': '30px',
					}}
					loop={true}
				>
					{img.map((image, index) => {
						return (
							<SwiperSlide key={index}>
								<img
									src={image.attributes.formats.small.url}
									alt="trail"
									style={{ width: '100%', height: '100%', objectFit: 'cover' }}
								/>
							</SwiperSlide>
						)
					})}
				</Swiper>
			</div>
			<div className="trails-list-item-content">
				<h3 className="trails-list-item-title">{title}</h3>
				<div className="trails-list-item-info">
					<p>
						<strong>Length:</strong> {length}
					</p>
					<p>
						<strong>Est.</strong> {est}
					</p>
				</div>
				<div className="trails-list-item-text">
					<p>
						<strong>Description:</strong> {text.substring(0, sliceValue) + '...'}
					</p>
					<Link to={`/trails/trail/${trail.id}`}>
						<Button variant="contained">Read more</Button>
					</Link>
				</div>
			</div>
		</div>
	)
}

export default TrailsListItem
