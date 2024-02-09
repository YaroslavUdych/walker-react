import { forwardRef } from 'react'

const FormSide = forwardRef((props, ref) => {
	return <div className="form-side" ref={ref}></div>
})

export default FormSide
