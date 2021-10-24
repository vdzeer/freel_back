import { Router } from 'express'
import {
  checkAccessTokenMiddleware,
  checkIsValidFeedbackMiddleware,
} from '../../middleware'
import { UserController } from '../../controllers'
import { fileLoaderService } from '../../services'

const router = Router()

router.get('/getAll', UserController.getAllUsers)

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

router.post(
  '/create-feedback',
  checkAccessTokenMiddleware,
  checkIsValidFeedbackMiddleware,
  UserController.createFeedback,
)

router.get('/:id', UserController.getUserById)

export const adminRouter = router
