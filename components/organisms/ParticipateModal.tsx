import React, { useState } from 'react'
import Modal from '../atoms/Modal'
import Button from '../atoms/Button'

interface handleOutsideClickParameters {
    (): void
}

interface ParticipateModalProps {
    style?: object
    className?: string
    handleOutsideClick: handleOutsideClickParameters
}

export default function ParticipateModal({
    style,
    className,
    handleOutsideClick,
}: ParticipateModalProps) {
    const [amount, setAmount] = useState('')

    return (
        <Modal
            handleOutsideClick={handleOutsideClick}
            className={`${className} w-108 p-10 z-10`}
            style={style}
        >
            <form className={'flex flex-col justify-center items-center'}>
                <h1
                    className={
                        'w-full text-4xl text-center text-semibold inline-block font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink to-pink-dark'
                    }
                >
                    {'Amount'}
                </h1>
                <div
                    className={
                        'flex my-8 pl-2 flex-row bg-[#EAEAEA] rounded-xl border h-12 w-full items-center'
                    }
                >
                    <p className={'text-xl ml-2'}>ETH｜</p>
                    <input
                        type='number'
                        placeholder='###'
                        className={'bg-[#EAEAEA] text-xl'}
                    />
                </div>
                <div className={'flex flex-row items-center'}>
                    <input
                        className={'mr-4 cursor-pointer hover:opacity-50'}
                        name='isGoing'
                        type='checkbox'
                    />
                    <p
                        onClick={() =>
                            window.open(
                                'https://eglterms.s3-us-west-1.amazonaws.com/Terms+of+Service.pdf',
                                '_blank'
                            )
                        }
                        className={
                            'text-[#8A8A8A] cursor-pointer hover:opacity-50'
                        }
                    >
                        {'Accept Terms & Conditions'}
                    </p>
                </div>
                <Button
                    className={
                        'my-8 py-2 px-12 bg-gradient-to-r from-pink to-pink-dark rounded-3xl'
                    }
                    handleClick={() => {}}
                >
                    <p className={'text-white text-xl text-semibold'}>SUBMIT</p>
                </Button>
                <p className={'text-[#8A8A8A] text-xs mb-3 mx-4'}>
                    {
                        'Note: Each address can only participate once in the Genesis. If you’d like to participate again, you will have to use a different address.'
                    }
                </p>
            </form>
        </Modal>
    )
}
