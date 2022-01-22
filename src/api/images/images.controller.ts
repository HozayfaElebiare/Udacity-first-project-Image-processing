import express from 'express'
import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

const imageProcess = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  const query = req.query
  const { filename, width, height } = query
  const widthInt = parseInt(width as string)
  const heightInt = parseInt(height as string)

  // Check file name requested
  if (filename) {
    const Directory = path.join(__dirname)
    console.log(Directory)

    const imagesDir = path.join(Directory, '../../../images/')
    const originalImageDir = path.join(
      Directory,
      '../../../images/source',
      `${filename}.jpg`
    )
    console.log(originalImageDir)

    // check if file exist
    if (await fs.existsSync(originalImageDir)) {
      // if no changes requested as witdth or height
      if (!width && !height) {
        console.log(
          'return the original image becuase there are no valid width nor height'
        )
        res.sendFile(originalImageDir)
      } else {
        /////////    1.   Check exportded folder is exsit or not
        const exportPath = path.join(Directory, '../../../images/exported/')
        if (!fs.existsSync(exportPath)) {
          fs.mkdirSync(exportPath)
        }

        ////////////////    2. resize the image if it doesn't exist

        //resize just width
        if (width && !height) {
          const imagePath = path.join(
            imagesDir,
            'exported',
            `${filename}_width${width}.jpg`
          )
          if (!fs.existsSync(imagePath)) {
            console.log('create exported image and return the path')
            await resizeWidth(originalImageDir, imagePath, widthInt)
          } else {
            console.log('image already exists,just return its path')
          }
          res.sendFile(imagePath)
        }

        //resize just height
        else if (height && !width) {
          const imagePath = path.join(
            imagesDir,
            'exported',
            `${filename}_height${height}.jpg`
          )
          if (!fs.existsSync(imagePath)) {
            console.log('create exported image and return the path')
            await resizeHeight(originalImageDir, imagePath, heightInt)
          } else {
            console.log('file already exists,just return its path')
          }
          res.sendFile(imagePath)
        }

        //resize all height and width
        else {
          const imagePath = path.join(
            imagesDir,
            'exported',
            `${filename}_width${width}_height${height}.jpg`
          )
          if (!fs.existsSync(imagePath)) {
            console.log('creating exported image and return its path')
            await resizeWidthAndHeight(
              originalImageDir,
              imagePath,
              widthInt,
              heightInt
            )
          } else {
            console.log('file already exists,just return its path')
          }
          res.sendFile(imagePath)
        }
      }
    } else {
      res.status(400)
      res.send('file name is not existed')
    }
  } else {
    res.status(400)
    res.send('file name is not requested')
  }
}






/////////////////   Function to help in resizing ///////////   will put in helpers folder

const resizeWidth = async (
  targetPath: string,
  outputPath: string,
  width: number
): Promise<void> => {
  const image = sharp(targetPath)
  await image.metadata().then(function (metadataresutl) {
    return image
      .resize({
        width,
        height: metadataresutl.height,
      })
      .toFile(outputPath)
  })
}
const resizeHeight = async (
  targetPath: string,
  outputPath: string,
  height: number
): Promise<void> => {
  const image = sharp(targetPath)
  await image.metadata().then(function (metadataresutl) {
    return image
      .resize({
        width: metadataresutl.width,
        height,
      })
      .toFile(outputPath)
  })
}

const resizeWidthAndHeight = async (
  targetPath: string,
  outputPath: string,
  width: number,
  height: number
): Promise<void> => {
  await sharp(targetPath)
    .resize({
      width,
      height,
    })
    .toFile(outputPath)
}

export default imageProcess
