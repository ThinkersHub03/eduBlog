import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/exams", destination: "/pastpapers", permanent: true },
      { source: "/exams/:id", destination: "/pastpapers/:id", permanent: true },
      { source: "/papers", destination: "/pastpapers", permanent: true },
      { source: "/papers/:id", destination: "/pastpapers/:id", permanent: true },
      { source: "/admin/exams", destination: "/admin/pastpapers", permanent: true },
      { source: "/admin/exams/create", destination: "/admin/pastpapers/create", permanent: true },
      { source: "/admin/exams/:id", destination: "/admin/pastpapers/:id", permanent: true },
      { source: "/admin/papers", destination: "/admin/pastpapers", permanent: true },
      { source: "/admin/papers/create", destination: "/admin/pastpapers/create", permanent: true },
      { source: "/admin/papers/:id", destination: "/admin/pastpapers/:id", permanent: true },
    ];
  },
};

export default nextConfig;
