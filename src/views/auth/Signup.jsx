import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import toast from "react-hot-toast";
import Auth from './Auth.css';

  export default function Signup() {
    const [user, setUser] = useState({
      username: '',
      email: '',
      password: '',
      passwordControl: ''
    });
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();
  
    const handleChange = (e) => {
      setUser(prev => {
        return {
          ...prev,
          [e.target.name]: e.target.value
        }
      })
    }
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const { username, email, password, passwordControl } = user;
      if (username === '' || email === '' || password === '' || passwordControl === '') {
        setErrorMessage('Todos los campos son obligatorios');
        return;
      }
      if (password !== passwordControl) {
        setErrorMessage('Las contraseñas no coinciden');
        return;
      }
      try {
        await authService.signup({ username, email, password });
        navigate('/login');
        toast.success("¡Cuenta creada con éxito!");
      } catch (error) {
        console.error(error);
        toast.error(error.response.data.message);
      }
    }
  
    return (
      <div className='auth-card'>
        <form onSubmit={handleSubmit}>
          <label>Nombre</label>
          <input type="text" name="username" value={user.username} onChange={handleChange} />
          <label>Correo electrónico</label>
          <input type="email" name="email" value={user.email} onChange={handleChange} />
          <label>Contraseña</label>
          <input type="password" name="password" value={user.password} onChange={handleChange} />
          <label>Confirmar contraseña</label>
          <input type="password" name="passwordControl" value={user.passwordControl} onChange={handleChange} />
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          <button type="submit">Crear cuenta</button>
        </form>
      </div>
    );
  }
