import React from 'react'
import ConnectToWeb3Button from '../molecules/ConnectToWeb3Button'
import NavbarLinkContainer from './NavbarLinkContainer'
// import HamburgerMenu from '../Hamburger/HamburgerMenu'
import NavbarLink from './NavbarLink'
import useMediaQuery from '../hooks/UseMediaQuery'
import Link from 'next/link'
import clsx from 'clsx'

interface connectWeb3Parameters {
    (): void
}

interface NavBarProps {
    style?: object
    className?: string
    connectWeb3: connectWeb3Parameters
    walletAddress: string
}

export default function NavBar({
    style,
    className,
    connectWeb3,
    walletAddress,
}: NavBarProps) {
    let isPageWide = useMediaQuery('(min-width: 800px)')

    return (
        <header
            style={{ ...style, width: '100%' }}
            className={`${className} fixed inset-0 flex h-20 bg-dark`}
        >
            <div
                style={{ width: '100%' }}
                className={'flex flex-row w-full justify-end justfy-items-end'}
            >
                <Link href={'/'}>
                    <div
                        className={
                            'cursor-pointer hover:opacity-50 m-2 mx-4 flex flex-direction-row'
                        }
                    >
                        <img
                            src={'egl.svg'}
                            style={{
                                width: '65px',
                            }}
                        />
                        <p
                            className={
                                'flex justify-center items-center text-white font-semibold text-4xl ml-2'
                            }
                        >
                            EGL
                        </p>
                    </div>
                </Link>
                <div className={'flex w-full justify-center items-center my-3'}>
                    {isPageWide && (
                        <NavbarLinkContainer>
                            <NavbarLink name={'Genesis'} />
                            <NavbarLink name={'Docs'} />
                            <NavbarLink name={'Forum'} />
                            <NavbarLink name={'FAQ'} />
                        </NavbarLinkContainer>
                    )}
                </div>
                <div
                    // style={{ width: '100%' }}
                    className={
                        'flex items-center'
                        // 'w-28 h-1/2 mt-auto mb-auto mr-8 flex justify-center items-center border-2 border-salmon rounded-xl'
                    }
                >
                    {/* <p className={'text-salmon text-xl'}>App</p> */}
                    <ConnectToWeb3Button
                        connectWeb3={connectWeb3}
                        walletAddress={walletAddress}
                    />
                </div>
            </div>
        </header>
    )
}
