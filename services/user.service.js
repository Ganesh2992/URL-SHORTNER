import {db} from '../db/index.js';
import {usersTable} from '../models/user.model.js';
import {eq} from 'drizzle-orm';

export async function getUserByEmail(email){
    const [existingUser] = await db
    .select({
      id: usersTable.id,
      firstName: usersTable.firstName,
      lastName: usersTable.lastName,
      email: usersTable.email,
    })
    .from(usersTable).where(eq(usersTable.email,email));

    return existingUser;
}

export async function createUser(userData){
  const [user] = await db
  .insert(usersTable)
  .values(userData)
  .returning({id: usersTable.id});

  return user;
}