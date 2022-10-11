import { FC, useState } from 'react'
import { UIContext } from './UIContext'

export interface UIState {
  isSearchBarOpen: boolean;
}

interface Props {
  children: React.ReactNode
}

export const UIProvider: FC<Props> = ({children}) => {

  const [ isSearchBarOpen, setIsSearchBarOpen ] = useState(false)
  
  const closeSearchBar = () => {
    setIsSearchBarOpen(false)
  }

  const openSearchBar = () => {
    setIsSearchBarOpen(true)
  }
  
  return (
    <UIContext.Provider value={{ isSearchBarOpen, closeSearchBar, openSearchBar }}>
      { children }
    </UIContext.Provider>
  )
}
