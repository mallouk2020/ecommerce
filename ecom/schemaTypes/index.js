// import { defineConfig } from 'sanity';
import product from './product.js';
import banner from './banner.js';

// export default defineConfig({
//   schema: {
//     types: schemaTypes,
//   },
// })





export const schemaTypes = [product , banner]



// import createSchema from 'part:@sanity/base/schema-creator';
// import schemaTypes from 'all:part:@sanity/base/schema-type';

// import product from './product';
// import banner from './banner';

// export default createSchema({
//   name: 'default',
//   types: schemaTypes.concat([ product, banner ]),
// })
  
