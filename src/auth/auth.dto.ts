/* tslint:disable:max-classes-per-file */
import { IsNotEmpty } from 'class-validator';

class LoginDTO {
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  password: string;
}

class RegisterDTO {
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  password: string;
  seller?: boolean;
}

export { LoginDTO, RegisterDTO };
