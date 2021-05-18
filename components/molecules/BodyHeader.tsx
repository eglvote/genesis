import React from 'react'

interface BodyHeaderProps {
    style?: object
    className?: string
    children?: JSX.Element[] | JSX.Element
}

export default function BodyHeader({
    style,
    className,
    children,
}: BodyHeaderProps) {
    return (
        <div style={style} className={`${className}`}>
            <div className={'flex flex-col w-52'}>
                <p
                    className={
                        'cursor-pointer hover:opacity-50 text-2xl mt-2 w-auto inline-block font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink to-pink-dark'
                    }
                >
                    {'LEARN MORE'}
                    <span className={'text-3xl items-end ml-2'}>{'⭢'}</span>
                </p>
                <p
                    className={
                        'cursor-pointer hover:opacity-50 text-xl w-auto inline-block font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink to-pink-dark'
                    }
                >
                    {'CONTRACT'}
                    <span className={'text-2xl items-end ml-2'}>{'⭢'}</span>
                </p>
            </div>
        </div>
    )
}
