import { useLocation } from 'react-router-dom'
import { AppLayout } from '../layouts'

export const SearchPage = () => {
  const { search } = useLocation()
  let query = ''

  if( search.includes('?query') ) {
    query = search.split('=')[1]
    
    console.log(query)
  }

  return (
    <AppLayout >
      <h1>Pantalla de búsqueda</h1>
      <h2>Resultados para { query }</h2>
    </AppLayout>
  )
}
