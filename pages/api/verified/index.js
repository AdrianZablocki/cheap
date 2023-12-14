import { createRouter } from 'next-connect'

import dbConnect from '@/backend/config/db-connect'
import { verifyUser } from '@/backend/controllers/auth-controller';

const router = createRouter();

dbConnect()

router.post(verifyUser)

export default router.handler()