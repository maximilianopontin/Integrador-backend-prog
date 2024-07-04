import { IsString, Matches } from 'class-validator';
//Usa class-validator para asegurar que el ID es una cadena y que coincide con un patrón de 32 caracteres.
export class IdParamDto {
  @IsString()
  @Matches(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/,
    { message: 'El ID debe ser un UUID válido de 36 caracteres hexadecimales.' },)
  id: string;
}