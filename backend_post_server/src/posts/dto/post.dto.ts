import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty({ message: 'title is required' })
  @IsString()
  title: string;

  @IsNotEmpty({ message: 'body is required' })
  @IsString()
  body: string;
}

export class UpdatePostDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  body?: string;
}
