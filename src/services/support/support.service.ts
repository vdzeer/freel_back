import { TSupport } from './../../@types'
import { FeedbackModel } from '../../models'

class SupportService {
  createNewSupport(feed: Partial<TSupport>): Promise<TSupport> {
    const feedbackToCreate = new FeedbackModel(feed)
    return feedbackToCreate.save()
  }

  findAll(): Promise<TSupport[]> {
    return FeedbackModel.find().lean().exec()
  }
}

export const supportService = new SupportService()
