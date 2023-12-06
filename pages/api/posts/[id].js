import { createRouter } from 'next-connect'

import dbConnect from '@/backend/config/db-connect'
import { deletePost, getPost, updatePost } from '@/backend/controllers/posts-controller'

const router = createRouter();

dbConnect()

router.get(getPost)
router.delete(deletePost)
router.put(updatePost)

export default router.handler()