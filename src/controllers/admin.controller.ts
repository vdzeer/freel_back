import { StatusCodes } from 'http-status-codes'
import * as bcrypt from 'bcrypt'
import { ErrorHandler, errors } from '../errors'
import {
  feedbackService,
  orderService,
  adminService,
  userService,
} from '../services'
import { config } from '../config'
import { Types } from 'mongoose'

const jwt = require('jsonwebtoken')

const generateAccessToken = id => {
  const payload = {
    id,
  }
  return jwt.sign(payload, config.JWT_SECRET, { expiresIn: '100h' })
}

class adminController {
  async registration(req, res, next) {
    try {
      const { email, password } = req.body
      const candidate = await adminService.findOneByParams({ email })

      if (candidate) {
        return next(
          new ErrorHandler(
            StatusCodes.BAD_REQUEST,
            errors.USER_ALREADY_EXIST.message,
            errors.USER_ALREADY_EXIST.code,
          ),
        )
      }

      const hashPassword = await bcrypt.hash(password, 7)

      const admin = await adminService.createAdmin({
        ...req.body,
        createdAt: new Date(),
        password: hashPassword,
      })

      const newAdmin = await adminService.findOneByParams({
        email: admin.email,
      })

      const token = generateAccessToken(newAdmin._id)

      res.json({
        data: newAdmin,
        token,
      })
    } catch (err) {
      return next(new ErrorHandler(err?.status, err?.code, err?.message))
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body
      const candidate = await adminService.findOneByParams({ email })
      if (!candidate) {
        return next(
          new ErrorHandler(
            StatusCodes.NOT_FOUND,
            errors.ADMIN_EMAIL_NOT_FOUND.message,
            errors.ADMIN_EMAIL_NOT_FOUND.code,
          ),
        )
      }

      const validPassword = await bcrypt.compare(password, candidate.password)

      if (!validPassword) {
        return next(
          new ErrorHandler(
            StatusCodes.BAD_REQUEST,
            errors.INVALID_PASSWORD.message,
            errors.INVALID_PASSWORD.code,
          ),
        )
      }
      const token = generateAccessToken(candidate._id)

      res.json({
        data: candidate,
        token,
      })
    } catch (err) {
      return next(new ErrorHandler(err?.status, err?.code, err?.message))
    }
  }

  async getAllUsers(req, res, next) {
    try {
      const users = await userService.findAll()

      const getOwnOrders = async item => {
        return await orderService.findYourself(item)
      }

      const getData = async () => {
        return Promise.all(users.map(item => getOwnOrders(item._id)))
      }

      getData().then(data => {
        const usersList = users.map((el, index) => {
          return {
            ...el,
            ordersLength: data[index].length,
          }
        })

        res.send({
          status: 'ok',
          data: usersList,
        })
      })
    } catch (err) {
      return next(new ErrorHandler(err?.status, err?.code, err?.message))
    }
  }

  async updateUserById(req, res, next) {
    try {
      const { id, ...other } = req.body

      await userService.updateUserByParams(
        { _id: id },
        {
          ...other,
        },
      )

      req?.file &&
        (await userService.updateUserByParams(
          { _id: id },
          { avatar: await req.file.copy(['users', id.toString()]) },
        ))

      const updatedUser = await userService.findOneByParams({
        _id: id,
      })

      res.send({
        status: 'ok',
        data: updatedUser,
      })
    } catch (err) {
      return next(new ErrorHandler(err?.status, err?.code, err?.message))
    }
  }

  async changePassword(req, res, next) {
    try {
      const { password, id } = req.body

      const hashPassword = await bcrypt.hash(password, 7)

      await userService.updateUserByParams(
        { _id: id },
        { password: hashPassword },
      )

      res.send({
        status: 'ok',
      })
    } catch (err) {
      return next(new ErrorHandler(err.status, err?.code, err?.message))
    }
  }

  async blockUnblockUser(req, res, next) {
    try {
      const { id } = req.body

      const user = await userService.findById(id)

      await userService.updateUserByParams(
        { _id: id },
        { blocked: !user.blocked ?? true },
      )

      res.send({
        status: 'ok',
      })
    } catch (err) {
      return next(new ErrorHandler(err?.status, err?.code, err?.message))
    }
  }

  async deleteUser(req, res, next) {
    try {
      const { id } = req.body

      await userService.deleteById(id)

      res.send({
        status: 'ok',
      })
    } catch (err) {
      return next(new ErrorHandler(err?.status, err?.code, err?.message))
    }
  }

  async getAllOrders(req, res, next) {
    try {
      const activeOrders = await orderService.findAll()

      const unconfirmedOrders = await orderService.findUnconfirmed()

      const archivedOrders = await orderService.findArchive()

      res.send({
        status: 'ok',
        data: {
          activeOrders,
          unconfirmedOrders,
          archivedOrders,
        },
      })
    } catch (err) {
      return next(new ErrorHandler(err?.status, err?.code, err?.message))
    }
  }

  async confirmOrder(req, res, next) {
    try {
      await orderService.updateOrderByParams(
        { _id: req.body.id },
        {
          confirmed: true,
        },
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
      await orderService.deleteOrder(req.body.id)

      res.send({
        status: 'ok',
      })
    } catch (err) {
      return next(new ErrorHandler(err?.status, err?.code, err?.message))
    }
  }
}

export const AdminController = new adminController()
