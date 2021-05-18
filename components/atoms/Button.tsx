import React from 'react'

interface ButtonProps {
    style?: object
    className?: string
    children?: JSX.Element[] | JSX.Element
    handleClick: Function
}

export default function Button({
    style,
    className,
    children,
    handleClick,
}: ButtonProps) {
    return (
        <button
            onClick={() => handleClick()}
            style={style}
            className={`${className} cursor-pointer hover:opacity-50`}
        >
            {children}
        </button>
    )
}
