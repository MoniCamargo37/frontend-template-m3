import React, { useState, useEffect } from 'react';
import profileService from '../../services/profileService';
import EditPassword from '../../components/EditPassword';
import EditProfile from '../../components/EditProfile';
import'../../styles/ProfileStyles.css';
import { toast } from "react-hot-toast";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({ username: '', image: '' });
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editingPassword, setEditingPassword] = useState(false);
  const [editingProfile, setEditingProfile] = useState(false);
  
  const getProfile = async () => {
    setLoading(true);
    try {
      const response = await profileService.getProfile();
      setProfile(response.user);
      setUser(response.user);
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
    getProfile();
  }, []);

  const handleEditPasswordprofile = () => {
    setEditingPassword(true);
    setEditingProfile(false);
  };

  const handleEditPhoto = (e) => {
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
       {user ? (
        <>
      <h2>{user.username}'s Profile</h2>
        <div className="profile-image">
            {user.image && (
        <>
            <img src={user.image} alt="Profile" style={{ maxWidth: "50%", maxHeight: "500px" }} />
      </>
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
          <EditProfile edit={handleEditPhoto} cancel={handleCancel} />
              )}

        {(editingPassword || editingProfile) && (
          <button onClick={() => handleCancel()}>Cancelar</button>
              )}
      </div>
           {errorMessage && toast.error(errorMessage)}
      </>
            ) : loading ? (
              <p>Loading...</p>
            ) : (
              <p>No hay datos de perfil disponibles.</p>
            )}
      </div>
  );
  }


