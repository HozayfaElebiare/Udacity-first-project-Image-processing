import express from 'express'
import imageProcess from './images.controller'
const router = express.Router()

router.get('/', imageProcess)

export default router
