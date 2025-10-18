export const apiService = (baseUrl = '', getToken) => {

const getAuthHeaders = async () => {
    if (!getToken) return {};
    
    const token = await getToken();
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  };

  const request = async (url, options = {}) => {
    const fullUrl = `${baseUrl}${url}`;
    console.log('Старт запроса, ', fullUrl)
    try {
      const response = await fetch(fullUrl, {
        headers: {
          'Content-Type': 'application/json',
          ... await getAuthHeaders(),
        },
        ...options,
      });

      const responseData = await response.json().catch(() => null);

      if (!response.ok) {
        return { success: false, error: responseData?.detail || 'Request failed' };
      }
      console.log('Запрос завершен, ', fullUrl)
      return { success: true, data: responseData };
    } catch (error) {
      console.log('Ошибка запроса, ', fullUrl)
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
