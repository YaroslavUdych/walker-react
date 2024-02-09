import { useState, useRef, useEffect } from 'react'

import './Articles.css'
import gsap from 'gsap'

import ArticlesListItem from './ArticlesListItem'
import PageNotFound from '../PageNotFound'
import useGetData from '../useGetData'
import { Pagination } from '@mui/material'

import { useNavigate, useParams } from 'react-router-dom'

const ArticlesList = () => {
	// for pagination
	const navigate = useNavigate()
	const { pageNumber } = useParams()
	const [page, setPage] = useState(Number(pageNumber))
	useEffect(() => {
		setPage(Number(pageNumber))
	}, [pageNumber])

	// for fetching data
	const [articles, setArticles] = useState([])
	const [error, setError] = useState(null)
	const apiToken = process.env.REACT_APP_API_TOKEN
	useGetData(
		`https://do-strapi-walker-rn98u.ondigitalocean.app/api/articles?sort=createdAt:desc&pagination[page]=${page}&pagination[pageSize]=4&populate=*`,
		apiToken,
		setArticles,
		setError
	)

	// for animation
	const articlesListElement = useRef(null)
	useEffect(() => {
		if (articlesListElement.current) {
			gsap.to(articlesListElement.current, {
				opacity: 1,
				duration: 1,
				ease: 'power2.inOut',
				transform: 'translateY(0)',
				delay: 0.1,
			})
		}
	}, [])

	return (
		<div className="articles-wrap" ref={articlesListElement}>
			{error || (articles.data && page > articles.meta.pagination.pageCount) ? (
				<PageNotFound />
			) : (
				<>
					{articles.data && (
						<>
							{articles.data.map((article) => {
								return (
									<ArticlesListItem
										key={article.id}
										id={article.id}
										title={article.attributes.title}
										content={article.attributes.articletext}
										img={article.attributes.image.data.attributes.formats.small.url}
										createdAt={article.attributes.createdAt}
										alt={article.attributes.image.data.attributes.name}
									/>
								)
							})}
							<Pagination
								size="large"
								shape="rounded"
								color="primary"
								count={articles.meta.pagination.pageCount}
								page={page}
								onChange={(event, value) => {
									setPage(value)
									if (articles.data.length > 0) {
										setPage(value)
										navigate(`/blog/page/${value}`)
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

export default ArticlesList
