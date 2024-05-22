import {
    IsNotEmpty,
    IsString,
    IsNumberString,
    MaxLength,
    IsPositive,
    IsNumber,
} from 'class-validator';

export class CreateTaskDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    name: string;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    userId: number;

    @IsNotEmpty()
    @IsNumberString()
    priority: number;
}
