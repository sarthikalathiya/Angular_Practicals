import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty({ message: 'content is required' })
  @IsString()
  content: string;
}
