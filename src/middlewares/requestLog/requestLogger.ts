import express from 'express'

const requestLog = (
  req: express.Request,
  _res: express.Response,
  next: express.NextFunction
): void => {
  let RequestedUrl: string = req.url
  console.log('new request : ', RequestedUrl)
  next()
}

export default requestLog
