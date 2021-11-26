import { Types, UpdateWriteOpResult } from 'mongoose'
import { TOrder } from '../../@types'
import { OrderModel } from '../../models'

class OrderService {
  createOrder(order: Partial<TOrder>): Promise<TOrder> {
    const orderToCreate = new OrderModel(order)
    return orderToCreate.save()
  }

  findMyself(skip?, limit?): Promise<TOrder[]> {
    return OrderModel.find({ confirmed: true })
      .sort({ createdAt: -1 })
      .populate('customer')
      .lean()
      .exec()
  }

  findOrders(skip?, limit?): Promise<TOrder[]> {
    return OrderModel.find({ active: true, confirmed: true })
      .sort({ createdAt: -1 })
      .populate('customer')
      .lean()
      .exec()
  }

  findAll(skip?, limit?): Promise<TOrder[]> {
    return OrderModel.find({ active: true, confirmed: true, status: undefined })
      .sort({ createdAt: -1 })
      .populate('customer')
      .lean()
      .exec()
  }

  findAllSort(min, max, spec, premium, garant): Promise<TOrder[]> {
    const priceObj: any = {}

    if (min) priceObj.$gte = +min
    if (max) priceObj.$lte = +max

    const findObj = {
      [spec ? 'spec' : undefined]: spec?.toString(),
      [garant ? 'garant' : undefined]: garant ? true : undefined,
      [min || max ? 'price' : undefined]: min || max ? priceObj : undefined,

      [premium ? 'premium' : undefined]: premium ? true : undefined,
    }

    return OrderModel.find({
      active: true,
      confirmed: true,
      status: undefined,
      ...findObj,
    })
      .sort({ createdAt: -1 })
      .populate('customer')
      .lean()
      .exec()
  }

  findByName(name): Promise<TOrder[]> {
    const regex = `^${name}`
    return OrderModel.find({
      active: true,
      confirmed: true,
      status: undefined,
      title: { $regex: regex, $options: 'i' },
    })
      .sort({ createdAt: -1 })
      .populate('customer')
      .lean()
      .exec()
  }

  findByNameUn(name): Promise<TOrder[]> {
    const regex = `^${name}`
    return OrderModel.find({
      confirmed: false,
      title: { $regex: regex, $options: 'i' },
    })
      .sort({ createdAt: -1 })
      .populate('customer')
      .lean()
      .exec()
  }

  findByNameAr(name): Promise<TOrder[]> {
    const regex = `^${name}`
    return OrderModel.find({
      active: false,
      title: { $regex: regex, $options: 'i' },
    })
      .sort({ createdAt: -1 })
      .populate('customer')
      .lean()
      .exec()
  }

  findUnconfirmed(skip?, limit?): Promise<TOrder[]> {
    return OrderModel.find({ confirmed: false })
      .sort({ createdAt: -1 })
      .populate('customer')
      .lean()
      .exec()
  }

  findArchive(skip?, limit?): Promise<TOrder[]> {
    return OrderModel.find({ active: false })
      .sort({ createdAt: -1 })
      .populate('customer')
      .lean()
      .exec()
  }

  findYourself(customerId, skip?, limit?): Promise<TOrder[]> {
    return OrderModel.find({ customer: customerId, status: undefined })
      .sort({ createdAt: -1 })
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
