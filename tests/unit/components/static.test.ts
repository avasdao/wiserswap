// tests/unit/components/static.test.ts

import {
    describe, it, expect,
} from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'

import Footer from '~/components/Footer.vue'
import Stats from '~/components/Stats.vue'
import Loading from '~/components/Loading.vue'
import Logos from '~/components/Logos.vue'
import PromoDivider from '~/components/PromoDivider.vue'
import BuilderBenefits from '~/components/BuilderBenefits.vue'
import CasualBenefits from '~/components/CasualBenefits.vue'
import Blank from '~/components/_Blank.vue'
import SkeletonFarm from '~/components/Skeleton/Farm.vue'
import SkeletonLender from '~/components/Skeleton/Lender.vue'
import SkeletonNFT from '~/components/Skeleton/NFT.vue'
import SkeletonPool from '~/components/Skeleton/Pool.vue'
import SkeletonToken from '~/components/Skeleton/Token.vue'

describe('Static Components', () => {

    describe('Footer', () => {
        it('mounts successfully', async () => {
            const wrapper = await mountSuspended(Footer)
            expect(wrapper.html()).toBeTruthy()
        })

        it('renders copyright text', async () => {
            const wrapper = await mountSuspended(Footer)
            expect(wrapper.text()).toContain('Nexa Exchange DAO')
        })

        it('renders current year', async () => {
            const wrapper = await mountSuspended(Footer)
            const year = new Date().getFullYear().toString()
            expect(wrapper.text()).toContain(year)
        })

        it('renders Admin link', async () => {
            const wrapper = await mountSuspended(Footer)
            expect(wrapper.text()).toContain('Admin')
        })
    })

    describe('Stats', () => {
        it('mounts successfully', async () => {
            const wrapper = await mountSuspended(Stats)
            expect(wrapper.html()).toBeTruthy()
        })

        it('renders stat labels', async () => {
            const wrapper = await mountSuspended(Stats)
            expect(wrapper.text()).toContain('All-time volume')
            expect(wrapper.text()).toContain('Total swaps')
            expect(wrapper.text()).toContain('Largest swap')
            expect(wrapper.text()).toContain('Total Payouts')
        })

        it('accepts data prop', async () => {
            const wrapper = await mountSuspended(Stats, {
                props: { data: { test: true } },
            })
            expect(wrapper.html()).toBeTruthy()
        })
    })

    describe('Loading', () => {
        it('mounts successfully', async () => {
            const wrapper = await mountSuspended(Loading)
            expect(wrapper.html()).toBeTruthy()
        })

        it('renders loading message', async () => {
            const wrapper = await mountSuspended(Loading)
            expect(wrapper.text()).toContain('wallet is loading')
        })

        it('accepts data prop', async () => {
            const wrapper = await mountSuspended(Loading, {
                props: { data: {} },
            })
            expect(wrapper.html()).toBeTruthy()
        })
    })

    describe('Logos', () => {
        it('mounts successfully', async () => {
            const wrapper = await mountSuspended(Logos)
            expect(wrapper.html()).toBeTruthy()
        })

        it('renders logo images', async () => {
            const wrapper = await mountSuspended(Logos)
            const images = wrapper.findAll('img')
            expect(images.length).toBe(5)
        })

        it('accepts data prop', async () => {
            const wrapper = await mountSuspended(Logos, {
                props: { data: {} },
            })
            expect(wrapper.html()).toBeTruthy()
        })
    })

    describe('PromoDivider', () => {
        it('mounts successfully', async () => {
            const wrapper = await mountSuspended(PromoDivider)
            expect(wrapper.html()).toBeTruthy()
        })

        it('renders promo text', async () => {
            const wrapper = await mountSuspended(PromoDivider)
            expect(wrapper.text()).toContain('Creator or Builder')
        })

        it('renders NFT Studio link text', async () => {
            const wrapper = await mountSuspended(PromoDivider)
            expect(wrapper.text()).toContain('Launch NFT Studio')
        })

        it('accepts data prop', async () => {
            const wrapper = await mountSuspended(PromoDivider, {
                props: { data: {} },
            })
            expect(wrapper.html()).toBeTruthy()
        })
    })

    describe('BuilderBenefits', () => {
        it('mounts successfully', async () => {
            const wrapper = await mountSuspended(BuilderBenefits)
            expect(wrapper.html()).toBeTruthy()
        })

        it('renders heading', async () => {
            const wrapper = await mountSuspended(BuilderBenefits)
            expect(wrapper.text()).toContain('Make-a-Market')
        })

        it('renders feature descriptions', async () => {
            const wrapper = await mountSuspended(BuilderBenefits)
            expect(wrapper.text()).toContain('"Wise" Contracts')
            expect(wrapper.text()).toContain('100K TPS Scalability')
            expect(wrapper.text()).toContain('Global "Shared" Liquidity')
        })

        it('accepts data prop', async () => {
            const wrapper = await mountSuspended(BuilderBenefits, {
                props: { data: {} },
            })
            expect(wrapper.html()).toBeTruthy()
        })
    })

    describe('CasualBenefits', () => {
        it('mounts successfully', async () => {
            const wrapper = await mountSuspended(CasualBenefits)
            expect(wrapper.html()).toBeTruthy()
        })

        it('renders heading', async () => {
            const wrapper = await mountSuspended(CasualBenefits)
            expect(wrapper.text()).toContain('For Casual Traders')
        })

        it('renders feature titles', async () => {
            const wrapper = await mountSuspended(CasualBenefits)
            expect(wrapper.text()).toContain('Your Keys. Your Coins.')
            expect(wrapper.text()).toContain('Global "Shared" Liquidity Pool')
            expect(wrapper.text()).toContain('Real-time Market Notifications')
        })

        it('accepts data prop', async () => {
            const wrapper = await mountSuspended(CasualBenefits, {
                props: { data: {} },
            })
            expect(wrapper.html()).toBeTruthy()
        })
    })

    describe('_Blank', () => {
        it('mounts successfully', async () => {
            const wrapper = await mountSuspended(Blank)
            expect(wrapper.html()).toBeTruthy()
        })

        it('renders Blank text', async () => {
            const wrapper = await mountSuspended(Blank)
            expect(wrapper.text()).toContain('Blank')
        })

        it('accepts data prop', async () => {
            const wrapper = await mountSuspended(Blank, {
                props: { data: {} },
            })
            expect(wrapper.html()).toBeTruthy()
        })
    })

    describe('Skeleton/Farm', () => {
        it('mounts successfully', async () => {
            const wrapper = await mountSuspended(SkeletonFarm)
            expect(wrapper.html()).toBeTruthy()
        })

        it('renders loading status', async () => {
            const wrapper = await mountSuspended(SkeletonFarm)
            expect(wrapper.text()).toContain('Loading...')
        })

        it('has status role', async () => {
            const wrapper = await mountSuspended(SkeletonFarm)
            expect(wrapper.find('[role="status"]').exists()).toBe(true)
        })
    })

    describe('Skeleton/Lender', () => {
        it('mounts successfully', async () => {
            const wrapper = await mountSuspended(SkeletonLender)
            expect(wrapper.html()).toBeTruthy()
        })

        it('renders loading status', async () => {
            const wrapper = await mountSuspended(SkeletonLender)
            expect(wrapper.text()).toContain('Loading...')
        })
    })

    describe('Skeleton/NFT', () => {
        it('mounts successfully', async () => {
            const wrapper = await mountSuspended(SkeletonNFT)
            expect(wrapper.html()).toBeTruthy()
        })

        it('renders loading status', async () => {
            const wrapper = await mountSuspended(SkeletonNFT)
            expect(wrapper.text()).toContain('Loading...')
        })
    })

    describe('Skeleton/Pool', () => {
        it('mounts successfully', async () => {
            const wrapper = await mountSuspended(SkeletonPool)
            expect(wrapper.html()).toBeTruthy()
        })

        it('renders loading status', async () => {
            const wrapper = await mountSuspended(SkeletonPool)
            expect(wrapper.text()).toContain('Loading...')
        })
    })

    describe('Skeleton/Token', () => {
        it('mounts successfully', async () => {
            const wrapper = await mountSuspended(SkeletonToken)
            expect(wrapper.html()).toBeTruthy()
        })

        it('renders loading status', async () => {
            const wrapper = await mountSuspended(SkeletonToken)
            expect(wrapper.text()).toContain('Loading...')
        })
    })
})
