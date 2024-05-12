import React, { useState, useEffect } from 'react'
import useMovie from '@/hooks/useMovie'
import { useRouter } from 'next/router';
import Navbar from '@/components/Navbar';
import Button from '@/components/Button';
import Genre from '@/components/Genre';
import Actor from '@/components/Actor';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Link from 'next/link';
import Footer from '@/components/Footer';

const Movie = () => {
	const router = useRouter();
	const { movieId } = router.query;
	const { data } = useMovie(movieId as string);
  const [randomIndex, setRandomIndex] = useState(null);

  useEffect(() => {
    if (data && data.galleryImages.length > 0) {
      const randomIndex = Math.floor(Math.random() * data.galleryImages.length);
      setRandomIndex(randomIndex);
    }
  }, [data]);


  

  return (
    <div>
		<div className='relative px-[9.5vw]'>
			<div className='h-[100vh] flex flex-col relative z-10'>
				<Navbar/>
				<div className='flex flex-1 items-center'>
					<div className='w-full sm:w-5/6 m:w-4/6 flex flex-col'>
						<h1 className='text-[30px] ms:text-[36px] ss:text-[42px] sm:text-[46px] text-white mb-[24px]'>{data?.title}</h1>
						<p className='text-text mb-[40px]'>{data?.description}</p>
						<div className='flex flex-col ms:flex-row gap-[12px]'>
							<div onClick={() => router.push(`/showtime/${movieId}`)}>
								<Button 
								style="primary"
								label="Buy Tickets"
								className="w-full ms:w-fit"
								/>
							</div>
							<div className='flex w-full ms:w-[initial] gap-[12px]'>
								<a className='w-full' href={data?.trailer} target='_blank'>
									<Button 
									style="secondary"
									label="Watch Trailer"
									className='w-full'
									/>
								</a>
								<button className='flex w-[58px] secondary-button items-center justify-center border-[1px] rounded-[10px] aspect-square'>
									<svg xmlns="http://www.w3.org/2000/svg" width="18.9" height="16" viewBox="0 0 18.9 16">
									<path id="interface-favorite-heart" d="M5.037,195.52a4.914,4.914,0,0,0-3.565,1.737A5.677,5.677,0,0,0,.125,200.24a4.424,4.424,0,0,0-.033.767,3.618,3.618,0,0,0,.047.719,5.109,5.109,0,0,0,1.343,2.718c.085.091.91.843,3.778,3.441L9.032,211.3a1.571,1.571,0,0,0,.161.127.687.687,0,0,0,.691,0,1.3,1.3,0,0,0,.142-.111l3.768-3.412q3.686-3.339,3.78-3.439a5.071,5.071,0,0,0,1.317-2.528,5.135,5.135,0,0,0,.085-.665l.006-.106,0,.079c0,.044,0-.1,0-.317a1.927,1.927,0,0,0,0-.287c0,.078,0,.092-.006.049,0-.084-.028-.356-.047-.488a5.631,5.631,0,0,0-2.494-3.93,4.722,4.722,0,0,0-3.7-.607,6.862,6.862,0,0,0-3.072,1.793c-.066.063-.123.115-.125.115s-.062-.055-.133-.122a7.442,7.442,0,0,0-2.32-1.547,5.168,5.168,0,0,0-1.587-.371c-.134-.009-.355-.014-.461-.011m-.072,1.356a3.459,3.459,0,0,0-1.89.721A4.183,4.183,0,0,0,1.9,199.021a4.075,4.075,0,0,0-.395,2.669,3.452,3.452,0,0,0,.187.621,3.833,3.833,0,0,0,.812,1.245c.068.071,7.022,6.374,7.032,6.374s6.964-6.3,7.032-6.374a3.777,3.777,0,0,0,.809-1.249,3.525,3.525,0,0,0,.252-1.285,4.119,4.119,0,0,0-.425-1.9,4.049,4.049,0,0,0-1.981-1.964,3.409,3.409,0,0,0-1-.263,5.005,5.005,0,0,0-.687,0,4.626,4.626,0,0,0-2.273.97,8.22,8.22,0,0,0-1.2,1.114.788.788,0,0,1-.245.2.686.686,0,0,1-.556.011.715.715,0,0,1-.271-.21,8.226,8.226,0,0,0-1.193-1.112,4.445,4.445,0,0,0-2.577-.991c-.089,0-.208,0-.265,0M.094,200.935c0,.218,0,.308,0,.2s0-.288,0-.4,0-.02,0,.2" transform="translate(-0.091 -195.52)" fill="#fff" fill-rule="evenodd"/>
									</svg>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='w-full h-full object-cover absolute left-0 top-0 z-[2] movie-overlay-gradient'></div>
			<img className='w-full h-full object-cover absolute left-0 top-0 z-[1]' src={data?.galleryImages[randomIndex]}/>
		</div>
		
		<div className='flex flex-col ss:flex-row px-[9.5vw]'>
			<div className='w-full flex flex-col items-center mb-[40px] ss:mb-0 ss:w-2/6 ss:pr-[60px] m:pr-[110px]'>
				<img className='rounded-[10px] w-[70%] md:w-full' src={data?.bannerUrl}></img>
				<div className='w-[100px] mt-[80px]'>
					<CircularProgressbar styles={buildStyles({
						// Rotation of path and trail, in number of turns (0-1)
						
						textSize: '27px',
						pathTransitionDuration: 0.5,
						pathColor: `#FF7430`,
						textColor: '#ffffff',
						trailColor: '#3B383D',
						backgroundColor: '#3e98c7',
						
					})} className='font-montserrat font-bold' value={data?.rating} maxValue={10} text={`${data?.rating}`} />
					<h6 className='text-white text-[20px] font-montserrat mt-[20px] text-center'>Rating</h6>
					<p className='text-[12px] text-[#8B898C] text-center mt-[8px]'>IMDb certified ratings</p>
				</div>
			</div>
			<div className='w-full ss:w-4/6'>
				<div className='mb-[60px]'>
					<h4 className='mb-[28px] text-white'>Storyline</h4>
					<p className='text-text'>{data?.storyline}</p>
				</div>
				<div className='mb-[60px]'>
					<h4 className='mb-[28px] text-white'>Details</h4>
					<div className='grid ms:grid-cols-4 py-[20px] rounded-[10px] bg-[#242225] my-[12px] pl-[20px]'>
						<h6 className='text-white mb-[8px] ms:mb-0'>Genres:</h6>
						<div className='flex gap-[8px] col-span-3 ms:ml-[20px]'>
							{data?.genre.map((item, index) => (
								<Genre key={index} title={item}/>
							))}
						</div>
					</div>
					<div className='grid items-center ms:grid-cols-4 py-[20px] rounded-[10px] bg-[#242225] my-[12px] pl-[20px]'>
						<h6 className='text-white mb-[8px] ms:mb-0'>Duration</h6>
						<p className='text-white ms:ml-[20px]'>{data?.duration}</p>
					</div>
					<div className='grid ms:grid-cols-4 items-center py-[20px] rounded-[10px] bg-[#242225] my-[12px] pl-[20px]'>
						<h6 className='text-white mb-[8px] ms:mb-0'>Release Year</h6>
						<p className='text-white ms:ml-[20px]'>{data?.releaseYear}</p>
					</div>
					<div className='grid ms:grid-cols-4 py-[20px] rounded-[10px] bg-[#242225] my-[12px] pl-[20px]'>
						<h6 className='text-white mb-[8px] ms:mb-0'>Writers</h6>
						<div className='ms:flex gap-[8px] col-span-3 ms:ml-[20px]'>
							{data?.writers.map((writer, index) => (
								<p className='text-white flex'>{writer}<span className={`${ index === data?.writers.lenght - 1 ? 'hidden' : 'flex'}`} key={index}>,</span></p>
							))}
						</div>
					</div>
				</div>

				
				<div className='mb-[60px]'>
					<h4 className='mb-[28px] text-white mr-[20px]'>Cast & Crew</h4>
					<div className='grid gap-[28px]'>
						{data?.actors.map((actor, index) =>(
							<Actor key={index} avatar={data?.actorImagesUrl[index]} realName={actor} movieName={data?.casts[index]}/>
						))}
					</div>
				</div>

				
				<div className='mb-[60px]'>
					<h4 className='mb-[28px] text-white'>Gallery</h4>
					<div className='grid grid-cols-2 md:grid-cols-4 gap-[28px]'>
						{data?.galleryImages.map((image, index) =>(
							<img className='rounded-[10px] aspect-video w-full object-cover' src={image} key={index}></img>
						))}
					</div>
				</div>

			</div>
		</div>
		<div className='px-[9.5vw] mt-[150px]'>
			<Footer/>
		</div>
		
	</div>
  )
}

export default Movie