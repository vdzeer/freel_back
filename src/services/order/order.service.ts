import { UpdateWriteOpResult } from 'mongoose'
import { TOrder } from '../../@types'
import { OrderModel } from '../../models'

class OrderService {
  createOrder(order: Partial<TOrder>): Promise<TOrder> {
    const orderToCreate = new OrderModel(order)
    return orderToCreate.save()
  }

  findAll(skip?, limit?): Promise<TOrder[]> {
    return OrderModel.find({ active: true }).populate('customer').lean().exec()
  }

  updateOrderByParams(
    params: Partial<TOrder>,
    update: Partial<TOrder>,
  ): Promise<UpdateWriteOpResult> {
    return OrderModel.updateOne(params, update, { new: true }).exec()
  }

  findById(id: string): TOrder {
    return OrderModel.findById(id).lean().exec()
  }

  deleteOrder(id: string): void {
    return OrderModel.findByIdAndDelete(id)
  }
}

export const orderService = new OrderService()
