import { NextFunction, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

import { ErrorHandler, errors } from '../../errors'
import { adminService } from '../../services'

export const checkIsAdminExistMiddleware = async (
  req: any,
  res: Response,
  next: NextFunction,
): Promise<void | NextFunction> => {
  const { email } = req.body
  const adminByEmail = await adminService.findOneByParams({ email })

  if (!adminByEmail) {
    return next(
      new ErrorHandler(
        StatusCodes.NOT_FOUND,
        errors.ADMIN_EMAIL_NOT_FOUND.message,
        errors.ADMIN_EMAIL_NOT_FOUND.code,
      ),
    )
  }

  req.user = adminByEmail
  next()
}
