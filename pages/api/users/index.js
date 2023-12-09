import { createRouter } from 'next-connect'

import dbConnect from '@/backend/config/db-connect'
import { createUser, getUsers } from '@/backend/controllers/user-controller'

const router = createRouter();

dbConnect()

router.get(getUsers)
router.post(createUser)

export default router.handler()