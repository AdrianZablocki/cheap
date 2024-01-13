import { redirect } from 'next/navigation'
import axios from 'axios'
import Link from 'next/link'

const setValidationFlag = async (params) => {
  const  { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/verified`, { ...params })

  return data
}

const VerifiedPage = async({ searchParams }) => {

  const verified = await setValidationFlag(searchParams)

  const responseMap = new Map([
    [ 
      'Link aktywacyjny wygasł', 
      <Link key="activation link" href="/registration" passHref>Link aktywacyjny wygasł</Link>
    ],
    [ 
      'Konto zostało zweryfikowne poprawnie',
      <Link key="login link" href="/login" passHref>Konto zostało zweryfikowane poprawnie, moesz teraz się zalogować</Link> 
    ],
    [ 
      'Coś z tym linkiem jest nie tak',
      <div key="failed">Coś poszło nie tak, proszimy o kontakt</div>
    ],
    [ 
      'default',
      <div key="total failed">Coś totalnie poszło nie tak, najlepiej skontaktuj się z nami</div>
    ]
  ])
  console.log('Verification page', verified)
  
  return (
    <div>
      {verified && responseMap.get(verified.message || 'default')}
    </div>
  )
}

export default VerifiedPage
