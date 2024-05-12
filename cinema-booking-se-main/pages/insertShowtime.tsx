import React, { useState, useCallback, useEffect } from 'react';
import Calendar from 'react-calendar';
import axios from 'axios';
import 'react-calendar/dist/Calendar.css';
import Input from '@/components/Input';
import router, { useRouter } from "next/router";
import Button from '@/components/Button';
import Link from 'next/link';
import { Value } from '@prisma/client/runtime';

const add_showtime = () => {
	const [movies, setMovies] = useState([]);
	const [selectedMovie, setSelectedMovie] = useState(null);
	const [dateTime, setDateTime] = useState('');
	const [type, setType] = useState('');
	
	const [value, onChange] = useState(new Date());

	useEffect(() => {
		// Fetch movies from the backend API
		const fetchMovies = async () => {
		  try {
			const response = await axios.get('/api/movies');
			setMovies(response.data);
		  } catch (error) {
			console.error('Error fetching movies:', error);
		  }
		};
	
		fetchMovies();
	  }, []);

	const handleSelect = () => {
		setSelectedMovie(!selectedMovie);
	};

	const addShowtime = useCallback(async () => {
		try {
			await axios.post('/api/showtimes/insertShowtime', {
				selectedMovie,
				dateTime,
				type
			});
	
			router.push('/admin_dashboard');
	
		} catch(error) {
			console.log(error);
		}
	}, [selectedMovie,
		dateTime,
	  type]); 

	function handleCalendarChange(value: Date): void {
		throw new Error('Function not implemented.');
	}

  return (
    <div className='min-h-[100vh] p-[50px] w-full bg-primary'>
        <h2 className='text-white text-[35px] mb-[60px]'>Add New Showtime</h2>
        <div className='flex gap-[28px]'>
            <div className='w-2/6 border-primaryvariant1 border-[1px] rounded-[10px] p-[28px] h-fit'>
                <h5 className='text-white text-[20px] mb-[16px]'>Movie</h5>
                <p className='text-text mb-[28px]'>Choose the movie for which you want to create showtimes.</p>
                <div
        onClick={handleSelect}
        className="w-[350px] cursor-pointer rounded-[10px] bg-primaryvariant1 p-[16px] flex justify-between items-center"
      >
        <p className="text-white pointer-events-none">Select Option</p>
        <svg
          className={`${selectedMovie ? 'rotate-180' : 'rotate-0'} pointer-events-none`}
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="7"
          viewBox="0 0 10 7"
        >
          <path
            id="Polygon_3"
            data-name="Polygon 3"
            d="M4.186,1.139a1,1,0,0,1,1.627,0l3.057,4.28A1,1,0,0,1,8.057,7H1.943a1,1,0,0,1-.814-1.581Z"
            transform="translate(10 7) rotate(180)"
            fill="#8b898c"
          />
        </svg>
      </div>
      <div className={`${selectedMovie ? 'block' : 'hidden'} w-[350px] select-tab rounded-[10px] bg-primaryvariant1 mt-[16px]`}>
	  {movies.map((movie) => (
		<div
			key={movie.id}
			className="movie p-[16px] flex border-t-[1px] movie-option"
			onClick={() => handleSelect()}
		>
			<img
			className="w-[22px] h-[22px] rounded-[5px] object-cover"
			src={movie.bannerUrl}
			alt={movie.title}
			/>
			<p className="text-white ml-[20px] truncate">{movie.title}</p>
		</div>
		))}
      </div>
      <div className="mt-[28px] w-[160px] h-[246px] flex items-center justify-center rounded-[10px] bg-primaryvariant1 border-[1px] border-dashed border-primaryvariant2">
		{selectedMovie ? (
			<img
			className="w-full h-full rounded-[10px] object-cover"
			src={selectedMovie.bannerUrl}
			alt={selectedMovie.title}
			/>
		) : (
			<p className="text-text">Banner<br />Preview</p>
		)}
		</div>

			<h4 className='text-[20px] text-white mt-[28px]'>Movie Name</h4>
            </div>
						<div className='w-4/6 flex flex-col gap-[28px]'>
							<div className='border-primaryvariant1 border-[1px] rounded-[10px] p-[28px]'>
								<h5 className='text-white text-[20px] mb-[16px]'>Date</h5>
								<p className='text-text mb-[28px]'>Pick the date on which the selected movie will be shown.</p>
								<Calendar onChange={(value: Date) => handleCalendarChange(value)} />
							</div>
							<div className='border-primaryvariant1 border-[1px] rounded-[10px] p-[28px]'>
								<h5 className='text-white text-[20px] mb-[16px]'>Time</h5>
								<p className='text-text mb-[28px]'>Set the availale showtimes for the selected movie on the selected date.</p>
								<div className='flex flex-col'>
									<div className='grid grid-cols-2 gap-x-[40px] mb-[40px]'>
									<label className='text-white text-[16px] my-[8px] customCheckbox'>
										<input
											type="checkbox"
											value="08:00"
											className='rounded-[5px]'
										/>
										<span className="checkmark"></span>

										08:00
									</label>
									<label className='text-white text-[16px] my-[8px] customCheckbox'>
										<input
											type="checkbox"
											value="08:00"
											className='rounded-[5px]'
										/>
										<span className="checkmark"></span>

										08:30
									</label>
									<label className='text-white text-[16px] my-[8px] customCheckbox'>
										<input
											type="checkbox"
											value="08:00"
											className='rounded-[5px]'
										/>
										<span className="checkmark"></span>

										09:00
									</label>
									<label className='text-white text-[16px] my-[8px] customCheckbox'>
										<input
											type="checkbox"
											value="08:00"
											className='rounded-[5px]'
										/>
										<span className="checkmark"></span>

										09:30
									</label>
									<label className='text-white text-[16px] my-[8px] customCheckbox'>
										<input
											type="checkbox"
											value="08:00"
											className='rounded-[5px]'
										/>
										<span className="checkmark"></span>

										09:00
									</label>
									<label className='text-white text-[16px] my-[8px] customCheckbox'>
										<input
											type="checkbox"
											value="08:00"
											className='rounded-[5px]'
										/>
										<span className="checkmark"></span>

										09:30
									</label>
									<label className='text-white text-[16px] my-[8px] customCheckbox'>
										<input
											type="checkbox"
											value="08:00"
											className='rounded-[5px]'
										/>
										<span className="checkmark"></span>

										09:00
									</label>
									<label className='text-white text-[16px] my-[8px] customCheckbox'>
										<input
											type="checkbox"
											value="08:00"
											className='rounded-[5px]'
										/>
										<span className="checkmark"></span>

										09:30
									</label>
									<label className='text-white text-[16px] my-[8px] customCheckbox'>
										<input
											type="checkbox"
											value="08:00"
											className='rounded-[5px]'
										/>
										<span className="checkmark"></span>

										09:00
									</label>
									<label className='text-white text-[16px] my-[8px] customCheckbox'>
										<input
											type="checkbox"
											value="08:00"
											className='rounded-[5px]'
										/>
										<span className="checkmark"></span>

										09:30
									</label>
									<label className='text-white text-[16px] my-[8px] customCheckbox'>
										<input
											type="checkbox"
											value="08:00"
											className='rounded-[5px]'
										/>
										<span className="checkmark"></span>

										09:00
									</label>
									<label className='text-white text-[16px] my-[8px] customCheckbox'>
										<input
											type="checkbox"
											value="08:00"
											className='rounded-[5px]'
										/>
										<span className="checkmark"></span>

										09:30
									</label>
									</div>
									<Input value='' className='w-[300px]' label="Custom Time" id="custom_time" placeholder='Ex. 12:15'/>
								</div>
							</div>
							<div className='border-primaryvariant1 border-[1px] rounded-[10px] p-[28px]'>
								<h5 className='text-white text-[20px] mb-[16px]'>Type</h5>
								<p className='text-text mb-[28px]'>Set the movie format that will show at selected time and date.</p>
								<label className="customRadio">
									<input type="radio" name="radio"/>
									3D
								</label>
								<label className="customRadio">
									<input type="radio" name="radio" />
									4DX2D
								</label>
								<label className="customRadio">
									<input type="radio" name="radio" />
									4D Max
								</label>
									
								
								
							</div>
							<div className='flex justify-end gap-[16px]'>
								<Button style="secondary" label="Clear"/>
								<Link href="/../adminDashboard">
								<Button label="Submit" style="primary" clickFunction={addShowtime}/>

								</Link>
							</div>
						</div>
        </div>
    </div>
  )
}

export default add_showtime