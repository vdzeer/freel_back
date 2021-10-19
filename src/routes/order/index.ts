import { Router } from 'express'

const app = Router()

import { orderRouter } from './order'

app.use('/order/', orderRouter)

export default app
