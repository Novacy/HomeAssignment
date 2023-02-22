export function addAuthorization(token: string) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  return config
}

export function extractErrorMessage(error: any) {
  return error.response?.data?.message || error.message || error.toString()
}
