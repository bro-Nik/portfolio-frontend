import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Toast from '../components/Toast';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import { useToast } from '../hooks/useToast';

const AuthForm = ({ type }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { addToast, ToastContainer, clearToasts } = useToast();
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const isLogin = type == 'login';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    clearToasts();

    // Валидация для регистрации
    if (!isLogin && password !== confirmPassword) {
      addToast('Пароли не совпадают', 'error');
      setLoading(false);
      return;
    }

    const result = isLogin 
      ? await login(email, password)
      : await register(email, password);
    
    if (result.success) {
      navigate(ROUTES.APP);
    } else {
      addToast(result.error, 'error');
    }
    
    setLoading(false);
  };

  const title = isLogin ? 'Вход' : 'Регистрация';
  const submitText = isLogin ? 'Вход' : 'Зарегистрироваться';
  const alternativeLink = isLogin ? ROUTES.REGISTER : ROUTES.LOGIN;
  const alternativeText = isLogin ? 'Регистрация' : 'Вход';

  return (
    <main className="m-auto">
      <form onSubmit={handleSubmit} style={{width: '330px'}}>
        <a href={ROUTES.HOME} className="d-flex align-items-center mb-5 justify-content-center link-body-emphasis text-decoration-none">
          <img className="mb-0 me-2" src="/favicon.png" alt="" width="32" height="32" />
          <span className="fs-4">Portfolios</span>
        </a>

        <div className="d-flex align-items-center gap-2 mb-3">
          <h1 className="h3 fw-normal">{title}</h1>
          <div className="ms-auto d-flex gap-3">
            <a className="text-decoration-none" href={alternativeLink}>
              {alternativeText}
            </a>
            <a className="text-decoration-none" href={ROUTES.DEMO}>Демо</a>
          </div>
        </div>

        <div className="mb-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-2">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
            Пароль
          </label>
          <input
            id="password"
            type="password"
            required
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {!isLogin && (
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Подтверждение пароля
            </label>
            <input
              id="confirmPassword"
              type="password"
              required
              className="form-control"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-100 btn btn-sm btn-primary"
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              {submitText}...
            </div>
          ) : (
            submitText
          )}
        </button>
      </form>
    </main>
  );
};

export default AuthForm;
