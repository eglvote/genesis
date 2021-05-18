import React, { useState, useEffect } from 'react'
import { zeroPad } from '../lib/helpers'
import m from 'moment'

interface CountdownProps {
    style?: object
    className?: string
    children?: JSX.Element[] | JSX.Element
}

interface DigitProps {
    num: number
    label: string
    className?: string
}

const Digit = ({ num, label, className }: DigitProps) => (
    <div className={`${className} w-20 mr-4 ml-2`}>
        <div className={'text-white text-4xl mb-4'}>
            {zeroPad(String(num), 2)}
        </div>
        <div className={'text-[#C0C0C0] text-xl'}>{label}</div>
    </div>
)

export default function Countdown({
    style,
    className,
    children,
}: CountdownProps) {
    const [days, setDays] = useState(0)
    const [hours, setHours] = useState(0)
    const [minutes, setMinutes] = useState(0)
    const [seconds, setSeconds] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            const end = 1627986278
            const now = m().unix()
            const timeLeft = m.unix(end - now)

            setDays(m.unix(end).diff(m.unix(now), 'days'))
            setHours(timeLeft.hours())
            setMinutes(timeLeft.minutes())
            setSeconds(timeLeft.seconds())
        }, 1000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div style={style} className={`${className} w-96 flex flex-row`}>
            <Digit className={'ml-0'} num={days} label={'days'} />
            <Digit num={hours} label={'hours'} />
            <Digit num={minutes} label={'minutes'} />
            <Digit num={seconds} label={'seconds'} />
        </div>
    )
}
