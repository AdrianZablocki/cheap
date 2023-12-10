import { createRouter } from 'next-connect'

import dbConnect from '@/backend/config/db-connect'
import { authUser } from '@/backend/controllers/auth-controller'

const router = createRouter();

dbConnect()

router.post(authUser)

export default router.handler()