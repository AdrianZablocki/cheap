import { createRouter } from 'next-connect'

import dbConnect from '@/backend/config/db-connect'
import { getPosts } from '@/backend/controllers/post-controller'

const router = createRouter();

dbConnect()

router.get(getPosts)

export default router.handler()
