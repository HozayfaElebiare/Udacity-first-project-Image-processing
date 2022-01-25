import supertest from 'supertest'
import app from '../index'
import imgageController from '../api/images/images.controller'
import path from 'path'

const request = supertest(app)

describe('--- test images resizer api response ---', () => {
  const trueFile = 'palmtunnel'
  const trueFile2 = 'icelandwaterfall'
  const fakeFile = 'fakeFile'
  const width = 250
  const height = 350
  const originalImageDir = path.join(__dirname, '../../images/source')
  const resizedImgsDir = path.join(__dirname, '../../images/exported')
  console.clear()
  console.log(originalImageDir)
  console.log(resizedImgsDir)
  it('0. gets the main endpoint', async () => {
    const response = await request.get('/')
    expect(response.status).toBe(200)
    expect(response.text).toBe(
      '{"Project":"Udacity first project","projectName":"Image processing","author":"Mahmoud Elebiare","authorEmail":"mahmoudelebiare@gmail.com"}'
    )
  })

  it('1. api root response return', async () => {
    const response = await request.get('/')
    expect(response.status).toBe(200)
    expect(response.text).toBe(
      '{"Project":"Udacity first project","projectName":"Image processing","author":"Mahmoud Elebiare","authorEmail":"mahmoudelebiare@gmail.com"}'
    )
  })

  it('2. api path response return', async () => {
    const response = await request.get('/api')
    expect(response.status).toBe(200)
    expect(response.text).toBe('api working navigate to /api/images/ to start')
  })

  it('3. this api return not found', async () => {
    const response = await request.get('/api/images/')
    expect(response.status).toBe(400)
    expect(response.text).toBe('file name is not requested')
  })

  it('4. this api return file name is not requested', async () => {
    const response = await request.get('/api/images/')
    expect(response.status).toBe(400)
    expect(response.text).toBe('file name is not requested')
  })

  it('5. this api return file name is not existed', async () => {
    const response = await request.get(`/api/images/?filename=${fakeFile}`)
    expect(response.status).toBe(400)
    expect(response.text).toBe('file name is not existed')
  })

  it('6. this api return file name is existed', async () => {
    const response = await request.get(`/api/images/?filename=${trueFile}`)
    expect(response.status).toBe(200)
  })

  it('7. this api return resized image', async () => {
    const response = await request.get(
      `/api/images/?filename=${trueFile}&width=${width}&height=${height}`
    )
    expect(response.status).toBe(200)
  })

  it('8. check function (resizeHeight) ', async () => {
    expect(
      await imgageController.resizeHeight(
        `${originalImageDir}/${trueFile2}.jpg`,
        `${resizedImgsDir}/${trueFile2}_height${height}.jpg`,
        height
      )
    ).toBe(true)
  })

  it('9. check function (resizeWidth) ', async () => {
    expect(
      await imgageController.resizeWidth(
        `${originalImageDir}/${trueFile2}.jpg`,
        `${resizedImgsDir}/${trueFile2}_width${width}.jpg`,
        width
      )
    ).toBe(true)
  })

  it('10. check function (resizeWidthAndHeight) ', async () => {
    expect(
      await imgageController.resizeWidthAndHeight(
        `${originalImageDir}/${trueFile2}.jpg`,
        `${resizedImgsDir}/${trueFile2}_width${width}_height${height}.jpg`,
        width,
        height
      )
    ).toBe(true)
  })
})
