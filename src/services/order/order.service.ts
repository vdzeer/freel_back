import { Types, UpdateWriteOpResult } from 'mongoose'
import { TOrder } from '../../@types'
import { OrderModel } from '../../models'

class OrderService {
  createOrder(order: Partial<TOrder>): Promise<TOrder> {
    const orderToCreate = new OrderModel(order)
    return orderToCreate.save()
  }

  findOrders(skip?, limit?): Promise<TOrder[]> {
    return OrderModel.find({ active: true, confirmed: true })
      .populate('customer')
      .lean()
      .exec()
  }

  findAll(skip?, limit?): Promise<TOrder[]> {
    return OrderModel.find({ active: true, confirmed: true, status: undefined })
      .populate('customer')
      .lean()
      .exec()
  }

  findUnconfirmed(skip?, limit?): Promise<TOrder[]> {
    return OrderModel.find({ confirmed: false })
      .populate('customer')
      .lean()
      .exec()
  }

  findArchive(skip?, limit?): Promise<TOrder[]> {
    return OrderModel.find({ active: false }).populate('customer').lean().exec()
  }

  findYourself(customerId, skip?, limit?): Promise<TOrder[]> {
    return OrderModel.find({ customer: customerId, status: undefined })
      .populate('customer')
      .lean()
      .exec()
  }

  updateOrderByParams(
    params: Partial<TOrder>,
    update: Partial<TOrder>,
  ): Promise<UpdateWriteOpResult> {
    return OrderModel.updateOne(params, update, { new: true }).exec()
  }

  findById(id: string): TOrder {
    return OrderModel.findById(id).populate('customer').lean().exec()
  }

  deleteOrder(id: string): void {
    return OrderModel.findByIdAndDelete(id)
  }
}

export const orderService = new OrderService()
