import { IsString, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  /*
  Ensure that password contains at least:
    - 1 upper case letter
    - 1 lower case letter
    - 1 number or special character
  */
  password: string;
}
