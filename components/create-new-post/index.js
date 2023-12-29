'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useContext, useState } from 'react'
import { jwtDecode } from 'jwt-decode'

import UserContext from '@/context/user-context'
import Modal from '../layout/modal'
import NewPostForm from '../new-post-form'
import Button from '../UI/button'

const CreateNewPost = ({ posts, setPosts }) => {
  const [ showModal, setShowModal ] = useState(false)
  const [ step, setStep ] = useState('firstStep')
  const { userToken } = useContext(UserContext)
  const { push } = useRouter()
  const pathName = usePathname()

  const onOpenNewPostModal = () => {
    if(!userToken || !jwtDecode(userToken).isVerified) {
      push(`/refresh?location=${pathName}`)
    }
    setShowModal(true)
  }

  const getStep = (prevStep) => {
    const map = {
      firstStep: 'firstStep',
      secondStep: 'firstStep',
      submit: 'secondStep'
    }

    setStep(map[prevStep] || 'firstStep')
  }

  const onClose = () => {
    setShowModal(false)
    setStep('firstStep')
  } 

  return (
    <>
      <Button text="Utwórz nowy wpis" action={() => onOpenNewPostModal()} />

      {showModal &&
        <Modal
          onClose={() => onClose()}
          backButton={step !== 'firstStep'}
          onBackButton={() => getStep(step)}
        >
          <NewPostForm
            setShowModal={setShowModal}
            posts={posts}
            setPosts={setPosts}
            step={step}
            setStep={setStep}
          />
        </Modal>
      }
    </>
  )
}

export default CreateNewPost