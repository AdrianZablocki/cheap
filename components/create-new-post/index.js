'use client'

import { useContext, useState } from 'react'
import { jwtDecode } from 'jwt-decode'

import UserContext from '@/context/user-context'
import SnackbarContext from '@/context/snackbar-context'
import { SEVERITY } from '@/hooks/use-error-handler'
import Modal from '../layout/modal'
import NewPostForm from '../new-post-form'
import Button from '../UI/button'

const CreateNewPost = ({ posts, setPosts }) => {
  const [ showModal, setShowModal ] = useState(false)
  const { userToken } = useContext(UserContext)
  const { snackbarHandler } = useContext(SnackbarContext)

  const onOpenNewPostModal = (actionType) => {
    if(!userToken || !jwtDecode(userToken).isVerified) {
      snackbarHandler('Musisz być zalogowany, a konto zweryfikowane aby móc dodawać, aktualizować i usuwać posty', SEVERITY.ERROR)
      return
    }
    setShowModal(true)
  }

  return (
    <>
      <Button text="Utwórz nowy wpis" action={() => onOpenNewPostModal()}/>

      {showModal &&
        <Modal onClose={() => setShowModal(false)}>
          <NewPostForm setShowModal={setShowModal} posts={posts} setPosts={setPosts} />
        </Modal>
      }
    </>
  )
}

export default CreateNewPost