import React from 'react'
import Link from 'next/link'
import { urlFor } from '../lib/client'

const Footerbanner = ({footerbanner: {discount, largeText1,largeText2 ,saleTime , smallText ,midText ,desc ,product , buttonText ,image , slug}}) => {
  return (
    <div className="footer-banner-container">
      <div className="banner-desc">
        <div className="left">
          <p>{discount}</p>
          <h3>{largeText1}</h3>
          <h3>{largeText2}</h3>
          <p>{saleTime}</p>
        </div>


        
        <div className="right">
          <p>{smallText}</p>
          <h3>{midText}</h3>
          <p>{desc}</p>
          <Link href={`/product/${slug.current}`}>
            <button type="button">{buttonText}</button>
          </Link>
        </div>

        <img 
          src={urlFor(image) } width={350} height={500} className="footer-banner-image"
        />
      </div>
    </div>
  )
}

export default Footerbanner
