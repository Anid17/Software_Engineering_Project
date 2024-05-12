// Import the necessary modules
import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/lib/prismadb';
import serverAuth from '@/lib/serverAuth';

// Define the handler function for the API endpoint
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Check the request method
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  try {
    // Retrieve the list of movies from the database
    const movies = await prismadb.movie.findMany();

    // Return the movies as the response
    return res.status(200).json(movies);
  } catch (error) {
    console.log({ error });
    return res.status(500).end();
  }
}
