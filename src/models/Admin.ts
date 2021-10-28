import { Schema, model } from 'mongoose'
import { TAdmin } from '../@types'

const Admin = new Schema<TAdmin>({
  password: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  activateCode: { type: String, required: false },
})

export const AdminModel = model('Admins', Admin)
