import React from 'react'

interface Props {
    day: string;
    month: string;
    dayname: string;
		className?: string;
    onClick?: any;
}

const Date: React.FC<Props> = ({day,month,dayname,className, onClick}) => {

  return (
    <div onClick={onClick} className={`${className} aspect-auto bg-primaryvariant1 rounded-[10px] flex flex-col items-center justify-center py-[15px] date`}>
        <p className='text-white'>{day}</p>
        <p className='text-white'>{month}</p>
        <div className='w-[1px] h-[20px] my-[7px] bg-white'></div>
        <p className='text-white'>{dayname}</p>
    </div>
  )
}

export default Date