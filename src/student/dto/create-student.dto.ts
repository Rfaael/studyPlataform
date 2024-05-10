import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateStudentDto {
    @IsString()
    @IsNotEmpty()
    firstName: String;

    @IsString()
    @IsNotEmpty()
    lastName: String;

    @IsEmail()
    @IsNotEmpty()
    email: String;

    @IsString()
    @IsNotEmpty()
    password: String;
}
