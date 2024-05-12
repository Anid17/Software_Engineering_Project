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

  // Method to edit a showtime in the database
  public async editShowtime(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    try {
      // Check the request method
      if (req.method !== 'PUT') {
        res.status(405).end();
        return;
      }

      // Extract data from the request body
      const { showtimeId, movie, dateTime, type } = req.body;

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

      // Update the showtime in the database
      const updatedShowtime = await prismadb.showtime.update({
        where: {
          id: showtimeId,
        },
        data: {
          movie,
          dateTime,
          type,
        },
      });

      // Send success response with the updated showtime
      res.status(200).json(updatedShowtime);
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
  if (req.method === 'PUT') {
    // Call the editShowtime method to handle the request
    await dbInstance.editShowtime(req, res);
  } else {
    res.status(405).end();
  }
}
