import { createRouter } from 'next-connect'

import dbConnect from '@/backend/config/db-connect'
import { createUser, getUsers } from '@/backend/controllers/user-controller'
import { auth } from '@/middleware/auth'

const router = createRouter();

dbConnect()

router.use(auth).get(getUsers)
router.post(createUser)

export default router.handler()