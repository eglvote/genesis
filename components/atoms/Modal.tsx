import React, { useRef, useEffect } from 'react'
import useOutsideClick from '../hooks/UseOutsideClick'

interface handleOutsideClickParameters {
    (): void
}

interface ModalProps {
    className?: string
    children?: JSX.Element | JSX.Element[]
    style?: object
    handleOutsideClick: handleOutsideClickParameters
}

export default function Modal({
    className,
    children,
    style,
    handleOutsideClick,
}: ModalProps) {
    const ref = useRef()

    useOutsideClick(ref, handleOutsideClick)

    useEffect(() => {
        document.body.style.overflow = 'hidden'
        return function cleanup() {
            document.body.style.overflow = 'auto'
        }
    })

    return (
        <div
            style={style}
            className={
                'fixed inset-0 flex flex-col items-center justify-center h-screen'
            }
        >
            <div
                ref={ref}
                style={{ animation: `fadeIn .75s` }}
                className={`${className} maxHeight z-10 relative rounded-xl p-2 border shadow-2xl bg-white overflow-auto`}
            >
                {children}
            </div>
            <div
                style={{ animation: `fadeIn .75s` }}
                className='fixed inset-0 blur'
            />
            <div className='opacity-25 fixed inset-0 bg-black ' />
        </div>
    )
}
