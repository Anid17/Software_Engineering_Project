import React from 'react'
import SingleMovie from './SingleMovie';


interface MovieListProps {
  data: Record<string, any>[];
  title: string;
}

const MovieList: React.FC<MovieListProps> = ({data, title}) => {
  return (
    <div>
      <div className='grid grid-cols-2 ss:grid-cols-4 md:grid-cols-6 gap-[28px]'>

        {data.map((movie) => (
          <SingleMovie
            key={movie.id}
            id={movie.id}
            bannerUrl={movie.bannerUrl}
          />
        ))}

      </div>
    </div>
  )
}

export default MovieList