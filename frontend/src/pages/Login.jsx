// import React, { useContext, useEffect, useState } from 'react'
// import { ShopContext } from '../context/ShopContext';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// const Login = () => {

//   const [currentState, setCurrentState] = useState('Login');
//   const { token, setToken, navigate, backendUrl } = useContext(ShopContext)

//   const [name,setName] = useState('')
//   const [password,setPasword] = useState('')
//   const [email,setEmail] = useState('')

//   const onSubmitHandler = async (event) => {
//       event.preventDefault();
//       try {
//         if (currentState === 'Sign Up') {
          
//           const response = await axios.post(backendUrl + '/api/user/register',{name,email,password})
//           if (response.data.success) {
//             setToken(response.data.token)
//             localStorage.setItem('token',response.data.token)
//           } else {
//             toast.error(response.data.message)
//           }

//         } else {

//           const response = await axios.post(backendUrl + '/api/user/login', {email,password})
//           if (response.data.success) {
//             setToken(response.data.token)
//             localStorage.setItem('token',response.data.token)
//           } else {
//             toast.error(response.data.message)
//           }

//         }


//       } catch (error) {
//         console.log(error)
//         toast.error(error.message)
//       }
//   }

//   useEffect(()=>{
//     if (token) {
//       navigate('/')
//     }
//   },[token])

//   return (
//     <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
//         <div className='inline-flex items-center gap-2 mb-2 mt-10'>
//             <p className='prata-regular text-3xl'>{currentState}</p>
//             <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
//         </div>
//         {currentState === 'Login' ? '' : <input onChange={(e)=>setName(e.target.value)} value={name} type="text" className='w-full px-3 py-2 border border-gray-800' placeholder='Name' required/>}
//         <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" className='w-full px-3 py-2 border border-gray-800' placeholder='Email' required/>
//         <input onChange={(e)=>setPasword(e.target.value)} value={password} type="password" className='w-full px-3 py-2 border border-gray-800' placeholder='Password' required/>
//         <div className='w-full flex justify-between text-sm mt-[-8px]'>
//             {
//               currentState === 'Login' 
//               ? <p onClick={()=>setCurrentState('Sign Up')} className=' cursor-pointer'>Create account</p>
//               : <p onClick={()=>setCurrentState('Login')} className=' cursor-pointer'>Login Here</p>
//             }
//         </div>
//         <button className='bg-black text-white font-light px-8 py-2 mt-4'>{currentState === 'Login' ? 'Sign In' : 'Sign Up'}</button>
//     </form>
//   )
// }

// export default Login







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
  
    // Validate inputs
    if (!email || !password || (currentState === 'Sign Up' && !name)) {
      toast.error('Please fill in all the fields!');
      return;
    }
  
    // Mobile number validation only for Sign Up
    if (currentState === 'Sign Up' && !mobileNumber) {
      toast.error('Please enter a valid mobile number');
      return;
    }
  
    // Validate mobile number only for Sign Up (for Indian mobile numbers, 10 digits)
    if (currentState === 'Sign Up' && !/^[6-9]\d{9}$/.test(mobileNumber)) {
      toast.error('Please enter a valid mobile number');
      return;
    }
  
    try {
      if (currentState === 'Sign Up') {
        // Handle Sign Up
        const response = await axios.post(backendUrl + '/api/user/register', { name, email, mobileNumber, password });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
          toast.success('Account created successfully');
        } else {
          toast.error(response.data.message);
        }
      } else {
        // Handle Login
        const response = await axios.post(backendUrl + '/api/user/login', { email, password });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
          toast.success('Logged in successfully');
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error('An error occurred, please try again later');
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

      {/* Mobile Number Input */}
      {currentState === 'Sign Up' && (
        <input
          onChange={(e) => setMobileNumber(e.target.value)}
          value={mobileNumber}
          type="text"
          className="w-full px-4 py-3 border border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-500"
          placeholder="Mobile Number"
          maxLength="10" // Enforcing 10 digits
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
