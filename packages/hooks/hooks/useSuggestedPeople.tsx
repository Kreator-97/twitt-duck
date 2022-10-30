import { User } from '@twitt-duck/state'
import useSWR from 'swr'

interface Response {
  ok: boolean;
  msg: string;
  users: User[]
}

export const useSuggestedPeople = () => {
  const token = localStorage.getItem('token')
  const { data, error } = useSWR<Response>(['http://localhost:5000/api/suggested-people/', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }])

  return {
    users: data?.users || [],
    isLoading: !data && !error
  }
}
