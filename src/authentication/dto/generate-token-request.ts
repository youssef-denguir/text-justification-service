import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";

export class GenerateTokenRequest {
    @ApiProperty()
    @IsEmail()
    email: string;
}