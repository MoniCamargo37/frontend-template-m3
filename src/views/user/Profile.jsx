import React, { useState,  useEffect } from 'react';
import profileService from '../../services/profileService';
import EditPassword from '../../components/EditPassword';
import EditProfilePhoto from '../../components/EditProfilePhoto';
import { toast } from "react-hot-toast";

export default function Profile() {
    const [user, setUser] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [editingPassword, setEditingPassword] = useState(false);
    const [editingPhoto, setEditingPhoto] = useState(false);
  
    const getProfile = async () => {
      setLoading(true);
      try {
        const response = await profileService.getProfile();
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
        setEditingPhoto(false);
      };
    
      const handleEditProfilePhoto = () => {
        setEditingPhoto(true);
        setEditingPassword(false);
      };
    
      const handleCancel = () => {
        setEditingPassword(false);
        setEditingPhoto(false);
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
  
    const handleDeletePhoto = async (event) => {
      event.preventDefault();
      try {
        await profileService.deleteUserPhoto();
        setUser((prevUser) => ({ ...prevUser, imageUrl: null }));
        toast.success("Foto de perfil eliminada correctamente.");
      } catch (error) {
        console.error(error);
        setErrorMessage(
          "¡Ups! Algo salió mal al eliminar la foto de perfil. Por favor, inténtalo de nuevo más tarde."
        );
        toast.error(
          "¡Ups! Algo salió mal al eliminar la foto de perfil. Por favor, inténtalo de nuevo más tarde."
        );
      }
    };
  
    return (
      <div className="profile-card">
        {user ? (
          <>
            <h2>{user.username}'s Profile</h2>
            <div className="profile-avatar">
              {user.imageUrl && (
                <>
                  <img
                    src={user.imageUrl}
                    alt="Profile"
                    style={{ maxWidth: "50%", maxHeight: "500px" }}
                  />
                </>
              )}
  {!editingPassword  && !editingPhoto && (
  
  <button onClick={() => handleEditPasswordprofile()}>
    Cambiar contraseña
  </button>
)}

{!editingPassword && !editingPhoto && (
  <button onClick={() => handleEditProfilePhoto()}>
    Cambiar foto de perfil
  </button>
)}
{editingPassword && (
  <EditPassword edit={handleEditPassword} cancel={handleCancel} />
)}
{editingPhoto && (
  <EditProfilePhoto onPhotoUpdated={handleCancel} onCancel={handleCancel} />
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