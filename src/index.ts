import express, { Application, Request, Response } from 'express'
// import morgan from 'morgan'
import * as dotenv from 'dotenv'
import requestLog from './middlewares/requestLog/requestLogger'
import api from './api/api.router'
dotenv.config()
const PORT = process.env.PORT || 3000

// express create an instance server
const app: Application = express()

// User request Log Meddilewares
app.use([requestLog])

// extend api from routers
app.use('/api', api)

//morgan  HTTP request logger middleware
// app.use(morgan('dev'))

//main api with / path
app.get('/', (req: Request, res: Response): void => {
  res.status(200).json({
    Project: 'Udacity first project',
    projectName: 'Image processing',
    author: 'Mahmoud Elebiare',
    authorEmail: 'mahmoudelebiare@gmail.com',
  })
})

// listin port and start express server
app.listen(PORT, () => {
  console.log(`Server is starting at prot: http://localhost:${PORT}`)
})

export default app
