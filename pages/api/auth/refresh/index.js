import { createRouter } from 'next-connect'

import dbConnect from '@/backend/config/db-connect'
import { refreshToken } from '@/backend/controllers/auth-controller'

const router = createRouter();

dbConnect()

router.post(refreshToken)

export default router.handler()