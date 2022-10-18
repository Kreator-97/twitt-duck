import { User } from '@twitt-duck/state'

export const saveUserAndTokenInLocal = (user: User, token: string) => {
  localStorage.setItem('token', token)
  localStorage.setItem('user', JSON.stringify(user))
}

export const loadUserFromLocal = (): User | null => {
  const user = JSON.parse( localStorage.getItem('user') || '{}' )

  if( Object.keys( user ).length === 0 ) {
    return null
  }
  return user
}

export const clearLocal = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
}
