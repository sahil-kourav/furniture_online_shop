import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div>

      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full h-[500px] md:max-w-[450px]' src={assets.about_img} alt="NestCraft Furniture Store" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>At <b className='text-gray-800'>NestCraft</b>, we believe that furniture is more than just décor — it's the soul of a home. Born from a deep appreciation for timeless design and reliable craftsmanship, NestCraft is your destination for creating stylish and comfortable living spaces.</p>
          <p>Whether you’re furnishing a cozy corner or designing your dream home, our curated collection offers something for every taste — from modern minimalism to classic elegance. We bring you quality pieces crafted with care and built to last.</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>Our mission at NestCraft is to make great furniture accessible and enjoyable for everyone. We’re committed to delivering premium quality, elegant design, and an effortless shopping experience that helps turn your house into a home.</p>
        </div>
      </div>

      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className='flex flex-col md:flex-row text-md mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Premium Craftsmanship</b>
          <p className='text-gray-600'>Each NestCraft piece is built with high-quality materials and attention to detail, ensuring durability and timeless appeal.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Seamless Shopping</b>
          <p className='text-gray-600'>Enjoy a smooth and intuitive online experience, from exploring designs to doorstep delivery.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Customer-First Approach</b>
          <p className='text-gray-600'>Our dedicated support team is here to assist you every step of the way, ensuring your satisfaction is always our top priority.</p>
        </div>
      </div>

    </div>
  )
}

export default About
