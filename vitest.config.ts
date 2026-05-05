// vitest.config.ts

import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
    test: {
        environment: 'nuxt',
        environmentOptions: {
            nuxt: {
                mock: {
                    intersectionObserver: true,
                    indexedDb: true,
                },
            },
        },
        globals: true,
        setupFiles: ['./tests/setup.ts'],
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json-summary', 'lcov', 'html'],
            reportsDirectory: './coverage',
            include: [
                'stores/**/*.ts',
                'composables/**/*.ts',
                'utils/**/*.ts',
                'components/**/*.vue',
                'pages/**/*.vue',
            ],
            exclude: [
                'node_modules',
                '.nuxt',
                '.output',
                'stores/system/clipboard.ts',
                'stores/wallet/broadcast.ts',
                'stores/wallet/setEntropy.ts',
                'stores/amm/swap_v1.js',
                'plugins/**',
                'components/Chart/**',
                'components/SwapWindow.vue',
                'components/SwapHistory.vue',
                'components/SwapSettings.vue',
                'components/Settings.vue',
                'components/ChooseAsset.vue',
                'components/Testimonials.vue',
                'components/FadedDivider.vue',
                'components/Header.vue',
                'components/Wallet/**',
                'pages/swap/**',
                'pages/farm/**',
                'pages/plantation/**',
                'pages/launchpad/Calendar.vue',
                'pages/launchpad/Manager.vue',
                'pages/launchpad/Spotlight.vue',
                'pages/launchpad/Recipients.vue',
                'pages/borrow.vue',
                'pages/farms.vue',
                'pages/nfts.vue',
                'pages/pools.vue',
                'pages/tokens.vue',
                'pages/profile.vue',
                'pages/lounge.vue',
                'pages/_blank.vue',
            ],
            thresholds: {
                lines: 30,
                functions: 30,
                branches: 30,
                statements: 30,
            },
        },
        testTimeout: 15000,
        hookTimeout: 15000,
    },
})
