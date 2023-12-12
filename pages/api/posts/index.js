import { createRouter } from 'next-connect'

import dbConnect from '@/backend/config/db-connect'
import { createPost, getPosts } from '@/backend/controllers/posts-controller'

import { auth } from '@/middleware/auth'

const router = createRouter();

dbConnect()

router.get(getPosts)
router.use(auth).post(createPost)
router.post(createPost)

export default router.handler()
