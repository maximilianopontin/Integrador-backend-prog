import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { ICharacters } from './interface/interface.characters';


@Controller('characters')// todas las rutas definidas en este controlador estarán precedidas por /characters
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {} // Inyecta el servicio CharactersService en el controlador.

  @Post()// Maneja las solicitudes POST a la ruta /characters.
 create(@Body() newCharacter: CreateCharacterDto): Promise<ICharacters> {
  // Utiliza el decorador @Body() para obtener los datos del cuerpo de la solicitud.
    return this.charactersService.create(newCharacter);
    // Llama al método del servicio para crear un nuevo personaje.
  }

  @Get() //maneja las solicitudes GET a la ruta /characters
   getAllCharacters(): Promise<ICharacters[]>  {
    // El método devuelve una promesa de un array de personajes.s
    return this.charactersService.getAllCharacters();
  }

  @Get(':id')// maneja solicitudes GET a la ruta /characters/:id. 
  async getOneCharacter(@Param('id') id: string): Promise<ICharacters> {
    //Utiliza el decorador @Param('id') para obtener el valor del parámetro de la URL
    return this.charactersService.getOneCharacter(id);
    // llama al método del servicio para buscar un personaje por su ID y devolverlo.
  }

  @Patch(':id')// Maneja las solicitudes PATCH a la ruta /characters/:id.s
  update(@Param('id') id: string, @Body() updateCharacterDto: UpdateCharacterDto) {
    return this.charactersService.update(+id, updateCharacterDto);
  }

  @Delete(':id')// Maneja las solicitudes DELETE a la ruta /characters/:id.
  remove(@Param('id') id: string) {
    return this.charactersService.remove(+id);
  }
}
