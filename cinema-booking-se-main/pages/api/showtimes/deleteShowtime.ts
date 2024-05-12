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

  // Method to delete a showtime from the database
  public async deleteShowtime(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    try {
      // Check the request method
      if (req.method !== 'DELETE') {
        res.status(405).end();
        return;
      }

      // Get the showtimeId from the request body
      const { showtimeId } = req.body;

      // Check if the showtimeId is provided
      if (!showtimeId) {
        res.status(400).json({ error: 'Showtime ID is required' });
        return;
      }

      // Check if the showtime exists
      const existingShowtime = await prismadb.showtime.findUnique({
        where: {
          id: showtimeId,
        },
      });

      // Return error response if the showtime is not found
      if (!existingShowtime) {
        res.status(404).json({ error: 'Showtime not found' });
        return;
      }

      // Delete the showtime from the database
      await prismadb.showtime.delete({
        where: {
          id: showtimeId,
        },
      });

      // Send success response
      res.status(200).json({ message: 'Showtime deleted successfully' });
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
    // Call the deleteShowtime method to handle the request
    await dbInstance.deleteShowtime(req, res);
  } else {
    res.status(405).end();
  }
}
