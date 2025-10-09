import { apiService } from './api';
import { getRefreshToken, setTokens } from './token';

export const authService = () => {
  const api = apiService(process.env.REACT_APP_AUTH_SERVICE_URL);

  const authenticationProcessing = async (url, data) => {
    const result = await api.post(url, data);

    if (result.success) {
      const { access_token, refresh_token } = result.data;
      setTokens(access_token, refresh_token);
    }

    return result;
  };

  const login = async (email, password) => {
    return await authenticationProcessing('/login', { email, password })
  };

  const register = async (email, password) => {
    return await authenticationProcessing('/register', { email, password })
  };

  const refreshTokens = async () => {
    const token = getRefreshToken();
    // const token = JSON.parse(token2);
    if (!token) throw new Error('No refresh token');

    return await authenticationProcessing('/refresh', { token } );
    // const result = await apiPost('/refresh', { refreshToken });

    // if (result.success) {
    //   const { access_token, refresh_token } = result.data;
    //   setTokens(access_token, refresh_token);
    // }

    // return result.success;
  };

  const getProfile = async () => {
    const response = await api.get('/me');
    if (response.success) {
      return response.data
    }
  };

  return {
    login,
    register,
    refreshTokens,
    getProfile
  };
};
