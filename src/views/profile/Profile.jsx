import React, { useState, useEffect } from 'react';
import { NavLink} from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import profileService from '../../services/profileService';
import EditPassword from '../../components/EditPassword';
import EditPhoto from '../../components/EditPhoto';
import ImageRio from '../../images/rio-de-janeiro.jpg'
import'../../styles/ProfileStyles.css';
import { toast } from "react-hot-toast";
import { useAuth } from '../../hooks/useAuth';

export default function Profile() {
  const { isLoggedIn, logOutUser } = useAuth();
  const [profile, setProfile] = useState({ username: '', image: '' });
  // const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  // const [cityOverview, setCityOverview] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPassword, setEditingPassword] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const navigate = useNavigate();
 
  
  const getProfile = async () => {
    try {
      const response = await profileService.getProfile();
      setProfile(response.user);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setErrorMessage(
        "¡Ups! Algo salió mal al recuperar los datos de tu perfil. Por favor, inténtalo de nuevo más tarde."
      );
      toast.error(
        "¡Ups! Algo salió mal al recuperar los datos de tu perfil. Por favor, inténtalo de nuevo más tarde."
      );
    }
  };

 useEffect(() => {
  if(loading)
    getProfile();
 },[loading]);  

 const handleEditingProfile = () => {
  setIsEditingProfile(true);
};

  const handleEditPhoto = (image) => {
    setProfile({ username: profile.name, image: image });
    toast.success('Photo updated successfully!');
    setEditingPassword(false);
    setIsEditingProfile(false);
    setLoading(true);
  };

  const handleEditPasswordprofile = () => {
    setEditingPassword(true);
    setIsEditingProfile(false);
  };


  const handleCancel = () => {
    setEditingPassword(false);
    setIsEditingProfile(false);
  };

  const handleEditPassword = async (passwordData) => {
    try {
      await profileService.editProfile(passwordData);
      toast.success("Contraseña actualizada correctamente.");
      setEditingPassword(false);
    } catch (error) {
      console.error(error);
      setErrorMessage(
        "¡Ups! Algo salió mal al actualizar la contraseña. Por favor, inténtalo de nuevo más tarde."
      );
      toast.error(
        "¡Ups! Algo salió mal al actualizar la contraseña. Por favor, inténtalo de nuevo más tarde."
      );
    }
  };



  return (
    <div className="profile-card">
      <span className="leftArrow-goBack" onClick={() => navigate(-1)}>
        <FaArrowLeft />
      </span>  
      {isLoggedIn ? (
        <>
          <h2>PERFIL</h2>
          <div className="profile-image">
            {profile.image && (
              <img src={profile.image} alt="Profile" style={{ maxWidth: "50%", maxHeight: "500px" }} />
            )}
            {!editingPassword && !isEditingProfile && (
              <>
                <button onClick={() => handleEditPasswordprofile()}>Cambiar contraseña</button>
                <button onClick={() => handleEditingProfile(true)}>Cambiar foto de perfil</button>
              </>
            )}
            {editingPassword && (
              <EditPassword edit={handleEditPassword} cancel={handleCancel} />
            )}
            {isEditingProfile && (
              <EditPhoto edit={handleEditPhoto} cancel={handleCancel} />
            )}

            {(editingPassword || isEditingProfile) && (
              <button className='cancellation-btn' onClick={() => handleCancel()}>Cancelar</button>
            )}
          </div>
          <div className='logged-btn-container'>
          {isLoggedIn && ( 
            <li><a href="/" className="logged-btn" onClick={() => {logOutUser(); navigate('/');}}>Cerrar sesión</a></li>
           )}
          </div>
          {errorMessage && toast.error(errorMessage)}
        </>
      ) : 
      (
        <>
          <div className='errorMsn-profile'>
            <h1>Perfil</h1>
            <p>Sin inicio de sesión no hay paraíso... 🌊 🌊</p>
            <img src={ImageRio} alt="rio-de-janeiro" />
            <div className='noLoggedProfile-btns'>
              <NavLink className="btn-login-profile" to="/login">Iniciar sesión</NavLink>
              <NavLink className="btn-login-profile" to="/signup">Crear cuenta </NavLink>
            </div> 
          </div>
        </>
      )
      }
    </div>
  );
}




