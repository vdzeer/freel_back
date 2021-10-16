import { StatusCodes } from 'http-status-codes'
import * as bcrypt from 'bcrypt'
import { ErrorHandler, errors } from '../errors'
import { feedbackService, userService } from '../services'
import { config } from '../config'

const jwt = require('jsonwebtoken')

const generateAccessToken = id => {
  const payload = {
    id,
  }
  return jwt.sign(payload, config.JWT_SECRET, { expiresIn: '100h' })
}

class authController {
  async registration(req, res, next) {
    try {
      const { login, password } = req.body
      const candidate = await userService.findOneByParams({ login })

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

      const user = await userService.createUser({
        ...req.body,
        cash: 0,
        rate: 0,
        city: '',
        country: '',
        birthDay: null,
        description: '',
        inWorkStatus: false,
        createdAt: new Date(),
        password: hashPassword,
      })

      const newUser = await userService.findById(user._id)

      const token = generateAccessToken(newUser._id)

      res.json({
        data: { ...newUser, feedbacks: [] },
        token,
      })
    } catch (err) {
      return next(new ErrorHandler(err?.status, err?.code, err?.message))
    }
  }

  async login(req, res, next) {
    try {
      const { login, password } = req.body
      const candidate = await userService.findOneByParams({ login })
      if (!candidate) {
        return next(
          new ErrorHandler(
            StatusCodes.NOT_FOUND,
            errors.USER_NOT_FOUND.message,
            errors.USER_NOT_FOUND.code,
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

      const feedbacks = await feedbackService.findAllByUserId({
        userId: candidate._id,
      })

      const feedbacksWithCustomerInfo = await Promise.all(
        feedbacks.map(async el => {
          const customer = await userService.findById(el.customerId)
          return {
            ...el,
            customer,
          }
        }),
      )

      res.json({
        data: { ...candidate, feedbacks: feedbacksWithCustomerInfo },
        token,
      })
    } catch (err) {
      return next(new ErrorHandler(err?.status, err?.code, err?.message))
    }
  }

  async getUserById(req, res, next) {
    try {
      const { id } = req.params
      const user = await userService.findById(id)

      const feedbacks = await feedbackService.findAllByUserId({
        userId: user._id,
      })

      const feedbacksWithCustomerInfo = await Promise.all(
        feedbacks.map(async el => {
          const customer = await userService.findById(el.customerId)
          return {
            ...el,
            customer,
          }
        }),
      )

      res.send({
        status: 'ok',
        data: { ...user, feedbacks: feedbacksWithCustomerInfo },
      })
    } catch (err) {
      return next(new ErrorHandler(err?.status, err?.code, err?.message))
    }
  }

  async getAllUsers(req, res, next) {
    try {
      const users = await userService.findAll()

      res.send({
        status: 'ok',
        data: users,
      })
    } catch (err) {
      return next(new ErrorHandler(err?.status, err?.code, err?.message))
    }
  }

  async updateUserById(req, res, next) {
    try {
      await userService.updateUserByParams(
        { _id: req.user.id },
        {
          ...req.body,
        },
      )

      req?.file &&
        (await userService.updateUserByParams(
          { _id: req.user.id },
          { avatar: await req.file.copy(['users', req.user.id.toString()]) },
        ))

      const updatedUser = await userService.findOneByParams({
        _id: req.user.id,
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
      const { oldPassword, password } = req.body

      const user = await userService.findOneByParams({ _id: req.user.id })

      const isPasswordEquals = await bcrypt.compare(oldPassword, user.password)

      if (!isPasswordEquals) {
        return next(
          new ErrorHandler(
            StatusCodes.BAD_REQUEST,
            errors.PASSWORD_IS_NOT_EQUAL.message,
            errors.PASSWORD_IS_NOT_EQUAL.code,
          ),
        )
      }

      const hashPassword = await bcrypt.hash(password, 7)

      await userService.updateUserByParams(
        { _id: req.user.id },
        { password: hashPassword },
      )

      res.send({
        status: 'ok',
      })
    } catch (err) {
      return next(new ErrorHandler(err.status, err?.code, err?.message))
    }
  }

  async createFeedback(req, res, next) {
    try {
      const { userId, description, rate } = req.body

      const feedback = await feedbackService.createFeedback({
        customerId: req.user.id,
        createdAt: new Date(),
        description,
        userId,
        rate,
      })

      const user = await userService.findById(userId)

      const newRate = user.feedbacks?.length
        ? (user.feedbacks.reduce((acc, el) => acc + el.rate, 0) + rate) /
            user.feedbacks.length +
          1
        : rate

      await userService.updateUserByParams({ _id: userId }, { rate: newRate })

      res.send({
        status: 'ok',
        data: feedback,
      })
    } catch (err) {
      return next(new ErrorHandler(err?.status, err?.code, err?.message))
    }
  }
}

export const UserController = new authController()
