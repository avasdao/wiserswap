<script setup lang="ts">
/* Import modules. */
import numeral from 'numeral'

/* Define properties. */
// https://vuejs.org/guide/components/props.html#props-declaration
const props = defineProps({
    data: {
        type: [Object],
    },
})

/* Set API endpoint. */
const API_ENDPOINT = 'https://telr.exchange/v1/ticker/quote/NEXA'

const isShowingMenu = ref(false)

const tickerHandler = ref(null)
const ticker = ref(null)

let displayQuote = ref(null)
let priceChg24h = ref(null)
let vol24h = ref(null)

const updateTicker = async () => {
    ticker.value = await $fetch(API_ENDPOINT)
        .catch(err => console.error(err))
    // console.info('Latest ticker:', ticker.value)

    const price = (ticker.value?.quote.USD.price * 1000000) || 'n/a'
    // console.log('PRICE', price)

    const pctChg24h = numeral(ticker.value?.quote.USD.pctChg24h / 100.0).format('0.0%') || 'n/a'
    // console.log('PCT CHANGE 24H', pctChg24h)

    const vol24 = numeral(ticker.value?.quote.USD.vol24).format('0,0.0a') || 'n/a'
    // console.log('VOLUME 24H', vol24)

    displayQuote.value = numeral(price).format('$0,0.00')

    priceChg24h.value = pctChg24h

    vol24h.value = vol24
}


// this.tickerHandler = setInterval(() => {
//     this.updateTicker()
// }, 30000)

onMounted(() => {
    updateTicker()
})

// onBeforeUnmount(() => {
//     console.log('Before Unmount!')
//     // Now is the time to perform all cleanup operations.
// })
</script>

