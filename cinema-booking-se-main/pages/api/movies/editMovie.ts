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

  // Method to update a movie in the database
  public async updateMovie(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    try {
      // Check the request method
      if (req.method !== 'PUT') {
        res.status(405).end();
        return;
      }

      // Extract the movieId from the request body
      const { movieId } = req.body;

      // Check if movieId is provided
      if (!movieId) {
        res.status(400).json({ error: 'Movie ID is required' });
        return;
      }

      // Find the existing movie in the database
      const existingMovie = await prismadb.movie.findUnique({
        where: {
          id: movieId,
        },
      });

      // Check if the movie exists
      if (!existingMovie) {
        res.status(404).json({ error: 'Movie not found' });
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

      // Update the movie in the database
      const updatedMovie = await prismadb.movie.update({
        where: {
          id: movieId,
        },
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

      // Send the updated movie as the response
      res.status(200).json(updatedMovie);
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

  // Check the request method and call the appropriate method
  if (req.method === 'PUT') {
    await dbInstance.updateMovie(req, res);
  } else {
    res.status(405).end();
  }
}
