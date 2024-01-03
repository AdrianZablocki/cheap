'use client'

import  { useContext, useEffect, useState } from 'react'
import axios from 'axios'

import SpinnerContext from '@/context/spinner-context'

const User = ({ params }) => {
  const [ user, setUser ] = useState()
  const { setOpenSpinner } = useContext(SpinnerContext)

  useEffect(() => {
    const fetchData = async() => {
      setOpenSpinner(true)
      try {
        const  { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/user/${params.id}`)
        setUser(data.user)
        setOpenSpinner(false)
      } catch (error) {
        console.log(error)
        setOpenSpinner(false)
      }
      
    } 
    fetchData()
  }, [])

  console.log(user)
  return (
    <div>user page</div>
  )
} 

export default User