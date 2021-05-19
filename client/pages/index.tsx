import React, { useState } from 'react'
import Head from 'next/head'
import GenericPage from '../components/pageTemplates/GenericPage'
import BodyHeader from '../components/molecules/BodyHeader'
import SideFooter from '../components/organisms/SideFooter'
import Countdown from '../components/organisms/Countdown'
import TotalStaked from '../components/molecules/TotalStaked'
import ParticipateModal from '../components/organisms/ParticipateModal'
import Web3Container from '../components/lib/Web3Container'
import connectToWeb3 from '../components/lib/connectToWeb3'
import useMediaQuery from '../components/hooks/UseMediaQuery'

declare global {
    interface Window {
        ethereum: any
    }
}

interface IndexProps {
    accounts: any
    web3Reader?: any
    web3: any
}

const Index = ({ accounts, web3 }: IndexProps) => {
    const [modal, setModal] = useState(false)
    const [walletAddress, setWalletAddress] = useState(
        accounts ? accounts[0] : null
    )
    let isPageWide = useMediaQuery('(min-width: 800px)')

    window.ethereum.on('accountsChanged', (accounts) => {
        setWalletAddress(accounts[0])
    })

    return (
        <GenericPage
            connectWeb3={() => connectToWeb3(window)}
            walletAddress={walletAddress}
        >
            <main
                style={{
                    height: isPageWide ? '100vh' : '105vh',
                    width: isPageWide ? '100%' : '115vw',
                }}
                className='flex flex-row bg-dark'
            >
                <div style={{ width: '90%' }} className={''}>
                    <h1 className={'text-white text-5xl font-bold mt-16 ml-16'}>
                        $EGL Genesis.
                    </h1>
                    <BodyHeader className={'ml-20'} />
                    <Countdown className={'ml-20 mt-16'} />
                    <TotalStaked
                        onClickJoin={() => setModal(true)}
                        className={'ml-20 mt-20'}
                    />
                </div>
                <div
                    style={{ width: '10%' }}
                    className={'flex justify-center items-center'}
                >
                    {isPageWide && <SideFooter />}
                </div>
            </main>
            {modal && (
                <ParticipateModal handleOutsideClick={() => setModal(false)} />
            )}
        </GenericPage>
    )
}

export default () => (
    <Web3Container
        renderLoading={() => (
            <GenericPage connectWeb3={null} walletAddress={null}>
                <div
                    style={{ animation: `fadeIn 1s` }}
                    className='fixed inset-0 z-30 bg-black opacity-25'
                />
            </GenericPage>
        )}
        render={({ web3, accounts }) => (
            <Index
                accounts={accounts}
                web3={web3}
                // token={token}
            />
        )}
    />
)
