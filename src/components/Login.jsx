// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === '0') {
      navigate(`/dashboard/${username}`);
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className='outer_div'>
        <div className="intro px-5 ">
            <div className='w-50 align-items-center inner_div'>
                <h1 className="mb-3">Welcome!</h1>
                <h4>We specialize in translating data into value for private equity funds and their portfolio companies.</h4>
                <p>
                    We are a world leader in combining commercial understanding with
                    technology expertise to deliver tangible, high-value outcomes for
                    our clients. Our global delivery model is driven by smart, humble,
                    and determined people operating as one world-class team.
                </p>
            </div>
        </div>
        <div className="container-fluid">
            <div className="row">
                <div className="col">   
                    <form onSubmit={handleLogin} className='todo_form w-75 h-1 m-2'>
                        <h2 className='w-25'>Login</h2>
                        <div>
                        <label>Username:</label>
                            <input
                                type="text"
                                className='form-control todo_input mb-3'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label>Password:</label>
                            <input
                                type="password"
                                className='form-control todo_input mb-3'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className='btn btn-dark w-auto py-2'>Login</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Login;