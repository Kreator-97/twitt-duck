// ScrollToTop.jsx
import { useEffect, FC } from 'react'
import { useLocation } from 'react-router'

interface Props {
  children: React.ReactNode
}

export const ScrollToTop: FC<Props> = (props) => {
  const location = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

  return <>{props.children}</>
}
