import { NextFunction, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

import { ErrorHandler, errors } from '../../errors'
import { userService } from '../../services'

export const checkIsUserExistMiddleware = async (
  req: any,
  res: Response,
  next: NextFunction,
): Promise<void | NextFunction> => {
  const { login } = req.body
  const userByPhone = await userService.findOneByParams({ login })

  if (!userByPhone) {
    return next(
      new ErrorHandler(
        StatusCodes.NOT_FOUND,
        errors.USER_NOT_FOUND.message,
        errors.USER_NOT_FOUND.code,
      ),
    )
  }

  req.user = userByPhone
  next()
}
