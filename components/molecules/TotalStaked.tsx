import clsx from 'clsx'
import React from 'react'
import Button from '../atoms/Button'

interface TotalStakedProps {
    style?: object
    className?: string
    children?: JSX.Element[] | JSX.Element
    onClickJoin: Function
}

export default function TotalStaked({
    style,
    className,
    children,
    onClickJoin,
}: TotalStakedProps) {
    return (
        <div className={`${className} flex flex-row`}>
            <div style={style} className={'text-white'}>
                <p
                    className={clsx(
                        'text-2xl text-semibold w-auto inline-blockfont-bold',
                        'bg-clip-text text-transparent bg-gradient-to-r from-pink to-pink-dark'
                    )}
                >
                    {'###,###,###'}
                </p>
                <p className={'text-2xl text-semibold'}>{'Total ETH Staked'}</p>
            </div>
            <div className={'ml-24 flex items-center'}>
                <Button
                    handleClick={() => onClickJoin()}
                    className={'bg-salmon w-28 h-12 rounded-2xl'}
                >
                    <p className={'text-2xl font-semibold text-dark'}>JOIN</p>
                </Button>
            </div>
        </div>
    )
}
