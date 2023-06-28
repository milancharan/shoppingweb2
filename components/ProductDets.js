import React from 'react'
import product from './Data.json'

export default function ProductDets() {
  const id = (window.location.pathname).split("/")[2] - 1
  return (
    <div className='row'>
      <div className='col6 mb-2 p-2 mx-auto border border-dark border-radius-4 text-center w-50'>
        <img src={product[id].image} alt='...' width={200} height={250} />
        <h4 className='mt-4'>{product[id].title}</h4>
        <p>{product[id].description}</p>
        <p>Price: $<del>{product[id].price * 2}</del> {product[id].price}</p>
        <p>Stock: {product[id].stock}</p>
        <p>Delivery: {product[id].delivery}</p>
      </div>
    </div>
  )
}