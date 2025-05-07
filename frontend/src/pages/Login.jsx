import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [currentState, setCurrentState] = useState('Login');
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    // Trim all input fields
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    const trimmedMobile = mobileNumber.trim();

    // Basic validation
    if (!trimmedEmail || !trimmedPassword || (currentState === 'Sign Up' && !trimmedName)) {
      toast.error('Please fill in all the fields!');
      return;
    }

    if (currentState === 'Sign Up') {
      if (!trimmedMobile) {
        toast.error('Please enter a valid mobile number');
        return;
      }

      if (!/^[6-9]\d{9}$/.test(trimmedMobile)) {
        toast.error('Please enter a valid 10-digit Indian mobile number');
        return;
      }
    }

    try {
      if (currentState === 'Sign Up') {
        // Sign Up request
        const response = await axios.post(`${backendUrl}/api/user/register`, {
          name: trimmedName,
          email: trimmedEmail,
          mobileNumber: trimmedMobile,
          password: trimmedPassword,
        });

        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
          toast.success('Account created successfully');
        } else {
          toast.error(response.data.message);
        }
      } else {
        // Login request
        const response = await axios.post(`${backendUrl}/api/user/login`, {
          email: trimmedEmail,
          password: trimmedPassword,
        });

        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
          toast.success('Logged in successfully');
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.error(error);
      const message = error.response?.data?.message || 'Something went wrong, please try again later';
      toast.error(message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token]);

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col items-center w-[90%] sm:max-w-md mx-auto mt-14 gap-6 text-gray-800">
      <div className="inline-flex items-center gap-2 mb-6 mt-10">
        <p className="font-bold text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      {currentState === 'Sign Up' && (
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          className="w-full px-4 py-3 border border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-500"
          placeholder="Full Name"
          required
        />
      )}

      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="email"
        className="w-full px-4 py-3 border border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-500"
        placeholder="Email Address"
        required
      />

      {currentState === 'Sign Up' && (
        <input
          onChange={(e) => setMobileNumber(e.target.value)}
          value={mobileNumber}
          type="text"
          className="w-full px-4 py-3 border border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-500"
          placeholder="Mobile Number"
          maxLength="10"
          required
        />
      )}

      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        className="w-full px-4 py-3 border border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-500"
        placeholder="Password"
        required
      />

      <div className="w-full flex justify-between text-sm mt-[-8px]">
        {currentState === 'Login' ? (
          <p onClick={() => setCurrentState('Sign Up')} className="cursor-pointer text-blue-500">
            Create account
          </p>
        ) : (
          <p onClick={() => setCurrentState('Login')} className="cursor-pointer text-blue-500">
            Login here
          </p>
        )}
      </div>

      <button className="bg-blue-600 text-white font-medium px-8 py-3 mt-6 rounded-md hover:bg-blue-700 transition-all">
        {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
      </button>
    </form>
  );
};

export default Login;
