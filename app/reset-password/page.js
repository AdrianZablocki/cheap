import  ResetPassword from '@/components/reset-password'

const ResetPasswordPage = ({ searchParams }) => {
  console.log(searchParams)
  return (
    <ResetPassword params={searchParams} />
  )
}

export default ResetPasswordPage
