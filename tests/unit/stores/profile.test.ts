// tests/unit/stores/profile.test.ts

import {
    describe, it, expect, vi, beforeEach,
} from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useProfileStore } from '~/stores/profile'

describe('Profile Store', () => {
    let store: ReturnType<typeof useProfileStore>

    beforeEach(() => {
        setActivePinia(createPinia())
        store = useProfileStore()
    })

    describe('initial state defaults', () => {
        it('_session is null', () => {
            expect(store._session).toBeNull()
        })

        it('_email is null', () => {
            expect(store._email).toBeNull()
        })

        it('_meta is null', () => {
            expect(store._meta).toBeNull()
        })

        it('_nickname is null', () => {
            expect(store._nickname).toBeNull()
        })
    })

    describe('session getter', () => {
        it('returns null when _session is null', () => {
            store._session = null
            expect(store.session).toBeNull()
        })

        it('returns session object when set', () => {
            const mockSession = { id: 'abc-123', challenge: 'xyz' }
            store._session = mockSession
            expect(store.session).toEqual(mockSession)
        })
    })

    describe('sessionid getter', () => {
        it('returns null when _session is null', () => {
            store._session = null
            expect(store.sessionid).toBeNull()
        })

        it('returns session id when set', () => {
            store._session = { id: 'abc-123' }
            expect(store.sessionid).toBe('abc-123')
        })

        it('returns null when session has no id', () => {
            store._session = { challenge: 'xyz' }
            expect(store.sessionid).toBeNull()
        })
    })

    describe('deleteSession action', () => {
        it('sets _session to null', () => {
            store._session = { id: 'abc-123' }
            store.deleteSession()
            expect(store._session).toBeNull()
        })

        it('session getter returns null after delete', () => {
            store._session = { id: 'abc-123' }
            store.deleteSession()
            expect(store.session).toBeNull()
        })
    })

    describe('saveSession action', () => {
        it('saves a session object', () => {
            const mockSession = { id: 'new-session', challenge: 'test' }
            store.saveSession(mockSession)
            expect(store._session).toEqual(mockSession)
        })

        it('overwrites existing session', () => {
            store._session = { id: 'old' }
            const newSession = { id: 'new' }
            store.saveSession(newSession)
            expect(store._session).toEqual(newSession)
        })

        it('can save null session', () => {
            store._session = { id: 'existing' }
            store.saveSession(null)
            expect(store._session).toBeNull()
        })
    })

    describe('_setSession action', () => {
        it('directly sets _session', () => {
            const mockSession = { id: 'direct-set' }
            store._setSession(mockSession)
            expect(store._session).toEqual(mockSession)
        })

        it('logs the session', () => {
            const consoleSpy = vi.spyOn(console, 'log')
            const mockSession = { id: 'logged' }
            store._setSession(mockSession)
            expect(consoleSpy).toHaveBeenCalledWith(
                'SET SESSION', mockSession
            )
            consoleSpy.mockRestore()
        })
    })

    describe('state mutations', () => {
        it('can set _email', () => {
            store._email = 'test@example.com'
            expect(store._email).toBe('test@example.com')
        })

        it('can set _nickname', () => {
            store._nickname = 'satoshi'
            expect(store._nickname).toBe('satoshi')
        })

        it('can set _meta', () => {
            const meta = { key: 'value' }
            store._meta = meta
            expect(store._meta).toEqual(meta)
        })
    })
})
