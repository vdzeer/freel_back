import { UpdateWriteOpResult } from 'mongoose'
import { AdminModel } from '../../models'
import { TAdmin } from '../../@types'

class AdminService {
  createAdmin(admin: Partial<TAdmin>): Promise<TAdmin> {
    const adminToCreate = new AdminModel(admin)
    return adminToCreate.save()
  }

  updateByParams(
    params: Partial<TAdmin>,
    update: Partial<TAdmin>,
  ): Promise<UpdateWriteOpResult> {
    return AdminModel.updateOne(params, update, { new: true }).exec()
  }

  findOneByParams(findObject: Partial<TAdmin>): Promise<TAdmin | null> {
    return AdminModel.findOne(findObject).lean().exec()
  }
}

export const adminService = new AdminService()
