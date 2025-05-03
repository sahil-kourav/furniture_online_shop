import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { setShowSearch, getCartCount, token, setToken, setCartItems } = useContext(ShopContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    setCartItems({});
    navigate('/login');
  };

  return (
    <>
      {/* -------- Desktop Navbar -------- */}
      <div className='hidden sm:flex items-center justify-between py-4 px-10 shadow-sm bg-white font-medium sticky top-0 z-50'>
        <NavLink to='/' className="text-2xl font-semibold text-gray-800">NestCraft</NavLink>

        <ul className='flex gap-6 text-md text-gray-700'>
          <NavLink to='/' className='hover:text-black transition-all'>HOME</NavLink>
          <NavLink to='/collection' className='hover:text-black transition-all'>COLLECTION</NavLink>
          <NavLink to='/about' className='hover:text-black transition-all'>ABOUT</NavLink>
        </ul>

        <div className='flex items-center gap-6'>
          <img
            onClick={() => { setShowSearch(true); navigate('/collection'); }}
            src={assets.search_icon}
            className='w-5 cursor-pointer'
            alt="search"
          />

          <div className='relative group'>
            <img
              onClick={() => !token && navigate('/login')}
              className='w-5 cursor-pointer'
              src={assets.profile_icon}
              alt="profile"
            />
            {token && (
              <div className='hidden group-hover:flex flex-col absolute right-0 top-8 w-52 bg-white border shadow-lg rounded-md z-10'>
                <button className='py-2 px-4 text-md hover:bg-gray-100 text-gray-600 text-left'>My Account</button>
                <button onClick={() => navigate('/orders')} className='py-2 px-4 text-md hover:bg-gray-100 text-gray-600 text-left'>Orders</button>
                <button onClick={logout} className='py-2 px-4 text-md hover:bg-gray-100 text-red-500 text-left'>Logout</button>
              </div>
            )}
          </div>

          <Link to='/cart' className='relative'>
            <img src={assets.cart_icon} className='w-5 min-w-5' alt="cart" />
            <p className='absolute -right-1 -bottom-1 w-4 h-4 text-center bg-black text-white rounded-full text-[10px] flex items-center justify-center'>
              {getCartCount()}
            </p>
          </Link>
        </div>
      </div>

      {/* -------- Mobile Navbar -------- */}
      <div className='flex sm:hidden items-center justify-between py-4 px-5 shadow-sm bg-white font-medium sticky top-0 z-50'>
        <NavLink to='/' className="text-xl font-semibold text-gray-800">NestCraft</NavLink>
        <div className='flex items-center gap-5'>
          <img
            onClick={() => { setShowSearch(true); navigate('/collection'); }}
            src={assets.search_icon}
            className='w-5 cursor-pointer'
            alt="search"
          />
          <Link to='/cart' className='relative'>
            <img src={assets.cart_icon} className='w-5 min-w-5' alt="cart" />
            <p className='absolute -right-1 -bottom-1 w-4 h-4 text-center bg-black text-white rounded-full text-[10px] flex items-center justify-center'>
              {getCartCount()}
            </p>
          </Link>
          <img
            onClick={() => setVisible(true)}
            src={assets.menu_icon}
            className='w-5 cursor-pointer'
            alt="menu"
          />
        </div>
      </div>

      {/* -------- Mobile Sidebar -------- */}
      <div className={`sm:hidden fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-50 ${visible ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className='flex flex-col text-gray-700'>
          <div className='flex items-center gap-3 p-4 border-b'>
            <img onClick={() => setVisible(false)} className='w-4 rotate-180 cursor-pointer' src={assets.dropdown_icon} alt="close" />
            <p className='text-lg font-medium'>Menu</p>
          </div>

          <NavLink onClick={() => setVisible(false)} className='py-3 px-6 border-b' to='/'>HOME</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-3 px-6 border-b' to='/collection'>COLLECTION</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-3 px-6 border-b' to='/about'>ABOUT</NavLink>

          {token ? (
            <>
              <button onClick={() => { navigate('/orders'); setVisible(false); }} className='py-3 px-6 border-b text-left'>ORDERS</button>
              <button onClick={() => { logout(); setVisible(false); }} className='py-3 px-6 border-b text-left text-red-500'>LOGOUT</button>
            </>
          ) : (
            <button onClick={() => { navigate('/login'); setVisible(false); }} className='py-3 px-6 border-b text-left text-green-600'>Login / Register</button>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
