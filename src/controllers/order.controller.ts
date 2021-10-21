import { StatusCodes } from 'http-status-codes'
import { ErrorHandler, errors } from '../errors'
import { orderService, userService } from '../services'

class orderController {
  async getOrderById(req, res, next) {
    try {
      const { id } = req.params
      const order = await orderService.findById(id)

      if (!order) {
        return next(
          new ErrorHandler(
            StatusCodes.NOT_FOUND,
            errors.ORDER_NOT_FOUNT.message,
            errors.ORDER_NOT_FOUNT.code,
          ),
        )
      }

      res.send({
        status: 'ok',
        data: order,
      })
    } catch (err) {
      return next(new ErrorHandler(err?.status, err?.code, err?.message))
    }
  }

  async getAll(req, res, next) {
    try {
      const orders = await orderService.findAll()

      res.send({
        status: 'ok',
        data: orders,
      })
    } catch (err) {
      return next(new ErrorHandler(err?.status, err?.code, err?.message))
    }
  }

  async updateOrderById(req, res, next) {
    try {
      const updatedOrder = await orderService.updateOrderByParams(
        { customer: req.user.id },
        {
          ...req.body,
        },
      )

      res.send({
        status: 'ok',
        data: updatedOrder,
      })
    } catch (err) {
      return next(new ErrorHandler(err?.status, err?.code, err?.message))
    }
  }

  async createOrder(req, res, next) {
    try {
      const user = await userService.findById(req.user.id)

      if (user.role !== 'customer') {
        return next(
          new ErrorHandler(
            StatusCodes.BAD_REQUEST,
            errors.MUST_BE_CUSTOMER.message,
            errors.MUST_BE_CUSTOMER.code,
          ),
        )
      }

      const order = await orderService.createOrder({
        customer: req.user.id,
        createdAt: new Date(),
        responses: [],
        executor: null,
        active: true,
        views: 0,
        ...req.body,
      })

      res.send({
        status: 'ok',
        data: order,
      })
    } catch (err) {
      return next(new ErrorHandler(err?.status, err?.code, err?.message))
    }
  }

  async selectExecutor(req, res, next) {
    try {
      const { id, userId } = req.body

      const user = await userService.findById(req.user.id)

      if (user.role !== 'customer') {
        return next(
          new ErrorHandler(
            StatusCodes.BAD_REQUEST,
            errors.MUST_BE_CUSTOMER.message,
            errors.MUST_BE_CUSTOMER.code,
          ),
        )
      }

      const order = await orderService.findById(id)

      if (!order) {
        return next(
          new ErrorHandler(
            StatusCodes.NOT_FOUND,
            errors.ORDER_NOT_FOUNT.message,
            errors.ORDER_NOT_FOUNT.code,
          ),
        )
      }

      const updatedOrder = await orderService.updateOrderByParams(
        { _id: id },
        { executor: userId, responses: [] },
      )

      await res.send({
        status: 'ok',
        data: updatedOrder,
      })
    } catch (err) {
      return next(new ErrorHandler(err?.status, err?.code, err?.message))
    }
  }

  async addResponse(req, res, next) {
    try {
      const { id, budgetMin, budgetMax, timeMin, timeMax, description } =
        req.body

      const order = await orderService.findById(id)

      if (!order) {
        return next(
          new ErrorHandler(
            StatusCodes.NOT_FOUND,
            errors.ORDER_NOT_FOUNT.message,
            errors.ORDER_NOT_FOUNT.code,
          ),
        )
      }

      await orderService.updateOrderByParams(
        { _id: id },
        {
          responses: [
            ...order.responses,
            {
              executor: req.user.id,
              description,
              budgetMin,
              budgetMax,
              timeMin,
              timeMax,
            },
          ],
          views: order.views + 1,
        },
      )

      res.send({
        status: 'ok',
      })
    } catch (err) {
      return next(new ErrorHandler(err?.status, err?.code, err?.message))
    }
  }

  async deactivateActivateOrder(req, res, next) {
    try {
      const { id } = req.body
      const order = await orderService.findById(id)

      if (!order) {
        return next(
          new ErrorHandler(
            StatusCodes.NOT_FOUND,
            errors.ORDER_NOT_FOUNT.message,
            errors.ORDER_NOT_FOUNT.code,
          ),
        )
      }

      console.log(order.customer, req.user.id, order.customer != req.user.id)

      if (order.customer != req.user.id) {
        return next(
          new ErrorHandler(
            StatusCodes.BAD_REQUEST,
            errors.ORDER_NOT_YOUR.message,
            errors.ORDER_NOT_YOUR.code,
          ),
        )
      }

      await orderService.updateOrderByParams(
        { _id: id },
        { active: !order.active },
      )

      res.send({
        status: 'ok',
      })
    } catch (err) {
      return next(new ErrorHandler(err?.status, err?.code, err?.message))
    }
  }

  async deleteOrder(req, res, next) {
    try {
      const { id } = req.body
      const order = await orderService.findById(id)

      if (!order) {
        return next(
          new ErrorHandler(
            StatusCodes.NOT_FOUND,
            errors.ORDER_NOT_FOUNT.message,
            errors.ORDER_NOT_FOUNT.code,
          ),
        )
      }

      if (order.customer != req.user.id) {
        return next(
          new ErrorHandler(
            StatusCodes.BAD_REQUEST,
            errors.ORDER_NOT_YOUR.message,
            errors.ORDER_NOT_YOUR.code,
          ),
        )
      }

      await orderService.deleteOrder(id)

      res.send({
        status: 'ok',
      })
    } catch (err) {
      return next(new ErrorHandler(err?.status, err?.code, err?.message))
    }
  }
}

export const OrderController = new orderController()
