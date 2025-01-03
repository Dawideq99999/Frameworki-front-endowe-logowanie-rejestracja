/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['example.com', 'via.placeholder.com', 'firebasestorage.googleapis.com'], // Dodajemy domenę z której chcemy ładować zdjęcia
    },
  }
  
  export default nextConfig;
  