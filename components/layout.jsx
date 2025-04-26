import React from 'react';
import Head from 'next/head';

import Navbar from './Navbar';
import Footer from './footer';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Head>
        <title>mk Store</title>
      </Head >
      <header style={{display :"flex",
        justifyContent:'center',
        alignItems:"center",
        margin:"15px"
      }} >
        <Navbar />
      </header>
      <main className="main-container">
        {children}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Layout