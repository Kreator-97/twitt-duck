import { createContext } from 'react'

interface ContextProps {
  isSearchBarOpen: boolean;
  closeSearchBar(): void;
  openSearchBar(): void;
}

export const UIContext = createContext({} as ContextProps)
