import { useState, useEffect } from 'react'

export const useFetch = (url) => {
  const [data, setData] = useState()
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        setLoading(true)
        const response = await fetch(url)
        const data = await response.json()
        setData(data)
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }

    fetchAPI()
  }, [url])

  return { data, error, loading }
}
