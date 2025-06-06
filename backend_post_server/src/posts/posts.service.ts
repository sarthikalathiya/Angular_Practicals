import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto } from './dto/post.dto';
import { User } from 'src/interfaces/user.interface';
import { Comment } from 'src/interfaces/comment.interface';
import { Post } from 'src/interfaces/post.interface';

type PostWithRelations = Post & {
  author: User;
  comments?: Comment[];
};

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async findAllPost(): Promise<PostWithRelations[]> {
    try {
      return await this.prisma.post.findMany({
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          comments: {
            include: {
              author: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                },
              },
            },
          },
        },
      });
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Failed to retrieve posts');
    }
  }

  async findOnePost(id: number): Promise<PostWithRelations> {
    if (!id || isNaN(id)) {
      throw new BadRequestException('Invalid post ID');
    }

    const post = await this.prisma.post.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        comments: {
          include: {
            author: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    return post;
  }

  async createPost(
    userId: number,
    data: CreatePostDto,
  ): Promise<PostWithRelations> {
    if (!userId) {
      throw new BadRequestException('User ID is required');
    }

    if (!data.title || !data.body) {
      throw new BadRequestException('Title and body are required');
    }

    try {
      return await this.prisma.post.create({
        data: {
          ...data,
          authorId: userId,
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
      throw new BadRequestException('Failed to create post');
    }
  }

  async updatePost(
    id: number,
    userId: number,
    data: { title?: string; body?: string },
  ): Promise<PostWithRelations> {
    if (!id || isNaN(id)) {
      throw new BadRequestException('Invalid post ID');
    }

    if (!userId) {
      throw new BadRequestException('User ID is required');
    }

    if (!data.title && !data.body) {
      throw new BadRequestException('No data provided for update');
    }

    const post = await this.prisma.post.findUnique({
      where: { id },
    });

    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    if (post.authorId !== userId) {
      throw new ForbiddenException('You can only update your own posts');
    }

    try {
      return await this.prisma.post.update({
        where: { id },
        data,
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
      throw new BadRequestException('Failed to update post');
    }
  }

  async removePost(id: number, userId: number): Promise<{ message: string }> {
    if (!id || isNaN(id)) {
      throw new BadRequestException('Invalid post ID');
    }

    if (!userId) {
      throw new BadRequestException('User ID is required');
    }

    const post = await this.prisma.post.findUnique({
      where: { id },
    });

    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    if (post.authorId !== userId) {
      throw new ForbiddenException('You can only delete your own posts');
    }

    try {
      await this.prisma.post.delete({
        where: { id },
      });

      return { message: 'Post deleted successfully' };
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Failed to delete post');
    }
  }
}
