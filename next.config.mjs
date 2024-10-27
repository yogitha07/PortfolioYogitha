/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
      unoptimized: true, // Disables image optimization for GitHub Pages
    },
    basePath: '/PortfolioYogitha', // Replace 'your-repo-name' with your GitHub repository name
    assetPrefix: '/PortfolioYogitha/', // Ensures assets load correctly on GitHub Pages
  };
  
  export default nextConfig;
