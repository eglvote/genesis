import React, { useState } from 'react'
import { truncateEthAddress } from '../lib/helpers'
import copy from 'copy-to-clipboard'
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'

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
            className={`${className} rounded-xl w-52 h-12 bg-white border shadow hover:bg-gray-100 font-bold text-center px-4 py-2 transition duration-500 ease select-none focus:outline-none focus:shadow-outline`}
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
                    <div
                        className={'flex items-center justify-center'}
                        style={{ animation: `fadeIn 1s` }}
                    >
                        <p className={'mr-2 font-semibold text-black'}>
                            {truncateEthAddress(walletAddress)}
                        </p>
                        <Jazzicon
                            diameter={20}
                            seed={jsNumberForAddress(walletAddress)}
                        />
                    </div>
                </Button>
            )
        } else {
            return (
                <Button handleClicked={connectWeb3}>
                    <p>Connect Wallet</p>
                </Button>
            )
        }
    } else {
        return (
            <Button className={'shadow-none'}>
                <p className={'mt-1'}>Copied!</p>
            </Button>
        )
    }
}
