import { useState } from 'react'

const useErrorHandling = () => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const handleResponseErrors = (err: any) => {
    if (err && err.message) {
      if (err.response?.data?.errors) {
        setErrors(err.response?.data?.errors)
      } else {
        setErrors({ error: err.message })
      }
    } else {
      setErrors({ error: 'The was an error in the request.' })
    }
  }

  const resetErrors = () => setErrors({})

  return { errors, handleResponseErrors, resetErrors }
}

export default useErrorHandling;