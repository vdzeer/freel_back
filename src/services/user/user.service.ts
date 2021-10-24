import { Types, UpdateWriteOpResult } from 'mongoose'
import { User } from '../../@types'
import { UserModel } from '../../models'

class UserService {
  createUser(user: Partial<User>): Promise<User> {
    const userToCreate = new UserModel(user)
    return userToCreate.save()
  }

  updateUserByParams(
    params: Partial<User>,
    update: Partial<User>,
  ): Promise<UpdateWriteOpResult> {
    return UserModel.updateOne(params, update, { new: true }).exec()
  }

  findOneByParams(findObject: Partial<User>): Promise<User | null> {
    return UserModel.findOne(findObject).lean().exec()
  }

  findAll(skip?, limit?): Promise<User[]> {
    return UserModel.find().lean().exec()
  }

  findById(id: string, skip?, limit?): Promise<User> {
    return UserModel.findById(id).lean().exec()
  }

  deleteById(id: string, skip?, limit?): Promise<User> {
    return UserModel.remove({ _id: id })
  }
}

export const userService = new UserService()
