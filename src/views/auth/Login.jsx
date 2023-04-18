import React, {  useState } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import authService from '../../services/authService';
import '../../styles/AuthStyles.css';

export default function Login() {
  const { storeToken, authenticateUser} = useAuth(); 
  const [user, setUser] = useState({
    email: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState(undefined);
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
    try {
      const response = await authService.login(user)
      if (response.authToken) {
        storeToken(response.authToken);
        authenticateUser();
        navigate(-1);
        toast.success('¡Bienvenido de nuevo!')
      } else {
        setErrorMessage('¡No se puede autenticar el usuario!')
      }
    } catch (error) {
      setErrorMessage('¡No se puede autenticar el usuario!');
    }
  }

  return (
    <div>
    <span className="leftArrow-goBack" onClick={() => navigate(-1)}>
        <FaArrowLeft />
      </span>   
    <div className='auth-card'>
      <form onSubmit={handleSubmit}>
        <label>Correo electrónico</label>
        <input required type="email" name="email" value={user.email} onChange={handleChange} />
        <label>Contraseña</label>
        <input required type="password" name="password" value={user.password} onChange={handleChange} />
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <button type="submit" className="register-button">Iniciar sesión </button>
        <a href="/signup">¿AÚN SIN CUENTA? REGISTRATE</a>
      </form>
    </div>
    </div>
  )
}



