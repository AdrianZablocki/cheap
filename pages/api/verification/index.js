import { createRouter } from 'next-connect'

import dbConnect from '@/backend/config/db-connect'
import { sendVerificationEmail } from '@/backend/controllers/email-controller';


const router = createRouter();

dbConnect()

router.post(sendVerificationEmail)

export default router.handler()