// composables/useFormats.ts

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

/**
 * useFormats
 *
 * Drop-in replacements for numeral() and moment() formatting
 * used throughout the application.
 */
export function useFormats() {

    /**
     * Format Number
     *
     * Replaces numeral(value).format(pattern)
     */
    const formatNumber = (value: number | bigint | string | null | undefined, pattern: string): string => {
        if (value === null || value === undefined || value === '') {
            return '0'
        }

        const num = typeof value === 'bigint' ? Number(value) : Number(value)

        if (isNaN(num)) {
            return '0'
        }

        switch (pattern) {
        case '0,0':
            return num.toLocaleString('en-US', { maximumFractionDigits: 0 })

        case '0,0.00':
            return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

        case '0,0[.]00':
            return num.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 })

        case '0,0[.]00[0000]':
            return num.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 6 })

        case '0,0.00[00]':
            return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 4 })

        case '0,0.00[0000]':
            return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 6 })

        case '0,0.00[000000]':
            return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 8 })

        case '0,0.00[00000000]':
            return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 10 })

        case '$0,0.00':
            return num.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 })

        case '$0,0.00[00]':
            return num.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 4 })

        case '$0,0.00[0000]':
            return num.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 6 })

        case '0.0%':
            return (num * 100).toFixed(1) + '%'

        case '0,0.0a': {
            const abs = Math.abs(num)
            const sign = num < 0 ? '-' : ''

            if (abs >= 1e12) {
                return sign + (abs / 1e12).toFixed(1) + 't'
            }
            if (abs >= 1e9) {
                return sign + (abs / 1e9).toFixed(1) + 'b'
            }
            if (abs >= 1e6) {
                return sign + (abs / 1e6).toFixed(1) + 'm'
            }
            if (abs >= 1e3) {
                return sign + (abs / 1e3).toFixed(1) + 'k'
            }
            return sign + abs.toFixed(1)
        }

        default:
            return num.toLocaleString('en-US')
        }
    }

    /**
     * Format Time Ago
     *
     * Replaces moment.unix(ts).fromNow()
     */
    const formatTimeAgo = (unixTimestamp: number): string => {
        return dayjs.unix(unixTimestamp).fromNow()
    }

    return {
        formatNumber,
        formatTimeAgo,
    }
}
