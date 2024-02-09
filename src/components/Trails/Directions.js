// component for rendering directions on the map

import { useMap, useMapsLibrary } from '@vis.gl/react-google-maps'
import { useEffect, useState, useMemo } from 'react'

const Directions = ({ originLat, originLng, destinationLat, destinationLng, waypointsData }) => {
	const map = useMap()
	const routesLibrary = useMapsLibrary('routes')
	const [directionsService, setDirectionsService] = useState()
	const [directionsRenderer, setDirectionsRenderer] = useState()

	const waypoints = useMemo(() => {
		if (!waypointsData || waypointsData.length === 0 || !routesLibrary) {
			return []
		}

		return waypointsData.map((waypoint) => ({
			location: { lat: waypoint.lat, lng: waypoint.lng },
			stopover: true,
		}))
	}, [waypointsData, routesLibrary])

	useEffect(() => {
		if (!map || !routesLibrary) return
		setDirectionsService(new routesLibrary.DirectionsService())
		setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }))
	}, [map, routesLibrary])

	useEffect(() => {
		if (!directionsService || !directionsRenderer) return
		directionsService
			.route({
				origin: { lat: parseFloat(originLat), lng: parseFloat(originLng) },
				waypoints: waypoints,
				destination: { lat: parseFloat(destinationLat), lng: parseFloat(destinationLng) },
				travelMode: 'WALKING',
			})
			.then((response) => {
				directionsRenderer.setDirections(response)
			})
	}, [directionsService, directionsRenderer, originLat, originLng, destinationLat, destinationLng, waypoints])

	return null
}

export default Directions
