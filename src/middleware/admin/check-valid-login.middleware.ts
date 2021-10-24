import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

import { adminLoginValidator } from '../../validators'
import { ErrorHandler, errors } from '../../errors'

export const checkIsValidLoginAdminMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { error } = adminLoginValidator.validate(req.body)
  if (error) {
    return next(
      new ErrorHandler(
        StatusCodes.BAD_REQUEST,
        error.details[0].message,
        errors.VALIDATION_ERROR.code,
      ),
    )
  }

  next()
}
