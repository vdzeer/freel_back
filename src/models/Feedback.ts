import { TFeedback } from './../@types/feedback'
import { Schema, model, Types } from 'mongoose'

const Feedback = new Schema<TFeedback>({
  customerId: {
    type: Types.ObjectId,
    ref: 'users',
  },
  userId: {
    type: Types.ObjectId,
    ref: 'users',
  },
  description: { type: String, required: false },
  rate: { type: Number, required: true },
  createdAt: { type: Date, required: true },
})

export const FeedbackModel = model('Feedbacks', Feedback)