<template>
    <div class="bg-white">
        <!--
        Mobile menu

        Off-canvas menu for mobile, show/hide based on off-canvas menu state.
    -->
        <div v-if="isShowingMenu" class="relative z-40 lg:hidden" role="dialog" aria-modal="true">
            <!--
        Off-canvas menu backdrop, show/hide based on off-canvas menu state.

        Entering: "transition-opacity ease-linear duration-300"
            From: "opacity-0"
            To: "opacity-100"
        Leaving: "transition-opacity ease-linear duration-300"
            From: "opacity-100"
            To: "opacity-0"
        -->
            <div class="fixed inset-0 bg-black bg-opacity-25"></div>

            <div class="fixed inset-0 z-40 flex">
                <!--
            Off-canvas menu, show/hide based on off-canvas menu state.

            Entering: "transition ease-in-out duration-300 transform"
            From: "-translate-x-full"
            To: "translate-x-0"
            Leaving: "transition ease-in-out duration-300 transform"
            From: "translate-x-0"
            To: "-translate-x-full"
        -->
                <div class="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                    <div class="flex px-4 pb-2 pt-5">
                        <button @click="isShowingMenu = false" type="button" class="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400">
                            <span class="sr-only">Close menu</span>
                            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <!-- Links -->
                    <div class="mt-2">
                        <div class="border-b border-gray-200">
                            <div class="-mb-px flex space-x-8 px-4" aria-orientation="horizontal" role="tablist">
                                <NuxtLink to="/" class="flex flex-row gap-3 text-gray-500 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium" aria-controls="tabs-1-panel-1" role="tab" type="button" @click="isShowingMenu = false">
                                    <svg class="w-6 h-auto text-gray-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"></path>
                                    </svg>

                                    Back Home
                                </NuxtLink>
                            </div>
                        </div>

                        <ul role="list" class="my-6 space-y-6 px-6">
                            <li class="flex">
                                <NuxtLink to="/swap" class="text-2xl text-gray-600 font-medium tracking-widest" @click="isShowingMenu = false">
                                    Swap
                                </NuxtLink>
                            </li>

                            <li class="flex">
                                <NuxtLink to="/tokens" class="text-2xl text-gray-600 font-medium tracking-widest" @click="isShowingMenu = false">
                                    Tokens
                                </NuxtLink>
                            </li>

                            <li class="flex">
                                <NuxtLink to="/nfts" class="text-2xl text-gray-600 font-medium tracking-widest" @click="isShowingMenu = false">
                                    NFTs
                                </NuxtLink>
                            </li>

                            <li class="flex">
                                <NuxtLink to="/pools" class="text-2xl text-gray-600 font-medium tracking-widest" @click="isShowingMenu = false">
                                    Pools
                                </NuxtLink>
                            </li>

                            <li class="flex">
                                <NuxtLink to="/farms" class="text-2xl text-gray-600 font-medium tracking-widest" @click="isShowingMenu = false">
                                    Farms
                                </NuxtLink>
                            </li>

                            <li class="flex">
                                <NuxtLink to="/borrow" class="text-2xl text-gray-600 font-medium tracking-widest" @click="isShowingMenu = false">
                                    Borrow
                                </NuxtLink>
                            </li>
                        </ul>
                    </div>

                    <div class="space-y-6 border-t border-gray-200 px-4 py-6">
                        <div class="flow-root">
                            <NuxtLink to="/wallet" class="-m-2 block p-2 font-medium text-gray-900" @click="isShowingMenu = false">
                                My Wallet
                            </NuxtLink>
                        </div>

                        <div class="flow-root">
                            <NuxtLink to="/profile" class="-m-2 block p-2 font-medium text-gray-900" @click="isShowingMenu = false">
                                My Profile
                            </NuxtLink>
                        </div>
                    </div>

                    <div class="space-y-6 border-t border-gray-200 px-4 py-6">
                        <!-- Currency selector -->
                        <form>
                            <div class="inline-block">
                                <label for="mobile-currency" class="sr-only">Currency</label>
                                <div class="group relative -ml-2 rounded-md border-transparent focus-within:ring-2 focus-within:ring-white">
                                    <select
                                        id="mobile-currency"
                                        name="currency"
                                        class="flex items-center rounded-md border-transparent bg-none py-0.5 pl-2 pr-5 text-sm font-medium text-gray-700 focus:border-transparent focus:outline-none focus:ring-0 group-hover:text-gray-800"
                                    >
                                        <option>USD</option>
                                        <option>CAD</option>
                                        <option>AUD</option>
                                        <option>EUR</option>
                                        <option>GBP</option>
                                    </select>
                                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center">
                                        <svg class="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <header class="relative">
            <nav aria-label="Top">
                <!-- Top navigation -->
                <div class="bg-gray-900">
                    <div class="mx-auto flex h-10 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                        <!-- Currency selector -->
                        <form class="hidden lg:block lg:flex-1">
                            <div class="flex">
                                <label for="desktop-currency" class="sr-only">Currency</label>
                                <div class="group relative -ml-2 rounded-md border-transparent bg-gray-900 focus-within:ring-2 focus-within:ring-white">
                                    <select
                                        id="desktop-currency"
                                        name="currency"
                                        class="flex items-center rounded-md border-transparent bg-gray-900 bg-none py-0.5 pl-2 pr-5 text-sm font-medium text-white focus:border-transparent focus:outline-none focus:ring-0 group-hover:text-gray-100"
                                    >
                                        <option>USD</option>
                                        <option>CAD</option>
                                        <option>AUD</option>
                                        <option>EUR</option>
                                        <option>GBP</option>
                                    </select>
                                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center">
                                        <svg class="h-5 w-5 text-gray-300" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </form>

                        <p class="sm:hidden block flex-1 text-center text-sm font-medium text-white lg:flex-none tracking-wider">
                            Go PRO!
                            <NuxtLink to="https://telr.exchange" target="_blank" class="text-sky-400 font-bold hover:text-sky-500">TΞLR.exchange</NuxtLink>
                        </p>
                        <p class="hidden sm:block flex-1 text-center text-sm font-medium text-white lg:flex-none tracking-wider">
                            Access PRO Trader tools on
                            <NuxtLink to="https://telr.exchange" target="_blank" class="text-sky-400 font-bold hover:text-sky-500">TΞLR.exchange</NuxtLink>
                        </p>

                        <div class="lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                            <NuxtLink to="https://telr.exchange/markets" target="_blank">
                                <h2 class="flex flex-row items-baseline text-xs text-amber-500 hover:text-amber-400 font-medium group">
                                    mNEXA/USD
                                    <span class="ml-2 text-xl text-amber-300 group-hover:text-amber-200">
                                        {{displayQuote}}
                                    </span>
                                </h2>
                            </NuxtLink>

                            <span class="hidden lg:flex h-6 w-px bg-gray-600" aria-hidden="true"></span>

                            <NuxtLink to="https://telr.exchange/markets" target="_blank" class="hidden lg:flex">
                                <div class="flex justify-end">
                                    <span class="text-yellow-400 font-medium text-sm sm:text-base">
                                        <span class="">
                                            {{priceChg24h}}
                                        </span>

                                        <svg v-if="ticker?.quote?.USD?.pctChg24h > 0" class="inline w-4 h-auto text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                                        </svg>
                                        <svg v-else class="inline w-4 h-auto text-red-400" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"></path>
                                        </svg>

                                        <span class="mx-1 text-yellow-700">
                                            &bullet; &bullet;
                                        </span>

                                        <span class="">
                                            {{vol24h}}
                                        </span>
                                    </span>
                                </div>
                            </NuxtLink>
                        </div>
                    </div>
                </div>

                <!-- Secondary navigation -->
                <div class="bg-white">
                    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div class="border-b border-gray-200">
                            <div class="flex h-16 items-center justify-between">
                                <!-- Logo (lg+) -->
                                <div class="hidden lg:flex lg:items-center">
                                    <NuxtLink to="/">
                                        <span class="sr-only">WiserSwap</span>
                                        <img class="h-12 w-auto" src="~/assets/icon.svg" alt="" />
                                    </NuxtLink>
                                </div>

                                <div class="hidden h-full lg:flex">
                                    <!-- Mega menus -->
                                    <div class="ml-8">
                                        <div class="flex h-full justify-center space-x-8">
                                            <div class="flex">
                                                <div class="relative flex">
                                                    <!-- Item active: "border-indigo-600 text-indigo-600", Item inactive: "border-transparent text-gray-700 hover:text-gray-800" -->
                                                    <NuxtLink to="/swap"
                                                        type="button"
                                                        class="border-transparent text-gray-700 hover:text-gray-800 relative z-10 -mb-px flex items-center border-b-2 pt-px text-lg font-medium transition-colors duration-200 ease-out"
                                                        aria-expanded="false"
                                                    >
                                                        Swap
                                                    </NuxtLink>
                                                </div>
                                            </div>

                                            <div class="flex">
                                                <div class="relative flex">
                                                    <!-- Item active: "border-indigo-600 text-indigo-600", Item inactive: "border-transparent text-gray-700 hover:text-gray-800" -->
                                                    <NuxtLink to="/tokens"
                                                        type="button"
                                                        class="border-transparent text-gray-700 hover:text-gray-800 relative z-10 -mb-px flex items-center border-b-2 pt-px text-lg font-medium transition-colors duration-200 ease-out"
                                                        aria-expanded="false"
                                                    >
                                                        Tokens
                                                    </NuxtLink>
                                                </div>
                                            </div>

                                            <NuxtLink to="/nfts" class="flex items-center text-lg font-medium text-gray-700 hover:text-gray-800">
                                                NFTs
                                            </NuxtLink>

                                            <NuxtLink to="/pools" class="flex items-center text-lg font-medium text-gray-700 hover:text-gray-800">
                                                Pools
                                            </NuxtLink>

                                            <NuxtLink to="/farms" class="flex items-center text-lg font-medium text-gray-700 hover:text-gray-800">
                                                Farms
                                            </NuxtLink>

                                            <NuxtLink to="/borrow" class="flex items-center text-lg font-medium text-gray-700 hover:text-gray-800">
                                                Borrow
                                            </NuxtLink>
                                        </div>
                                    </div>
                                </div>

                                <!-- Mobile menu and search (lg-) -->
                                <div class="flex flex-1 items-center lg:hidden">
                                    <!-- Mobile menu toggle, controls the 'mobileMenuOpen' state. -->
                                    <button @click="isShowingMenu = true" type="button" class="-ml-2 rounded-md bg-white p-2 text-gray-400">
                                        <span class="sr-only">Open menu</span>
                                        <svg class="w-8 h-auto" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                        </svg>
                                    </button>

                                    <!-- Notifications -->
                                    <a href="javascript://" class="ml-2 p-2 text-gray-400 hover:text-gray-500">
                                        <span class="sr-only">Notifications</span>
                                        <svg class="w-6 h-auto" data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M9.143 17.082a24.248 24.248 0 0 0 3.844.148m-3.844-.148a23.856 23.856 0 0 1-5.455-1.31 8.964 8.964 0 0 0 2.3-5.542m3.155 6.852a3 3 0 0 0 5.667 1.97m1.965-2.277L21 21m-4.225-4.225a23.81 23.81 0 0 0 3.536-1.003A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6.53 6.53m10.245 10.245L6.53 6.53M3 3l3.53 3.53"></path>
                                        </svg>
                                    </a>
                                </div>

                                <!-- Logo (lg-) -->
                                <NuxtLink to="/" class="lg:hidden">
                                    <span class="sr-only">WiserSwap</span>
                                    <img src="~/assets/icon.svg" alt="" class="h-12 w-auto" />
                                </NuxtLink>

                                <div class="flex flex-1 items-center justify-end">
                                    <div class="flex items-center lg:ml-8">
                                        <div class="hidden lg:flex">
                                            <a href="javascript://" class="-m-2 p-2 text-gray-400 hover:text-gray-500">
                                                <span class="sr-only">Notifications</span>
                                                <svg class="w-6 h-auto" data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.143 17.082a24.248 24.248 0 0 0 3.844.148m-3.844-.148a23.856 23.856 0 0 1-5.455-1.31 8.964 8.964 0 0 0 2.3-5.542m3.155 6.852a3 3 0 0 0 5.667 1.97m1.965-2.277L21 21m-4.225-4.225a23.81 23.81 0 0 0 3.536-1.003A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6.53 6.53m10.245 10.245L6.53 6.53M3 3l3.53 3.53"></path>
                                                </svg>
                                            </a>
                                        </div>

                                        <span class="mx-4 h-6 w-px bg-gray-200 lg:mx-6" aria-hidden="true"></span>

                                        <div class="flex flex-row gap-3">
                                            <NuxtLink to="/wallet" class="group -m-2 flex items-center p-2">
                                                <svg class="h-7 w-auto flex-shrink-0 text-lime-600 group-hover:text-lime-700" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3"></path>
                                                </svg>
                                            </NuxtLink>

                                            <NuxtLink to="/profile" class="group -m-2 flex items-center p-2">
                                                <svg class="h-7 w-auto flex-shrink-0 text-gray-600 group-hover:text-gray-700" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                                </svg>
                                            </NuxtLink>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    </div>

</template>
