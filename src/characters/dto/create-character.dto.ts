// create-character.dto.ts

import { IsString, IsNumber, IsArray, ArrayNotEmpty,Min } from 'class-validator';


interface CharacterEntity {
  nombre: string;
  edad: number;
  ocupacion: string;
  caracteristicas: string[];
  familia: string[];
}

export class CreateCharacterDto implements CharacterEntity {
  @IsString()
  nombre: string;

  @IsNumber()
  @Min(1)
  edad: number;

  @IsString()
  ocupacion: string;

  @IsArray()
  @ArrayNotEmpty()//arreglo no esté vacío
  @IsString({ each: true })//se asegura de que todos los elementos del array sean cadenas de texto válidas.
  caracteristicas: string[];

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  familia: string[];

  // Restringe cualquier otra clave en el DTO que no esté en la interfaz CharacterEntity
  [key: string]: any;
}
