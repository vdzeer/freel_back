import { Router } from 'express'
import {
  checkAccessTokenMiddleware,
  checkIsValidOrderMiddleware,
} from '../../middleware'
import { OrderController } from '../../controllers'

const router = Router()

router.get('/getAll', OrderController.getAll)

router.post(
  '/update',
  checkAccessTokenMiddleware,
  OrderController.updateOrderById,
)

router.post(
  '/create',
  checkAccessTokenMiddleware,
  checkIsValidOrderMiddleware,
  OrderController.createOrder,
)

router.post(
  '/select-executor',
  checkAccessTokenMiddleware,
  OrderController.selectExecutor,
)

router.post(
  '/add-response',
  checkAccessTokenMiddleware,
  OrderController.addResponse,
)

router.post(
  '/change-active',
  checkAccessTokenMiddleware,
  OrderController.deactivateActivateOrder,
)

router.post('/delete', checkAccessTokenMiddleware, OrderController.deleteOrder)

router.get('/:id', OrderController.getOrderById)

export const orderRouter = router
