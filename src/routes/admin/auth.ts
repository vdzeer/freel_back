import { Router } from 'express'
import {
  checkIsValidRegistrationAdminMiddleware,
  checkIsValidLoginAdminMiddleware,
  checkIsAdminExistMiddleware,
} from '../../middleware'

import { AdminController } from '../../controllers'

const router = Router()

router.post(
  '/registration',
  checkIsValidRegistrationAdminMiddleware,
  AdminController.registration,
)
router.post(
  '/login',
  checkIsValidLoginAdminMiddleware,
  checkIsAdminExistMiddleware,
  AdminController.login,
)
router.post(
  '/send-code',
  checkIsAdminExistMiddleware,
  AdminController.resetPasswordQuery,
)
router.post(
  '/reset-password',
  AdminController.resetPasswordConfirm,
)

export const authRouter = router
