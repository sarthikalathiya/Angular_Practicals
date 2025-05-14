export interface User {
  id: number;
  email: string;
  name: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type UserWithoutPassword = Omit<User, 'password'>;
