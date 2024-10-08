// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    /* Application Settings */
    app: {
        /* Application Header */
        head: {
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1',
            title: 'WiserSwap — Nexa Automated Market Maker (AMM)',
            meta: [
                { name: 'description', content: 'Swap your Nexa assets.' },
            ],
            link: [
                { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            ],
            script: [
                { src: '/js/matomo.js' },
            ],
        },
    },

    /* Progressive Web Application Settings */
    pwa: {
        manifest: {
            name: 'WiserSwap — Nexa Automated Market Maker (AMM)',
            short_name: 'WiserSwap',
            description: `Swap your Nexa assets.`,
            lang: 'en',
            theme_color: '#6a5acd',
            background_color: '#6a5acd',
            // useWebmanifestExtension: false,
        },
        meta: {
            name: 'WiserSwap — Nexa Automated Market Maker (AMM)',
            description: `Swap your Nexa assets.`,
            author: `Nexa Exchange DAO`,
        },
        // icon: false, // disables the icon module
        workbox: {
            // workboxURL: 'TBD',
            // enabled: true, // FOR DEV PURPOSES ONLY
        },
    },

    // FIXME
    runtimeConfig: {
        public: {
            API_ENDPOINT: 'https://telr.exchange/v1',
            API_ENDPOINT_RAW: process.env.API_ENDPOINT,
            API_ENDPOINT_NUXT: process.env.NUXT_ENV_API_ENDPOINT,
        },
    },

    /* Application Modules */
    modules: [
        /* Tailwind CSS */
        '@nuxtjs/tailwindcss',

        /* Pinia */
        '@pinia/nuxt',

        /* Internationalization for Nuxt */
        '@nuxtjs/i18n',

        /* Progressive Web Application */
        '@kevinmarrec/nuxt-pwa',
    ],

    /* Route Rules */
    routeRules: {
        /* Disable server-side rendering for entire site. */
        // NOTE: Allows for IPFS (hosting) + Web-based (rendering).
        '/**': { ssr: false },
    },

    /* Set compatibility date. */
    compatibilityDate: '2024-09-10',
})
