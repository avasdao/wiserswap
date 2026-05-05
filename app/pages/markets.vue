<!-- pages/markets.vue -->

<template>
    <main class="max-w-6xl mx-auto px-3 py-5">
        <h1 class="text-5xl font-medium">
            Markets
        </h1>

        <p class="mt-6 text-lg leading-8 text-gray-600">
            Live market data from the WiserSwap decentralized exchange.
            Track prices, volume, and liquidity across all Nexa asset pairs.
        </p>

        <section class="mt-10">
            <h2 class="text-2xl font-semibold text-gray-900">
                NEXA / USD
            </h2>

            <div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div class="rounded-lg bg-gray-50 p-4">
                    <dt class="text-sm text-gray-500">Price (mNEXA)</dt>
                    <dd class="mt-1 text-2xl font-semibold text-gray-900">
                        {{ displayQuote }}
                    </dd>
                </div>

                <div class="rounded-lg bg-gray-50 p-4">
                    <dt class="text-sm text-gray-500">24h Change</dt>
                    <dd class="mt-1 text-2xl font-semibold" :class="pctChg24hRaw >= 0 ? 'text-green-600' : 'text-red-600'">
                        {{ priceChg24h }}
                    </dd>
                </div>

                <div class="rounded-lg bg-gray-50 p-4">
                    <dt class="text-sm text-gray-500">24h Volume</dt>
                    <dd class="mt-1 text-2xl font-semibold text-gray-900">
                        {{ vol24h }}
                    </dd>
                </div>
            </div>
        </section>

        <section class="mt-10">
            <h2 class="text-2xl font-semibold text-gray-900">
                Trading Pairs
            </h2>

            <p class="mt-4 text-gray-600">
                Additional trading pairs and detailed market data coming soon.
            </p>
        </section>
    </main>
</template>

<script setup lang="ts">
useHead({
    title: `Markets — WiserSwap`,
    meta: [
        { name: 'description', content: `Live market data from the WiserSwap decentralized exchange.` }
    ],
})

/* Initialize formats. */
const { formatNumber } = useFormats()

/* Initialize stores. */
import { useSystemStore } from '@/stores/system'
const System = useSystemStore()

const displayQuote = computed(() => {
    const price = System.nexaTicker?.price
    if (!price) return 'n/a'

    return formatNumber(price * 1000000, '$0,0.00')
})

const priceChg24h = computed(() => {
    const pct = System.nexaTicker?.pctChg24h
    if (pct === null || pct === undefined) return 'n/a'

    return formatNumber(pct / 100.0, '0.0%')
})

const vol24h = computed(() => {
    const vol = System.nexaTicker?.vol24
    if (vol === null || vol === undefined) return 'n/a'

    return formatNumber(vol, '0,0.0a')
})

const pctChg24hRaw = computed(() => {
    return System.nexaTicker?.pctChg24h ?? 0
})

// onMounted(() => {
//     console.log('Mounted!')
//     // Now it's safe to perform setup operations.
// })

// onBeforeUnmount(() => {
//     console.log('Before Unmount!')
//     // Now is the time to perform all cleanup operations.
// })
</script>
