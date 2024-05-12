import React from 'react'

interface GenreProps{
    title: String;
    key: any;
}

const Genre: React.FC<GenreProps> = ({title,key}) => {
  return (
    <p key={key} className='bg-primaryvariant1 rounded-[4px] text-white text-[12px] font-opensans px-[10px] py-[4px] w-fit'>{title}</p>
  )
}

export default Genre
