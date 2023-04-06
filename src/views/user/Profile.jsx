import React, { useState, useContext, useEffect } from 'react';
import profileService from '../../services/profileService';
import { toast } from "react-hot-toast";
import { useAuth } from '../../hooks/useAuth';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const { currentUser } = useAuth();

  const getProfile = async () => {
    setLoading(true);
    try {
      const response = await profileService.getProfile();
      setUser(response.user);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setErrorMessage("¡Ups! Algo salió mal al recuperar los datos de tu perfil. Por favor, inténtalo de nuevo más tarde.");
      toast.error("¡Ups! Algo salió mal al recuperar los datos de tu perfil. Por favor, inténtalo de nuevo más tarde.");
    }
  };

  useEffect(() => {
    getProfile();
  }, [currentUser]);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleCancel = () => {
    setEditMode(false);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordConfirmationChange = (e) => {
    setPasswordConfirmation(e.target.value);
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await profileService.editUserProfile({
        currentPassword: user.password,
        newPassword: password,
      });
      setUser(userData.user);
      setPassword('');
      setPasswordConfirmation('');
      setEditMode(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeletePhoto = async () => {
    try {
      const userData = await profileService.deleteUserPhoto();
      setUser(userData.user);
    } catch (error) {
      console.log(error);
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
      <img src={user.imageUrl} alt="Profile" style={{ maxWidth: "50%", maxHeight: "500px" }} />
      {currentUser?._id && currentUser.uid === user._id && (
        <>
          {editMode ? (
            <form onSubmit={handleDeletePhoto}>
              <button type="submit">Delete Profile Picture</button>
              <button onClick={handleCancel}>Cancel</button>
            </form>
          ) : (
            <>
              <button onClick={() => setEditMode(true)}>Edit Profile Picture</button>
              <button onClick={handleEdit}>Change Password</button>
            </>
          )}
        </>
      )}
    </>
  )}
</div>
          {editMode && (
            <form onSubmit={handlePasswordSubmit}>
              <input type="password"               value={password}
              onChange={handlePasswordChange}
              placeholder="New Password"
            />
            <input
              type="password"
              value={passwordConfirmation}
              onChange={handlePasswordConfirmationChange}
              placeholder="Confirm New Password"
            />
            <button type="submit">Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </form>
          )}
          {errorMessage && <p>{errorMessage}</p>}
        </>
      ) : (
        <>
          {loading ? <p>Loading...</p> : <p>Failed to load user data.</p>}
          {errorMessage && toast.error(errorMessage)}
        </>
      )}
    </div>
  );
};