// Import the necessary modules
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Define the handler function for the API endpoint
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Check the request method
    if (req.method !== 'GET') {
      return res.status(405).end();
    }

    // Retrieve showtimes from the database, including movie details
    const showtimes = await prisma.showtime.findMany({
      include: {
        movie: {
          select: {
            title: true,
            bannerUrl: true,
          },
        },
      },
    });

    // Return success response with the retrieved showtimes
    return res.status(200).json(showtimes);
  } catch (error) {
    // Handle any errors that occur during the process
    return res.status(500).json({ error: `Something went wrong: ${error}` });
  }
}
