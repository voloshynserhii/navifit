/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        tPayPublicKey: process.env.NEXT_TPAY_PUBLIC_KEY,
    },
}

module.exports = nextConfig
