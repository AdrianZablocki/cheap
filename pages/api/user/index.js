import { createRouter } from 'next-connect'

import dbConnect from '@/backend/config/db-connect'
import { createUser } from '@/backend/controllers/user-controller'

const router = createRouter();

dbConnect()

router.post(createUser)

export default router.handler()