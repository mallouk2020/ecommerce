import React from 'react'
import Link from 'next/link'
import { urlFor } from '../lib/client'

const HeroBanner = ({herobanner }) => {

    return (
        <div className='hero-banner-container'>

            <div>
                <p className='beats-solo'>
                    {herobanner.smallText}
                    
                </p>
                <h3>{herobanner.midText}</h3>
                <h1 className='hero-text-larg'>{herobanner.largeText1}</h1>

                <img src={urlFor(herobanner.image)} alt="headphones" className='hero-banner-image' />
                <div>
                    <Link href={`/product/${herobanner.slug.current}`}   >

                        <button type='button'>{herobanner.buttonText}</button>
                    </Link>
                    <div className='desc'>
                        <h5>{herobanner.desc}</h5>
                        <p>{herobanner.smallText}</p>
                    </div>

                 

                </div>
            </div>
        </div>
    )
}

export default HeroBanner
