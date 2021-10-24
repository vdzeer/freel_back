import { Router } from 'express'

const app = Router()

import UserRouter from './user'
import OrderRouter from './order'
import AdminRouter from './admin'

app.use('/user-api/', UserRouter)
app.use('/order-api/', OrderRouter)
app.use('/admin-api/', AdminRouter)

export default app
