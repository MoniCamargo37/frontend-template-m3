import React, { useState } from 'react';
import profileService from '../services/profileService';

export default function EditProfilePhoto({ onPhotoUpdated, onCancel }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      await profileService.editProfilePhoto(formData);
      onPhotoUpdated();
    } catch (error) {
      console.error(error);
      setErrorMessage('Error al actualizar la foto de perfil');
    }
    setLoading(false);
  };

  return (
    <div className="edit-profile-photo">
      <h3>Cambiar foto de perfil</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Seleccione una imagen:
          <input type="file" name="imageUrl" onChange={handleFileChange} />
        </label>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div className="form-actions">
          <button type="submit" disabled={loading}>Guardar cambios</button>
          <button type="button" onClick={onCancel}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}
