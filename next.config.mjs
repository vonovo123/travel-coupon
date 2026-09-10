/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/yanolja",
        destination: "/nol",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "blogthumb.pstatic.net",
      },
      {
        protocol: "https",
        hostname: "postfiles.pstatic.net",
      },
      {
        protocol: "https",
        hostname: "blogpfthumb.phinf.naver.net",
      },
      {
        protocol: "https",
        hostname: "ssl.pstatic.net",
      },
      {
        protocol: "http",
        hostname: "blogthumb.pstatic.net",
      },
      {
        protocol: "http",
        hostname: "blogpfthumb.phinf.naver.net",
      },
    ],
  },
};

export default nextConfig;
