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

declare global {
    interface Window {
        ethereum: any
    }
}

interface HomeProps {
    accounts: any
    web3Reader?: any
    // contract: any
    web3: any
    // token: any
}

const Home = ({ accounts, web3 }: HomeProps) => {
    const [modal, setModal] = useState(false)
    // console.log(web3)
    return (
        <>
            <main className='flex flex-row h-screen bg-dark'>
                <div style={{ width: '90%' }} className={''}>
                    <h1 className={'text-white text-5xl font-bold mt-16 ml-16'}>
                        $EGL Genesis.
                    </h1>
                    <BodyHeader className={'ml-20 '} />
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
                    <SideFooter />
                </div>
            </main>
            {modal && (
                <ParticipateModal handleOutsideClick={() => setModal(false)} />
            )}
        </>
    )
}

export default () => (
    <Web3Container
        renderLoading={() => (
            <GenericPage
                connectWeb3={null}
                walletAddress={null}
                eglBalance={null}
            >
                <div
                    style={{ animation: `fadeIn 1s` }}
                    className='fixed inset-0 z-30 bg-black opacity-25'
                />
            </GenericPage>
        )}
        render={({ web3, accounts, walletAddress }) => (
            <GenericPage
                connectWeb3={() => connectToWeb3(window)}
                walletAddress={walletAddress}
                eglBalance={'0'}
            >
                <Home
                    accounts={accounts}
                    // contract={contract}
                    web3={web3}
                    // token={token}
                />
            </GenericPage>
        )}
    />
)
