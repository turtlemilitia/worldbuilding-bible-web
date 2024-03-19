import { useMemo, useState } from 'react'

const useErrorHandling = () => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const handleResponseErrors = (err: any, defaultMessage: string = 'The was an error in the request.') => {
    if (err && err.message) {
      if (err.response?.data?.errors) {
        setErrors(err.response?.data?.errors)
      } else {
        setErrors({ error: err.message })
      }
    } else {
      setErrors({ error: defaultMessage })
    }
  }

  const resetErrors = () => setErrors({})

  const hasErrors = useMemo(() => Object.keys(errors).length > 0, [errors])

  return { errors, handleResponseErrors, resetErrors, setErrors, hasErrors }
}

export default useErrorHandling;