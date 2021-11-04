import { TFeedback } from './../../@types/feedback'
import { FeedbackModel } from '../../models'

class FeedbackService {
  createFeedback(feed: Partial<TFeedback>): Promise<TFeedback> {
    const feedbackToCreate = new FeedbackModel(feed)
    return feedbackToCreate.save()
  }

  findAllByUserId(params: Partial<TFeedback>): Promise<TFeedback[]> {
    return FeedbackModel.find(params)
      .sort({ _id: -1 })
      .populate('customer')
      .lean()
      .exec()
  }

  deleteFeedback(id: string): void {
    return FeedbackModel.findByIdAndDelete(id)
  }
}

export const feedbackService = new FeedbackService()
