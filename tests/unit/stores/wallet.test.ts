// tests/unit/stores/wallet.test.ts

import {
    describe, it, expect, vi, beforeEach,
} from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useWalletStore } from '~/stores/wallet'

// Mock nexajs modules
vi.mock('@nexajs/hdnode', () => ({
    mnemonicToEntropy: vi.fn((_mnemonic) => {
        if (_mnemonic === 'invalid') {
            throw new Error('Invalid mnemonic')
        }
        return 'a'.repeat(64)
    }),
}))

vi.mock('@nexajs/purse', () => ({
    sendCoins: vi.fn().mockResolvedValue({ txid: 'mock-txid' }),
}))

vi.mock('@nexajs/wallet', () => ({
    Wallet: {
        init: vi.fn().mockResolvedValue({
            address: 'nexa:nqt000000000',
            abbr: 'nexa:nqt0…0000',
            isLoading: false,
            isReady: true,
            _entropy: 'mock-entropy',
            assets: {},
            coins: [],
            tokens: [],
            setAsset: vi.fn(),
            on: vi.fn(),
            send: vi.fn().mockResolvedValue({ txid: 'mock-send' }),
        }),
    },
    WalletStatus: {
        READY: 'ready',
        LOADING: 'loading',
        ERROR: 'error',
    },
}))

vi.mock('~/stores/wallet/broadcast.ts', () => ({
    default: vi.fn().mockResolvedValue({ success: true }),
}))

vi.mock('~/stores/wallet/setEntropy.ts', () => ({
    default: vi.fn(),
}))

describe('Wallet Store', () => {
    let store: ReturnType<typeof useWalletStore>

    beforeEach(() => {
        setActivePinia(createPinia())
        store = useWalletStore()
    })

    describe('initial state defaults', () => {
        it('_assets is null', () => {
            expect(store._assets).toBeNull()
        })

        it('_entropy is null', () => {
            expect(store._entropy).toBeNull()
        })

        it('_keychain is null', () => {
            expect(store._keychain).toBeNull()
        })

        it('_wallet is null', () => {
            expect(store._wallet).toBeNull()
        })
    })

    describe('getters with null wallet', () => {
        it('abbr returns null', () => {
            expect(store.abbr).toBeNull()
        })

        it('address returns null', () => {
            expect(store.address).toBeNull()
        })

        it('assets returns null', () => {
            expect(store.assets).toBeNull()
        })

        it('isLoading returns true', () => {
            expect(store.isLoading).toBe(true)
        })

        it('wallet returns null', () => {
            expect(store.wallet).toBeNull()
        })

        it('WalletStatus returns status enum', () => {
            expect(store.WalletStatus).toBeDefined()
            expect(store.WalletStatus.READY).toBe('ready')
        })
    })

    describe('init action', () => {
        it('logs initialization', async () => {
            const consoleSpy = vi.spyOn(console, 'info')
            await store.init()
            expect(consoleSpy).toHaveBeenCalledWith(
                'Initializing wallet...'
            )
            consoleSpy.mockRestore()
        })

        it('sets wallet to NEW when entropy is null', async () => {
            store._entropy = null
            await store.init()
            expect(store._wallet).toBe('NEW')
        })

        it('logs error when entropy is null', async () => {
            const consoleSpy = vi.spyOn(console, 'error')
            store._entropy = null
            await store.init()
            expect(consoleSpy).toHaveBeenCalledWith(
                'Missing wallet entropy.'
            )
            consoleSpy.mockRestore()
        })

        it('initializes wallet when entropy exists', async () => {
            store._entropy = 'a'.repeat(64)
            await store.init()
            expect(store._wallet).toBeDefined()
            expect(store._wallet).not.toBe('NEW')
        })
    })

    describe('setEntropy action', () => {
        it('sets _entropy value', () => {
            store.setEntropy('deadbeef')
            expect(store._entropy).toBe('deadbeef')
        })

        it('can set entropy to null', () => {
            store._entropy = 'existing'
            store.setEntropy(null)
            expect(store._entropy).toBeNull()
        })
    })

    describe('setMnemonic action', () => {
        it('returns error for invalid mnemonic', () => {
            const result = store.setMnemonic('invalid')
            expect(result).toBe('Invalid mnemonic')
        })

        it('sets entropy for valid mnemonic', () => {
            store.setMnemonic('valid test mnemonic')
            expect(store._entropy).toBe('a'.repeat(64))
        })
    })

    describe('destroy action', () => {
        it('resets _entropy to null', () => {
            store._entropy = 'some-entropy'
            store.destroy()
            expect(store._entropy).toBeNull()
        })

        it('resets _wallet to null', () => {
            store._wallet = { address: 'test' }
            store.destroy()
            expect(store._wallet).toBeNull()
        })

        it('logs destruction', () => {
            const consoleSpy = vi.spyOn(console, 'info')
            store.destroy()
            expect(consoleSpy).toHaveBeenCalledWith(
                'Wallet destroyed successfully!'
            )
            consoleSpy.mockRestore()
        })
    })

    describe('transfer action', () => {
        it('is a function', () => {
            expect(typeof store.transfer).toBe('function')
        })
    })

    describe('broadcast action', () => {
        it('is a function', () => {
            expect(typeof store.broadcast).toBe('function')
        })
    })

    describe('consolidate action', () => {
        it('is a function', () => {
            expect(typeof store.consolidate).toBe('function')
        })
    })
})
