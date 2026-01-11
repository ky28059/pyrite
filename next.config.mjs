import { spawnSync } from "node:child_process";
import withSerwistInit from "@serwist/next";


const revision = spawnSync("git", ["rev-parse", "HEAD"], { encoding: "utf-8" }).stdout ?? crypto.randomUUID();

const withSerwist = withSerwistInit({
    additionalPrecacheEntries: [{ url: "/~offline", revision }],

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
