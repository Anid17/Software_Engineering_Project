import useMovie from '@/hooks/useMovie';
import React from 'react'

interface ShowtimeProps {
    showtime: any;
    onClickFunction: any;
}

const ShowtimeAdmin: React.FC<ShowtimeProps> = ({ showtime, onClickFunction }) => {
    return (
      <tr>
        <td>
          <div className='flex items-center'>
            <img className='w-[50px] rounded-[10px] mr-[20px]' src={showtime?.movie?.bannerUrl}></img>
            <p>{showtime?.movie?.title}</p>
          </div>
        </td>
        <td>{new Date(showtime?.dateTime).toLocaleDateString()}</td>
        <td>{new Date(showtime?.dateTime).toLocaleTimeString()}</td>
        <td>
          <p className='text-[14px] bg-primaryvariant1 rounded-full p-[4px_12px] w-fit'>{showtime?.type}</p>
        </td>
        <td>
          <div className='flex gap-[8px]'>
            <button className='bg-white text-primary p-[8px_20px] rounded-[5px] uppercase'>Edit</button>
            <button onClick={onClickFunction(showtime?.id)} className='bg-[rgba(249,119,55,0.14)] border-accent border-[1px] text-white p-[8px_20px] rounded-[5px] uppercase'>Delete</button>
          </div>
        </td>
      </tr>
    );
  };

export default ShowtimeAdmin