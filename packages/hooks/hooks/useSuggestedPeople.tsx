import { User } from '@twitt-duck/state'
import useSWR from 'swr'

interface Response {
  ok: boolean;
  msg: string;
  users: User[]
}

const BASE_URL = import.meta.env.VITE_BASE_URL || ''

export const useSuggestedPeople = () => {
  const token = localStorage.getItem('token')
  const { data, error } = useSWR<Response>([`${BASE_URL}/api/suggested-people/`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }])

  return {
    users: data?.users || [],
    isLoading: !data && !error
  }
}
