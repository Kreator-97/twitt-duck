import useSWR from 'swr'

export const useFollow = (username: string) => {
  const { data, error } = useSWR(`http://localhost:5000/api/follow/${username}`)

  return {
    followers: data?.followers || [],
    following: data?.following || [],
    isLoading: !data && !error
  }
}
