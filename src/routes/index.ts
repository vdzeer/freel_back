import { Router } from 'express'

const app = Router()

import UserRouter from './user'
import OrderRouter from './order'

app.use('/user-api/', UserRouter)
app.use('/order-api/', OrderRouter)

export default app
