import React from 'react'
import Barcode from 'react-barcode';


interface Props {
    movieName: string;
    movieImage: string;
    date: string;
    time: string;
    seat: string;
    hall: string;
    barcode: string;
    className?: string;
}

const Ticket: React.FC<Props> = ({movieName, movieImage, date,time,seat,hall,barcode,className}) => {
  return (
    <div className={`flex flex-col ${className}`}>
        <div className='rounded-[40px] p-[40px] bg-white relative reservation-info'>
          <div className='flex items-center'>
            <img className='rounded-[8px] mr-[20px] h-[100px]' src={movieImage}></img>
            <h5 className='text-primary text-[16px] font-bold'>{movieName}</h5>
          </div>
          <div className='w-full h-[1px] border-[1px] border-[rgba(0,0,0,0.1)] my-[30px]'></div>
          <div className='grid grid-cols-2 gap-[20px]'>
            <div>
              <p className='text-primaryvariant1 text-[14px] mb-[8px]'>Date</p>
              <p className='text-primary text-[20px] font-semibold'>{date}</p>
            </div>
            <div>
              <p className='text-primaryvariant1 text-[14px] mb-[8px]'>Time</p>
              <p className='text-primary text-[20px] font-semibold'>{time}</p>
            </div>
            <div>
              <p className='text-primaryvariant1 text-[14px] mb-[8px]'>Seat</p>
              <p className='text-primary text-[20px] font-semibold'>{seat}</p>
            </div>
            <div>
              <p className='text-primaryvariant1 text-[14px] mb-[8px]'>Seat</p>
              <p className='text-primary text-[20px] font-semibold'>{hall}</p>
            </div>
          </div>
          <div className='w-full absolute left-[50%] translate-x-[-50%] bottom-[-1px] px-[30px]'>
          <svg className='w-full' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 286 2">
            <line id="Line_22" data-name="Line 22" x2="286" transform="translate(0 1)" fill="none" stroke="#1b181d" stroke-width="2" stroke-dasharray="14 20"/>
          </svg>
        </div>
        </div>
        <div className='rounded-[40px] p-[15px_40px] bg-white barcode'>
          <Barcode value={barcode}/>
        </div>
    </div>
  )
}

export default Ticket