import React, { useContext } from 'react';
import { signOut } from "firebase/auth";
import { auth } from '../firebase';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className='navbar'>
      <div className="logo">
        <img src={require('../img/logo.png')} alt="Logo" />
      </div>
      <div className="user">
        <div className="user-info">
          
          <span className="user-name">{currentUser.displayName}</span>
          <img src={currentUser.photoURL} alt="User" />
        </div>
        <button onClick={() => signOut(auth)}>Logout</button>
      </div>
    </div>
  );
};


export default Navbar;
