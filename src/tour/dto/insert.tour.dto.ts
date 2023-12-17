import {IsNotEmpty, IsNumber, IsString } from "class-validator";

export class InsertTourDTO {
    @IsNumber()
    @IsNotEmpty()
    from_station: number

    @IsNumber()
    @IsNotEmpty()
    to_station: number
}