import React, { useState } from 'react'

interface Props {
    time: string;
    mode: string;
		className?: string;
    onClick?: () => void;
}

const Time: React.FC<Props> = ({time,mode,className, onClick}) => {


  return (
    <div onClick={onClick} className={`${className} rounded-[10px] flex flex-col items-center justify-center time`}>
        <div className='rounded-[10px_10px_0px_0px] bg-primaryvariant1 w-full py-[15px] text-white flex items-center justify-center time-part'>{time}</div>
        <div className='bg-primaryvariant2 w-full rounded-[0px_0px_10px_10px] font-semibold text-[12px] py-[6px] text-white flex items-center justify-center mode-part'>{mode}</div>
    </div>
  )
}

export default Time