import { Router } from 'express'

const app = Router()

import { authRouter } from './auth'
import { adminRouter } from './admin'

app.use('/auth/', authRouter)
app.use('/admin/', adminRouter)

export default app
