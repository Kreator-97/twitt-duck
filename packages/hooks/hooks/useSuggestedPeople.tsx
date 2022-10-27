import { User } from '@twitt-duck/state'
import useSWR from 'swr'

interface Response {
  ok: boolean;
  msg: string;
  users: User[]
}

export const useSuggestedPeople = () => {
  const { data, error } = useSWR<Response>('http://localhost:5000/api/suggested-people')

  return {
    users: data?.users || [],
    isLoading: !data && !error
  }
}
