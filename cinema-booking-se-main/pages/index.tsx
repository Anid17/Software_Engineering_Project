import Navbar from "@/components/Navbar"
import MovieList from "@/components/MovieList"
import useMovieList from "@/hooks/useMovieList"
import Footer from "@/components/Footer"



export default function Home() {
  const {data: movies = []} = useMovieList();

  return (
      <div className="px-[9.5vw]">
          <Navbar/>
          <div className="mb-[80px]"></div>
          <MovieList title="Latest" data={movies}/>
          <Footer></Footer>
      </div>
  )
}
