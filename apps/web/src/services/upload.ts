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
