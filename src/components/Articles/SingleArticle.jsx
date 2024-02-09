import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import useGetData from '../useGetData'
import PageNotFound from '../PageNotFound'
import gsap from 'gsap'

const SingleArticle = () => {
	const { id } = useParams()
	// for fetching data
	const [singleArticle, setSingleArticle] = useState(null)
	const [error, setError] = useState(null)
	const apiToken = process.env.REACT_APP_API_TOKEN
	useGetData(
		`https://do-strapi-walker-rn98u.ondigitalocean.app/api/articles/${id}?populate=*`,
		apiToken,
		setSingleArticle,
		setError
	)

	//for animation
	const singleArticleTitleElement = useRef(null)
	const singleArticleImageElement = useRef(null)
	const singleArticleContentElement = useRef(null)
	useEffect(() => {
		if (singleArticle) {
			gsap.to(singleArticleTitleElement.current, {
				opacity: 1,
				transform: 'translateX(0)',
				duration: 1,
				ease: 'power2.inOut',
				delay: 0.1,
			})
			gsap.to(singleArticleImageElement.current, {
				opacity: 1,
				transform: 'translateX(0)',
				duration: 1,
				ease: 'power2.inOut',
				delay: 0.1,
			})
			gsap.to(singleArticleContentElement.current, {
				opacity: 1,
				transform: 'translateY(0)',
				duration: 1,
				ease: 'power2.inOut',
				delay: 0.5,
			})
		}
	}, [singleArticle])

	return (
		<div className="single-article">
			{error && <PageNotFound />}
			{singleArticle && (
				<article>
					<div className="single-article-head">
						<h2 className="single-article-title" ref={singleArticleTitleElement}>
							{singleArticle.data.attributes.title}
						</h2>
						<div className="single-article-img" ref={singleArticleImageElement}>
							<img
								src={singleArticle.data.attributes.image.data.attributes.url}
								alt={singleArticle.data.attributes.image.data.attributes.name}
							/>
						</div>
					</div>
					<div className="single-article-content" ref={singleArticleContentElement}>
						<p>{singleArticle.data.attributes.articletext}</p>
						{singleArticle.data.attributes.subtitle1 && (
							<p className="single-article-subtitle">{singleArticle.data.attributes.subtitle1}</p>
						)}
						{singleArticle.data.attributes.paragraph1 && (
							<p className="single-article-paragraph">{singleArticle.data.attributes.paragraph1}</p>
						)}
						{singleArticle.data.attributes.subtitle2 && (
							<p className="single-article-subtitle">{singleArticle.data.attributes.subtitle2}</p>
						)}
						{singleArticle.data.attributes.paragraph2 && (
							<p className="single-article-paragraph">{singleArticle.data.attributes.paragraph2}</p>
						)}
						{singleArticle.data.attributes.subtitle3 && (
							<p className="single-article-subtitle">{singleArticle.data.attributes.subtitle3}</p>
						)}
						{singleArticle.data.attributes.paragraph3 && (
							<p className="single-article-paragraph">{singleArticle.data.attributes.paragraph3}</p>
						)}
						{singleArticle.data.attributes.subtitle4 && (
							<p className="single-article-subtitle">{singleArticle.data.attributes.subtitle4}</p>
						)}
						{singleArticle.data.attributes.paragraph4 && (
							<p className="single-article-paragraph">{singleArticle.data.attributes.paragraph4}</p>
						)}
						{singleArticle.data.attributes.subtitle5 && (
							<p className="single-article-subtitle">{singleArticle.data.attributes.subtitle5}</p>
						)}
						{singleArticle.data.attributes.paragraph5 && (
							<p className="single-article-paragraph">{singleArticle.data.attributes.paragraph5}</p>
						)}
					</div>
				</article>
			)}
		</div>
	)
}

export default SingleArticle
