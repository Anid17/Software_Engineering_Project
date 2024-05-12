import React from 'react'
import { useRouter } from 'next/router';
import Image from 'next/image';

interface SingleMovieProps {
    id: string;
    key: string;
    bannerUrl: string;
}

const SingleMovie: React.FC<SingleMovieProps> = ({id,bannerUrl,key}) => {
    const router = useRouter();

  return (
    <div key={key} className='single-movie'>
        <img onClick={() => router.push(`/movie/${id}`)} className='h-full rounded-[10px] hover:-[2px] hover:outline-white' src={bannerUrl}></img>
    </div>
  )
}

export default SingleMovie