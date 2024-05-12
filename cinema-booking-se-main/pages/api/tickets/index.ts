// Import the necessary modules
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prismadb = new PrismaClient();

// Define the handler function for the API endpoint
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Check the request method
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  try {
    // Retrieve the list of tickets from the database
    const tickets = await prismadb.ticket.findMany();

    // Return the tickets as the response
    return res.status(200).json(tickets);
  } catch (error) {
    console.error({ error });
    return res.status(500).end();
  }
}
