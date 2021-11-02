import { TSupport } from './../../@types'
import { SupportModel } from '../../models'

class SupportService {
  createNewSupport(feed: Partial<TSupport>): Promise<TSupport> {
    const feedbackToCreate = new SupportModel(feed)
    return feedbackToCreate.save()
  }

  findAll(): Promise<TSupport[]> {
    return SupportModel.find().lean().exec()
  }
}

export const supportService = new SupportService()
