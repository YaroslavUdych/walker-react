import { useState, useEffect } from 'react'

import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { IconButton, Tooltip } from '@mui/material'

const ScrollToTopButton = () => {
	const [isVisible, setIsVisible] = useState(false)

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	useEffect(() => {
		const handleScroll = () => {
			const scrollY = window.scrollY
			setIsVisible(scrollY > 700)
		}

		window.addEventListener('scroll', handleScroll)

		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [])

	return (
		<>
			{isVisible && (
				<Tooltip>
					<IconButton
						id="scrollToTopBtn"
						onClick={scrollToTop}
						style={{
							position: 'fixed',
							bottom: '20px',
							right: '10px',
							zIndex: '1000',
							boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
						}}
						size="medium"
					>
						<KeyboardArrowUpIcon />
					</IconButton>
				</Tooltip>
			)}
		</>
	)
}

export default ScrollToTopButton
