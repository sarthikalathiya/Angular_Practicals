import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from 'src/interfaces/user.interface';
import { Comment } from 'src/interfaces/comment.interface';

type CommentWithAuthor = Comment & {
  author: User;
};

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  async findAllByPostId(postId: number): Promise<CommentWithAuthor[]> {
    if (!postId || isNaN(postId)) {
      throw new BadRequestException('Invalid post ID');
    }

    // Check if post exists
    const post = await this.prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      throw new NotFoundException(`Post with ID ${postId} not found`);
    }

    try {
      return await this.prisma.comment.findMany({
        where: { postId },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Failed to retrieve comments');
    }
  }

  async createComment(
    userId: number,
    postId: number,
    content: string,
  ): Promise<CommentWithAuthor> {
    if (!userId) {
      throw new BadRequestException('User ID is required');
    }

    if (!postId || isNaN(postId)) {
      throw new BadRequestException('Invalid post ID');
    }

    if (!content || content.trim() === '') {
      throw new BadRequestException('Comment content cannot be empty');
    }

    const post = await this.prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      throw new NotFoundException(`Post with ID ${postId} not found`);
    }

    try {
      return await this.prisma.comment.create({
        data: {
          content,
          authorId: userId,
          postId,
        },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Failed to create comment');
    }
  }

  async removeComment(
    id: number,
    userId: number,
  ): Promise<{ message: string }> {
    if (!id || isNaN(id)) {
      throw new BadRequestException('Invalid comment ID');
    }

    if (!userId) {
      throw new BadRequestException('User ID is required');
    }

    const comment = await this.prisma.comment.findUnique({
      where: { id },
    });

    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }

    if (comment.authorId !== userId) {
      throw new ForbiddenException('You can only delete your own comments');
    }

    try {
      await this.prisma.comment.delete({
        where: { id },
      });

      return { message: 'Comment deleted successfully' };
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Failed to delete comment');
    }
  }
}
