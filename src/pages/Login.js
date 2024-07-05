import React, { useState } from 'react';
import { login } from '../firebase/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (error) {
      console.error(error);
    }
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='mt-5 d-flex flex-column align-items-center justify-content-center'>
        <div className='col-4 mb-3'>
          <label htmlFor="email" className="form-label"><b>Email</b></label>
          <input 
            type="email" 
            className="form-control" 
            id="email"
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Email address" 
            required 
          />
        </div>
        <div className="col-4 mb-3">
          <label htmlFor="password" className="form-label"><b>Password</b></label>
          <input 
            type="password" 
            className="form-control" 
            id="password1"
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Password" 
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
        <p className='mt-2'>Don't have an account yet? <a href='/register'>Register</a> now!</p>
      </div>
    </form>
  );
};

export default Login;
