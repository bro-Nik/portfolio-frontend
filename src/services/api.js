import { getToken } from './token';

export const apiService = (baseUrl = '') => {
  const getAuthHeaders = () => {
    const token = getToken();
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  };

  const request = async (url, options = {}) => {
    const fullUrl = `${baseUrl}${url}`;
    try {
      const response = await fetch(fullUrl, {
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders(),
        },
        ...options,
      });

      const responseData = await response.json().catch(() => null);

      if (!response.ok) {
        return { success: false, error: responseData?.detail || 'Request failed' };
      }
      return { success: true, data: responseData };
    } catch (error) {
      return { success: false, error: 'Ошибка сети' };
    }
  };

  const get = (url) => {
    return request(url);
  };

  const post = (url, body) => {
    return request(url, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  };

  return { get, post };
};
