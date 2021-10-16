import { TFeedback } from './feedback'

export type User = {
  _id: string
  name: string
  email: string
  login: string
  phone: string
  status: string
  password: string
  role: string
  spec: string
  cash: number
  birthDay: string
  description: string
  createdAt: Date
  avatar: string
  inWorkStatus: boolean
  country: string
  city: string
  feedbacks: Array<TFeedback>
}
