import React from 'react';
import { client } from '../lib/client';
import { Footerbanner, HeroBanner, Product } from '../components'; 

const Home = ({ products, banner  }) => {
  return (
    <>
      {/* تأكد من أن البيانات موجودة قبل الوصول إليها */}
      {banner?.length > 0 && <HeroBanner herobanner={banner[0]} />}

      <div className='products-heading'>
        <h2>Best Selling Products</h2>
        <p>Speakers for many people</p> {/* تصحيح الجملة */}
      </div>

      <div className='products-container'>
        {products?.map((product) => ( <Product key={product._id} product={product} />
        ))}
      </div>

     {banner?.length > 0  && <Footerbanner footerbanner={banner[0]} />} 
    </>
  );
};

export const getServerSideProps = async () => {

  // const query = '*[_type == "product"]{"queryimage": image.asset->url}';
  const query = '*[_type == "product"]{_id, name, slug, image, price ,"imageUrl": image.asset->url}';
  const products = await client.fetch(query);

  const queryBanner = '*[_type == "banner"]';
  const banner = await client.fetch(queryBanner);

  // const queryimage = '*[_type == "product"]{"queryimage": image.asset->url}';
  // const imagerl = await client.fetch(queryimage);

  return { props: { products, banner } };
};

export default Home;
