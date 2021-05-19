import React, { useState } from 'react'
import { truncateEthAddress } from '../lib/helpers'
import copy from 'copy-to-clipboard'
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'
import clsx from 'clsx'

interface ConnectWeb3Parameters {
    (): void
}

interface ConnectWeb3ButtonProps {
    children?: object
    connectWeb3: ConnectWeb3Parameters
    walletAddress?: string
}

interface ButtonProps {
    className?: string
    handleClicked?: any
    children: JSX.Element | JSX.Element[]
}

const Button = ({ className, handleClicked, children }: ButtonProps) => {
    return (
        <button
            className={clsx(
                className,
                'rounded-xl w-52 h-12 mr-4 font-semibold hover:opacity-50',
                'text-center px-4 py-2 transition duration-500'
            )}
            onClick={handleClicked}
        >
            {children}
        </button>
    )
}

export default function ConnectToWeb3Button({
    connectWeb3,
    walletAddress,
}: ConnectWeb3ButtonProps) {
    const [clicked, setClicked] = useState(false)

    const handleSetClicked = () => {
        copy(walletAddress)

        setClicked(true)
        setTimeout(() => setClicked(false), 1000)
    }

    if (!clicked) {
        if (walletAddress) {
            return (
                <Button handleClicked={handleSetClicked}>
                    <div className={'flex items-center justify-center'}>
                        <Jazzicon
                            diameter={20}
                            seed={jsNumberForAddress(walletAddress)}
                        />
                        <p className={'ml-2 font-semibold text-white'}>
                            {truncateEthAddress(walletAddress)}
                        </p>
                    </div>
                </Button>
            )
        } else {
            return (
                <Button
                    className={'border-2 border-salmon'}
                    handleClicked={connectWeb3}
                >
                    <p className={'text-salmon font-semibold'}>
                        Connect Wallet
                    </p>
                </Button>
            )
        }
    } else {
        return (
            <Button className={'text-white'}>
                <p className={'mt-1'}>Copied!</p>
            </Button>
        )
    }
}
