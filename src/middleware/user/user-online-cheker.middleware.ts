import { NextFunction, Response } from 'express'
import { userService } from '../../services'
import { config } from '../../config'
const jwt = require('jsonwebtoken')

export const userOnlineMiddleware = async (
  req: any,
  res: Response,
  next: NextFunction,
): Promise<void | NextFunction> => {
  let token = req.get('Authorization')

  token = token.split(' ')?.[1]

  if (token) {
    const decodedData = jwt.verify(token, config.JWT_SECRET)

    await userService.updateUserByParams(
      { _id: decodedData?.id },
      { online: true },
    )

    setTimeout(async () => {
      await userService.updateUserByParams(
        { _id: decodedData?.id },
        { online: false },
      )
    }, 1000 * 60)
  }

  next()
}
