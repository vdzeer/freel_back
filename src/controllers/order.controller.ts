import { TOrder } from './../@types/order'
import { StatusCodes, TOO_MANY_REQUESTS } from 'http-status-codes'
import { ErrorHandler, errors } from '../errors'
import { enumService, orderService, userService } from '../services'
import * as _ from 'lodash'
import e from 'express'

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

      const ordersQuery = await enumService.findOneByParams({
        name: 'ordersQuery',
      })

      let index = null
      for (let key in ordersQuery?.value) {
        if (ordersQuery.value[key] == order._id) index = key
      }

      res.send({
        status: 'ok',
        data: { ...order, position: index },
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
          createdAt: new Date(),
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
        confirmed: false,
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
        { executor: userId, responses: [], status: 'in work' },
      )

      await res.send({
        status: 'ok',
        data: updatedOrder,
      })
    } catch (err) {
      return next(new ErrorHandler(err?.status, err?.code, err?.message))
    }
  }

  async declineExecutor(req, res, next) {
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
        {
          responses: order.responses.map(el =>
            el.executor._id == userId ? { ...el, declined: true } : el,
          ),
        },
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

      const user = await userService.findById(req.user.id)

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
              executor: user,
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

  async confirmOrder(req, res, next) {
    try {
      const { id } = req.body

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

      await orderService.updateOrderByParams(
        { _id: id },
        { status: 'finished', active: false },
      )

      const executor = await userService.findById(order.executor._id)

      await userService.updateUserByParams(
        { _id: executor._id },
        {
          cash: executor.cash + order.price,
          cashHistory: executor?.cashHistory?.length
            ? [
                {
                  title: '?????????????????? ???????????? ???? ????????????:',
                  createdAt: new Date(),
                  cash: order.price,
                  status: 'add',
                },
                ...executor.cashHistory,
              ]
            : [
                {
                  title: '?????????????????? ???????????? ???? ????????????:',
                  createdAt: new Date(),
                  cash: order.price,
                  status: 'add',
                },
              ],
        },
      )
      await userService.updateUserByParams(
        { _id: user._id },
        {
          cash: user.cash - order.price,
          cashHistory: user?.cashHistory?.length
            ? [
                {
                  title: '???????????? ??????????:',
                  createdAt: new Date(),
                  cash: order.price,
                  status: 'del',
                },
                ...user.cashHistory,
              ]
            : [
                {
                  title: '???????????? ??????????:',
                  createdAt: new Date(),
                  cash: order.price,
                  status: 'del',
                },
              ],
        },
      )

      await res.send({
        status: 'ok',
      })
    } catch (err) {
      return next(new ErrorHandler(err?.status, err?.code, err?.message))
    }
  }

  async declineOrder(req, res, next) {
    try {
      const { id } = req.body

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

      await orderService.updateOrderByParams(
        { _id: id },
        { status: 'declined', active: false },
      )

      await res.send({
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

      if (order.customer._id != req.user.id) {
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

      if (order.customer._id != req.user.id) {
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

  async getAllOrders(req, res, next) {
    try {
      const { min, max, spec, premium, garant } = req.query

      const orders = await orderService.findAllSort(
        min,
        max,
        spec,
        !!premium,
        !!garant,
      )

      const ordersQuery = await enumService.findOneByParams({
        name: 'ordersQuery',
      })

      const getOrders = async item => {
        return await orderService.findById(item)
      }

      const getData = async () => {
        return Promise.all(
          Object.values(ordersQuery?.value).map(item =>
            item ? getOrders(item) : undefined,
          ),
        )
      }

      getData().then(data => {
        const arr = [
          ...data.filter(
            (el: TOrder) =>
              el &&
              (premium ? el.premium == premium : true) &&
              (garant ? el.garant == garant : true) &&
              (spec ? el.spec == spec : true) &&
              (min ? +el?.price >= min : true) &&
              (max ? +el?.price <= max : true),
          ),
          ...orders,
        ].filter(
          el => orders.findIndex(z => String(z._id) === String(el._id)) !== -1,
        )

        res.send({
          status: 'ok',
          data: _.uniqBy(arr, e => {
            return String(e._id)
          }),
        })
      })
    } catch (err) {
      return next(new ErrorHandler(err?.status, err?.code, err?.message))
    }
  }
}

export const OrderController = new orderController()
