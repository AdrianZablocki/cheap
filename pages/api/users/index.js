import { createRouter } from 'next-connect'

import dbConnect from '@/backend/config/db-connect'
import { getUsers } from '@/backend/controllers/user-controller'
import { auth } from '@/middleware/auth'

const router = createRouter();

dbConnect()

router.use(auth).get(getUsers)

export default router.handler()