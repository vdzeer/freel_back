import { Schema, model, Types } from 'mongoose'
import { User } from '../@types/'

const User = new Schema<User>({
  name: { type: String, required: true },
  password: { type: String, required: true },
  login: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  phone: { type: String, unique: true, required: false },
  status: { type: String, required: false },
  role: { type: String, enum: ['customer', 'worker'], required: true },
  rate: { type: Number, required: true },
  spec: { type: String, required: false },
  cash: { type: Number, required: true },
  description: { type: String, required: false },
  birthDay: { type: String, required: false },
  inWorkStatus: { type: Boolean, required: true },
  createdAt: { type: Date, required: true },
  avatar: { type: String, required: false },
  city: { type: String, required: false },
  country: { type: String, required: false },
  feedbacksLength: { type: Number, required: false },
  blocked: { type: Boolean, required: true },
})

export const UserModel = model('Users', User)
