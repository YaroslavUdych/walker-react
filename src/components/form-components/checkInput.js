// function to check input value and set state

const checkInput = (value, method, setState, ...methodArgs) => {
	value = value.trim()
	const validationResult = method(value, ...methodArgs)
	setState((prevState) => ({
		...prevState,
		value,
		message: validationResult.message,
		ok: validationResult.isValid,
	}))
}

export default checkInput
