import React from 'react'

interface SideFooterProps {
    style?: object
    className?: string
    children?: JSX.Element[] | JSX.Element
}

export default function SideFooter({
    style,
    className,
    children,
}: SideFooterProps) {
    return (
        <div
            style={style}
            className={`${className} flex flex-col items-center justify-center h-full w-1/2 -mt-16`}
        >
            <div className={'border-l-2 border-white h-1/4 mb-8'} />
            <img
                className={'my-2 text-white cursor-pointer hover:opacity-50'}
                width={'35px'}
                src={'discord.svg'}
            />
            <img
                className={'my-2 text-white cursor-pointer hover:opacity-50'}
                width={'27px'}
                src={'github.svg'}
            />
            <h1
                onClick={() =>
                    window.open(
                        'https://eglterms.s3-us-west-1.amazonaws.com/Terms+of+Service.pdf',
                        '_blank'
                    )
                }
                className={'my-2 text-white cursor-pointer hover:opacity-50'}
            >
                Terms
            </h1>
            <img
                className={'my-2 text-white cursor-pointer hover:opacity-50'}
                width={'27px'}
                src={'medium.svg'}
            />
            <img
                className={'my-2 text-white cursor-pointer hover:opacity-50'}
                width={'27px'}
                src={'twitter.svg'}
            />
            <div className={'border-l-2 border-white h-1/4 mt-8'} />
        </div>
    )
}
