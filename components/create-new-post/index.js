'use client'

import { useState } from 'react'

import Modal from '../layout/modal'
import NewPostForm from '../new-post-form'
import Button from '../UI/button'

const CreateNewPost = ({ posts, setPosts }) => {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <Button text="Utwórz nowy wpis" action={() => setShowModal(true)}/>

      {showModal &&
        <Modal onClose={() => setShowModal(false)}>
          <NewPostForm setShowModal={setShowModal} posts={posts} setPosts={setPosts} />
        </Modal>
      }
    </>
  )
}

export default CreateNewPost