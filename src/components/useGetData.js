// component to fetch data from the API
import { useEffect } from 'react'

const useGetData = (url, token, setData, setError, shouldRefresh) => {
	useEffect(() => {
		async function fetchData() {
			try {
				const response = await fetch(url, {
					method: 'GET',
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
				})
				if (!response.ok) {
					throw new Error(`HTTP error! Status: ${response.status}`)
				}
				const data = await response.json()
				setData(data)
			} catch (error) {
				setError(error)
			}
		}
		fetchData()
	}, [url, token, setData, setError, shouldRefresh])
}

export default useGetData
