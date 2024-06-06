// create-character.dto.ts

import { IsString, IsNumber, IsArray, ArrayNotEmpty } from 'class-validator';


interface CharacterEntity {
  nombre: string;
  edad: number;
  ocupacion: string;
  caracteristicas: string[];
  familia: string[];
}

export class CreateCharacterDto implements CharacterEntity {
  @IsString()
  readonly nombre: string;

  @IsNumber()
  readonly edad: number;

  @IsString()
  readonly ocupacion: string;

  @IsArray()
  @ArrayNotEmpty()
  readonly caracteristicas: string[];

  @IsArray()
  @ArrayNotEmpty()
  readonly familia: string[];

  // Restringe cualquier otra clave en el DTO que no esté en la interfaz CharacterEntity
  [key: string]: any;
}
