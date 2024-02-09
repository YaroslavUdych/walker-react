import { useState, useEffect, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

import { Pagination, Navigation } from 'swiper/modules'
import 'swiper/scss'
import 'swiper/scss/navigation'
import 'swiper/scss/pagination'

import aboutPhoto1 from '../images/about-1photo.jpg'
import aboutPhoto2 from '../images/about-2photo.jpg'
import aboutPhoto3 from '../images/about-3photo.jpg'
import aboutPhoto4 from '../images/about-4photo.jpg'

import gsap from 'gsap'

const About = () => {
	const [showNavigation, setShowNavigation] = useState(true)
	const [sliderWidth, setSliderWidth] = useState('100%')

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth <= 768) {
				setShowNavigation(false)
				setSliderWidth('100%')
			} else {
				setShowNavigation(true)
				setSliderWidth('80%')
			}
		}

		handleResize()

		window.addEventListener('resize', handleResize)

		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	// for animation
	const titleElement = useRef(null)
	const aboutFooterElement = useRef(null)

	useEffect(() => {
		gsap.to(titleElement.current, {
			opacity: 1,
			duration: 1,
			ease: 'power2.inOut',
			transform: 'translateY(0)',
		})
		gsap.to(aboutFooterElement.current, {
			opacity: 1,
			duration: 1,
			ease: 'power2.inOut',
			transform: 'translateY(0)',
		})
	}, [])

	return (
		<div className="about-wrap">
			<h2 className="about-title" ref={titleElement}>
				Welcome to our nature loving community of adventures!
			</h2>
			<Swiper
				modules={[Pagination, Navigation]}
				navigation={showNavigation}
				spaceBetween={20}
				slidesPerView={1}
				pagination={{ clickable: true }}
				style={{
					width: sliderWidth,
					height: '70%',
					position: 'relative',
					'--swiper-pagination-color': '#fff',
					'--swiper-pagination-bullet-inactive-color': '#b6b6b6',
					'--swiper-pagination-bullet-inactive-opacity': '1',
					'--swiper-pagination-bullet-size': '10px',
					'--swiper-pagination-bullet-horizontal-gap': '6px',
					'--swiper-navigation-color': '#b6b6b6',
				}}
				loop={true}
			>
				<SwiperSlide>
					<div className="about-slider-item">
						<div className="about-slider-item-header">
							<div className="about-slider-item-image">
								<img src={aboutPhoto1} alt="about" />
							</div>
							<div className="about-slider-item-header-text">John Doe, co-founder</div>
						</div>

						<h3 className="about-slider-title">Who we are</h3>
						<div className="about-slider-item-text">
							«We are a team of nature enthusiasts who have come together to create this resource for all those
							who love hiking and active outdoor recreation. Our mission is to inspire and assist you in
							discovering the beauty of nature, overcoming your limits, and savoring every moment in the great
							outdoors.»
						</div>
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className="about-slider-item">
						<div className="about-slider-item-header">
							<div className="about-slider-item-image">
								<img src={aboutPhoto2} alt="about" />
							</div>
							<div className="about-slider-item-header-text">John Doe, co-founder</div>
						</div>
						<h3 className="about-slider-title">Our story</h3>
						<div className="about-slider-item-text">
							«It all started with a passion for adventure and a desire to share our experiences. We decided to
							create this resource where everyone can find valuable information, get advice on equipment, learn
							about the best routes, and simply join a community of like-minded individuals.»
						</div>
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className="about-slider-item">
						<div className="about-slider-item-header">
							<div className="about-slider-item-image">
								<img src={aboutPhoto3} alt="about" />
							</div>
							<div className="about-slider-item-header-text">Jane Doe, manager</div>
						</div>
						<h3 className="about-slider-title">Our values</h3>
						<div className="about-slider-item-text">
							<ol>
								<li>
									<strong>Adventure:</strong> We believe in the power of adventures and their ability to change
									our lives.
								</li>
								<li>
									<strong>Respect for Nature:</strong> We strive to treat nature with care and leave it as it
									is for future generations.
								</li>
								<li>
									<strong>Community:</strong> We are building a community of nature lovers that supports,
									inspires, and helps each other.
								</li>
							</ol>
						</div>
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className="about-slider-item">
						<div className="about-slider-item-header">
							<div className="about-slider-item-image">
								<img src={aboutPhoto4} alt="about" />
							</div>
							<div className="about-slider-item-header-text">John Doe, manager</div>
						</div>
						<h3 className="about-slider-title">What we offer</h3>
						<div className="about-slider-item-text">
							<ul>
								<li>
									<strong>Information and Tips:</strong> Explore articles and advice on equipment, safety, and
									trip planning.
								</li>
								<li>
									<strong>Routes and Locations:</strong> Discover the best hiking spots by checking out our
									recommendations and reviews.
								</li>
								<li>
									<strong>Nature-Loving Community:</strong> Join us on the forum where you can share
									experiences, ask questions, and find new friends for your journeys.
								</li>
							</ul>
						</div>
					</div>
				</SwiperSlide>
			</Swiper>
			<div className="about-footer" ref={aboutFooterElement}>
				<p>With love for nature, the WALKER team</p>
			</div>
		</div>
	)
}

export default About
