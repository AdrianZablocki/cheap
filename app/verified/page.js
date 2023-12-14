import axios from 'axios'

const setValidationFlag = async (email) => {
  const  { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/verified`, { email })

  return data
}

const VerifiedPage = async({ searchParams }) => {

  const verified = await setValidationFlag(searchParams.user)

  console.log(verified);

  console.log('search param', searchParams)
  // if (searchParams?.verified) {
  //   try {
  //     const res = await setValidationFlag(searchParams.userId, { verified: true}) 
  //     // console.timeLog('verification success', res)
  //   } catch (error) {
  //     console.log('Verifications failed', error)
  //   }
  // }

  return (
    <div>verified page{searchParams.user}</div>
  )
}

export default VerifiedPage
