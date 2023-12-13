import { createRouter } from 'next-connect'

import dbConnect from '@/backend/config/db-connect'
import { getUser, updateUser, deleteUser } from '@/backend/controllers/user-controller'
import { auth } from '@/middleware/auth'

const router = createRouter();

dbConnect()

router.use(auth).get(getUser)
router.use(auth).delete(deleteUser)
router.use(auth).put(updateUser)

export default router.handler()
