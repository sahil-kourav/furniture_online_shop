import React from 'react';
import { assets } from '../assets/assets';
import Title from './Title';

const OurPolicy = () => {
  const policies = [
    {
      icon: assets.exchange_icon,
      title: 'Easy Exchange Policy',
      desc: 'Enjoy hassle-free exchanges on all eligible items.',
    },
    {
      icon: assets.quality_icon,
      title: '7-Day Return Guarantee',
      desc: 'Not satisfied? Return within 7 days with no stress.',
    },
    {
      icon: assets.support_img,
      title: 'Dedicated Support Team',
      desc: 'Need help? Our experts are always ready to assist you with a smile.',
    },
    
  ];

  return (
    <div className="py-4 px-4 sm:px-10">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-center">
        {policies.map((item, index) => (
          <div
            key={index}
            className="p-6"
          >
            <img src={item.icon} alt={item.title} className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h3>
            <p className="text-sm text-gray-500">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurPolicy;
