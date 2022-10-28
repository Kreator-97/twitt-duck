import useSWR from 'swr'

const token = localStorage.getItem('token')
const headers = new Headers()
headers.append('Authorization', `Bearer ${token}`)

export const useFeed = () => {
  const token = localStorage.getItem('token')
  const { data, error } = useSWR(['http://localhost:5000/api/feed/', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }])

  return {
    feed: data?.feed || {},
    isLoading: !data && !error,
  }
}
