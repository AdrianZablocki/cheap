import { createRouter } from 'next-connect'

import dbConnect from '@/backend/config/db-connect'
import { createPost, getPosts } from '@/backend/controllers/posts-controller'

const router = createRouter();

dbConnect()

router.get(getPosts)
router.post(createPost)

export default router.handler()
