import React, { useState, useEffect } from 'react';
import { NavLink} from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import profileService from '../../services/profileService';
import EditPassword from '../../components/EditPassword';
import EditPhoto from '../../components/EditPhoto';
// import favoriteService from '../../services/favoriteService';
// import cityOverviewService from '../../services/cityOverviewService';
import'../../styles/ProfileStyles.css';
import { toast } from "react-hot-toast";
import { useAuth } from '../../hooks/useAuth';

export default function Profile() {
  const { user, logOutUser } = useAuth();
  const [profile, setProfile] = useState({ username: '', image: '' });
//  const { isLoggedIn,  logOutUser } = useContext(AuthContext); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  // const [cityOverview, setCityOverview] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingPassword, setEditingPassword] = useState(false);
  const [editingProfile, setEditingProfile] = useState(false);
  const navigate = useNavigate();
  let loaded = false;
  
  const getProfile = async () => {
    setLoading(true);
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
  if(!loaded)
  {
    getProfile();
    if (user) {
     setIsLoggedIn(true);
 }
   loaded = true;
   }
 }, [profile]);  



  const handleEditPhoto = (image) => {
    console.log(image);
    setProfile({ username: profile.name, image: image });
    toast.success('Photo updated successfully!');

    setEditingPassword(false);
    setEditingProfile(false);
    loaded = false;
  };

  // const handleEditPhoto = (image) => {
  //   if (image) {
  //     console.log(image);
  //     setProfile({ username: profile.name, image: image });
  //     toast.success('Photo updated successfully!');
  
  //     setEditingPassword(false);
  //     setEditingProfile(false);
  //     loaded = false;
  //   } else {
  //     toast.error('the format must be png or jpg!');
  //   }
  // };

  const handleEditPasswordprofile = () => {
    setEditingPassword(true);
    setEditingProfile(false);
  };


  const handleCancel = () => {
    setEditingPassword(false);
    setEditingProfile(false);
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
            {!editingPassword && !editingProfile && (
              <>
                <button onClick={() => handleEditPasswordprofile()}>Cambiar contraseña</button>
                <button onClick={() => setEditingProfile(true)}>Cambiar foto de perfil</button>
              </>
            )}
            {editingPassword && (
              <EditPassword edit={handleEditPassword} cancel={handleCancel} />
            )}
            {editingProfile && (
              <EditPhoto edit={handleEditPhoto} cancel={handleCancel} />
            )}

            {(editingPassword || editingProfile) && (
              <button className='cancellation-btn' onClick={() => handleCancel()}>Cancelar</button>
            )}
          </div>
          <div className='logged-btn-container'>
          {isLoggedIn && (
  <a href="/" className="logged-btn" onClick={() => {
    setIsLoggedIn(false);
    logOutUser();
  }}>
    Cerrar sesión
  </a>
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


