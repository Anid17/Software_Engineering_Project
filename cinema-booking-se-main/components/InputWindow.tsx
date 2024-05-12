import React from 'react'

interface InputWindowProps {
    title: string;
    description: string;
}

const InputWindow: React.FC<InputWindowProps> = ({title, description}) => {
  return (
    <div>
        <h3 className='text-white text-[20px] mb-[16px]'>{title}</h3>
        <p className='text-text mb-[28px]'>{description}</p>
    </div>
  )
}

export default InputWindow