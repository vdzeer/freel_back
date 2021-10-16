import { TFeedback } from './../@types/feedback'
import { Schema, model, Types } from 'mongoose'

const Feedback = new Schema<TFeedback>({
  customer: {
    type: Types.ObjectId,
    ref: 'Users',
  },
  userId: {
    type: Types.ObjectId,
    ref: 'Users',
  },
  description: { type: String, required: false },
  rate: { type: Number, required: true },
  createdAt: { type: Date, required: true },
})

export const FeedbackModel = model('Feedbacks', Feedback)
