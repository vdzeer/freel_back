import { Schema, model } from 'mongoose'
import { TAdmin } from '../@types'

const Admin = new Schema<TAdmin>({
  password: { type: String, required: true },
  email: { type: String, unique: true, required: true },
})

export const AdminModel = model('Admins', Admin)
