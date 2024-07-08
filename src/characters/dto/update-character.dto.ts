import { PartialType } from '@nestjs/mapped-types';
import { CreateCharacterDto } from './create-character.dto';

export class UpdateCharacterDto extends PartialType(CreateCharacterDto) {}
//Define UpdateCharacterDto como una extensión parcial de CreateCharacterDto utilizando PartialType, 
//lo que convierte todas las propiedades de CreateCharacterDto en opcionales manualmente.
//no todas las propiedades necesariamente necesitan ser actualizadas al mismo tiempo.
