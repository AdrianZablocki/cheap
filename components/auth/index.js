'use client'

import Image from 'next/image'
import { useSession, signIn, signOut } from 'next-auth/react'

const Auth = () => {
  const { data: session } = useSession()

  const handleSignin = (e) => {
    e.preventDefault()
    signIn()
  }

  const handleSignout = (e) => {
    e.preventDefault()
    signOut()
  }

  return (
    <div>
      {session ? (
        <a href="#" onClick={handleSignout}>
          <button>Sign out</button>
        </a>
      ) : (
        <a href="#" onClick={handleSignin}>
          <button> Sign in</button>
        </a>
      )}
      {session && 
        <span>
          <Image src={session.user.image} width={30} height={30} alt="Picture of the author"></Image>
          <span>{session.user.name}</span>
        </span>
      }
    </div>
  )
}

export default Auth