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

  // Method to create a showtime in the database
  public async createShowtime(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    try {
      // Check the request method
      if (req.method !== 'POST') {
        res.status(405).end();
        return;
      }

      // Destructure the request body to get showtime details
      const { movie, dateTime, type } = req.body;

      // Create the showtime in the database
      const showtime = await prismadb.showtime.create({
        data: {
          movie,
          dateTime,
          type,
        }
      });

      // Send the created showtime as the response
      res.status(200).json(showtime);
    } catch (error) {
      // Handle any errors that occur during the process
      res.status(400).json({ error: `Something went wrong: ${error}` });
    }
  }
}

// Usage in the handler function
export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  // Get an instance of the Database class
  const dbInstance = Database.getInstance();
    
  // Call the createShowtime method to handle the request
  await dbInstance.createShowtime(req, res);
}
