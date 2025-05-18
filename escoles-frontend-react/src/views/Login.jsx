import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Common from '../services/common';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await Common.login({ email, password });
      navigate('/student');
    } catch (err) {
      alert(err.message || 'Login fallido');
    }
  };

  return (
    <div id="login-container">
      <h2 id="login-title">Iniciar Sesión</h2>
      <form id="login-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit" id="login-btn">Entrar</button>
      </form>
    </div>
  );
}
