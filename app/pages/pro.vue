<!-- pages/pro.vue -->

<template>
    <main class="max-w-6xl mx-auto px-3 py-5">
        <h1 class="text-5xl font-medium">
            PRO Trader Tools
        </h1>

        <p class="mt-6 text-lg leading-8 text-gray-600">
            Upgrade your trading experience with advanced charting, real-time order books, and professional-grade analytics.
            PRO tools are designed for serious traders who demand the best performance from their DEX.
        </p>

        <section class="mt-10">
            <h2 class="text-2xl font-semibold text-gray-900">
                Coming Soon
            </h2>

            <ul class="mt-4 space-y-3 text-gray-600">
                <li class="flex items-center gap-2">
                    <span class="text-indigo-600 font-bold">✦</span>
                    Advanced candlestick charting with multiple timeframes
                </li>
                <li class="flex items-center gap-2">
                    <span class="text-indigo-600 font-bold">✦</span>
                    Real-time order book depth visualization
                </li>
                <li class="flex items-center gap-2">
                    <span class="text-indigo-600 font-bold">✦</span>
                    Portfolio tracking and P&amp;L analysis
                </li>
                <li class="flex items-center gap-2">
                    <span class="text-indigo-600 font-bold">✦</span>
                    Limit orders and advanced order types
                </li>
                <li class="flex items-center gap-2">
                    <span class="text-indigo-600 font-bold">✦</span>
                    API access for automated trading strategies
                </li>
            </ul>
        </section>
    </main>
</template>

<script setup lang="ts">
useHead({
    title: `PRO Trader Tools — WiserSwap`,
    meta: [
        { name: 'description', content: `Advanced trading tools for professional Nexa DEX traders.` }
    ],
})

/* Initialize stores. */
import { useSystemStore } from '@/stores/system'
const System = useSystemStore()

// onMounted(() => {
//     console.log('Mounted!')
//     // Now it's safe to perform setup operations.
// })

// onBeforeUnmount(() => {
//     console.log('Before Unmount!')
//     // Now is the time to perform all cleanup operations.
// })
</script>
