import { Router } from 'express'
import { checkAccessTokenMiddleware } from '../../middleware'
import {
  UserController,
  AdminController,
  OrderController,
} from '../../controllers'
import { fileLoaderService } from '../../services'

const router = Router()

router.get('/get-all-users', AdminController.getAllUsers)

router.get('/get-all-orders/:reverse?', AdminController.getAllOrders)

router.get('/get-info', AdminController.getEnums)

router.get('/get-max', AdminController.getMax)

router.post(
  '/confirm-order',
  checkAccessTokenMiddleware,
  AdminController.confirmOrder,
)

router.post(
  '/delete-order',
  checkAccessTokenMiddleware,
  AdminController.deleteOrder,
)

router.post(
  '/update-user',
  fileLoaderService.file('avatar', /image\/(png|jpeg|giff)/, false),
  checkAccessTokenMiddleware,
  AdminController.updateUserById,
)

router.post(
  '/update-order',
  checkAccessTokenMiddleware,
  AdminController.updateOrder,
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

router.post(
  '/delete-user',
  checkAccessTokenMiddleware,
  AdminController.deleteUser,
)

router.post(
  '/set-order-query',
  checkAccessTokenMiddleware,
  AdminController.setOrderQuery,
)

router.post(
  '/set-max-price',
  checkAccessTokenMiddleware,
  AdminController.setMaxPrice,
)

router.post(
  '/set-info-page',
  checkAccessTokenMiddleware,
  AdminController.setInfoPageQuery,
)

router.get('/user/:id', UserController.getUserById)

router.get('/order/:id', OrderController.getOrderById)

export const adminRouter = router
