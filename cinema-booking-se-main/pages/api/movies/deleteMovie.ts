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

  // Method to delete a movie from the database
  public async deleteMovie(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    try {
      // Check the request method
      if (req.method !== 'DELETE') {
        res.status(405).end();
        return;
      }

      // Get the movieId from the request body
      const { movieId } = req.body;
      console.log('Request Body:', req.body);

      // Check if the movieId is provided
      if (!movieId) {
        res.status(400).json({ error: 'Movie ID is required' });
        return;
      }

      // Check if the movie exists
      const existingMovie = await prismadb.movie.findUnique({
        where: {
          id: movieId,
        },
      });

      // Return error response if the movie is not found
      if (!existingMovie) {
        res.status(404).json({ error: 'Movie not found' });
        return;
      }

      // Delete the movie from the database
      await prismadb.movie.delete({
        where: {
          id: movieId,
        },
      });

      // Send success response
      res.status(200).json({ message: 'Movie deleted successfully' });
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

  // Check the request method
  if (req.method === 'DELETE') {
    // Call the deleteMovie method to handle the request
    await dbInstance.deleteMovie(req, res);
  } else {
    res.status(405).end();
  }
}
