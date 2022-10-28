import useSWR from 'swr'

const url = 'http://localhost:5000/api/feed/'
const token = localStorage.getItem('token')

const headers = new Headers()
headers.append('Authorization', `Bearer ${token}`)

const options: RequestInit = {
  headers,
}

export const useFeed = () => {
  const { data, error } = useSWR([url, options])

  return {
    feed: data?.feed || {},
    isLoading: !data && !error,
  }
}
