import React from 'react'

interface SideFooterProps {
    style?: object
    className?: string
    children?: JSX.Element[] | JSX.Element
}

interface ImgProps {
    src: string
    width?: string
}

const Img = ({ src, width }: ImgProps) => (
    <img
        className={'my-2 text-white cursor-pointer hover:opacity-50'}
        width={width || '27px'}
        src={src}
    />
)

const Line = ({ className }) => (
    <div className={`${className} border-l-2 border-white h-1/4`} />
)

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
            <Line className={'mb-8'} />
            <Img width={'35px'} src={'discord.svg'} />
            <Img src={'github.svg'} />
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
            <Img src={'medium.svg'} />
            <Img src={'twitter.svg'} />
            <Line className={'mt-8'} />
        </div>
    )
}
