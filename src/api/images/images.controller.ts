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
    const Directory = __dirname
    const imagesDir = path.join(Directory, '../../../images/')
    const originalImageDir = path.join(
      Directory,
      '../../../images/source',
      `${filename}.jpg`
    )

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
            if (!await resizeWidth(originalImageDir, imagePath, widthInt)) {
              res.status(400).send('Error in processing ')
            }
            
          } else {
            console.log('image already exists - just return the path')
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
            if (!await resizeHeight(originalImageDir, imagePath, heightInt)) {
              res.status(400).send('Error in processing ')
            }
            
          } else {
            console.log('file is already exists - just return the path')
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
            console.log('creat exported image - return the path')
            const condition = await resizeWidthAndHeight(
              originalImageDir,
              imagePath,
              widthInt,
              heightInt
            )
            if (!condition) {
              res.status(400).send('Error in processing ')
            }
          } else {
            console.log('file already exists - just return the path')
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
): Promise<boolean> => {
  try {
    const image = sharp(targetPath)
  image.metadata().then(function (metadataresutl) {
    return image
      .resize({
        width,
        height: metadataresutl.height,
      })
      .toFile(outputPath)
  })
  return true
  } catch (error) {
    console.log('error',error)
  return false
  }
  
}


const resizeHeight = async (
  targetPath: string,
  outputPath: string,
  height: number
): Promise<boolean> => {
  try {
    const image = sharp(targetPath)
  image.metadata().then(function (metadataresutl) {
    return image
      .resize({
        width: metadataresutl.width,
        height,
      })
      .toFile(outputPath)
  })
  return true
} catch (error) {
  console.log('error',error)
  return false
}
}

const resizeWidthAndHeight = async (
  targetPath: string,
  outputPath: string,
  width: number,
  height: number
): Promise<boolean> => {
  try {
    await sharp(targetPath)
    .resize({
      width,
      height,
    })
    .toFile(outputPath)
    return true;
  } catch (error) {
    console.log('error',error)
    return false
  }
  
}

export default imageProcess
