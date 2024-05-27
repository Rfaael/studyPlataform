import { IsOptional, IsString } from 'class-validator';

export class UpdateStudentDto{
    @IsString()
    @IsOptional()
    firstName: string;

    @IsString()
    @IsOptional()
    lastName: string;
}
 