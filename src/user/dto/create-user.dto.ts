import { IsEmail, IsString, IsOptional, MinLength, IsDate } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  @MinLength(3)
  name: string;

  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  profilePic?: string;
}

export class CreateUserResponseDto {
  @IsEmail()
  email: string;

  @IsDate()
  createdAt: Date;

  @IsString()
  @MinLength(3)
  name: string;

  @IsString()
  @IsOptional()
  title?: string | null;

  @IsString()
  @IsOptional()
  profilePic?: string | null;
}
