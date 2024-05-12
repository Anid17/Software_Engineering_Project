import React, { useCallback, useEffect, useState } from 'react'
import Navbar from '@/components/Navbar'
import Button from '@/components/Button'
import Footer from '@/components/Footer'
import Time from '@/components/Time'
import Seat from '@/components/Seat'
import Link from 'next/link'
import useShowtime from '@/hooks/useShowtime'
import { useRouter } from 'next/router'
import DateComponent from '@/components/DateComponent'
import useShowtimeSeat from '@/hooks/useShowtimeSeat'
import axios from 'axios';
import { NextPageContext } from "next";
import { getSession, useSession } from "next-auth/react";
import useCurrentUser from '@/hooks/useCurrentUser'

export async function getServerSideProps(context: NextPageContext) {
	const session = await getSession(context);
  
	if (!session) {
	  return {
		redirect: {
		  destination: '/auth',
		  permanent: false,
		}
	  }
	}
  
	return {
	  props: {}
	}
  }

const Showtime = () => {
	const router = useRouter();
	const { showtimeId } = router.query;
	const { data: showtime } = useShowtime(showtimeId as string);
	const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  
	const [currentTime, setCurrentTime] = useState<string>('');

	const { data: currentUser, error, mutate } = useCurrentUser();
	const userId = currentUser?.id;



  useEffect(() => {
		const interval = setInterval(() => {
			setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
		}, 1000);

    return () => clearInterval(interval);
  }, []);

  // Function to check if a showtime is over
  const isShowtimeOver = (showtimeDateTime: string): boolean => {
    const [date, time] = showtimeDateTime.split('T');
    const showtimeTime = time.slice(0, 5);
    return showtimeTime < currentTime;
  };

	const currentDate = new Date();

	const [dates, setDates] = useState([]);

	useEffect(() => {
		const today = new Date(); // Get the current date
		const tempDates = [];
		for (let i = 0; i < 6; i++) {
			const date = new Date();
			date.setDate(today.getDate() + i);
			tempDates.push(date);
		}
		setDates(tempDates);
	}, []);

	const [selectedDate, setSelectedDate] = useState(new Date());
	const [showtimeIdForSeatSelection, setShowtimeIdForSeatSelection] = useState("");

	const handleDateClick = (date) => {
		setSelectedDate(date);
		setShowtimeIdForSeatSelection("");
		setSelectedSeats([]);
		console.log(date);
	};

	const handleTimeClick = (newShowtimeId) => {
		setShowtimeIdForSeatSelection((prevShowtimeId) => {
			return prevShowtimeId === newShowtimeId ? "" : newShowtimeId;
		});
		setSelectedSeats([]);
	};

	const { data: showtimeData } = useShowtimeSeat(showtimeIdForSeatSelection);

	/* SEATS RESERVATION */




	
	const isSelected = (seat: string) => selectedSeats.includes(seat);

	/* GENERATING SEATS */

  const [seats, setSeats] = useState([]);

  const generateSeats = () => {
		const reservedSeats = showtimeData?.seatStatus || [];
		const newSeats = [];
		const firstRowSeats = [];
	
		for (let number = 1; number <= 6; number++) {
			const seatData = reservedSeats.find(
				(seat) => seat.seatRow === 'A' && seat.seatNumber === number
			);
			const status = seatData ? 'reserved' : undefined;
	
			const handleSeatClick = (row: string, number: number) => {
				const seat = `${row}-${number}`;
			
				if (isSelected(seat)) {
					setSelectedSeats((prevSelectedSeats) => prevSelectedSeats.filter((selectedSeat) => selectedSeat !== seat));
				} else {
					setSelectedSeats((prevSelectedSeats) => [...prevSelectedSeats, seat]);
				}
			};
	
			firstRowSeats.push(
				<Seat
					key={`A-${number}`}
					row="A"
					number={number}
					status={status}
					onClick={() => handleSeatClick('A', number)}
				/>
			);
		}
	
		newSeats.push(
			<div className="grid grid-cols-10 gap-[8px] ss:gap-[10px] sm:gap-[14px] m:gap-[10px] lg:gap-[14px]">
				<div className="col-span-2"></div>
				{firstRowSeats}
				<div className="col-span-2"></div>
			</div>
		);
	
		let rowCharCode = 'B'.charCodeAt(0);
	
		for (let i = 0; i < 4; i++) {
			const row = String.fromCharCode(rowCharCode);
			const rowSeats = [];
	
			for (let number = 1; number <= 10; number++) {
				const seatData = reservedSeats.find(
					(seat) => seat.seatRow === row && seat.seatNumber === number
				);
				const status = seatData ? 'reserved' : undefined;
	
				const handleSeatClick = (row: string, number: number) => {
					const seat = `${row}-${number}`;
				
					if (isSelected(seat)) {
						setSelectedSeats((prevSelectedSeats) => prevSelectedSeats.filter((selectedSeat) => selectedSeat !== seat));
					} else {
						setSelectedSeats((prevSelectedSeats) => [...prevSelectedSeats, seat]);
					}
		
				};
	
				rowSeats.push(
					<Seat
						key={`${row}-${number}`}
						row={row}
						number={number}
						status={status}
						onClick={() => handleSeatClick(row, number)}
					/>
				);
			}
	
			newSeats.push(
				<div className="grid grid-cols-10 gap-[8px] ss:gap-[10px] sm:gap-[14px] m:gap-[10px] lg:gap-[14px]">
					{rowSeats}
				</div>
			);
	
			rowCharCode++;
		}
	
		setSeats(newSeats); // Update the seats state with the generated seats
	};
	
	useEffect(() => {
    generateSeats();
		console.log(selectedSeats)
  }, [showtimeData]);

	/* RESERVE SEATS */

	const addSeat = useCallback(
		async (seatData) => {
			try {
				await axios.post('/api/seatstatus/reserveSeat', seatData);
				// Handle successful insertion, e.g., show a success message or update state
	
			} catch (error) {
				console.log(error);
				// Handle error, e.g., show an error message or perform additional error handling
			}
		},
		[]
	);

	const addTicket = async (ticketData) => {
		try {
		await axios.post('/api/tickets/insertTicket', ticketData);
		// Handle successful insertion, e.g., show a success message or update state
	} catch (error) {
		console.log(error);
		// Handle error, e.g., show an error message or perform additional error handling
	}
	};

	const generateBarcode = () => {
		const barcodeLength = 16;
		let barcode = '';
	  
		for (let i = 0; i < barcodeLength; i++) {
		  const randomDigit = Math.floor(Math.random() * 10); // Generate a random digit between 0 and 9
		  barcode += randomDigit;
		}
	  
		return barcode;
	  };

	const addSelectedSeats = async () => {
		try {
			for (const seat of selectedSeats) {
				const [row, number] = seat.split('-');
				const seatData = {
					showtimeId: showtimeIdForSeatSelection, // Replace with the actual showtime ID
					seatRow: row,
					seatNumber: parseInt(number, 10)
				};

				const ticketData = {
					userId: userId, // Replace with the actual user ID
					showtimeId: showtimeId, // Replace with the actual movie ID
					dateTime: new Date().toISOString(),
					seatNumber: seat,
					barcode: generateBarcode(), // Generate a unique barcode using uuidv4()
				};
	
				await addTicket(ticketData);
		
				await addSeat(seatData);
			}
	
			// Clear the selected seats after successful insertion
			setSelectedSeats([]);
	
			// Redirect to a specific page, e.g., after successful insertion
			router.push('/getTickets');
		} catch (error) {
			console.log(error);
			// Handle error, e.g., show an error message or perform additional error handling
		}
	};


  return (
    <div className="px-[9.5vw]">
        <Navbar/>
        <div className='flex flex-col md:flex-row my-[80px] justify-between'>
            <div className='max-w-[400px] mb-[60px] md:mb-0 flex items-center'> 
                <img className='rounded-[8px] mr-[20px] h-[100px]' src={showtime?.bannerUrl}></img>
                <h5 className='text-white text-[20px] font-bold'>{showtime?.title}</h5>
            </div>
            <div className='flex'>
                <div className='flex flex-col ss:flex-row items-start ss:items-center gap-[20px] ss:gap-0'>
                    <div className='flex'>
                        <div className='bg-accent flex w-[30px] h-[30px] rounded-full items-center justify-center text-[14px] text-white'>1</div><span className='text-[16px] ml-[12px] text-white'>Select Seats</span>
                    </div>
                    <div className='w-[30px] h-[1px] mx-[12px] bg-primaryvariant1 hidden ss:block'></div>
                    <div className='flex'>
                        <div className='bg-primaryvariant1 flex w-[30px] h-[30px] rounded-full items-center justify-center text-[14px] text-white'>2</div><span className='text-[16px] ml-[12px] text-white'>Get Tickets</span>
                    </div>
                </div>
            </div>
        </div>
        <div className='w-full h-[1px] bg-[rgba(255,255,255,0.05)]'></div>
        <div className='reservation-info flex flex-wrap mt-[80px]'>
            <div className='w-full m:w-4/6 m:pr-[40px]'>
                <div className='mb-[60px]'>
                    <h6 className='text-white mb-[28px]'>Select Date</h6>
                    <div className='grid grid-cols-3 ss:grid-cols-6 m:grid-cols-3 md:grid-cols-6 gap-[20px]'>
                    {dates.map((date, index) => (
                        <DateComponent
                            key={date.getTime()}
                            date={date}
                            onClick={() => handleDateClick(date)}
                            className={`${selectedDate === date || (index === 0 && selectedDate.toDateString() === new Date().toDateString()) ? 'date-selected' : ''}`}
                        />
                        ))}
                    </div>
                </div>
                <div className='mb-[60px]'>
									<h6 className='text-white mb-[28px]'>Select Time</h6>
									{selectedDate && (
										<>
											{showtime?.showtimes.filter((item) => {
												const showtimeDateOnly = item?.dateTime.slice(0, 10);
												const selectedDateOnly = selectedDate.toISOString().slice(0, 10);
												return showtimeDateOnly === selectedDateOnly;
											}).length > 0 ? (
												<div className="grid grid-cols-3 ss:grid-cols-6 m:grid-cols-3 md:grid-cols-6 gap-[20px]">
													{showtime?.showtimes
														.filter((item) => {
															const showtimeDateOnly = item?.dateTime.slice(0, 10);
															const selectedDateOnly = selectedDate.toISOString().slice(0, 10);
															return showtimeDateOnly === selectedDateOnly;
														})
														.map((item) => {
															const [date, timeWithSeconds] = item?.dateTime.split('T');
															const time = timeWithSeconds.slice(0, 5);
															const isOver = isShowtimeOver(item?.dateTime); // Check if showtime is over

															if (isOver) {
																return null; // Skip rendering this showtime
															}

															return (
																<Time
																	time={time}
																	mode={item?.type}
																	key={item?.dateTime}
																	onClick={() => handleTimeClick(item?.id)}
																	className={`${showtimeIdForSeatSelection === item?.id ? 'time-selected' : ''}`}
																/>
															);
														})}
												</div>
											) : (
												<p className=' bg-primaryvariant1 p-[16px_24px] text-white rounded-[10px] border-[1px] border-primaryvariant2'>
													No movies available for the selected date.
												</p>
											)}
										</>
									)}
                </div>
                <div className='mb-[60px]'>
                    <h6 className='text-white mb-[28px]'>Select Seats</h6>
											<>
											{showtimeIdForSeatSelection ? (
													<div>
														<div className='flex flex-col gap-[8px] ss:gap-[10px] sm:gap-[14px] m:gap-[10px] lg:gap-[14px]'>
																<div className='relative w-full'> 
																		<svg className='w-full aspect-auto' viewBox="0 0 746 169">
																				<defs>
																						<linearGradient id="linear-gradient" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
																						<stop offset="0" stop-color="#fef980" stop-opacity="0.329"/>
																						<stop offset="1" stop-color="#312e2e" stop-opacity="0"/>
																						</linearGradient>
																				</defs>
																				<g id="Group_382" data-name="Group 382" transform="translate(-133 -913)">
																						<path id="Intersection_1" data-name="Intersection 1" d="M0,63.131c15.272-5.275,30.808-10.275,46.265-14.888C63.743,43.026,81.6,38.161,99.326,33.783c17.834-4.4,36.035-8.435,54.1-11.982,18.179-3.57,36.7-6.745,55.064-9.438C226.975,9.654,245.8,7.358,264.45,5.54c18.781-1.831,37.887-3.224,56.785-4.143C340.283.47,359.643,0,378.776,0s38.493.47,57.541,1.4c18.9.918,38,2.313,56.785,4.143,18.647,1.818,37.475,4.114,55.96,6.824,18.359,2.692,36.886,5.867,55.065,9.438,18.064,3.547,36.265,7.578,54.1,11.982,17.73,4.377,35.583,9.243,53.063,14.46C722.861,51.7,734.48,55.37,746,59.21V73.477c-12.882-4.357-25.912-8.506-38.884-12.377-17.257-5.151-34.885-9.955-52.4-14.279C637.1,42.473,619.131,38.491,601.3,34.99c-17.951-3.524-36.244-6.66-54.373-9.318-18.264-2.678-36.855-4.945-55.258-6.738-18.546-1.807-37.413-3.185-56.072-4.092-18.807-.915-37.923-1.379-56.82-1.379s-38.014.464-56.819,1.379c-18.66.908-37.526,2.285-56.073,4.092-18.4,1.793-37,4.06-55.258,6.738C192.5,28.33,174.2,31.466,156.252,34.99c-17.832,3.5-35.8,7.483-53.418,11.832-17.511,4.324-35.14,9.128-52.4,14.279C33.572,66.134,16.609,71.635,0,77.455Z" transform="translate(133 913)" fill="#fef980"/>
																						<path id="Subtraction_4" data-name="Subtraction 4" d="M746,159H0V63.909L75.686,36.388,179.434,12.87,273.9,0H469.859l65.164,6.15,107.095,21L746,58.278V159Z" transform="translate(133 923)" opacity="0.6" fill="url(#linear-gradient)"/>
																				</g>
																		</svg>
																		<h3 className='text-white text-[26px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>Hall 1</h3>
																</div>
																	<>{seats}</>
														</div>
														<div className='flex mt-[60px] ss:justify-center'>
																<div className='flex flex-col ss:flex-row items-start ss:items-center gap-[20px] ss:gap-[40px]'>
																		<div className='flex'>
																				<div className='border-[1px] border-[#2B282D] flex w-[30px] h-[30px] rounded-[5px] items-center justify-center text-[14px] text-white'>
																						<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 25.014 25">
																								<path id="interface-block" d="M12.5.324c-.485.022-.853.053-1.27.11A12.5,12.5,0,0,0,6.347,2.2,12.7,12.7,0,0,0,3.2,4.994a12.523,12.523,0,0,0-2.11,3.865A12.262,12.262,0,0,0,.5,11.737a10.122,10.122,0,0,0-.04,1.085,10.835,10.835,0,0,0,.07,1.4,12.487,12.487,0,0,0,1.808,5.212,12.97,12.97,0,0,0,.886,1.245c.257.316.412.49.861.966.065.069.369.354.55.515a12.491,12.491,0,0,0,4.356,2.528,12.249,12.249,0,0,0,2.881.6,10.078,10.078,0,0,0,1.085.04,10.868,10.868,0,0,0,1.4-.07,12.488,12.488,0,0,0,5.212-1.808,12.716,12.716,0,0,0,1.756-1.321c.175-.155.781-.762.936-.936a12.516,12.516,0,0,0,3.155-7.222c.019-.2.04-.553.04-.659,0-.062,0-.1.01-.1a2.921,2.921,0,0,0,.01-.386,2.653,2.653,0,0,0-.01-.38c-.006,0-.01-.031-.01-.1,0-.169-.031-.594-.066-.913a12.444,12.444,0,0,0-2.895-6.7c-.19-.223-.277-.319-.661-.726-.065-.069-.369-.354-.55-.515A12.493,12.493,0,0,0,16.921.959,12.288,12.288,0,0,0,13.766.342C13.566.328,12.692.315,12.5.324m-.1,1.8A10.611,10.611,0,0,0,8.173,3.23,10.5,10.5,0,0,0,5.882,4.77,13.526,13.526,0,0,0,4.756,5.92,10.7,10.7,0,0,0,2.307,11.6a11.336,11.336,0,0,0,0,2.451,10.689,10.689,0,0,0,2.286,5.477c.064.08.131.161.148.18l.03.035,7.551-7.551,7.551-7.551-.035-.03c-.166-.144-.512-.41-.755-.581A10.872,10.872,0,0,0,16.961,2.88a10.542,10.542,0,0,0-3.485-.762c-.231-.012-.839-.011-1.071,0m1.18,11.339L6.037,21.006l.035.03c.079.069.334.272.465.37a10.719,10.719,0,0,0,2.737,1.482,10.523,10.523,0,0,0,2.775.612,11.306,11.306,0,0,0,2.171-.036,10.706,10.706,0,0,0,9.448-10.643A10.543,10.543,0,0,0,22.523,8,10.223,10.223,0,0,0,21.539,6.4a6.339,6.339,0,0,0-.4-.5s-3.4,3.4-7.553,7.548M.455,12.827c0,.215,0,.3,0,.192s0-.285,0-.39,0-.016,0,.2" transform="translate(-0.455 -0.321)" fill="#2b282d" fill-rule="evenodd"/>
																						</svg>
																				</div><span className='text-[16px] ml-[12px] text-white'>Not available</span>
																		</div>
																		<div className='flex'>
																				<div className='bg-primaryvariant1 flex w-[30px] h-[30px] rounded-[5px] items-center justify-center text-[14px] text-white'></div><span className='text-[16px] ml-[12px] text-white'>Available</span>
																		</div>
																		<div className='flex'>
																				<div className='selectedSeat flex w-[30px] h-[30px] rounded-[5px] items-center justify-center text-[14px] text-white'></div><span className='text-[16px] ml-[12px] text-white'>Selected</span>
																		</div>
																</div>
														</div>
													</div>
													) :  (
														<p className=' bg-primaryvariant1 p-[16px_24px] text-white rounded-[10px] border-[1px] border-primaryvariant2'>
														Please select time above that suits you best.
														</p>
													)}
											</>
                </div>
            </div>
            <div className='w-full m:w-2/6'>
                <div>
                    <h6 className='mb-[28px] text-white'>Invoice</h6>
                    <div className='p-[28px] invoice'>
											{selectedSeats.length > 0 ? (
												selectedSeats.map((seat, index) => (
													<div className='flex justify-between selected-seat' key={index}>
														<p>{`Seat ${seat}`}</p>
														<p>$15</p>
													</div>
												))
											) : (
												<p>Checkout is empty</p>
											)}
											<div className='w-full h-[1px] bg-[rgba(255,255,255,0.05)] my-[28px]'></div>
											<div className='flex justify-between total'>
												<p>TOTAL</p>
												<p>${selectedSeats.length * 15}</p>
											</div>
											<div onClick={addSelectedSeats}>
												<Button style='primary' label='checkout' className='w-full' />
											</div>
										</div>
                </div>
            </div>
        </div>
        <Footer/>
    </div>
  )
}

export default Showtime