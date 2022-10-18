type Options = {
  method?: string;
  body   : string | FormData;
  token ?: string;
  headers: Headers;
  contentType?: undefined;
} | {
  method?: string;
  body   : string | FormData;
  token ?: string;
  headers?: Headers;
  contentType: 'application/json'
}

export const request = async <T>(endpoint: string, options: Options):Promise<T> => {
  try {
    let headers = new Headers()

    if( options.headers ) {
      headers = options.headers
    }

    if( options.contentType === 'application/json' ) {
      headers.append('Content-Type', options.contentType)
    }

    if( options.token ) {
      headers.append('Authorization', `Bearer ${options.token}`)
    }
    
    const res = await fetch(`http://localhost:5000${endpoint}`, {
      method: options.method || 'GET',
      headers,
      body: options.body,
    })

    const data = await res.json()
    return data
  } catch (error) {
    console.log(error)
    return Promise.reject('Error al realizar la petición')
  }
}
