import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

const RelatedProducts = ({ category }) => {
  const { products } = useContext(ShopContext)
  const [related, setRelated] = useState([])

  useEffect(() => {
    if (products.length > 0) {
      let filtered = products
        .filter((item) => category === item.category)

      setRelated(filtered.slice(0, 5))
    }
  }, [products, category]) 

  return (
    <div className='my-16 px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto'>
      <div className='text-center text-2xl py-8 mb-8'>
        <Title text1={'RELATED'} text2={'PRODUCTS'} />
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {related.map((item, index) => (
          <ProductItem
            key={index}
            id={item.id}
            name={item.name}
            price={item.price}
            image={item.image}
          />
        ))}
      </div>
    </div>
  )
}

export default RelatedProducts
