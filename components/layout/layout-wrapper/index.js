'use client'

import { useMemo, useState } from 'react'
import { useLoadScript } from '@react-google-maps/api'

import SpinnerContext from '@/context/spinner-context'
import Navbar from '../navbar'
import Spinner from '../spinner'
import AutocompleteMap from '@/components/autocomplete-map'

const LayoutWrapper = ({ children }) => {
  const [openSpinner, setOpenSpinner] = useState(false)
  const libraries = useMemo(() => ['places'], [])

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
    libraries: libraries
  })
  
  return (
    <SpinnerContext.Provider value={{openSpinner, setOpenSpinner}}>

      <Navbar />
      <AutocompleteMap loaded={isLoaded} />
      
      {openSpinner && 
        <div className="spinnerWrapper" style={{backgroundColor: `${openSpinner ? 'rgba(0, 0, 0, .5)': '#fff'}` }}>
          <Spinner />       
        </div>
      }

      {children}
      
    </SpinnerContext.Provider>
  )
}

export default LayoutWrapper
