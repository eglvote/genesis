import React from 'react'
import NavBar from '../organisms/Navbar'
import Head from 'next/head'

interface connectWeb3Parameters {
    (): void
}

interface GenericPageTemplateProps {
    style?: object
    className?: string
    children?: JSX.Element[] | JSX.Element
    connectWeb3: connectWeb3Parameters
    walletAddress: string
}

export default function GenericPage({
    style,
    className,
    children,
    connectWeb3 = () => {},
    walletAddress,
}: GenericPageTemplateProps) {
    return (
        <>
            <Head>
                <link rel='icon' sizes='32x32' href='egl.svg' />
            </Head>
            <div style={style} className={`${className}`}>
                <NavBar
                    connectWeb3={connectWeb3}
                    walletAddress={walletAddress}
                />
                <div className={'mt-20 h-full'}>{children}</div>
            </div>
        </>
    )
}
