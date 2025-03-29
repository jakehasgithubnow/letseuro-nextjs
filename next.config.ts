// next.config.ts

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Or your existing configuration
  // swcMinify: true, // Example other config

  // --- ADD THIS BLOCK ---
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '', // Keep empty unless Sanity uses a specific port (it doesn't)
        // You could optionally add a pathname pattern here if needed,
        // but usually just the hostname is sufficient for Sanity.
        // pathname: '/images/your-project-id/**',
      },
    ],
    // --- OR (older method, less flexible) ---
    // domains: ['cdn.sanity.io'],
  },
  // --- END BLOCK ---

  // ... any other existing configuration
};

eslint: { ignoreDuringBuilds: true }

export default nextConfig;