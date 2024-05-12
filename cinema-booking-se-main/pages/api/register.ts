import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/lib/prismadb';

class RegistrationRequestBuilder {
  private firstName: string;
  private lastName: string;
  private email: string;
  private password: string;

  constructor() {
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.password = '';
  }

  setFirstName(firstName: string): RegistrationRequestBuilder {
    this.firstName = firstName;
    return this;
  }

  setLastName(lastName: string): RegistrationRequestBuilder {
    this.lastName = lastName;
    return this;
  }

  setEmail(email: string): RegistrationRequestBuilder {
    this.email = email;
    return this;
  }

  setPassword(password: string): RegistrationRequestBuilder {
    this.password = password;
    return this;
  }

  async build(): Promise<void> {
    try {
      const existingUser = await prismadb.user.findUnique({
        where: {
          email: this.email,
        },
      });

      if (existingUser) {
        throw new Error('Email taken');
      }

      const hashedPassword = await bcrypt.hash(this.password, 12);

      const user = await prismadb.user.create({
        data: {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          hashedPassword,
        },
      });

      // Handle the successful registration response
      console.log(user);
    } catch (error) {
      throw new Error(`Something went wrong: ${error}`);
    }
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).end();
    }

    const { firstName, lastName, email, password } = req.body;

    // Perform validation checks on the input fields
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Validate the email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Use the builder to construct the registration request
    await new RegistrationRequestBuilder()
      .setFirstName(firstName)
      .setLastName(lastName)
      .setEmail(email)
      .setPassword(password)
      .build();

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(400).json({ error: `Something went wrong: ${error.message}` });
  }
}
