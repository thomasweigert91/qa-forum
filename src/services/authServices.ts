import {
  createSession,
  deleteSessionByUserId,
} from "@/repositories/sessionRepository";
import { createUser, findUserByEmail } from "@/repositories/userRepository";
import type {
  CreateSession,
  CreateUserInput,
  CreateUserRecord,
} from "@/types/user.types";

export const signUp = async (
  input: CreateUserInput,
): Promise<{ success: true } | { success: false; errorMessage: string }> => {
  const { email, password, username } = input;

  const normalizedEmail = email.trim().toLowerCase();

  const existingUser = findUserByEmail(normalizedEmail);

  if (existingUser) {
    return {
      success: false,
      errorMessage: "Diese E-Mail-Adresse ist bereits registriert.",
    };
  }

  const passwordHash = await Bun.password.hash(password, {
    algorithm: "argon2id",
  });

  const user: CreateUserRecord = {
    email: normalizedEmail,
    username: username.trim(),
    passwordHash,
    createdAt: new Date().toISOString(),
  };

  const userCreated = createUser(user);

  if (!userCreated) {
    return {
      success: false,
      errorMessage: "Benutzer konnte nicht erstellt werden",
    };
  }

  return {
    success: true,
  };
};

export const signIn = async (password: string, email: string) => {
  const normalizedEmail = email.trim().toLowerCase();
  const user = findUserByEmail(normalizedEmail);

  if (!user) {
    throw new Error("Ungültige Zugangsdaten");
  }

  const passwordMatches = await Bun.password.verify(
    password,
    user.passwordHash,
  );

  if (!passwordMatches) {
    throw new Error("Password oder Email stimmen nicht überein");
  }

  const createdAt = new Date();

  const session: CreateSession = {
    userId: user.id,
    createdAt: createdAt.toISOString(),
    expiresAt: new Date(
      createdAt.getTime() + 1000 * 60 * 60 * 24,
    ).toISOString(),
  };

  return createSession(session);
};

export const signOut = (userId: number) => {
  return deleteSessionByUserId(userId);
};
