/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/yanolja",
        destination: "/nol",
        permanent: true,
      },
      {
        source: "/",
        has: [{ type: "host", value: "codysseia.net" }],
        destination: "https://www.codysseia.net/",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "codysseia.net" }],
        destination: "https://www.codysseia.net/:path*",
        permanent: true,
      },
      {
        source: "/",
        has: [{ type: "host", value: "travel-coupon.vercel.app" }],
        destination: "https://www.codysseia.net/",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "travel-coupon.vercel.app" }],
        destination: "https://www.codysseia.net/:path*",
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
