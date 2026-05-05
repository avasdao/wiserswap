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
        setupFiles: ['../tests/setup.ts'],
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json-summary', 'lcov', 'html'],
            reportsDirectory: '../coverage',
            include: [
                'app/stores/**/*.ts',
                'app/composables/**/*.ts',
                'app/utils/**/*.ts',
                'app/components/**/*.vue',
                'app/pages/**/*.vue',
            ],
            exclude: [
                'node_modules',
                '.nuxt',
                '.output',
                'app/stores/system/clipboard.ts',
                'app/stores/wallet/broadcast.ts',
                'app/stores/wallet/setEntropy.ts',
                'app/stores/amm/swap_v1.js',
                'app/plugins/**',
                'app/components/Chart/**',
                'app/components/SwapWindow.vue',
                'app/components/SwapHistory.vue',
                'app/components/SwapSettings.vue',
                'app/components/Settings.vue',
                'app/components/ChooseAsset.vue',
                'app/components/Testimonials.vue',
                'app/components/FadedDivider.vue',
                'app/components/Header.vue',
                'app/components/Wallet/**',
                'app/pages/swap/**',
                'app/pages/farm/**',
                'app/pages/plantation/**',
                'app/pages/launchpad/Calendar.vue',
                'app/pages/launchpad/Manager.vue',
                'app/pages/launchpad/Spotlight.vue',
                'app/pages/launchpad/Recipients.vue',
                'app/pages/borrow.vue',
                'app/pages/farms.vue',
                'app/pages/nfts.vue',
                'app/pages/pools.vue',
                'app/pages/tokens.vue',
                'app/pages/profile.vue',
                'app/pages/lounge.vue',
                'app/pages/_blank.vue',
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
