/** @type {import('next').NextConfig} */
const nextConfig = {
    // images: {
    //     remotePatterns: [
    //         {
    //             protocol: 'https',
    //             hostname: '**.onrender.com',
    //         },
    //     ],
    // },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'personal-blog-backend.onrender.com',
                port: '',
                pathname: '/uploads/**',
            },
        ],
    },
}

module.exports = nextConfig
