import express from 'express'
import images from './images/images.router'
import Home from './Routes/Home'
import Hadith from './Handlers/Hadith'
import CacheMiddleware from './Middlewares/Cache'
import Hadiths from './Routes/Hadith'
import Hadithss from './Models/Hadith'

const router = express.Router()

router.get('/', (req: express.Request, res: express.Response): void => {
  res.status(200).send('api working navigate to /api/images/ to start')
})

router.use('/images', images)

router.use('/s', Home)
router.get('/ss', Hadith.index)
router.get('/:name', Hadith.getByName)
router.get('/:name/:number', Hadith.getByNumber)
router.use('/books', (req,res)=>{
  res.status(200).json(Hadithss.available())
})

export default router
