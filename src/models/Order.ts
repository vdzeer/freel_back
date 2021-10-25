import { Schema, model, Types } from 'mongoose'
import { TOrder } from '../@types'

const Order = new Schema<TOrder>({
  customer: {
    type: Types.ObjectId,
    ref: 'Users',
  },
  executor: {
    type: Types.ObjectId || null,
    ref: 'Users',
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, required: true },
  garant: { type: Boolean, required: true },
  premium: { type: Boolean, required: true },
  price: { type: Number, required: true },
  country: { type: String, required: true },
  city: { type: String, required: true },
  spec: { type: String, required: true },
  views: { type: Number, required: true },
  responses: { type: Array, required: false },
  active: { type: Boolean, required: true },
  confirmed: { type: Boolean, required: true },
  status: {
    type: String || null,
    enum: ['in work', 'finished', 'declined'],
    required: false,
  },
})

export const OrderModel = model('Orders', Order)
