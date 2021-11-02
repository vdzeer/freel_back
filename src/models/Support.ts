import { TSupport } from './../@types'
import { Schema, model } from 'mongoose'

const Support = new Schema<TSupport>({
  description: { type: String, required: true },
  login: { type: String, required: true },
  email: { type: String, required: true },
  title: { type: String, required: true },
  createdAt: { type: Date, required: true },
})

export const SupportModel = model('Supports', Support)
