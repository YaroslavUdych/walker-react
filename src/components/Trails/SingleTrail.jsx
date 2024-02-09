import { useState, useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'

import useGetData from '../useGetData'
import PageNotFound from '../PageNotFound'
import Directions from './Directions'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation } from 'swiper/modules'
import 'swiper/scss'
import 'swiper/scss/navigation'
import 'swiper/scss/pagination'

import { gsap } from 'gsap'
import { APIProvider, Map } from '@vis.gl/react-google-maps'

import Comments from '../Comments/Comments'

const SingleTrail = () => {
	const { id } = useParams()
	// for fetching data
	const [singleTrail, setSingleTrail] = useState(null)
	const [error, setError] = useState(null)
	const apiToken = process.env.REACT_APP_API_TOKEN
	const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY
	useGetData(
		`https://do-strapi-walker-rn98u.ondigitalocean.app/api/trails/${id}?populate=*`,
		apiToken,
		setSingleTrail,
		setError
	)

	//for animation
	const singleTrailSliderElement = useRef(null)
	const singleTrailContentElement = useRef(null)
	useEffect(() => {
		if (singleTrail) {
			gsap.to(singleTrailSliderElement.current, {
				opacity: 1,
				duration: 1,
				transform: 'translateY(0)',
				ease: 'power2.inOut',
				delay: 0.1,
			})
			gsap.to(singleTrailContentElement.current, {
				opacity: 1,
				duration: 1,
				transform: 'translateY(0)',
				ease: 'power2.inOut',
				delay: 0.1,
			})
		}
	}, [singleTrail])

	return (
		<div className="single-trail single-article">
			{error && <PageNotFound />}
			{singleTrail && (
				<>
					<div className="single-trail-slider" ref={singleTrailSliderElement}>
						<Swiper
							modules={[Pagination, Navigation]}
							navigation={true}
							pagination={{ clickable: false }}
							spaceBetween={0}
							slidesPerView={1}
							style={{
								aspectRatio: '3/2',
								boxShadow: '0 0 5px rgba(0, 0, 0, 0.5)',
								borderRadius: '5px',
								position: 'relative',
								width: window.innerWidth < 515 ? '100%' : '50%',
								height: '100%',
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
							{singleTrail.data.attributes.images.data.map((image, index) => {
								return (
									<SwiperSlide key={index}>
										<img
											src={image.attributes.url}
											alt="trail"
											style={{ width: '100%', height: '100%', objectFit: 'cover' }}
										/>
									</SwiperSlide>
								)
							})}
						</Swiper>
						<div className="single-trail-map">
							<APIProvider apiKey={googleMapsApiKey}>
								<Map>
									<Directions
										originLat={singleTrail.data.attributes.coordinates.origin.lat}
										originLng={singleTrail.data.attributes.coordinates.origin.lng}
										destinationLat={singleTrail.data.attributes.coordinates.destination.lat}
										destinationLng={singleTrail.data.attributes.coordinates.destination.lng}
										waypointsData={singleTrail.data.attributes.coordinates.waypoints}
									/>
								</Map>
							</APIProvider>
						</div>
					</div>
					<div className="single-trail-content" ref={singleTrailContentElement}>
						<h2 className="single-trail-slider-title">{singleTrail.data.attributes.title}</h2>
						<div className="single-trail-info">
							<div className="single-trail-info-length">
								<strong>Length</strong>
								<div className="single-trail-info-length-value">{singleTrail.data.attributes.length}</div>
							</div>
							<div className="single-trail-info-est">
								<strong>Est</strong>
								<div className="single-trail-info-est-value">{singleTrail.data.attributes.est}</div>
							</div>
							<div className="single-trail-info-difficulty">
								<strong>Difficulty</strong>
								<div className="single-trail-info-difficulty-value">
									{singleTrail.data.attributes.complexity}
								</div>
							</div>
							<div className="single-trail-info-type">
								<strong>Route type</strong>
								<div className="single-trail-info-type-value">{singleTrail.data.attributes.routeType}</div>
							</div>
						</div>
						<div className="single-trail-description">
							{singleTrail.data.attributes.text}{' '}
							<Link target="blank" to={singleTrail.data.attributes.url}>
								{singleTrail.data.attributes.url}
							</Link>
						</div>
					</div>
					<div className="line"></div>
					<Comments />
				</>
			)}
		</div>
	)
}

export default SingleTrail
