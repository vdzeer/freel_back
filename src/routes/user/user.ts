import { Router } from 'express'
import {
  userOnlineMiddleware,
  checkAccessTokenMiddleware,
  checkIsValidFeedbackMiddleware,
} from '../../middleware'
import { UserController } from '../../controllers'
import { fileLoaderService } from '../../services'

const router = Router()

router.get('/getAll', UserController.getAllUsers)
router.get('/get-best', UserController.getBestUsers)
router.get('/get-enums', UserController.getEnums)

router.post(
  '/update',
  fileLoaderService.file('avatar', /image\/(png|jpeg|giff)/, false),
  checkAccessTokenMiddleware,
  userOnlineMiddleware,
  UserController.updateUserById,
)

router.post(
  '/update-password',
  checkAccessTokenMiddleware,
  userOnlineMiddleware,
  UserController.changePassword,
)

router.post('/create-support', UserController.createSupport)

router.post(
  '/create-feedback',
  checkAccessTokenMiddleware,
  checkIsValidFeedbackMiddleware,
  userOnlineMiddleware,
  UserController.createFeedback,
)

router.get('/:id', UserController.getUserById)

router.post('/sendEmail', UserController.sendEmail)

export const userRouter = router
