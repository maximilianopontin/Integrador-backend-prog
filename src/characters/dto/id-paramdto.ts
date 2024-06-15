import { IsString, Length, Matches } from 'class-validator';

export class IdParamDto {
  @IsString()
  @Length(24, 24, { message: 'El ID debe tener exactamente 24 caracteres.' })
  @Matches(/^[0-9a-fA-F]{24}$/, { message: 'El ID debe ser un hexágono válido de 24 caracteres.' })
  id: string;
}