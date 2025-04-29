import React from 'react'
import Link from 'next/link'
import { urlFor } from '../lib/client'

const HeroBanner = ({ herobanner }) => {
  return (
    <div style={styles.bannerContainer}>
      <div style={styles.contentWrapper}>
        {/* النص والزر */}
        <div style={styles.textContent}>
          <p style={styles.smallText}>{herobanner.smallText}</p>
          <h3 style={styles.midText}>{herobanner.midText}</h3>
          <h1 style={styles.largeText}>{herobanner.largeText1}</h1>
          
          <Link href={`/product/${herobanner.slug.current}`}>
            <button style={styles.button}>
              {herobanner.buttonText}
            </button>
          </Link>
          
          <div style={styles.description}>
            <h5 style={styles.descText}>{herobanner.desc}</h5>
            <p style={styles.smallText2}>{herobanner.smallText}</p>
          </div>
        </div>
        
        {/* الصورة */}
        <div style={styles.imageContainer}>
          <img 
            src={urlFor(herobanner.image)} 
            alt="headphones" 
            style={styles.image} 
          />
        </div>
      </div>
    </div>
  )
}

const styles = {
  bannerContainer: {
    background: 'linear-gradient(to right, #3B82F6, #8B5CF6)',
    color: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    position: 'relative',
    height: '70vh', /* ارتفاع البانر 30% من ارتفاع الشاشة */
    minHeight: '300px',
    maxHeight: '400px',
    margin: '20px auto',
    width: '100%',
    maxWidth: '1500px',
  },
  contentWrapper: {
    display: 'flex',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 40px',
  },
  textContent: {
    flex: 1,
    maxWidth: '50%',
    zIndex: 2,
  },
  smallText: {
    fontSize: '16px',
    fontWeight: '600',
    marginBottom: '8px',
    opacity: 0.9,
  },
  midText: {
    fontSize: '24px',
    fontWeight: 'bold',
    margin: '10px 0',
  },
  largeText: {
    fontSize: '48px',
    fontWeight: 'bolder',
    lineHeight: '1.1',
    margin: '15px 0',
  },
  button: {
    background: 'white',
    color: '#2563EB',
    fontWeight: 'bold',
    padding: '12px 24px',
    borderRadius: '50px',
    fontSize: '16px',
    cursor: 'pointer',
    border: 'none',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
    marginTop: '15px',
  },
  description: {
    marginTop: '20px',
  },
  descText: {
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '8px',
  },
  smallText2: {
    fontSize: '14px',
    opacity: 0.8,
  },
  imageContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    zIndex: 2,
  },
  image: {
    maxHeight: '80%',
    width: 'auto',
    objectFit: 'contain',
    transition: 'transform 0.3s ease',
  },
}

export default HeroBanner