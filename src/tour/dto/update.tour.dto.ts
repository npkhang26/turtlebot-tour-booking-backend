import {IsOptional, IsString } from "class-validator";

export class UpdateTourDTO {
    @IsString()
    @IsOptional()
    title?: string

    @IsString()
    @IsOptional()
    description?: string

    @IsString()
    @IsOptional()
    url: string
}