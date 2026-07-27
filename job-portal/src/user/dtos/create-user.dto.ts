import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  IsInt,
} from 'class-validator';
import { Role } from 'src/common/enums/role.enum';


export class CreateUserDto {

  @ApiProperty({ example: 'Hasan Mahmud' })
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @ApiProperty({ example: 'hasan@gmail.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'Hasan@123'  })
  @MinLength(6)
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: Role.STUDENT })
  @IsEnum(Role)
  @IsNotEmpty()
  role: Role;

  @ApiProperty({ example: 2026 })
  @IsNotEmpty()
  @IsInt()
  graduationYear: number;

  @ApiProperty({ example: 'Computer Science student interested in Backend Development.' })
  @IsOptional()
  @IsString()
  bio: string;
}