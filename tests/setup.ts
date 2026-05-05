// tests/setup.ts

import { vi } from 'vitest'

// Provide a stub for useRuntimeConfig (used by profile.ts, amm.ts, etc.)
vi.stubGlobal('useRuntimeConfig', () => ({
    public: {
        API_ENDPOINT: 'https://nexa.exchange/v1',
        API_ENDPOINT_RAW: '',
        API_ENDPOINT_NUXT: '',
    },
}))
