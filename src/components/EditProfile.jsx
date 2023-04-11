import React, { useState, useEffect } from 'react';
import profileService from '../services/profileService';
import { useNavigate } from 'react-router-dom';

export default function EditProfile() {
  const [profile, setProfile] = useState({username: '', image: ''});
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const getProfile = async () => {
    try {
      const response = await profileService.getProfile();
      setProfile(response.user);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);


  const handleImage = (e) => {
    if (e.target.files[0]) {
      setProfile(prev => {
        return {
          ...prev,
          image: e.target.files[0]
        };
      });
    }
  };

    const handleSubmit = async (e) => {
      e.preventDefault()  
      const formData = new FormData();
      if (profile.image) {
        formData.append('image', profile.image)  
      }
      try {
        await profileService.editProfile(formData);
        navigate('/profile');
      } catch (error) {
        console.log(error);
        setError(true);
      }
    };

    return (
    <>
      {isLoading && <div>Cargando...</div>}
        <div>
          <h2>Editar {profile.username}</h2>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <label>Suba una foto</label>
            <input type="file" name="image" onChange={handleImage} accept="image/*" />
            <button type="submit">Editar perfil</button>
          </form>
          
        </div>
    </>
    );
    }

