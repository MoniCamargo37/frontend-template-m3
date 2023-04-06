// import React, { useState, useContext, useEffect } from 'react';
// import profileService from '../../services/profileService';
// import { toast } from "react-hot-toast";
// import { useAuth } from '../../hooks/useAuth';

// export default function Profile() {
//   const [user, setUser] = useState(null);
//   const [editMode, setEditMode] = useState(false);
//   const [password, setPassword] = useState('');
//   const [passwordConfirmation, setPasswordConfirmation] = useState('');
//   const [errorMessage, setErrorMessage] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const { currentUser } = useAuth();

//   const getProfile = async () => {
//     setLoading(true);
//     try {
//       const response = await profileService.getProfile();
//       setUser(response.user);
//       setLoading(false);
//     } catch (error) {
//       console.error(error);
//       setErrorMessage("¡Ups! Algo salió mal al recuperar los datos de tu perfil. Por favor, inténtalo de nuevo más tarde.");
//       toast.error("¡Ups! Algo salió mal al recuperar los datos de tu perfil. Por favor, inténtalo de nuevo más tarde.");
//     }
//   };

//   useEffect(() => {
//     getProfile();
//   }, [currentUser]);


  


// //   return (
// //     <div className="profile-card">
// //       {user ? (
// //         <>
// //           <h2>{user.username}'s Profile</h2>
// //           <div className="profile-avatar">
// //   {user.imageUrl && (
// //     <>
// //       <img src={user.imageUrl} alt="Profile" style={{ maxWidth: "50%", maxHeight: "500px" }} />
// //       {currentUser?._id && currentUser.uid === user._id && (
// //           {errorMessage && <p>{errorMessage}</p>}
// //         </>
// //       ) : (
// //         <>
// //           {loading ? <p>Loading...</p> : <p>Failed to load user data.</p>}
// //           {errorMessage && toast.error(errorMessage)}
// //         </>
// //       )}
// //     </div>
// //   );
// //