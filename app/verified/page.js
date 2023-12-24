import { redirect } from 'next/navigation'
import axios from 'axios'
import Link from 'next/link'

const setValidationFlag = async (email) => {
  const  { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/verified`, { email })

  return data
}

const VerifiedPage = async({ searchParams }) => {

  const verified = await setValidationFlag(searchParams.user)

  verified ? redirect('/login', 'replace') : console.log('VERIFICATION FAILED')
  
  return (
    (verified ? <div>Uzytkownik {searchParams.user}, został zweryfikowany. 
      <Link href={'/'}>Przjdz do strony głównej</Link>
    </div> : <div>Weryfikacja się nie powiodła</div>)
  )
}

export default VerifiedPage
