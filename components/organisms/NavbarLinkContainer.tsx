import React from 'react'

interface NavBarLinkContainerProps {
    style?: object
    className?: string
    children?: JSX.Element[] | JSX.Element
}

export default function NavBarLinkContainer({
    style,
    className,
    children,
}: NavBarLinkContainerProps) {
    return (
        <div
            style={style}
            className={`${className} flex w-full justify-center items-center mr-4 my-3`}
        >
            {children}
        </div>
    )
}
