export function getToken () {
  return localStorage.getItem('accessToken')
}

export function getRefreshToken () {
  return localStorage.getItem('refreshToken')
}

export function setTokens (accessToken, refreshToken) {
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
}

export function clearTokens () {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
}

export function isTokenValid (token) {
  if (!token) return false;

  // Проверка структуры токена
  const parts = token.split('.');
  if (parts.length !== 3) return false;

  try {
    const payload = JSON.parse(atob(parts[1]));
    
    // Проверка срока действия
    if (Date.now() >= payload.exp * 1000) return false;

    // Проверка необходимых полей
    if (!payload.sub || !payload.exp) return false;

    return true;
  } catch (error) {
    return false;
  }
}
