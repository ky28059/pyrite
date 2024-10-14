import withSerwistInit from "@serwist/next";

const withSerwist = withSerwistInit({
    swSrc: "app/sw.ts",
    swDest: "public/sw.js",
    disable: process.env.NODE_ENV !== 'production',
    reloadOnOnline: true,
});

export default withSerwist({
    reactStrictMode: true,
    logging: {
        fetches: {
            fullUrl: true
        }
    }
});
