import { db } from "@/database/database";
import type { CreateUserRecord, UserRecord } from "@/types/user.types";

const insertUserStatement = db.query<void, CreateUserRecord>(`
    INSERT INTO users (
        username,
        email,
        passwordHash,
        createdAt
    )
    VALUES (
        $username,
        $email,
        $passwordHash,
        $createdAt
    )
`);

const findUserByEmailStatement = db.query<UserRecord, [string]>(`
    SELECT * FROM users WHERE email = ?    
`);

export const createUser = ({
  createdAt,
  email,
  passwordHash,
  username,
}: CreateUserRecord): boolean => {
  return (
    insertUserStatement.run({ username, email, passwordHash, createdAt })
      .changes > 0
  );
};

export const findUserByEmail = (email: string): UserRecord | null => {
  return findUserByEmailStatement.get(email);
};
