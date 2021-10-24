import { Schema, model } from 'mongoose'
import { User } from '../@types/'

const Enum = new Schema<User>({
  name: { type: String, required: true },
  value: { type: Object, required: true },
})

export const EnumModel = model('Enums', Enum)
