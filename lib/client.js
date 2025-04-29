


// lib/client.js
import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = sanityClient({
  projectId: 'sw7ekczt',
  dataset: 'production',
  apiVersion: '2025-01-30',
  useCdn: false, // يجب أن يكون false للكتابة
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});

const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);



