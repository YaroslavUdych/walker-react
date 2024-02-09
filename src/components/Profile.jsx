import { useEffect, useRef } from 'react'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'

import { useSelector, useDispatch } from 'react-redux'
import {
	selectOpenModal,
	selectUsername,
	selectEmail,
	setOpenModal,
	selectUserImage,
	selectJoined,
} from '../redux/authSlice'

import gsap from 'gsap'

// for modal
const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 12,
	p: 4,
	textAlign: 'center',
	textTransform: 'uppercase',
	fontStyle: 'italic',
}

const Profile = () => {
	const selectUsernameData = useSelector(selectUsername)
	const selectEmailData = useSelector(selectEmail)
	const selectUserImageData = useSelector(selectUserImage)
	const selectJoinedData = useSelector(selectJoined)

	const userName = localStorage.getItem('userData')
		? JSON.parse(localStorage.getItem('userData')).username
		: selectUsernameData
	const userEmail = localStorage.getItem('userData')
		? JSON.parse(localStorage.getItem('userData')).email
		: selectEmailData
	const profileImage = localStorage.getItem('userData')
		? JSON.parse(localStorage.getItem('userData')).userimage
		: selectUserImageData
	const joined = localStorage.getItem('userData')
		? JSON.parse(localStorage.getItem('userData')).joined
		: selectJoinedData

	// for modal
	const open = useSelector(selectOpenModal)
	const dispatch = useDispatch()

	const handleClose = () => {
		dispatch(setOpenModal(false))
	}

	// for animation
	const profileInfoElement = useRef(null)

	useEffect(() => {
		if (profileInfoElement.current) {
			gsap.to(profileInfoElement.current, {
				opacity: 1,
				duration: 1,
				ease: 'power2.inOut',
				marginTop: 0,
			})
		}
	}, [])

	return (
		<div className="profile">
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<Typography id="modal-modal-title" variant="h6" component="h2">
						Congratulations!
					</Typography>
					<Typography id="modal-modal-description" sx={{ mt: 2 }}>
						you have successfully registered
					</Typography>
				</Box>
			</Modal>

			<div className="profile-info" ref={profileInfoElement}>
				<div className="profile-info-image">
					<img src={profileImage} alt="profile" />
				</div>
				<div className="profile-info-details">
					<div className="profile-info-details-name">{userName}</div>
					<div className="profile-info-details-email">
						email: <span>{userEmail}</span>
					</div>
					<div className="profile-info-details-join">
						joined:{' '}
						<span>
							{new Date(joined).getDate()}.{new Date(joined).getMonth() + 1}.{new Date(joined).getFullYear()}
						</span>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Profile
