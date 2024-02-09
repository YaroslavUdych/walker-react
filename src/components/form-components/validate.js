// Desc: object with methods for validating form fields, returns message string and isValid boolean

const validate = {
	// validate name
	name: (value) => {
		const regex = /^[a-zA-Zа-яА-Я0-9\s]*$/
		let message
		let isValid
		if (!value) {
			message = 'please fill in the field'
			isValid = false
		} else if (value.length < 3) {
			message = 'field must be 3 or more characters'
			isValid = false
		} else if (!regex.test(value)) {
			message = 'field can not contain symbols'
			isValid = false
		} else {
			isValid = true
		}

		return { message, isValid }
	},
	// validate email
	email: (value) => {
		let message
		let isValid

		if (!value) {
			message = 'please fill in the field'
			isValid = false
			isValid = false
		} else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
			message = 'email must be valid'
			isValid = false
		} else {
			isValid = true
		}
		return { message, isValid }
	},
	// validate password
	password: (value) => {
		let message
		let isValid

		if (!value) {
			message = 'please fill in the field'
			isValid = false
		} else if (value.length < 6) {
			message = 'password must be 6 or more characters'
			isValid = false
		} else {
			isValid = true
		}
		return { message, isValid }
	},
	// validate if field is empty
	isEmpty: (value) => {
		let message
		let isValid

		if (!value) {
			message = 'please fill in the field'
			isValid = false
		} else {
			isValid = true
		}
		return { message, isValid }
	},
	// confirm password
	confirmPassword: (value, password) => {
		let message
		let isValid

		if (!value) {
			message = 'please fill in the field'
			isValid = false
		} else if (value !== password) {
			message = 'passwords must match'
			isValid = false
		} else {
			isValid = true
		}
		return { message, isValid }
	},
}

export default validate
