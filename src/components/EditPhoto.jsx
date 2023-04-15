import React, { useState, useEffect } from 'react';
import profileService from '../services/profileService';
import Loading from './Loading';

export default function EditPhoto({edit}) {
  const [profile, setProfile] = useState({username: '', image: ''});
  const [, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [, setImageUrl] = useState();

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
      setProfile((prev) => {
        return {
          ...prev,
          image: e.target.files[0]
        };
      });
      const url = URL.createObjectURL(e.target.files[0]);
      setImageUrl(url);
     } };

  // const handleImage = (e) => {
  //   if (e.target.files[0]) {
  //     const file = e.target.files[0];
  //     const fileExtension = file.name.split('.').pop().toLowerCase();
  //     if (fileExtension === "jpg" || fileExtension === "png") {
  //       toast.success('Upadted photo!');
  //     } else {
  //   toast.error('the format must be png or jpg!');
  //     }
  //   }
  // };

    const handleSubmit = async (e) => {
      e.preventDefault()  
      const formData = new FormData();
      if (profile.image) {
        formData.append('image', profile.image)  
      }
      try {
        await profileService.editProfile(formData);
        edit(profile.image);
      } catch (error) {
        console.log(error);
        setError(true);
      }
    };

  return (
    <>
    <div className='editPhoto-card'>
      {isLoading && <Loading />}
        <h3>Cambiar foto</h3>
        <div className="form-editPhoto">
        <form className="photo-form" onSubmit={handleSubmit} encType="multipart/form-data">
          <input type="file" name="image" onChange={handleImage} accept="image/*" />
          <button type="submit">Guardar cambios</button>
        </form> 
      </div>
      </div>
    </>
  );
}
