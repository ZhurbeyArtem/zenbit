import {IsEmail, IsString} from "class-validator";

export  class CreateFormDto{
    @IsString({message: 'Должно быть строкой'})
    readonly name: string;
    @IsEmail({},{message: 'Некоректный email'})
    readonly email: string;
    readonly message: string;
}