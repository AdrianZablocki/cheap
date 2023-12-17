'use client'

import { usePathname } from 'next/navigation'
import { useMemo, useState } from 'react'
import { useLoadScript } from '@react-google-maps/api'

import SpinnerContext from '@/context/spinner-context'
import Navbar from '../navbar'
import Spinner from '../spinner'
import AutocompleteMap from '@/components/autocomplete-map'

const LayoutWrapper = ({ children }) => {
  const [openSpinner, setOpenSpinner] = useState(false)
  const pathname = usePathname()

  const libraries = useMemo(() => ['places'], [])
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
    libraries: libraries
  })

  console.log(isLoaded)
  return (
    <SpinnerContext.Provider value={{openSpinner, setOpenSpinner}}>
      <AutocompleteMap loaded={isLoaded} />
      { pathname === '/' && <Navbar /> }

      { children }
      
      <Spinner isOpen={openSpinner} background="rgba(0, 0, 0, .5)" />
      
    </SpinnerContext.Provider>
  )
}

export default LayoutWrapper
