import React, {  useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import authService from '../../services/authService';
import toast from "react-hot-toast";
import '../../styles/AuthStyles.css';

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
        console.error(error.response);
        console.error(error.response.data);
        setErrorMessage(error.response.data.message);
        toast.error("Se ha producido un error al crear la cuenta. Por favor, inténtalo de nuevo más tarde.");
      }
    }
  
    return (
      <div>
    <span className="leftArrow-goBack" onClick={() => navigate(-1)}>
        <FaArrowLeft />
      </span>   
 
      <div className='auth-card'>
        <h1>CREAR NUEVA CUENTA</h1>
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
          <button type="submit"class="register-button">Crear cuenta</button>
        </form>
      </div>
       </div>
    );
  }
