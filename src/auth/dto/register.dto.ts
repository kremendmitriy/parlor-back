import {
  MinLength,
  IsEmail,
  IsNotEmpty,
  IsString,
  IsPhoneNumber,
} from 'class-validator';

export class RegisterDto {
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(10, { message: 'Password must be at least 10 characters long' })
  password: string;

  @IsString()
  @IsNotEmpty({ message: 'First name is required' })
  firstName: string;

  @IsString()
  @IsNotEmpty({ message: 'Last name is required' })
  lastName: string;

  @IsPhoneNumber(null, { message: 'Invalid phone number format' })
  @IsNotEmpty({ message: 'Phone number is required' })
  phoneNumber: string;
}
