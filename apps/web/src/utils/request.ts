interface Options {
  method?: string;
  body   : {[key:string]: any } // eslint-disable-line
  token ?: string
}

export const request = async <T>(endpoint: string, options: Options):Promise<T> => {
  try {
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    
    if( options.token ) {
      headers.append('Authorization', options.token)
    }

    const res = await fetch(`http://localhost:5000${endpoint}`, {
      method: options.method || 'GET',
      headers,
      body: JSON.stringify(options.body)
    })

    const data = await res.json()
    return data
  } catch (error) {
    console.log(error)
    return Promise.reject('Error al realizar la petición')
  }
}
