import { useState } from 'react'

const useForm = (defaultInputs, callback) => {
  const [inputs, setInputs] = useState(defaultInputs)
  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault()
    }
    callback()
  }

  const handleInputChange = (event) => {
    event.persist()
    setInputs((inputs) => ({ ...inputs, [event.target.name]: event.target.value }))
  }

  return {
    handleSubmit,
    handleInputChange,
    inputs,
  }
}

export default useForm
