import { createRouter } from 'next-connect'

import dbConnect from '@/backend/config/db-connect'
import { deletePost, getPost, updatePost } from '@/backend/controllers/posts-controller'
import { auth } from '@/middleware/auth'

const router = createRouter();

dbConnect()

router.get(getPost)
router.use(auth).delete(deletePost)
router.use(auth).put(updatePost)

export default router.handler()