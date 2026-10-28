const ACCESS_KEY = 'access'
const REFRESH_KEY = 'refresh'

export const getAccessToken = () => localStorage.getItem(ACCESS_KEY)

export const getRefreshToken = () => localStorage.getItem(REFRESH_KEY)

export const isAuthenticated = () => Boolean(getAccessToken())

export const saveTokens = ({ access, refresh }) => {
  localStorage.setItem(ACCESS_KEY, access)
  if (refresh) localStorage.setItem(REFRESH_KEY, refresh)
}

export const clearTokens = () => {
  localStorage.removeItem(ACCESS_KEY)
  localStorage.removeItem(REFRESH_KEY)
}
