import { createRouter } from 'next-connect'

import dbConnect from '@/backend/config/db-connect'
import { changePassword } from '@/backend/controllers/user-controller'

const router = createRouter();

dbConnect()

router.put(changePassword)

export default router.handler()