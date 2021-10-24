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
  AdminController.updateUserById,
)

router.post(
  '/update-user-password',
  checkAccessTokenMiddleware,
  AdminController.changePassword,
)

router.post(
  '/block-unblock-user',
  checkAccessTokenMiddleware,
  AdminController.blockUnblockUser,
)

router.get('/user/:id', UserController.getUserById)

export const adminRouter = router
