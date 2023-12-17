import { IsEmail, IsNotEmpty, IsString } from "class-validator";

// DTO: Data transfer object
export class RegisterDTO {
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string

    @IsNotEmpty()
    firstName : string

    @IsNotEmpty()
    lastName : string
}