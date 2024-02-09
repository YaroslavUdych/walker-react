import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const Page = ({ title, text, imageSrc, sectionClass, id }) => {
	// for animation
	const pageElement = useRef(null)

	useEffect(() => {
		gsap.registerPlugin(ScrollTrigger)
		gsap.from(pageElement.current.children[0], {
			scrollTrigger: {
				trigger: pageElement.current,
				start: 'top bottom',
				end: 'top 30%',
				toggleActions: 'restart none none none',
				scrub: 1,
			},
			opacity: 0,
			transform: 'translateX(-100px)',
			duration: 1,
			ease: 'power2.inOut',
		})
		gsap.to(pageElement.current.children[0], {
			scrollTrigger: {
				trigger: pageElement.current,
				start: 'top bottom',
				end: 'top 30%',
				toggleActions: 'restart none none none',
				scrub: 1,
			},
			opacity: 1,
			transform: 'translateX(0)',
			duration: 1,
			ease: 'power2.inOut',
		})
		gsap.registerPlugin(ScrollTrigger)
		gsap.from(pageElement.current.children[1], {
			scrollTrigger: {
				trigger: pageElement.current,
				start: 'top bottom',
				end: 'top 30%',
				toggleActions: 'restart none none none',
				scrub: 1,
			},
			opacity: 0,
			transform: 'translateX(100px)',
			duration: 1,
			ease: 'power2.inOut',
		})
		gsap.to(pageElement.current.children[1], {
			scrollTrigger: {
				trigger: pageElement.current,
				start: 'top bottom',
				end: 'top 30%',
				toggleActions: 'restart none none none',
				scrub: 1,
			},
			opacity: 1,
			transform: 'translateX(0)',
			duration: 1,
			ease: 'power2.inOut',
		})
	}, [])

	return (
		<section className={`page ${sectionClass}`} ref={pageElement}>
			<div className="page-text">
				<h2>{title}</h2>
				<p className="page-text__info">{text}</p>
				<Link to={`/blog/article/${id}`} className="page-text__link">
					read more
				</Link>
			</div>
			<div className="page-image">
				<img src={imageSrc} alt="hiking" />
			</div>
		</section>
	)
}

export default Page
