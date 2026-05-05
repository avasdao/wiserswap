// tests/unit/composables/useFormats.test.ts

import {
    describe, it, expect,
} from 'vitest'
import { useFormats } from '~/composables/useFormats'

describe('useFormats', () => {
    const { formatNumber, formatTimeAgo } = useFormats()

    describe('formatNumber', () => {

        describe('null / undefined / empty handling', () => {
            it('returns "0" for null', () => {
                expect(formatNumber(null, '0,0')).toBe('0')
            })

            it('returns "0" for undefined', () => {
                expect(formatNumber(undefined, '0,0')).toBe('0')
            })

            it('returns "0" for empty string', () => {
                expect(formatNumber('', '0,0')).toBe('0')
            })

            it('returns "0" for NaN string', () => {
                expect(formatNumber('abc', '0,0')).toBe('0')
            })
        })

        describe('pattern: 0,0', () => {
            it('formats integer with commas', () => {
                expect(formatNumber(1234567, '0,0')).toBe('1,234,567')
            })

            it('rounds decimals', () => {
                expect(formatNumber(1234.56, '0,0')).toBe('1,235')
            })

            it('formats zero', () => {
                expect(formatNumber(0, '0,0')).toBe('0')
            })
        })

        describe('pattern: 0,0.00', () => {
            it('formats with 2 decimal places', () => {
                expect(formatNumber(1234.5, '0,0.00')).toBe('1,234.50')
            })

            it('rounds to 2 decimals', () => {
                expect(formatNumber(1234.567, '0,0.00')).toBe('1,234.57')
            })

            it('formats zero', () => {
                expect(formatNumber(0, '0,0.00')).toBe('0.00')
            })
        })

        describe('pattern: 0,0[.]00', () => {
            it('shows decimals when present', () => {
                expect(formatNumber(1234.56, '0,0[.]00')).toBe('1,234.56')
            })

            it('omits decimals for whole numbers', () => {
                expect(formatNumber(1234, '0,0[.]00')).toBe('1,234')
            })
        })

        describe('pattern: 0,0[.]00[0000]', () => {
            it('formats up to 6 decimal places', () => {
                expect(formatNumber(1.123456, '0,0[.]00[0000]')).toBe('1.123456')
            })

            it('omits trailing zeros', () => {
                expect(formatNumber(1234, '0,0[.]00[0000]')).toBe('1,234')
            })
        })

        describe('pattern: 0,0.00[00]', () => {
            it('formats with 2-4 decimal places', () => {
                expect(formatNumber(1.1234, '0,0.00[00]')).toBe('1.1234')
            })

            it('shows minimum 2 decimals', () => {
                expect(formatNumber(1, '0,0.00[00]')).toBe('1.00')
            })
        })

        describe('pattern: 0,0.00[0000]', () => {
            it('formats with 2-6 decimal places', () => {
                expect(formatNumber(1.123456, '0,0.00[0000]')).toBe('1.123456')
            })

            it('shows minimum 2 decimals', () => {
                expect(formatNumber(5, '0,0.00[0000]')).toBe('5.00')
            })
        })

        describe('pattern: 0,0.00[000000]', () => {
            it('formats with 2-8 decimal places', () => {
                expect(formatNumber(1.12345678, '0,0.00[000000]')).toBe('1.12345678')
            })

            it('shows minimum 2 decimals', () => {
                expect(formatNumber(5, '0,0.00[000000]')).toBe('5.00')
            })
        })

        describe('pattern: 0,0.00[00000000]', () => {
            it('formats with 2-10 decimal places', () => {
                expect(formatNumber(1.1234567891, '0,0.00[00000000]')).toBe('1.1234567891')
            })

            it('shows minimum 2 decimals', () => {
                expect(formatNumber(5, '0,0.00[00000000]')).toBe('5.00')
            })
        })

        describe('pattern: $0,0.00', () => {
            it('formats as USD currency', () => {
                expect(formatNumber(1234.56, '$0,0.00')).toBe('$1,234.56')
            })

            it('formats zero as USD', () => {
                expect(formatNumber(0, '$0,0.00')).toBe('$0.00')
            })
        })

        describe('pattern: $0,0.00[00]', () => {
            it('formats USD with up to 4 decimals', () => {
                expect(formatNumber(1.1234, '$0,0.00[00]')).toBe('$1.1234')
            })

            it('shows minimum 2 decimals', () => {
                expect(formatNumber(5, '$0,0.00[00]')).toBe('$5.00')
            })
        })

        describe('pattern: $0,0.00[0000]', () => {
            it('formats USD with up to 6 decimals', () => {
                expect(formatNumber(0.491312, '$0,0.00[0000]')).toBe('$0.491312')
            })

            it('shows minimum 2 decimals', () => {
                expect(formatNumber(5, '$0,0.00[0000]')).toBe('$5.00')
            })
        })

        describe('pattern: 0.0%', () => {
            it('formats ratio as percentage', () => {
                expect(formatNumber(0.05, '0.0%')).toBe('5.0%')
            })

            it('formats negative ratio', () => {
                expect(formatNumber(-0.032, '0.0%')).toBe('-3.2%')
            })

            it('formats zero', () => {
                expect(formatNumber(0, '0.0%')).toBe('0.0%')
            })

            it('formats small ratio like ticker pctChg24h / 100', () => {
                expect(formatNumber(1.68 / 100.0, '0.0%')).toBe('1.7%')
            })
        })

        describe('pattern: 0,0.0a (abbreviated)', () => {
            it('formats thousands with k suffix', () => {
                expect(formatNumber(42467, '0,0.0a')).toBe('42.5k')
            })

            it('formats millions with m suffix', () => {
                expect(formatNumber(2878904, '0,0.0a')).toBe('2.9m')
            })

            it('formats billions with b suffix', () => {
                expect(formatNumber(1500000000, '0,0.0a')).toBe('1.5b')
            })

            it('formats trillions with t suffix', () => {
                expect(formatNumber(21000000000000, '0,0.0a')).toBe('21.0t')
            })

            it('formats small numbers without suffix', () => {
                expect(formatNumber(999, '0,0.0a')).toBe('999.0')
            })

            it('formats negative thousands', () => {
                expect(formatNumber(-5000, '0,0.0a')).toBe('-5.0k')
            })

            it('formats negative millions', () => {
                expect(formatNumber(-2500000, '0,0.0a')).toBe('-2.5m')
            })

            it('formats negative billions', () => {
                expect(formatNumber(-3000000000, '0,0.0a')).toBe('-3.0b')
            })

            it('formats negative trillions', () => {
                expect(formatNumber(-1000000000000, '0,0.0a')).toBe('-1.0t')
            })

            it('formats zero', () => {
                expect(formatNumber(0, '0,0.0a')).toBe('0.0')
            })
        })

        describe('bigint support', () => {
            it('formats BigInt values', () => {
                expect(formatNumber(BigInt('1000000'), '0,0')).toBe('1,000,000')
            })

            it('formats BigInt with decimals pattern', () => {
                expect(formatNumber(BigInt('100'), '0,0.00')).toBe('100.00')
            })
        })

        describe('string number support', () => {
            it('formats numeric strings', () => {
                expect(formatNumber('1234.56', '0,0.00')).toBe('1,234.56')
            })
        })

        describe('default/unrecognized pattern', () => {
            it('falls back to toLocaleString', () => {
                const result = formatNumber(1234567, 'unknown-pattern')
                expect(result).toBe('1,234,567')
            })
        })
    })

    describe('formatTimeAgo', () => {
        it('returns a relative time string', () => {
            const now = Math.floor(Date.now() / 1000)
            const result = formatTimeAgo(now - 3600)
            expect(result).toContain('hour')
        })

        it('handles recent timestamps', () => {
            const now = Math.floor(Date.now() / 1000)
            const result = formatTimeAgo(now - 30)
            expect(result).toContain('second')
        })

        it('handles old timestamps', () => {
            const now = Math.floor(Date.now() / 1000)
            const result = formatTimeAgo(now - 86400 * 30)
            expect(result).toContain('month')
        })
    })
})
