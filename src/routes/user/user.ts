import { Router } from 'express'
import { checkAccessTokenMiddleware } from '../../middleware'
import { UserController } from '../../controllers'
import { fileLoaderService } from '../../services'

const router = Router()

router.get('/:id', UserController.getUserById)
router.post(
  '/update',
  fileLoaderService.file('avatar', /image\/(png|jpeg|giff)/, false),
  checkAccessTokenMiddleware,
  UserController.updateUserById,
)
router.post(
  '/update-password',
  checkAccessTokenMiddleware,
  UserController.changePassword,
)

export const userRouter = router
