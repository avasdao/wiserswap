// tests/unit/stores/amm.test.ts

import {
    describe, it, expect, vi, beforeEach,
} from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useAmmStore } from '~/stores/amm'

// Mock $fetch
const mockFetch = vi.fn()
vi.stubGlobal('$fetch', (...args: unknown[]) => mockFetch(...args))

// Stub window.alert (not available in happy-dom)
vi.stubGlobal('alert', vi.fn())

// Mock swap_v1
vi.mock('~/stores/amm/swap_v1.js', () => ({
    default: vi.fn().mockResolvedValue({ txid: 'mock-swap-txid' }),
}))

describe('AMM Store', () => {
    let store: ReturnType<typeof useAmmStore>

    beforeEach(() => {
        setActivePinia(createPinia())
        store = useAmmStore()
        mockFetch.mockReset()
        vi.mocked(alert).mockClear()
    })

    describe('session getter', () => {
        it('returns undefined', () => {
            expect(store.session).toBeUndefined()
        })
    })

    describe('load action', () => {
        it('returns an object with id', () => {
            const result = store.load('test-trade')
            expect(result).toEqual({ id: 'my-test-amm' })
        })

        it('returns same id regardless of input', () => {
            const result1 = store.load('trade-1')
            const result2 = store.load('trade-2')
            expect(result1.id).toBe(result2.id)
        })
    })

    describe('getCategoryById action', () => {
        it('returns My Category', () => {
            const result = store.getCategoryById('any')
            expect(result).toBe('My Category')
        })

        it('returns same category regardless of input', () => {
            expect(store.getCategoryById('a'))
                .toBe(store.getCategoryById('b'))
        })
    })

    describe('swap action', () => {
        it('is a function', () => {
            expect(typeof store.swap).toBe('function')
        })

        it('fetches pools for base asset', async () => {
            const mockPool = {
                id: '0014d77c5faaf175ada810c45660eacbd54ac8bdcb240014b2912c4cc61f1b8cbe5c77ebd5eeea2641645f10022c011445f5b9d41dd723141f721c727715c690fedbbbd60000',
                scriptArgs: {
                    admin: 'admin-addr',
                    adminFee: 100,
                    providerPubkey: 'provider-pub',
                    providerFee: 50,
                    payout: 'payout-addr',
                    ceiling: 1000000,
                    floor: 1,
                },
            }
            mockFetch.mockResolvedValueOnce([mockPool])

            await store.swap('BASE', 'TRADE', 1000)

            expect(mockFetch).toHaveBeenCalledWith(
                'https://wiserswap.com/v1/pools/BASE'
            )
        })

        it('alerts when no pools available', async () => {
            mockFetch.mockResolvedValueOnce([])

            await store.swap('BASE', 'TRADE', 1000)

            expect(alert).toHaveBeenCalledWith(
                expect.stringContaining('NO pools')
            )
        })

        it('alerts when pools fetch returns null', async () => {
            mockFetch.mockResolvedValueOnce(null)

            await store.swap('BASE', 'TRADE', 1000)

            expect(alert).toHaveBeenCalledWith(
                expect.stringContaining('NO pools')
            )
        })

        it('handles fetch error', async () => {
            mockFetch.mockRejectedValueOnce(
                new Error('Network error')
            )

            await store.swap('BASE', 'TRADE', 1000)

            expect(alert).toHaveBeenCalledWith(
                expect.stringContaining('NO pools')
            )
        })
    })
})
