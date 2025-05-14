import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreatePostDto, UpdatePostDto } from './dto/post.dto';

interface RequestWithUser extends Request {
  user: {
    userId: number;
    email: string;
  };
}

@Controller('posts')
@UseGuards(JwtAuthGuard)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  createPost(
    @Request() req: RequestWithUser,
    @Body() createPostDto: CreatePostDto,
  ) {
    return this.postsService.createPost(req.user.userId, createPostDto);
  }

  @Get()
  findAllPost() {
    return this.postsService.findAllPost();
  }

  @Get(':id')
  findOnePost(@Param('id') id: string) {
    return this.postsService.findOnePost(+id);
  }

  @Patch(':id')
  updatePost(
    @Request() req: RequestWithUser,
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postsService.updatePost(+id, req.user.userId, updatePostDto);
  }

  @Delete(':id')
  removePost(@Request() req: RequestWithUser, @Param('id') id: string) {
    return this.postsService.removePost(+id, req.user.userId);
  }
}
