import withSerwistInit from '@serwist/next';
import withPlaiceholder from '@plaiceholder/next';

const withSerwist = withSerwistInit({
    swSrc: "app/sw.ts",
    swDest: "public/sw.js",
    disable: process.env.NODE_ENV !== 'production'
});

export default withPlaiceholder(withSerwist({
    reactStrictMode: true,
    images: {
        remotePatterns: [{
            protocol: 'https',
            hostname: 'se-images.campuslabs.com',
            port: '',
            pathname: '/clink/images/**'
        }]
    }
}));
