// Import the necessary modules
import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/lib/prismadb';

// Define a Database class
class Database {
  private static instance: Database | null = null;

  private constructor() {
    // Private constructor to prevent direct instantiation
  }

  // Singleton pattern: Get an instance of the Database class
  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }

    return Database.instance;
  }

  // Method to create a movie in the database
  public async createMovie(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    try {
      // Check the request method
      if (req.method !== 'POST') {
        res.status(405).end();
        return;
      }

      // Destructure the request body to get movie details
      const {
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
        movieImages,
      } = req.body;

      // Check if the movie already exists
      const existingMovie = await prismadb.movie.findUnique({
        where: {
          title: movieName,
        },
      });

      // Return error response if the movie already exists
      if (existingMovie) {
        res.status(422).json({ error: 'Movie already exists' });
        return;
      }

      // Create the movie in the database
      const movie = await prismadb.movie.create({
        data: {
          title: movieName,
          description: movieDescription,
          bannerUrl: movieBanner,
          genre: { set: movieGenres },
          duration: movieDuration,
          trailer: movieTrailer,
          rating: movieRating,
          releaseYear: movieReleaseYear,
          actorImagesUrl: { set: movieCastersImages },
          actors: { set: movieCastersRealNames },
          casts: { set: movieCastersMovieNames },
          galleryImages: { set: movieImages },
          storyline: movieStoryline,
          writers: { set: movieWriters },
        },
      });

      // Send the created movie as the response
      res.status(200).json(movie);
    } catch (error) {
      // Handle any errors that occur during the process
      res.status(400).json({ error: `Something went wrong: ${error}` });
    }
  }
}

// Usage in the handler function
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Get an instance of the Database class
  const dbInstance = Database.getInstance();
  
  // Call the createMovie method to handle the request
  await dbInstance.createMovie(req, res);
}
