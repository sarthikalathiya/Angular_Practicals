import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateCommentDto } from './dto/comment.dto';

interface RequestWithUser extends Request {
  user: {
    userId: number;
    email: string;
  };
}

@Controller('posts/:postId/comments')
@UseGuards(JwtAuthGuard)
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  findAllComment(@Param('postId') postId: string) {
    return this.commentsService.findAllByPostId(+postId);
  }

  @Post()
  createComment(
    @Request() req: RequestWithUser,
    @Param('postId') postId: string,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return this.commentsService.createComment(
      req.user.userId,
      +postId,
      createCommentDto.content,
    );
  }

  @Delete(':id')
  removeComment(@Request() req: RequestWithUser, @Param('id') id: string) {
    return this.commentsService.removeComment(+id, req.user.userId);
  }
}
