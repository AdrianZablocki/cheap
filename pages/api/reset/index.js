import { createRouter } from 'next-connect'

import dbConnect from '@/backend/config/db-connect'
import { resetPassword } from '@/backend/controllers/auth-controller'

const router = createRouter();

dbConnect()

router.post(resetPassword)

export default router.handler()
