// Import the necessary modules
import { NextApiRequest, NextApiResponse } from 'next';
import serverAuth from '@/lib/serverAuth';
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

  // Method to edit a user in the database
  public async editUser(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    try {
      // Check the request method
      if (req.method !== 'PUT') {
        res.status(405).end();
        return;
      }

      // Get the userId from the request body
      const { userId, avatar, email, password } = req.body;

      // Check if at least one field (avatar, email, password) is provided
      if (!avatar && !email && !password) {
        return res.status(400).json({ error: 'At least one field (avatar, email, password) must be provided' });
      }

      /*

      const { currentUser } = await serverAuth(req, res);

      if (!currentUser) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      if (!currentUser) {
        return res.status(403).json({ error: 'Unauthorized' });
      }
      */

      // Check if the user exists
      const existingUser = await prismadb.user.findUnique({
        where: {
          id: userId
        }
      });

      // Return error response if the user is not found
      if (!existingUser) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Prepare the data to be updated
      const userDataToUpdate: { avatar?: string, email?: string, hashedPassword?: string } = {};

      if (avatar) {
        userDataToUpdate.avatar = avatar;
      }

      if (email) {
        userDataToUpdate.email = email;
      }

      if (password) {
        userDataToUpdate.hashedPassword = password;
      }

      // Update the user in the database
      const updatedUser = await prismadb.user.update({
        where: {
          id: userId
        },
        data: userDataToUpdate
      });

      // Send success response with the updated user
      return res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
      // Handle any errors that occur during the process
      return res.status(500).json({ error: `Something went wrong: ${error}` });
    }
  }
}

// Usage in the handler function
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Get an instance of the Database class
  const dbInstance = Database.getInstance();

  // Call the editUser method to handle the request
  await dbInstance.editUser(req, res);
}
