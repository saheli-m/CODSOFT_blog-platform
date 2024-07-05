import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/config';
import { logout } from '../firebase/auth';
import './Header.css';

const Header = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <header className='p-2'>
      <nav className='d-flex align-items-center justify-content-between m-3'>
        <Link  to="/" className='home col'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M11.03 2.59a1.501 1.501 0 0 1 1.94 0l7.5 6.363a1.5 1.5 0 0 1 .53 1.144V19.5a1.5 1.5 0 0 1-1.5 1.5h-5.75a.75.75 0 0 1-.75-.75V14h-2v6.25a.75.75 0 0 1-.75.75H4.5A1.5 1.5 0 0 1 3 19.5v-9.403c0-.44.194-.859.53-1.144ZM12 3.734l-7.5 6.363V19.5h5v-6.25a.75.75 0 0 1 .75-.75h3.5a.75.75 0 0 1 .75.75v6.25h5v-9.403Z"></path></svg>
        </Link>
        {user ? (
          <div className='eddel d-flex col-11 align-items-center justify-content-between'>
            <Link to="/create" className='link-success link-underline-opacity-0 fw-semibold ms-2'><i className="fa-solid fa-circle-plus"></i> Create Post</Link>
            <Link onClick={handleLogout} className='btn log fw-bold ms-3'>Logout</Link>
          </div>
        ) : (
          <div className='eddel'>
            <Link to="/login" className='btn log ms-2 fw-bold'>Login</Link>
            <Link to="/register" className='btn log ms-3 fw-bold'>Register</Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
