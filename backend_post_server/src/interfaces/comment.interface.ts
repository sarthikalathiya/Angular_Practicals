import { User } from './user.interface';

export interface Comment {
  id: number;
  content: string;
  authorId: number;
  postId: number;
  createdAt: Date;
  updatedAt: Date;
}

export type CommentWithAuthor = Comment & {
  author: Omit<User, 'password'>;
};
