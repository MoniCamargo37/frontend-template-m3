import React, { useState, useEffect } from 'react';
import MyTrips from '../../components/MyTrips';
import userService from '../../services/userService';

export default function  Profile() {
  const [user, setUser] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [file, setFile] = useState(null);
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const userId = userService.getUserId();

  const getUserProfile = async () => {
    try {
      const response = await userService.getUserProfile(user);
      setLoading(false);
      setUser(response.user);
      setError(false);
      console.log(response);
    } catch (error) {
      console.error(error)
      setLoading(false);
      setError(true);
    }
  }

  useEffect(() => {
    getUserProfile();
    // eslint-disable-next-line
  }, []);

  const handleFileChange = e => {
    setFile(e.target.files[0]);
  };

  const handlePasswordChange = e => {
    setPassword(e.target.value);
  };

  const handlePasswordConfirmationChange = e => {
    setPasswordConfirmation(e.target.value);
  };

  const handlePasswordSubmit = async e => {
    e.preventDefault();
    try {
      const userData = await userService.editUserProfile({ currentPassword: user.password, newPassword: password });
      setUser(userData.user);
      setPassword('');
      setPasswordConfirmation('');
      setEditMode(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileSubmit = async e => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('avatar', file);
      const userData = await userService.editUserPhoto(formData);
      setUser(userData.user);
      setFile(null);
      setEditMode(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeletePhoto = async () => {
    try {
      const userData = await userService.deleteUserPhoto();
      setUser(userData.user);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="profile-card">
      <h2>{user.username}'s Profile</h2>
      <div className="profile-avatar">
        {user.imageUrl && (
          <>
            <img src={user.imageUrl} alt="Profile" />
            {userId === user._id && (
              <>
                {editMode ? (
                  <form onSubmit={handleFileSubmit}>
                    <input type="file" onChange={handleFileChange} />
                    <button type="submit">Save</button>
                    <button onClick={() => setEditMode(false)}>Cancel</button>
                  </form>
                ) : (
                  <>
                    <button onClick={() => setEditMode(true)}>Edit Profile Picture</button>
                    <button onClick={() => setEditMode(true)}>Change Password</button>
                  </>
                )}
              </>
            )}
          </>
        )}
      </div>
      {editMode && (
        <form onSubmit={handlePasswordSubmit}>
          <input type="password" value={password} onChange={handlePasswordChange} placeholder="New Password" />
          <input type="password" value={passwordConfirmation} onChange={handlePasswordConfirmationChange} placeholder="Confirm New Password" />
          <button type="submit">Save</button>
          <button onClick={() => setEditMode(false)}>Cancel</button>
        </form>
      )}
      {error && <p>Failed to load user data.</p>}
      <MyTrips />
    </div>
  );
      };

      // asdfghgfdsaASDFDSAK
   
   
