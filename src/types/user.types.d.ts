export type User = {
  readonly id: number;
  readonly username: string;
  readonly email: string;
  readonly createdAt: string;
};

export type UserRecord = User & {
  readonly passwordHash: string;
};

export type CreateUserRecord = Omit<UserRecord, "id">;

export type Session = {
  readonly id: number;
  readonly userId: number;
  readonly createdAt: string;
  readonly expiresAt: string;
};

export type CreateSession = {
  userId: number;
  createdAt: string;
  expiresAt: string;
};

export type CreateUserInput = {
  username: string;
  email: string;
  password: string;
};

export type SignUpRawInput = CreateUserInput & { passwordConfirmation: string };
