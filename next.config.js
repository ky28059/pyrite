const withSerwist = require("@serwist/next").default({
    swSrc: "app/sw.ts",
    swDest: "public/sw.js",
    disable: process.env.NODE_ENV !== 'production'
});

module.exports = withSerwist({
    reactStrictMode: true,
    images: {
        remotePatterns: [{
            protocol: 'https',
            hostname: 'se-images.campuslabs.com',
            port: '',
            pathname: '/clink/images/**'
        }]
    }
});
