import { createRouter } from 'next-connect'

import dbConnect from '@/backend/config/db-connect'
import { getUser, updateUser, deleteUser } from '@/backend/controllers/user-controller'

const router = createRouter();

dbConnect()

router.get(getUser)
router.delete(deleteUser)
router.put(updateUser)

export default router.handler()
