import { useRef, useState, useEffect } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectFade, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/scss'
import 'swiper/scss/effect-fade'
import 'swiper/scss/pagination'
import 'swiper/scss/autoplay'

import InstagramIcon from '@mui/icons-material/Instagram'
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import YouTubeIcon from '@mui/icons-material/YouTube'
import { IconButton } from '@mui/material'

import image1 from '../images/slider-image1.jpg'
import image2 from '../images/slider-image2.jpg'
import image3 from '../images/slider-image3.jpg'
import image4 from '../images/slider-image4.jpg'
import image5 from '../images/slider-image5.jpg'
import image6 from '../images/slider-image6.jpg'
import image7 from '../images/slider-image7.jpg'
import image8 from '../images/slider-image8.jpg'
import image9 from '../images/slider-image9.jpg'

import gsap from 'gsap'

import Page from './Page'
import useGetData from './useGetData'

const images = [image1, image2, image3, image4, image5, image6, image7, image8, image9]

const Main = () => {
	// for fetching data
	const [articles, setArticles] = useState([])
	const apiToken = process.env.REACT_APP_API_TOKEN
	useGetData(
		'https://do-strapi-walker-rn98u.ondigitalocean.app/api/articles?sort=createdAt:desc&pagination[limit]=3&populate=*',
		apiToken,
		setArticles
	)

	// for animation
	const main = useRef(null)
	const mainText = useRef(null)
	const socialBlock = useRef(null)

	useEffect(() => {
		if (main.current && mainText.current && socialBlock.current) {
			gsap.to(main.current, { width: '100%', opacity: 1, duration: 0.8, ease: 'power2.inOut', delay: 0.1 })
			gsap.to(mainText.current, { right: 0, opacity: 1, duration: 1, ease: 'power2.inOut', delay: 1.1 })
			gsap.to(socialBlock.current, { left: 0, opacity: 1, duration: 1, ease: 'power2.inOut', delay: 1.1 })
		}
	}, [])

	if (articles) {
		return (
			<div className="main-wrap">
				<main className="main" ref={main}>
					<Swiper
						modules={[Pagination, EffectFade, Autoplay]}
						slidesPerView={1}
						spaceBetween={0}
						effect="fade"
						speed={900}
						pagination={{ clickable: true }}
						style={{
							width: '100vw',
							height: 'calc(100% - 56px)',
							position: 'relative',
							'--swiper-pagination-color': '#72A0C1',
							'--swiper-pagination-bullet-inactive-color': '#f1f2f3',
							'--swiper-pagination-bullet-inactive-opacity': '1',
							'--swiper-pagination-bullet-size': '8px',
							'--swiper-pagination-bullet-horizontal-gap': '6px',
						}}
						autoplay={{ delay: 3000, disableOnInteraction: false }}
					>
						{images.map((image, index) => (
							<SwiperSlide key={index}>
								<img src={image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
							</SwiperSlide>
						))}
					</Swiper>
					<section className="main-text" ref={mainText}>
						<p className="main-text__title">Explore the world with us!</p>
						<h2>Be prepared for the mountains and beyond!</h2>
					</section>
					<section className="main-social" ref={socialBlock}>
						<IconButton
							aria-label="insta-button"
							style={{ color: 'black' }}
							sx={{
								'&:hover': {
									transition: 'all 0.3s ease-in-out',
									transform: 'scale(1.1)',
								},
							}}
							onClick={() => window.open('https://www.instagram.com/')}
						>
							<InstagramIcon />
						</IconButton>
						<div style={{ width: '70%', height: '1px', backgroundColor: 'grey' }}></div>
						<IconButton
							aria-label="facebook-button"
							style={{ color: 'black' }}
							sx={{
								'&:hover': {
									transition: 'all 0.3s ease-in-out',
									transform: 'scale(1.1)',
								},
							}}
							onClick={() => window.open('https://www.facebook.com/')}
						>
							<FacebookIcon />
						</IconButton>
						<div style={{ width: '70%', height: '1px', backgroundColor: 'grey' }}></div>
						<IconButton
							aria-label="twitter-button"
							style={{ color: 'black' }}
							sx={{
								'&:hover': {
									transition: 'all 0.3s ease-in-out',
									transform: 'scale(1.1)',
								},
							}}
							onClick={() => window.open('https://twitter.com/')}
						>
							<TwitterIcon />
						</IconButton>
						<div style={{ width: '70%', height: '1px', backgroundColor: 'grey' }}></div>
						<IconButton
							aria-label="linked-in-button"
							style={{ color: 'black' }}
							sx={{
								'&:hover': {
									transition: 'all 0.3s ease-in-out',
									transform: 'scale(1.1)',
								},
							}}
							onClick={() => window.open('https://www.linkedin.com/')}
						>
							<LinkedInIcon />
						</IconButton>
						<div style={{ width: '70%', height: '1px', backgroundColor: 'grey' }}></div>
						<IconButton
							aria-label="youtube-button"
							style={{ color: 'black' }}
							sx={{
								'&:hover': {
									transition: 'all 0.3s ease-in-out',
									transform: 'scale(1.1)',
								},
							}}
							onClick={() => window.open('https://www.youtube.com/')}
						>
							<YouTubeIcon />
						</IconButton>
					</section>
				</main>
				{articles.data &&
					articles.data.map((article, index) => (
						<Page
							key={article.id}
							title={article.attributes.title}
							text={article.attributes.articletext.split(' ').slice(0, 50).join(' ') + '...'}
							imageSrc={article.attributes.image.data.attributes.formats.medium.url}
							sectionClass={index === 1 ? 'page-reverse' : null}
							id={article.id}
						/>
					))}
			</div>
		)
	}
}

export default Main
