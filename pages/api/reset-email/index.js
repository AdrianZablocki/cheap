import { createRouter } from 'next-connect'

import dbConnect from '@/backend/config/db-connect'
import { sendResetPasswordEmail } from '@/backend/controllers/email-controller';

const router = createRouter();

dbConnect()

router.post(sendResetPasswordEmail)

export default router.handler()
