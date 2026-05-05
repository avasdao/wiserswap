// tests/unit/stores/system.test.ts

import {
    describe, it, expect, vi, beforeEach, afterEach,
} from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useSystemStore } from '~/stores/system'

// Mock $fetch at the ofetch level — this is what Nuxt's
// auto-imported $fetch resolves to under the hood.
const mockFetch = vi.fn()
vi.mock('ofetch', async (importOriginal) => {
    const original = await importOriginal() as Record<
        string, unknown
    >
    return {
        ...original,
        $fetch: (...args: unknown[]) => mockFetch(...args),
        ofetch: (...args: unknown[]) => mockFetch(...args),
    }
})

// Also stub globalThis.$fetch for any direct global access
vi.stubGlobal('$fetch', (...args: unknown[]) => mockFetch(...args))

// Mock navigator
vi.stubGlobal('navigator', {
    language: 'en-US',
    userAgent: 'vitest',
})

describe('System Store', () => {
    let store: ReturnType<typeof useSystemStore>

    beforeEach(() => {
        vi.useFakeTimers()
        setActivePinia(createPinia())
        store = useSystemStore()
        mockFetch.mockReset()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    describe('constants', () => {
        it('ONE_SAT is BigInt 1', () => {
            expect(store.ONE_SAT).toBe(BigInt('1'))
        })

        it('ONE_NEX is BigInt 100', () => {
            expect(store.ONE_NEX).toBe(BigInt('100'))
        })

        it('ONE_KEX is BigInt 100000', () => {
            expect(store.ONE_KEX).toBe(BigInt('100000'))
        })

        it('ONE_MEX is BigInt 100000000', () => {
            expect(store.ONE_MEX).toBe(BigInt('100000000'))
        })

        it('ONE_META is BigInt 1e18', () => {
            expect(store.ONE_META)
                .toBe(BigInt('1000000000000000000'))
        })
    })

    describe('initial notification state', () => {
        it('isShowing is false', () => {
            expect(store._notif.isShowing).toBe(false)
        })

        it('delay is 7000', () => {
            expect(store._notif.delay).toBe(7000)
        })

        it('icon is null', () => {
            expect(store._notif.icon).toBeNull()
        })

        it('title is null', () => {
            expect(store._notif.title).toBeNull()
        })

        it('description is null', () => {
            expect(store._notif.description).toBeNull()
        })
    })

    describe('entropy getter', () => {
        it('returns null when _entropy is null', () => {
            store._entropy = null
            expect(store.entropy).toBeNull()
        })

        it('returns entropy value when set', () => {
            store._entropy = 'deadbeef'
            expect(store.entropy).toBe('deadbeef')
        })
    })

    describe('init action', () => {
        it('increments _appStarts', () => {
            mockFetch.mockResolvedValue({})
            const before = store._appStarts
            store.init()
            expect(store._appStarts).toBe(before + 1)
        })

        it('increments _appStarts on each call', () => {
            mockFetch.mockResolvedValue({})
            store.init()
            store.init()
            store.init()
            expect(store._appStarts).toBe(3)
        })

        it('initializes _tickers if null', () => {
            mockFetch.mockResolvedValue({})
            store._tickers = null
            store.init()
            expect(store._tickers).toBeDefined()
            expect(typeof store._tickers).toBe('object')
        })

        it('preserves existing _tickers', () => {
            mockFetch.mockResolvedValue({})
            store._tickers = { NEXA: { price: 1 } }
            store.init()
            expect(store._tickers.NEXA).toEqual({ price: 1 })
        })

        it('sets _locale from navigator when null', () => {
            mockFetch.mockResolvedValue({})
            store._locale = null
            store.init()
            expect(store._locale).toBe('en-US')
        })

        it('does not overwrite existing _locale', () => {
            mockFetch.mockResolvedValue({})
            store._locale = 'zh'
            store.init()
            expect(store._locale).toBe('zh')
        })

        it('calls updateTicker immediately', async () => {
            mockFetch.mockResolvedValue({})
            store.init()
            expect(mockFetch).toHaveBeenCalled()
        })

        it('sets 30s interval for ticker updates',
            async () => {
                mockFetch.mockResolvedValue({})
                store.init()
                mockFetch.mockClear()

                vi.advanceTimersByTime(30000)
                expect(mockFetch).toHaveBeenCalled()
            }
        )

        it('does not update before 30s', async () => {
            mockFetch.mockResolvedValue({})
            store.init()
            mockFetch.mockClear()

            vi.advanceTimersByTime(15000)
            expect(mockFetch).not.toHaveBeenCalled()
        })
    })

    describe('updateTicker action', () => {
        beforeEach(() => {
            if (!store._tickers) {
                store._tickers = {}
            }
        })

        it('initializes AVAS sub-ticker if missing',
            async () => {
                store._tickers = {}
                mockFetch.mockResolvedValue({})

                await store.updateTicker()

                expect(store._tickers.AVAS).toBeDefined()
            }
        )

        it('initializes NEXA sub-ticker if missing',
            async () => {
                store._tickers = {}
                mockFetch.mockResolvedValue({})

                await store.updateTicker()

                expect(store._tickers.NEXA).toBeDefined()
            }
        )

        it('fetches AVAS ticker from exchange endpoint',
            async () => {
                mockFetch.mockResolvedValue({})

                await store.updateTicker()

                expect(mockFetch).toHaveBeenCalledWith(
                    'https://wiserswap.com/v1/ticker/57f46c1766dc0087b207acde1b3372e9f90b18c7e67242657344dcd2af660000'
                )
            }
        )

        it('fetches NEXA ticker from exchange endpoint',
            async () => {
                mockFetch.mockResolvedValue({})

                await store.updateTicker()

                expect(mockFetch).toHaveBeenCalledWith(
                    'https://wiserswap.com/v1/ticker/NEXA'
                )
            }
        )

        it('stores AVAS ticker response', async () => {
            const avasData = { price: 0.05 }
            const nexaData = { price: 0.001 }
            mockFetch
                .mockResolvedValueOnce(avasData)
                .mockResolvedValueOnce(nexaData)

            await store.updateTicker()

            expect(store._tickers.AVAS).toEqual(avasData)
        })

        it('stores NEXA ticker response', async () => {
            const avasData = { price: 0.05 }
            const nexaData = { price: 0.001 }
            mockFetch
                .mockResolvedValueOnce(avasData)
                .mockResolvedValueOnce(nexaData)

            await store.updateTicker()

            expect(store._tickers.NEXA).toEqual(nexaData)
        })

        it('handles fetch error gracefully', async () => {
            mockFetch.mockRejectedValue(
                new Error('Network error')
            )

            // Should not throw — .catch() in updateTicker
            // swallows the error and logs it
            await store.updateTicker()
            expect(store._tickers.AVAS).toBeUndefined()
        })
    })

    describe('initial state defaults', () => {
        it('_appStarts is 0', () => {
            expect(store._appStarts).toBe(0)
        })

        it('_appVersion is null', () => {
            expect(store._appVersion).toBeNull()
        })

        it('_entropy is null', () => {
            expect(store._entropy).toBeNull()
        })

        it('_flags is null', () => {
            expect(store._flags).toBeNull()
        })

        it('_locale is null', () => {
            expect(store._locale).toBeNull()
        })

        it('_notices is null', () => {
            expect(store._notices).toBeNull()
        })

        it('_tickers is null', () => {
            expect(store._tickers).toBeNull()
        })
    })
})
