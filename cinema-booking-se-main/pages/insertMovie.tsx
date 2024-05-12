import React from 'react'
import axios from 'axios';
import { useCallback, useState } from "react";
import InputWindow from '@/components/InputWindow';
import Input from '@/components/Input';
import Textarea from '@/components/Textarea';
import Checkbox from '@/components/Checkbox';
import router, { useRouter } from "next/router";
import Button from '@/components/Button';



const InsertMovie = () => {
  const [movieName, setMovieName] = useState('');
  const [movieDescription, setMovieDescription] = useState('');
  const [movieBanner, setMovieBanner] = useState('');
  const [movieRating, setMovieRating] = useState('');
  const [movieTrailer, setMovieTrailer] = useState('');
  const [movieStoryline, setMovieStoryline] = useState('');
  const [movieDuration, setMovieDuration] = useState('');
  const [movieReleaseYear, setMovieReleaseYear] = useState('');
  const [movieGenresList] = useState(["Action", "Sci-Fi", "Fantasy", "Animation", "Adventure", "Biography", "Comedy", "Drama", "Documentary", "Horror", "Romance", "Thriller", "Western"]);

  // Movie Writers

  const [movieWriters, setMovieWriters] = useState<string[]>(['']);

  const handleMovieWritersInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const newMovieWriters = [...movieWriters]; // Create a copy of the inputFields array
    newMovieWriters[index] = value; // Update the value at the specified index
    setMovieWriters(newMovieWriters); // Update the state with the new array
  };

  const handleAddWritter = () => {
    setMovieWriters([...movieWriters, '']); // Add a new empty string to the inputFields array
  };

  const handleDeleteWriter = (index: number) => {
    const newMovieWriters = [...movieWriters];  // Create a copy of the inputFields array
    newMovieWriters.splice(index, 1); // Remove the element at the specified index
    setMovieWriters(newMovieWriters); // Update the state with the new array
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Here you can send the inputFields array to your backend or perform any other desired action
    console.log('Input fields:', movieWriters);
  };

  // Movie Casters - Real Name
  const [movieCastersRealNames, setMovieCastersRealNames] = useState<string[]>(['']); // Initial state with an empty string in the array

  const handleMovieCastersRealNamesInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const newMovieCastersRealNames = [...movieCastersRealNames]; // Create a copy of the inputFields array
    newMovieCastersRealNames[index] = value; // Update the value at the specified index
    setMovieCastersRealNames(newMovieCastersRealNames); // Update the state with the new array
  };

  // Movie Casters - Name in Movies
  const [movieCastersMovieNames, setMovieCastersMovieNames] = useState<string[]>(['']); // Initial state with an empty string in the array

  const handleMovieCastersMovieNamesInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const newMovieCastersMovieNames = [...movieCastersMovieNames]; // Create a copy of the inputFields array
    newMovieCastersMovieNames[index] = value; // Update the value at the specified index
    setMovieCastersMovieNames(newMovieCastersMovieNames); // Update the state with the new array
  };

  // Movie Casters - Images
  const [movieCastersImages, setMovieCastersImages] = useState<string[]>(['']); // Initial state with an empty string in the array

  const handleMovieCastersImagesInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const newMovieCastersImages = [...movieCastersImages]; // Create a copy of the inputFields array
    newMovieCastersImages[index] = value; // Update the value at the specified index
    setMovieCastersImages(newMovieCastersImages); // Update the state with the new array
  };

  const handleAddCasts = () => {
    setMovieCastersRealNames([...movieCastersRealNames, '']);
    setMovieCastersMovieNames([...movieCastersMovieNames, '']);
    setMovieCastersImages([...movieCastersImages, '']);
  };
  
  const handleDeleteCasts = (index: number) => {
    const newMovieCastersRealNames = [...movieCastersRealNames];  // Create a copy of the inputFields array
    newMovieCastersRealNames.splice(index, 1); // Remove the element at the specified index
    setMovieCastersRealNames(newMovieCastersRealNames); // Update the state with the new array

    const newMovieCastersMovieNames = [...movieCastersMovieNames];  // Create a copy of the inputFields array
    newMovieCastersMovieNames.splice(index, 1); // Remove the element at the specified index
    setMovieCastersMovieNames(newMovieCastersMovieNames); // Update the state with the new array

    const newMovieCastersImages = [...movieCastersImages];  // Create a copy of the inputFields array
    newMovieCastersImages.splice(index, 1); // Remove the element at the specified index
    setMovieCastersImages(newMovieCastersImages); // Update the state with the new array

  };


  // Movie Images

  const [movieImages, setMovieImages] = useState<string[]>(['']); // Initial state with an empty string in the array

  const handleMovieImagesInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const newMovieImages = [...movieImages]; // Create a copy of the inputFields array
    newMovieImages[index] = value; // Update the value at the specified index
    setMovieImages(newMovieImages); // Update the state with the new array
  };

  const handleAddMovieImages = () => {
    setMovieImages([...movieImages, '']); // Add a new empty string to the inputFields array
  };

  const handleDeleteMovieImages = (index: number) => {
    const newMovieImages = [...movieImages];  // Create a copy of the inputFields array
    newMovieImages.splice(index, 1); // Remove the element at the specified index
    setMovieImages(newMovieImages); // Update the state with the new array
  };

  // Movie Genres

  const [movieGenres, setMovieGenres] = useState<string[]>([]); // Initial state with an empty string in the array

  const handleMovieGenresInputChange = (value: string) => {
    const currentIndex = movieGenres.indexOf(value);
    const newMovieGenres = [...movieGenres];

    if (currentIndex === -1) {
      newMovieGenres.push(value);
    } else {
      newMovieGenres.splice(currentIndex, 1);
    }

    setMovieGenres(newMovieGenres);
  };

  const addMovie = useCallback(async () => {
    try {
        await axios.post('/api/insertMovie', {
            movieName,
            movieDescription,
            movieBanner,
            movieRating,
            movieTrailer,
            movieStoryline,
            movieDuration,
            movieGenres,
            movieReleaseYear,
            movieWriters,
            movieCastersRealNames,
            movieCastersMovieNames,
            movieCastersImages,
            movieImages
        });

        router.push('/admin_dashboard');

    } catch(error) {
        console.log(error);
    }
}, [movieName,
  movieDescription,
  movieBanner,
  movieRating,
  movieTrailer,
  movieStoryline,
  movieDuration,
  movieGenres,
  movieReleaseYear,
  movieWriters,
  movieCastersRealNames,
  movieCastersMovieNames,
  movieCastersImages,
  movieImages]); 

  return (
    <div className='p-[60px]'>
        <h2 className='text-white text-[35px] mb-[60px]'>Add movie</h2>
        <div className='rounded-[20px] border-[#6B696C] border-[1px] p-[28px_28px_12px_28px] mb-[40px]'>
          <div className='max-w-[50%]'>
              <InputWindow
                title="Name"
                description='This is the official name of the movie, the title that it is known by.
                For example, "The Godfather" or "Jurassic Park".'
              />
              <Input
                  id="movieName"
                  onChange={(ev:any)=> setMovieName(ev.target.value)}
                  value={movieName}
                  placeholder="Enter movie name"
              />
          </div>
        </div>

        <div className='rounded-[20px] border-[#6B696C] border-[1px] p-[28px_28px_12px_28px] mb-[40px]'>
          <div className='max-w-[50%]'>
              <InputWindow
                title="Description"
                description='This is an image that represents the movie, often used for promotional purposes.
                It is usually a poster or a still from the movie.'
              />
              <Textarea
                  id="movieDescription"
                  onChange={(ev)=> setMovieDescription(ev.target.value)}
                  value={movieDescription}
                  placeholder="Enter movie description here.."
              />
          </div>
        </div>

        <div className='rounded-[20px] border-[#6B696C] border-[1px] p-[28px_28px_12px_28px] mb-[40px]'>
          <div className='max-w-[50%]'>
            <InputWindow
              title="Banner"
              description='This is an image that represents the movie, often used for promotional purposes.
              It is usually a poster or a still from the movie.'
            />
            <Input
                id="movieBanner"
                onChange={(ev:any)=> setMovieBanner(ev.target.value)}
                value={movieBanner}
                placeholder="Paste Banner URL"
            />
          </div>
        </div>

        <div className='rounded-[20px] border-[#6B696C] border-[1px] p-[28px_28px_12px_28px] mb-[40px]'>
          <div className='max-w-[50%]'>
            <InputWindow
              title="Storyline"
              description='A concise summary of the main plotline or narrative of the movie, highlighting the key events and character motivations that drive the story forward'
            />
            <Textarea
                id="movieStoryline"
                onChange={(ev)=> setMovieStoryline(ev.target.value)}
                value={movieStoryline}
                placeholder="Enter movie storyline here.."
            />
          </div>
        </div>

        <div className='rounded-[20px] border-[#6B696C] border-[1px] p-[28px_28px_12px_28px] mb-[40px]'>
          <div className='max-w-[50%]'>
            <InputWindow
              title="Trailer"
              description="Paste the URL of the movie's official trailer from YouTube or another video hosting site. Trailers are short previews of the film that give a glimpse into the storyline, characters, and overall feel of the movie."
            />
            <Input
                id="movieTrailer"
                onChange={(ev:any)=> setMovieTrailer(ev.target.value)}
                value={movieTrailer}
                placeholder="Paste Movie Trailer URL here.."
            />
          </div>
        </div>

        <div className='rounded-[20px] border-[#6B696C] border-[1px] p-[28px_28px_12px_28px] mb-[40px]'>
          <div className='max-w-[50%]'>
            <InputWindow
              title="Rating"
              description="For the movie's rating, enter a number between 1 and 10, with 1 being the lowest and 10 being the highest. This rating gives an indication of the overall quality or audience reception of the film."
            />
            <Input
                id="movieRating"
                onChange={(ev)=> setMovieRating(ev.target.value)}
                value={movieRating}
                placeholder="Enter Movie rating here.."
            />
          </div>
        </div>

        <div className='rounded-[20px] border-[#6B696C] border-[1px] p-[28px_28px_12px_28px] mb-[40px]'>
          <div className='max-w-[50%]'>
            <InputWindow
              title="Duration"
              description='The length of the movie in minutes. 
              For example, "2h 20m (2 Hours and 20 minutes)"'
            />
            <Input
                id="movieDuration"
                onChange={(ev:any)=> setMovieDuration(ev.target.value)}
                value={movieDuration}
                placeholder="Enter Movie Duration"
            />
          </div>
        </div>

        <div className='rounded-[20px] border-[#6B696C] border-[1px] p-[28px] mb-[40px]'>
          <div className='max-w-[50%]'>
            <InputWindow
              title="Genres"
              description='The type of movie it is. For example, "Action", "Comedy", "Drama", "Horror", "Sci-Fi", etc. 
              You can add multiple genres if the movie fits into more than one category.'
            />

            {movieGenresList.map((option,index) => (
              <div className="flex flex-col" key={index}>
                <label className='text-white text-[16px] my-[8px] customCheckbox'>
                  <input
                    type="checkbox"
                    value={option}
                    checked={movieGenres.includes(option)}
                    onChange={(e) => handleMovieGenresInputChange(e.target.value)}
                    className='rounded-[5px]'
                  />
                  <span className="checkmark"></span>

                  {option}
                </label>
              </div>
            ))}

          </div> 
        </div>

        <div className='rounded-[20px] border-[#6B696C] border-[1px] p-[28px_28px_12px_28px] mb-[40px]'>
          <div className='max-w-[50%]'>
            <InputWindow
              title="Release Year"
              description='The year that the movie was released in theaters or on home video. 
              For example, "1993" or "2020".'
            />
            <Input
                id="movieReleaseYear"
                onChange={(ev:any)=> setMovieReleaseYear(ev.target.value)}
                value={movieReleaseYear}
                placeholder="Enter Release Year"
            />
          </div>
        </div>

        <div className='rounded-[20px] border-[#6B696C] border-[1px] p-[28px] mb-[40px]'>
          <div className='max-w-[50%]'>
            <InputWindow
              title="Writers"
              description='The people who wrote the screenplay or story for the movie.
              This could be one person or a team of people. For example, "John August" or "Coen Brothers".'
            />

            {movieWriters.map((input, index) => (
              <div key={index} className="inputwcontrol flex w-full bg-primaryvariant1 rounded-[10px] items-center mb-[16px]">
                <input 
                    value={input}
                    id={`writter`+index}
                    type="text"
                    onChange={(event) => handleMovieWritersInputChange(index, event)}
                    placeholder="Enter Writers Name"
                    className="rounded-[10px] font-opensans text-[16px] p-[16px] bg-none bg-primaryvariant1 text-white placeholder:text-placeholder  focus:outline-none flex-1"
                />
                <div onClick={() => handleDeleteWriter(index)} className="h-[38px] w-[38px] overflow-hidden aspect-square rounded-[6px] bg-accent flex justify-self-end items-center justify-center cursor-pointer mr-[9px]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22.594" height="22.594" viewBox="0 0 22.594 22.594">
                    <path id="interface-add-1_1_" data-name="interface-add-1 (1)" d="M7.818,6.283c-.1.013-.139.018-.192.028A1.516,1.516,0,0,0,6.449,7.663c0,.055-.007.9-.007,2.576v2.494l-2.57,0c-2.426,0-2.574,0-2.64.013a1.446,1.446,0,0,0-.788.374,1.486,1.486,0,0,0-.459.77,1.657,1.657,0,0,0,0,.689,1.486,1.486,0,0,0,.459.77,1.448,1.448,0,0,0,.788.374c.066.011.215.011,2.64.013l2.57,0v2.536c0,1.682,0,2.563.007,2.618a1.521,1.521,0,0,0,1.061,1.32l.066.02h.739l.066-.02a1.536,1.536,0,0,0,.826-.624,1.459,1.459,0,0,0,.224-.584l.013-.08,0-2.592,0-2.592,2.57,0c2.426,0,2.574,0,2.64-.013a1.469,1.469,0,0,0,.541-.19,1.558,1.558,0,0,0,.667-.816,1.5,1.5,0,0,0,.066-.3.165.165,0,0,1,.01-.053.935.935,0,0,0,.005-.139.661.661,0,0,0-.006-.127c0,.005-.007-.012-.01-.045a1.465,1.465,0,0,0-.066-.3,1.5,1.5,0,0,0-.42-.632,1.446,1.446,0,0,0-.788-.374c-.066-.011-.214-.011-2.641-.013l-2.57,0V10.24c0-1.639,0-2.522-.007-2.576a1.451,1.451,0,0,0-.493-1,1.433,1.433,0,0,0-.773-.371,2.768,2.768,0,0,0-.358-.012M-.048,14.237c0,.076,0,.107,0,.069s0-.1,0-.138,0-.007,0,.069" transform="translate(15.758 -4.405) rotate(45)" fill="#fff" fill-rule="evenodd"/>
                  </svg>
                </div>
                
              </div>
            ))}

            <button className="secondary-button text-white w-full rounded-[10px] font-opensans text-[16px] p-[16px]" type="button" onClick={handleAddWritter}>
              Add New Writter
            </button>
          </div>
        </div>

        <div className='rounded-[20px] border-[#6B696C] border-[1px] p-[28px] mb-[40px]'>
          <div className='max-w-[50%]'>
            <InputWindow
              title="Casts"
              description='The actors who appear in the movie. 
              This could be the lead actors or supporting cast. For example, "Tom Hanks" or "Emma Stone".'
            />

            {movieCastersRealNames.map((actor, index) => (
            <div className='rounded-[16px] border-[#6B696C] border-[1px] p-[20px_20px_4px_20px] mb-[16px]' key={index}>
                <div className='flex justify-between mb-[20px] items-center'>
                  <h3 className='text-white text-[20px] mb-[16px] flex items-center'>Actor <span className='bg-primaryvariant1 ml-[12px] w-[24px] h-[24px] flex items-center justify-center rounded-[5px] text-white text-[14px] font-semibold'>{index+1}</span></h3>
                  <div onClick={() => handleDeleteCasts(index)} className="h-[38px] w-[38px] overflow-hidden aspect-square rounded-[6px] bg-accent flex justify-self-end items-center justify-center cursor-pointer mr-[9px]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22.594" height="22.594" viewBox="0 0 22.594 22.594">
                      <path id="interface-add-1_1_" data-name="interface-add-1 (1)" d="M7.818,6.283c-.1.013-.139.018-.192.028A1.516,1.516,0,0,0,6.449,7.663c0,.055-.007.9-.007,2.576v2.494l-2.57,0c-2.426,0-2.574,0-2.64.013a1.446,1.446,0,0,0-.788.374,1.486,1.486,0,0,0-.459.77,1.657,1.657,0,0,0,0,.689,1.486,1.486,0,0,0,.459.77,1.448,1.448,0,0,0,.788.374c.066.011.215.011,2.64.013l2.57,0v2.536c0,1.682,0,2.563.007,2.618a1.521,1.521,0,0,0,1.061,1.32l.066.02h.739l.066-.02a1.536,1.536,0,0,0,.826-.624,1.459,1.459,0,0,0,.224-.584l.013-.08,0-2.592,0-2.592,2.57,0c2.426,0,2.574,0,2.64-.013a1.469,1.469,0,0,0,.541-.19,1.558,1.558,0,0,0,.667-.816,1.5,1.5,0,0,0,.066-.3.165.165,0,0,1,.01-.053.935.935,0,0,0,.005-.139.661.661,0,0,0-.006-.127c0,.005-.007-.012-.01-.045a1.465,1.465,0,0,0-.066-.3,1.5,1.5,0,0,0-.42-.632,1.446,1.446,0,0,0-.788-.374c-.066-.011-.214-.011-2.641-.013l-2.57,0V10.24c0-1.639,0-2.522-.007-2.576a1.451,1.451,0,0,0-.493-1,1.433,1.433,0,0,0-.773-.371,2.768,2.768,0,0,0-.358-.012M-.048,14.237c0,.076,0,.107,0,.069s0-.1,0-.138,0-.007,0,.069" transform="translate(15.758 -4.405) rotate(45)" fill="#fff" fill-rule="evenodd"/>
                    </svg>
                  </div>
                </div>
                  <Input
                      value={movieCastersRealNames[index]}
                      id={`actorReal`+index}
                      type="text"
                      onChange={(event:any) => handleMovieCastersRealNamesInputChange(index, event)}
                      placeholder="Enter Actor Real Name"
                  />

                  <Input
                      value={movieCastersMovieNames[index]}
                      id={`actorMovie`+index}
                      type="text"
                      onChange={(event:any) => handleMovieCastersMovieNamesInputChange(index, event)}
                      placeholder="Enter Actor Movie Name"
                  />

                  <Input 
                      value={movieCastersImages[index]}
                      id={`actorImage`+index}
                      type="text"
                      onChange={(event:any) => handleMovieCastersImagesInputChange(index, event)}
                      placeholder="Paste Actor Image URL"
                  />
                </div>
              ))}
            <button className="secondary-button text-white w-full rounded-[10px] font-opensans text-[16px] p-[16px]" type="button" onClick={handleAddCasts}>
              Actor +
            </button>
          </div>
        </div>

        <div className='rounded-[10px] border-[#6B696C] border-[1px] p-[28px] mb-[40px]'>
          <div className='max-w-[50%]'>
            <InputWindow
              title="Gallery"
              description='Additional images of the movie, such as stills or behind-the-scenes photos.
              These can be used for promotional purposes or to give fans a sneak peek of the movie.'
            />

            {movieImages.map((input, index) => (
              <div className="inputwcontrol flex w-full bg-primaryvariant1 rounded-[10px] items-center mb-[16px]" key={index}>
                <input 
                    value={input}
                    id={`image`+index}
                    type="text"
                    onChange={(event) => handleMovieImagesInputChange(index, event)}
                    placeholder="Paste Movie Image URL"
                    className="rounded-[10px] font-opensans text-[16px] p-[16px] bg-none bg-primaryvariant1 text-white placeholder:text-placeholder focus:outline-[1px] focus:outline-none flex-1"
                />
                <div onClick={() => handleDeleteMovieImages(index)} className="h-[38px] w-[38px] overflow-hidden aspect-square rounded-[6px] bg-accent flex justify-self-end items-center justify-center cursor-pointer mr-[9px]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22.594" height="22.594" viewBox="0 0 22.594 22.594">
                    <path id="interface-add-1_1_" data-name="interface-add-1 (1)" d="M7.818,6.283c-.1.013-.139.018-.192.028A1.516,1.516,0,0,0,6.449,7.663c0,.055-.007.9-.007,2.576v2.494l-2.57,0c-2.426,0-2.574,0-2.64.013a1.446,1.446,0,0,0-.788.374,1.486,1.486,0,0,0-.459.77,1.657,1.657,0,0,0,0,.689,1.486,1.486,0,0,0,.459.77,1.448,1.448,0,0,0,.788.374c.066.011.215.011,2.64.013l2.57,0v2.536c0,1.682,0,2.563.007,2.618a1.521,1.521,0,0,0,1.061,1.32l.066.02h.739l.066-.02a1.536,1.536,0,0,0,.826-.624,1.459,1.459,0,0,0,.224-.584l.013-.08,0-2.592,0-2.592,2.57,0c2.426,0,2.574,0,2.64-.013a1.469,1.469,0,0,0,.541-.19,1.558,1.558,0,0,0,.667-.816,1.5,1.5,0,0,0,.066-.3.165.165,0,0,1,.01-.053.935.935,0,0,0,.005-.139.661.661,0,0,0-.006-.127c0,.005-.007-.012-.01-.045a1.465,1.465,0,0,0-.066-.3,1.5,1.5,0,0,0-.42-.632,1.446,1.446,0,0,0-.788-.374c-.066-.011-.214-.011-2.641-.013l-2.57,0V10.24c0-1.639,0-2.522-.007-2.576a1.451,1.451,0,0,0-.493-1,1.433,1.433,0,0,0-.773-.371,2.768,2.768,0,0,0-.358-.012M-.048,14.237c0,.076,0,.107,0,.069s0-.1,0-.138,0-.007,0,.069" transform="translate(15.758 -4.405) rotate(45)" fill="#fff" fill-rule="evenodd"/>
                  </svg>
                </div>
                
              </div>
            ))}

            <button className="secondary-button text-white w-full rounded-[10px] font-opensans text-[16px] p-[16px]" type="button" onClick={handleAddMovieImages}>
              Image +
            </button>
          </div>
        </div>

        <div className='flex justify-end'>
            
            <Button className='mr-[16px]' label="Cancel" style='secondary'/>
            <Button label="Submit" style="primary" clickFunction={addMovie}/>
        </div>
        
    </div>
  )
}

export default InsertMovie