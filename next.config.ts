import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    /* config options here */
    experimental: {
        authInterrupts: true,
        dynamicIO: true,
    },
    // Automatically bundle external packages in the Pages Router:
    bundlePagesRouterDependencies: true,
};

export default nextConfig;
