import { request } from '../utils/request'

export const updateProfileImageRequest = async (fileList: FileList, token: string): Promise<string | null> => {
  const img = fileList[0]

  if( !img ) return null

  const formData = new FormData()
  formData.append('image', img, img.name)

  const headers = new Headers()

  const data = await request<{ok: boolean, msg: string}>('/api/profile/change-img', {
    method: 'POST',
    body: formData,
    headers,
    token,
  })

  if( !data.ok ) {
    console.log(data)
    Promise.reject('No se pudo subir la imagen de perfil')
  }

  return data.msg
}

export const uploadMultipleImagesRequest = async (fileList: FileList, token: string):Promise<string[]> => {
  if( fileList.length === 0 ) return []

  try {
    const images: string[] = []
    for( const img of fileList ) {

      const formData = new FormData()
      formData.append('image', img, img.name)
    
      const headers = new Headers()

      const data = await request<{ok: boolean, msg: string}>('/api/upload', {
        method: 'POST',
        body: formData,
        headers,
        token,
      })

      if( !data.ok ) {
        console.log(data)
        throw new Error('No se pudo subir la imagen de perfil')
      }

      images.push(data.msg)
    }

    return images

  } catch (error) {
    console.log(error)
    return Promise.reject('Ocurrió un error al cargar las imagenes')
  }
}
