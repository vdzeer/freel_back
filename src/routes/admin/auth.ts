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

export const authRouter = router
