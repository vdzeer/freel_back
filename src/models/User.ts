import { Schema, model } from 'mongoose'
import { User } from '../@types/'

const User = new Schema<User>({
  name: { type: String, required: true },
  password: { type: String, required: true },
  login: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  phone: { type: String, unique: true, required: false },
  status: { type: String, required: false },
  role: { type: String, required: true },
  spec: { type: String, required: false },
})

export const UserModel = model('Users', User)
