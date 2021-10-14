import { Router } from 'express'
import { checkAccessTokenMiddleware } from '../../middleware'
import { UserController } from '../../controllers'

const router = Router()

router.get('/:id', UserController.getUserById)
router.post(
  '/update',
  checkAccessTokenMiddleware,
  UserController.updateUserById,
)
router.post(
  '/update-password',
  checkAccessTokenMiddleware,
  UserController.changePassword,
)

export const userRouter = router
