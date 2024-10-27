/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
      unoptimized: true, // Disables image optimization for GitHub Pages
    },
    basePath: '/your-repo-name', // Replace 'your-repo-name' with your GitHub repository name
    assetPrefix: '/your-repo-name/', // Ensures assets load correctly on GitHub Pages
  };
  
  export default nextConfig;
