import { auth } from 'fbase';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();

  const onLogOutClick = () => {
    auth.signOut();
    navigate('/', { replace: true });
  };
  return (
    <>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};
export default Profile;
