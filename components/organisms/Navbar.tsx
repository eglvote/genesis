import React from 'react'
import ConnectToWeb3Button from '../molecules/ConnectToWeb3Button'
import NavbarLinkContainer from './NavbarLinkContainer'
// import Card from '../../atoms/Card'
// import { fromWei, displayComma } from '../../../lib/helpers'
// import HamburgerMenu from '../Hamburger/HamburgerMenu'
import NavbarLink from './NavbarLink'
// import useMediaQuery from '../../hooks/UseMediaQuery'
import Link from 'next/link'
// import { NavBarLinks } from '../../../lib/constants'

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
    // let isPageWide = useMediaQuery('(min-width: 1100px)')

    return (
        <header
            style={style}
            className={`${className} fixed inset-0 flex w-screen h-20 bg-dark`}
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
            <NavbarLinkContainer>
                <NavbarLink name={'Genesis'} />
                <NavbarLink name={'Docs'} />
                <NavbarLink name={'Forum'} />
                <NavbarLink name={'FAQ'} />
            </NavbarLinkContainer>
            <div
                className={
                    'flex justify-center items-center'
                    // 'w-28 h-1/2 mt-auto mb-auto mr-8 flex justify-center items-center border-2 border-salmon rounded-xl'
                }
            >
                {/* <p className={'text-salmon text-xl'}>App</p> */}
                <ConnectToWeb3Button
                    connectWeb3={connectWeb3}
                    walletAddress={walletAddress}
                />
            </div>
        </header>
    )
}
