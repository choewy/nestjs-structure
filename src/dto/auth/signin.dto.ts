import { IsNotEmpty, IsString, Length } from 'class-validator';

export class SignInDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  username: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 200)
  password: string;
}
