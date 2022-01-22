import express from 'express'
import images from './images/images.router'
const router = express.Router()

router.get('/', (req: express.Request, res: express.Response) => {
  res.json('api working | navigate to /api/images/ to start')
})

router.use('/images', images)

export default router
