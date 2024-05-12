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
  public async createTicket(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    try {
      // Check the request method
      if (req.method !== 'POST') {
        res.status(405).end();
        return;
      }

      // Destructure the request body to get movie details
      const {
        userId,
        showtimeId,
        dateTime,
        seatNumber,
        barcode,
      } = req.body;

      const seatIsReserved = await prismadb.ticket.findFirst({
        where: {
          movieId: showtimeId,
          dateTime: dateTime,
          seatNumber: seatNumber,
          userId: userId
        },
      });
      
      // Return error response if the seat is already reserved
      if (seatIsReserved) {
        res.status(422).json({ error: 'Seat is already reserved' });
        return;
      }
      

      const seatReservations = await prismadb.ticket.create({
        data: {
          userId: userId, // Replace with the actual user ID
          movieId: showtimeId, // Replace with the actual movie ID
          dateTime: dateTime, // Replace with the actual date and time of creation
          seatNumber: seatNumber, // Replace with the actual seat number
          hallNumber: "Hall 1", // Assuming the hall number is always 1
          barcode: barcode, // Replace with the actual barcode
        },
      });

      // Send the created movie as the response
      res.status(200).json(seatReservations);
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
  await dbInstance.createTicket(req, res);
}
