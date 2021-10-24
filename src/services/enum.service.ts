import { UpdateWriteOpResult } from 'mongoose'
import { TEnum } from '../@types'
import { EnumModel } from '../models'

class EnumService {
  createUser(user: Partial<TEnum>): Promise<TEnum> {
    const userToCreate = new EnumModel(user)
    return userToCreate.save()
  }

  updateByParams(
    params: Partial<TEnum>,
    update: Partial<TEnum>,
  ): Promise<UpdateWriteOpResult> {
    return EnumModel.updateOne(params, update, { new: true }).exec()
  }

  findOneByParams(findObject: Partial<TEnum>): Promise<TEnum | null> {
    return EnumModel.findOne(findObject).lean().exec()
  }
}

export const enumService = new EnumService()
