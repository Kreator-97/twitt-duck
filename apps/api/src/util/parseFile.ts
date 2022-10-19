import { Request } from 'express'
import formidable from 'formidable'

export const parseFile = async(req: Request):Promise<formidable.File> => {
  return new Promise((resolve, reject) => {

    const form = formidable({ 
      multiples: false,
      maxFileSize: 1048576,
      filter: ({mimetype}) => {
        if( mimetype ) {
          return mimetype.includes('image')
        }
        else return false
      }})
      
    form.parse(req, async(err, fields, files) => {

      if( err ) {
        return reject(err)
      }

      if( !files.image ) {
        return reject('key image in form-data was not sent')
      }

      try {
        resolve((files?.image) as formidable.File)
      } catch(err) {
        return reject(err)
      }
    })
  })
}
