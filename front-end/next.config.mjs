// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      domains: ['res.cloudinary.com'], // Allow images from Cloudinary
    },
  };
  
  export default nextConfig; // Use export default instead of module.exports
  