import { Router } from 'express'
import { checkAccessTokenMiddleware } from '../../middleware'
import { UserController, AdminController } from '../../controllers'
import { fileLoaderService } from '../../services'

const router = Router()

router.get('/get-all-users', AdminController.getAllUsers)

router.post(
  '/update-user',
  fileLoaderService.file('avatar', /image\/(png|jpeg|giff)/, false),
  checkAccessTokenMiddleware,
  UserController.updateUserById,
)

router.post(
  '/update-user-password',
  checkAccessTokenMiddleware,
  UserController.changePassword,
)

router.post(
  '/block-user',
  checkAccessTokenMiddleware,
  UserController.createFeedback,
)

router.post(
  '/change-user-premium',
  checkAccessTokenMiddleware,
  UserController.createFeedback,
)

router.get('/user/:id', UserController.getUserById)

export const adminRouter = router
