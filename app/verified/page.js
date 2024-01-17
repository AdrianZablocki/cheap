import { redirect } from 'next/navigation'
import axios from 'axios'
import Link from 'next/link'

const setValidationFlag = async (params) => {
  console.log(params)
  const  { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/verified`, { ...params })

  return data
}

const VerifiedPage = async({ searchParams }) => {

  console.log('PARAMS', searchParams)
  const verified = await setValidationFlag(searchParams)

  const responseMap = new Map([
    [ 'Link aktywacyjny wygasł', () => <Link href="/activation-link">Link aktywacyjny wygasł</Link> ],
    [ 'Konto zostało zweryfikowne poprawnie', () => redirect('/login') ],
    [ 
      'Coś z tym linkiem jest nie tak',
      () => <div key="failed">Coś poszło nie tak, prosimy o <a href="mailto:kontakt@chaepweed.pl">kontakt</a></div>
    ],
    [ 'default', () => <div key="total failed">Coś totalnie poszło nie tak, najlepiej skontaktuj się z nami</div> ]
  ])
  
  return (
    <div>
      {verified && responseMap.get(verified.message || 'default')()}
    </div>
  )
}

export default VerifiedPage
