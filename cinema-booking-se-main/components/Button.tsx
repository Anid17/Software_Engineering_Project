import React from 'react'
import Link from 'next/dist/client/link';

interface ButtonProps {
    style: string;
    label: string;
    className?: string;
    clickFunction?: any;
}

const Button: React.FC<ButtonProps> = ({
    style,
    label,
    className,
    clickFunction
}) => {
  return (
    <button onClick={clickFunction} className={`${className} rounded-[10px] flex-1 ms:flex-initial px-[32px] py-[16px] text-[16px] font-opensans text-white font-bold uppercase ${style === 'primary'? 'primary-button' : 'secondary-button'}`}>
        {label}
    </button>
  )
}

export default Button