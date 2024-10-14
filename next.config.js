const withSerwist = require("@serwist/next").default({
    swSrc: "app/sw.ts",
    swDest: "public/sw.js",
    disable: process.env.NODE_ENV !== 'production',
    reloadOnOnline: true,
});

module.exports = withSerwist({
    reactStrictMode: true,
    logging: {
        fetches: {
            fullUrl: true
        }
    }
});
