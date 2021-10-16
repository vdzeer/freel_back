import { TFeedback } from './../../@types/feedback'
import { FeedbackModel } from '../../models'

class FeedbackService {
  createFeedback(feed: Partial<TFeedback>): Promise<TFeedback> {
    const feedbackToCreate = new FeedbackModel(feed)
    return feedbackToCreate.save()
  }

  findAllByUserId(params: Partial<TFeedback>): Promise<TFeedback[]> {
    return FeedbackModel.find(params).populate('customer').lean().exec()
  }
}

export const feedbackService = new FeedbackService()
