export function addAuthorization(token: string) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    },
  }
  return config
}

export function extractErrorMessage(error: any) {
  return error.response?.data?.message || error.message || error.toString()
}
