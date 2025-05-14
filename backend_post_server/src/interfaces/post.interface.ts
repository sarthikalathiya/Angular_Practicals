import { User } from './user.interface';
import { Comment } from './comment.interface';

export interface Post {
  id: number;
  title: string;
  body: string;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
}

export type PostWithRelations = Post & {
  author: Omit<User, 'password'>;
  comments?: Comment[];
};
