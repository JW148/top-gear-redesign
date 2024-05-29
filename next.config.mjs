/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "74lmur9ykhcech90.public.blob.vercel-storage.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
